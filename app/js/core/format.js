/* Shared display formatting derived from locale and time. */
"use strict";

function fmtDate(ts) {
  const date = new Date(ts);
  if (getLang() === "zh") {
    const now = new Date();
    const sameYear = date.getFullYear() === now.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${sameYear ? "" : date.getFullYear() + "年"}${month}月${day}日 ${hours}:${minutes}`;
  }
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function fmtDelay(minutes) {
  if (minutes == null) return "";
  if (minutes < 1) return t("delay.underOne");
  if (minutes < 60) return t("delay.minutes", { n: Math.round(minutes) });
  return t("delay.hoursMinutes", {
    h: Math.floor(minutes / 60),
    m: Math.round(minutes % 60)
  });
}

function dayKey(ts) {
  const date = new Date(ts);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 5) return t("greet.lateNight");
  if (hour < 11) return t("greet.morning");
  if (hour < 14) return t("greet.noon");
  if (hour < 18) return t("greet.afternoon");
  return t("greet.evening");
}
