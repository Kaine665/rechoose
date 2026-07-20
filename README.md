# Rechoose

> When an urge arises, help yourself reclaim a moment of choice.

Monorepo: marketing site and product app live side by side, each self-contained.

```
/
├── landing/     # English marketing / waitlist (showcase)
├── app/         # Interactive product (zh / en)
├── scripts/     # Dev helpers
└── vercel.json  # Optional: single-project monorepo deploy
```

## Packages

| Path | Role | Default language |
|------|------|------------------|
| `landing/` | Showcase + waitlist | English only |
| `app/` | Help / Plans / Growth | zh & en (`t()`) |

## Run locally

```bash
python -m http.server 8080
```

- Landing: http://localhost:8080/landing/
- App: http://localhost:8080/app/

## Deploy on Vercel

### Option A — one project (monorepo root)

Import the repo, Root Directory = `.` (repo root).

- `/` redirects to `/landing/`
- App at `/app/`

### Option B — two projects (recommended for separate domains)

Import the **same** GitHub repo twice:

| Vercel project | Root Directory | Domain example |
|----------------|----------------|----------------|
| `rechoose-web` | `landing` | `rechoose.com` |
| `rechoose-app` | `app` | `app.rechoose.com` |

If landing and app use different domains, set the app URL before `main.js`:

```html
<script>window.RECHOOSE_APP_URL = "https://app.rechoose.com";</script>
<script src="main.js"></script>
```

## App notes

- Data stays in `localStorage` (export / import backups)
- PWA + Service Worker scoped under `/app/`
- i18n: `app/js/i18n.js` — English-first; only primary `zh*` becomes Chinese; iOS defaults to `en`

```bash
node scripts/check-i18n.js
```

## Structure detail

```
landing/
  index.html
  style.css
  main.js
  vercel.json          # empty placeholder for Root=landing deploys

app/
  index.html
  css/style.css
  js/i18n.js
  js/app.js
  sw.js
  manifest.json
  vercel.json          # SW / manifest headers when Root=app
```
