export type CallbackAuthResult =
  | { ok: true }
  | { ok: false; error: string; reason: 'missing' | 'invalid' };

export function verifyPetpoojaCallbackAuth(req: Request): CallbackAuthResult {
  const secret = (process.env.PETPOOJA_WEBHOOK_SECRET ?? '').trim();
  if (!secret) return { ok: true };

  const authHeader = req.headers.get('authorization') ?? '';
  const customHeader = req.headers.get('x-petpooja-secret') ?? '';
  if (!authHeader && !customHeader) {
    return { ok: false, error: 'Missing callback authentication header', reason: 'missing' };
  }

  if (authHeader === `Bearer ${secret}` || customHeader === secret) {
    return { ok: true };
  }
  return { ok: false, error: 'Invalid callback authentication header', reason: 'invalid' };
}

export function extractPetpoojaOrderReference(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return null;
  const body = payload as Record<string, unknown>;
  const order = body.order && typeof body.order === 'object' ? (body.order as Record<string, unknown>) : null;
  const candidates = [body.orderID, body.order_id, body.orderId, body.reference_order_id, order?.orderID, order?.order_id, order?.orderId];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim();
  }
  return null;
}

export function parseLocalFoodOrderIdFromReference(reference: string): number | null {
  const prefix = (process.env.PETPOOJA_ORDER_ID_PREFIX ?? 'AN-FOOD').trim();
  const match = reference.match(new RegExp(`^${prefix}-(\\d+)$`, 'i'));
  if (!match?.[1]) return null;
  const id = Number(match[1]);
  return Number.isFinite(id) ? id : null;
}

export function mapPetpoojaStatusToLocal(statusRaw: unknown): string {
  const status = String(statusRaw ?? '').trim().toLowerCase();
  if (!status) return 'Pending';

  if (['accepted', 'accept', 'confirmed', 'confirm', 'preparing', 'in_progress', 'ready'].includes(status)) {
    return 'Preparing';
  }
  if (['delivered', 'completed', 'done', 'served'].includes(status)) {
    return 'Delivered';
  }
  if (['rejected', 'rejected_by_restaurant', 'cancelled', 'canceled', 'failed'].includes(status)) {
    return 'Cancelled';
  }
  return 'Pending';
}
