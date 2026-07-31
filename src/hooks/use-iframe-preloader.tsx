/**
 * Compatibility helpers for pages that previously embedded quarter-specific iframes.
 *
 * Calendar and office-hour links are intentionally not stored in the public website.
 * Enrolled students should use Canvas for live quarter-specific details.
 */

export const CALENDAR_URL = '';
export const OFFICE_HOURS_URL = '';

export const subscribeToIframeLoad = (_callback: () => void) => {
  return () => {};
};

export const isIframeLoaded = (_url: string): boolean => false;

export const useIframePreloader = () => {
  return { preloaded: false, calendarIframe: null, officeHoursIframe: null };
};

export const preloadIframe = async (_url: string): Promise<void> => {};
