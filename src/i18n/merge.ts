import type { DeepPartial } from "./types";

/**
 * Deep-merges a text overlay onto base data. Objects merge key by key, arrays merge by index
 * (so an overlay array must keep the base order), primitives are replaced when the overlay has
 * a value. Keys missing from the overlay keep the base value, which is how images, colours and
 * untranslated strings fall back to English.
 */
export function mergeTranslation<T>(base: T, overlay: DeepPartial<T> | undefined): T {
  if (overlay === undefined || overlay === null) return base;
  if (base === null || base === undefined || typeof base !== "object") {
    return overlay as unknown as T;
  }
  if (Array.isArray(base)) {
    const items = overlay as unknown as unknown[];
    if (import.meta.env.DEV && items.length !== base.length) {
      console.warn(
        `mergeTranslation: overlay array has ${items.length} items, base has ${base.length}; extra items are ignored and captions may shift.`,
      );
    }
    return base.map((item, index) =>
      mergeTranslation(item, items[index] as DeepPartial<typeof item>),
    ) as unknown as T;
  }
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(overlay as Record<string, unknown>)) {
    if (value === undefined) continue;
    result[key] =
      key in result
        ? mergeTranslation(result[key], value as DeepPartial<unknown>)
        : (value as unknown);
  }
  return result as T;
}
