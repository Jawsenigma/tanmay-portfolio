// Tiny event bus letting any client component drive the animated favicon
// without prop-drilling or a global store.

export type FaviconState = "idle" | "thinking" | "active";
export type FaviconSource = "chat" | "avatar";

export const FAVICON_EVENT = "tsxportfolio:favicon-state";

export type FaviconEventDetail = {
  source: FaviconSource;
  state: FaviconState;
};

export function setFaviconState(source: FaviconSource, state: FaviconState) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<FaviconEventDetail>(FAVICON_EVENT, {
      detail: { source, state },
    }),
  );
}
