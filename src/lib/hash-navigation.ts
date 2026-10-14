// Global hash navigation coordinator for Next.js App Router client-side transitions

let pendingHash: string | null = null;
let pendingHashTimestamp = 0;

export function getPendingHash(): string | null {
  if (typeof window === "undefined") return null;

  // 1. Direct window hash if present
  if (window.location.hash) {
    return window.location.hash.slice(1).toLowerCase().trim();
  }

  // 2. Pending hash captured from click or pushState within the last 3.5 seconds
  if (pendingHash && Date.now() - pendingHashTimestamp < 3500) {
    return pendingHash.toLowerCase().trim();
  }

  return null;
}

export function setPendingHash(rawHash: string) {
  if (!rawHash) return;
  const hash = rawHash.startsWith("#") ? rawHash.slice(1) : rawHash;
  pendingHash = hash;
  pendingHashTimestamp = Date.now();

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("app-hashchange", { detail: { hash } })
    );
  }
}

export function clearPendingHash() {
  pendingHash = null;
  pendingHashTimestamp = 0;
}

// ── Global Event Monkey-Patching for SPA Transitions ──
if (typeof window !== "undefined") {
  // Capture link clicks before Next.js router begins DOM swap
  document.addEventListener(
    "click",
    (e) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.includes("#")) {
        const hash = href.slice(href.indexOf("#") + 1);
        if (hash) {
          setPendingHash(hash);
        }
      }
    },
    true
  );

  // Hook history.pushState and replaceState to catch client-side router transitions
  const originalPushState = window.history.pushState;
  window.history.pushState = function (...args) {
    const ret = originalPushState.apply(this, args);
    const url = args[2];
    if (typeof url === "string" && url.includes("#")) {
      const hash = url.slice(url.indexOf("#") + 1);
      setPendingHash(hash);
    }
    window.dispatchEvent(new Event("app-locationchange"));
    return ret;
  };

  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function (...args) {
    const ret = originalReplaceState.apply(this, args);
    const url = args[2];
    if (typeof url === "string" && url.includes("#")) {
      const hash = url.slice(url.indexOf("#") + 1);
      setPendingHash(hash);
    }
    window.dispatchEvent(new Event("app-locationchange"));
    return ret;
  };

  window.addEventListener("hashchange", () => {
    if (window.location.hash) {
      setPendingHash(window.location.hash.slice(1));
    }
  });
}
