type Params = Record<string, unknown>;

export type TrackEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "InitiateCheckout"
  | "Purchase"
  | "Contact";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Sends an event to GTM (dataLayer) and, when a pixel is loaded, Meta Pixel. */
export function track(event: TrackEvent, params: Params = {}, eventID?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params, ...(eventID ? { event_id: eventID } : {}) });
  window.fbq?.("track", event, params, eventID ? { eventID } : undefined);
}

const PIXEL_KEY = "mdm_fb_pixel";

/** Pixel ID from ?fb_pixel=, remembered for the session, else the env default. */
export function resolvePixelId(): string | null {
  const valid = (v: string | null | undefined) => (v && /^\d{6,20}$/.test(v) ? v : null);
  const fromUrl = valid(new URLSearchParams(window.location.search).get("fb_pixel"));
  try {
    if (fromUrl) sessionStorage.setItem(PIXEL_KEY, fromUrl);
    return fromUrl ?? valid(sessionStorage.getItem(PIXEL_KEY)) ?? valid(process.env.NEXT_PUBLIC_META_PIXEL_ID);
  } catch {
    return fromUrl ?? valid(process.env.NEXT_PUBLIC_META_PIXEL_ID);
  }
}

export function loadMetaPixel(pixelId: string) {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  fbq("init", pixelId);
}
