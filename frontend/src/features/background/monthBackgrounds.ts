/**
 * Month-to-background-image mapping for the planner application.
 * Maps month numbers (1-12) to static assets in /assets/generated/.
 * Provides helper functions to resolve the correct image URL with fallback.
 */

const FALLBACK_IMAGE = '/assets/image-1.png';

const MONTH_IMAGES: Record<number, string> = {
  1: '/assets/generated/month-01.dim_1920x1080.png',
  2: '/assets/generated/month-02.dim_1920x1080.png',
  3: '/assets/generated/month-03.dim_1920x1080.png',
  4: '/assets/generated/month-04.dim_1920x1080.png',
  5: '/assets/generated/month-05.dim_1920x1080.png',
  6: '/assets/generated/month-06.dim_1920x1080.png',
  7: '/assets/generated/month-07.dim_1920x1080.png',
  8: '/assets/generated/month-08.dim_1920x1080.png',
  9: '/assets/generated/month-09.dim_1920x1080.png',
  10: '/assets/generated/month-10.dim_1920x1080.png',
  11: '/assets/generated/month-11.dim_1920x1080.png',
  12: '/assets/generated/month-12.dim_1920x1080.png',
};

/**
 * Get the background image URL for a given month (1-12).
 * Returns the fallback image if the month is invalid.
 */
export function getMonthBackgroundUrl(month: number): string {
  return MONTH_IMAGES[month] || FALLBACK_IMAGE;
}

/**
 * Get the fallback background image URL.
 */
export function getFallbackBackgroundUrl(): string {
  return FALLBACK_IMAGE;
}

/**
 * Get the background image URL for a given Date object.
 */
export function getBackgroundUrlForDate(date: Date): string {
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  return getMonthBackgroundUrl(month);
}
