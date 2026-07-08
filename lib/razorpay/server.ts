import crypto from 'crypto';

type RazorpayCredentials =
  | { ok: true; keyId: string; keySecret: string }
  | { ok: false; error: string };

function readEnv(...keys: string[]) {
  for (const key of keys) {
    const value = (process.env[key] ?? '').trim();
    if (value) return value;
  }
  return '';
}

export function getRazorpayCredentials(): RazorpayCredentials {
  const keyId = readEnv('RAZORPAY_KEY_ID', 'NEXT_PUBLIC_RAZORPAY_KEY_ID');
  const keySecret = readEnv('RAZORPAY_KEY_SECRET');
  if (!keyId || !keySecret) {
    return { ok: false, error: 'Razorpay keys are not configured.' };
  }
  return { ok: true, keyId, keySecret };
}

export function createRazorpayAuthHeader(keyId: string, keySecret: string): string {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`;
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
  keySecret,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
  keySecret: string;
}) {
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  return expected === signature;
}
