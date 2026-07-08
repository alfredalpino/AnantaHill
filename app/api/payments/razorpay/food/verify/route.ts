import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { userFoodOrders } from '@/db/schema';
import { relayOrderToPetpooja } from '@/lib/petpooja/server';
import { createRazorpayAuthHeader, getRazorpayCredentials, verifyRazorpaySignature } from '@/lib/razorpay/server';

type VerifyPayload = {
  orderId: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as VerifyPayload;
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const creds = getRazorpayCredentials();
    if (!creds.ok) {
      const error = 'error' in creds ? creds.error : 'Razorpay keys are not configured.';
      return NextResponse.json({ error }, { status: 500 });
    }
    const isValidSig = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      keySecret: creds.keySecret,
    });
    if (!isValidSig) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    const orders = await db.select().from(userFoodOrders).where(eq(userFoodOrders.id, orderId)).limit(1);
    if (orders.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    const order = orders[0];

    if (order.paymentStatus === 'SUCCESS' || order.paymentStatus === 'captured') {
      return NextResponse.json({
        success: true,
        order: { ...order, items: JSON.parse(order.items) },
        petpooja: {
          synced: order.posSyncStatus === 'synced',
          orderId: order.posOrderId,
          status: 200,
          error: order.errorMessage,
        },
      });
    }

    const paymentRes = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(razorpay_payment_id)}`,
      {
        method: 'GET',
        headers: {
          Authorization: createRazorpayAuthHeader(creds.keyId, creds.keySecret),
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    );

    const paymentData = await paymentRes.json();
    if (!paymentRes.ok) {
      return NextResponse.json(
        { error: paymentData?.error?.description || 'Failed to verify payment status.' },
        { status: 500 },
      );
    }
    if (paymentData.order_id !== razorpay_order_id) {
      return NextResponse.json({ error: 'Order mismatch for this payment.' }, { status: 400 });
    }
    if (paymentData.amount !== Math.round(Number(order.total) * 100)) {
      return NextResponse.json({ error: 'Payment amount mismatch.' }, { status: 400 });
    }
    const paymentStatus = String(paymentData.status ?? '').trim().toLowerCase();
    if (!['captured', 'authorized'].includes(paymentStatus)) {
      return NextResponse.json({ error: `Payment is ${paymentData.status}` }, { status: 400 });
    }

    const prefix = (process.env.PETPOOJA_ORDER_ID_PREFIX ?? 'AN-FOOD').trim();
    const externalOrderId = `${prefix}-${order.id}`;
    const relay = await relayOrderToPetpooja({
      orderId: externalOrderId,
      items: JSON.parse(order.items),
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      total: Number(order.total),
      guest: {
        name: order.guestName,
        phone: order.guestPhone,
        email: order.guestEmail,
        roomNumber: order.roomNumber,
      },
    });
    const relayError = 'error' in relay ? relay.error : null;

    const [updated] = await db
      .update(userFoodOrders)
      .set({
        paymentStatus: paymentStatus === 'captured' ? 'SUCCESS' : 'AUTHORIZED',
        paymentOrderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        paymentSignature: razorpay_signature,
        posOrderId: externalOrderId,
        posSyncStatus: relay.ok ? 'synced' : 'failed',
        posSyncMessage: relay.ok
          ? `Petpooja accepted order (HTTP ${relay.status})`
          : `Petpooja sync failed (HTTP ${relay.status}): ${relayError}`,
        errorMessage: relayError,
        status: relay.ok ? 'Pending' : 'Failed',
      })
      .where(eq(userFoodOrders.id, order.id))
      .returning();

    return NextResponse.json({
      success: true,
      order: { ...updated, items: JSON.parse(updated.items) },
      petpooja: {
        synced: relay.ok,
        orderId: externalOrderId,
        status: relay.status,
        error: relayError,
      },
    });
  } catch (error) {
    console.error('Error verifying food Razorpay payment:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
