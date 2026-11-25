export type AnalyticsEvent =
  | "brochure_open"
  | "brochure_start"
  | "slide_view"
  | "slide_next"
  | "slide_previous"
  | "product_select"
  | "simulation_interact"
  | "video_play"
  | "quiz_answer"
  | "brochure_complete"
  | "contact_click"
  | "brochure_share";

type Payload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Pengiriman event non-blocking ke dataLayer (jika ada). Tanpa data pribadi (PRD §13.2).
 * Hubungkan ke penyedia analytics yang disetujui kebijakan privasi perusahaan.
 */
export function track(event: AnalyticsEvent, payload: Payload = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...payload });
  } catch {
    /* analytics tidak boleh mengganggu interaksi */
  }
}
