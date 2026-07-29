// Reads ?from= off the URL so we know who sent someone to this page,
// without asking them to type their own name in.
export function getReferredByFromUrl(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("from")?.trim() ?? "";
}
