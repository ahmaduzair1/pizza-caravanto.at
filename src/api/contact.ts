import type { ContactPayload, ReservationPayload } from '../types'
import { delay } from './delay'

export interface DemoSubmitResult {
  ok: true
  demo: true
  message: 'Demo-Modus: Nachricht wird noch nicht gesendet'
}

/**
 * POST /api/contact — demo only. Logs payload; does not send.
 * Replace body with a real fetch when a backend is ready.
 */
export async function submitContact(
  payload: ContactPayload,
): Promise<DemoSubmitResult> {
  await delay()
  console.info('[demo] contact payload', payload)
  return {
    ok: true,
    demo: true,
    message: 'Demo-Modus: Nachricht wird noch nicht gesendet',
  }
}

/**
 * POST /api/reservations — demo only. Logs payload; does not send.
 */
export async function submitReservation(
  payload: ReservationPayload,
): Promise<DemoSubmitResult> {
  await delay()
  console.info('[demo] reservation payload', payload)
  return {
    ok: true,
    demo: true,
    message: 'Demo-Modus: Nachricht wird noch nicht gesendet',
  }
}
