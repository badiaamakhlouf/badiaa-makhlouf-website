/** Draft content (unverified placeholders) is visible while developing and never shipped. */
export const showDrafts = process.env.NODE_ENV !== "production";

export function visible<T extends { draft?: boolean }>(items: readonly T[]): T[] {
  return items.filter((item) => showDrafts || !item.draft);
}
