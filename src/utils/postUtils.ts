/**
 * Utility helpers for working with posts.
 * Kept separate from the components so they can be reused (and unit
 * tested) independently of how any single post is rendered.
 */

/**
 * Returns the first `wordCount` words of a post's content, followed by an
 * ellipsis if the content was actually longer.
 */
export function getPreview(content: string, wordCount = 12): string {
  const words = content.trim().split(/\s+/);
  if (words.length <= wordCount) return content;
  return words.slice(0, wordCount).join(" ") + "…";
}

/**
 * True if the given ISO date string falls within the last 24 hours.
 * Used to decide whether a post gets the "New!" badge.
 */
export function isWithinLast24Hours(dateString: string): boolean {
  const posted = new Date(dateString).getTime();
  const diffMs = Date.now() - posted;
  return diffMs >= 0 && diffMs <= 24 * 60 * 60 * 1000;
}

/**
 * Formats an ISO date string into a short, human-readable date.
 */
export function formatPostDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}