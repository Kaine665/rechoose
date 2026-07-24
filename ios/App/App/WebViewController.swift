import UIKit
import WebKit

final class WebViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {
    private var webView: WKWebView!

    override func loadView() {
        let contentController = WKUserContentController()
        contentController.add(self, name: "exportBackup")
        contentController.add(self, name: "haptic")

        let configuration = WKWebViewConfiguration()
        configuration.userContentController = contentController
        configuration.websiteDataStore = .default()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true

        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = false
        webView.backgroundColor = UIColor(
            red: 246 / 255,
            green: 243 / 255,
            blue: 236 / 255,
            alpha: 1
        )
        view = webView
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        guard
            let publicDirectory = Bundle.main.resourceURL?.appendingPathComponent("public"),
            let indexURL = Bundle.main.url(
                forResource: "index",
                withExtension: "html",
                subdirectory: "public"
            )
        else {
            showLoadError()
            return
        }

        webView.loadFileURL(indexURL, allowingReadAccessTo: publicDirectory)
    }

    deinit {
        webView?.configuration.userContentController.removeScriptMessageHandler(
            forName: "exportBackup"
        )
        webView?.configuration.userContentController.removeScriptMessageHandler(
            forName: "haptic"
        )
    }

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        switch message.name {
        case "exportBackup":
            exportBackup(message.body)
        case "haptic":
            playHaptic(message.body as? String)
        default:
            break
        }
    }

    func webView(
        _ webView: WKWebView,
        decidePolicyFor navigationAction: WKNavigationAction,
        decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
    ) {
        guard let url = navigationAction.request.url else {
            decisionHandler(.cancel)
            return
        }

        if url.isFileURL || url.scheme == "about" {
            decisionHandler(.allow)
            return
        }

        if let scheme = url.scheme?.lowercased(),
           ["mailto", "http", "https"].contains(scheme) {
            UIApplication.shared.open(url)
            decisionHandler(.cancel)
            return
        }

        decisionHandler(.allow)
    }

    private func exportBackup(_ body: Any) {
        guard
            let payload = body as? [String: Any],
            let filename = payload["filename"] as? String,
            let content = payload["content"] as? String,
            !filename.isEmpty,
            let data = content.data(using: .utf8)
        else {
            return
        }

        let safeFilename = filename.replacingOccurrences(of: "/", with: "-")
        let fileURL = FileManager.default.temporaryDirectory
            .appendingPathComponent(safeFilename)

        do {
            try data.write(to: fileURL, options: .atomic)
            let activity = UIActivityViewController(
                activityItems: [fileURL],
                applicationActivities: nil
            )
            if let popover = activity.popoverPresentationController {
                popover.sourceView = view
                popover.sourceRect = CGRect(
                    x: view.bounds.midX,
                    y: view.bounds.midY,
                    width: 1,
                    height: 1
                )
            }
            present(activity, animated: true)
        } catch {
            let alert = UIAlertController(
                title: "Rechoose",
                message: "Couldn’t export the backup.",
                preferredStyle: .alert
            )
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            present(alert, animated: true)
        }
    }

    private func playHaptic(_ style: String?) {
        switch style {
        case "success":
            UINotificationFeedbackGenerator().notificationOccurred(.success)
        case "warning":
            UINotificationFeedbackGenerator().notificationOccurred(.warning)
        default:
            UIImpactFeedbackGenerator(style: .light).impactOccurred()
        }
    }

    private func showLoadError() {
        let label = UILabel()
        label.text = "Rechoose couldn’t load."
        label.textAlignment = .center
        label.textColor = .secondaryLabel
        label.backgroundColor = webView.backgroundColor
        view = label
    }
}
