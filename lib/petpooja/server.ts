import { inArray, isNotNull } from 'drizzle-orm';
import { db } from '@/db';
import { foodItems } from '@/db/schema';

type PetpoojaLineItem = {
  id: string;
  variantId?: string;
  addonId?: string;
  name: string;
  quantity: number;
  price: number;
  taxInclusive?: boolean;
};

type GuestDetails = {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  roomNumber?: string | null;
};

type CreateSaveOrderPayloadInput = {
  orderId: string;
  items: PetpoojaLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  guest?: GuestDetails;
};

type PetpoojaConfig = {
  appKey: string;
  appSecret: string;
  accessToken: string;
  restId: string;
  callbackUrl: string;
  endpoint: string;
  orderType: 'H' | 'P' | 'D';
  paymentType: 'COD' | 'CARD' | 'ONLINE';
  enableDelivery: 0 | 1;
};

export type PetpoojaRelayResult =
  | { ok: true; status: number; response: unknown; payload: Record<string, unknown>; endpoint: string }
  | {
      ok: false;
      status: number;
      error: string;
      response?: unknown;
      payload: Record<string, unknown>;
      endpoint: string;
    };

const DEFAULT_ENDPOINT = 'https://pponlineordercb.petpooja.com/save_order';

function toDecimalString(value: number): string {
  return Number(value || 0).toFixed(2);
}

function parseJsonSafe(text: string): unknown {
  if (!text.trim()) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function readPetpoojaSuccessFlag(response: unknown): boolean | null {
  if (!response || typeof response !== 'object') return null;
  const maybe = (response as Record<string, unknown>).success;
  if (typeof maybe === 'boolean') return maybe;
  if (typeof maybe === 'number') return maybe === 1;
  if (typeof maybe === 'string') {
    const normalized = maybe.trim().toLowerCase();
    if (normalized === '1' || normalized === 'true') return true;
    if (normalized === '0' || normalized === 'false') return false;
  }
  return null;
}

function getPetpoojaConfig(): PetpoojaConfig {
  const appKey = process.env.PETPOOJA_APP_KEY?.trim() ?? '';
  const appSecret = process.env.PETPOOJA_APP_SECRET?.trim() ?? '';
  const accessToken = process.env.PETPOOJA_ACCESS_TOKEN?.trim() ?? '';
  const restId = process.env.PETPOOJA_REST_ID?.trim() ?? '';
  const callbackUrl = process.env.PETPOOJA_CALLBACK_URL?.trim() ?? '';
  const endpoint = process.env.PETPOOJA_SAVE_ORDER_URL?.trim() || DEFAULT_ENDPOINT;
  const orderType = (process.env.PETPOOJA_ORDER_TYPE?.trim() as 'H' | 'P' | 'D' | undefined) ?? 'D';
  const paymentType =
    (process.env.PETPOOJA_PAYMENT_TYPE?.trim() as 'COD' | 'CARD' | 'ONLINE' | undefined) ?? 'ONLINE';
  const enableDelivery = process.env.PETPOOJA_ENABLE_DELIVERY === '0' ? 0 : 1;

  if (!appKey || !appSecret || !accessToken || !restId || !callbackUrl) {
    throw new Error(
      'Missing Petpooja config. Required: PETPOOJA_APP_KEY, PETPOOJA_APP_SECRET, PETPOOJA_ACCESS_TOKEN, PETPOOJA_REST_ID, PETPOOJA_CALLBACK_URL.',
    );
  }
  return {
    appKey,
    appSecret,
    accessToken,
    restId,
    callbackUrl,
    endpoint,
    orderType,
    paymentType,
    enableDelivery,
  };
}

async function mapLineItemsToPetpoojaIds(items: PetpoojaLineItem[]) {
  const numericIds = Array.from(
    new Set(
      items
        .map((item) => item.id.trim())
        .filter((id) => /^\d+$/.test(id))
        .map((id) => Number(id)),
    ),
  );
  if (numericIds.length === 0) {
    return { mappedItems: items, missingMappings: [] as string[] };
  }

  const rows = await db
    .select({
      id: foodItems.id,
      petpoojaItemId: foodItems.petpoojaItemId,
      petpoojaVariantId: foodItems.petpoojaVariantId,
      petpoojaAddonId: foodItems.petpoojaAddonId,
      name: foodItems.name,
      taxInclusive: foodItems.taxInclusive,
    })
    .from(foodItems)
    .where(inArray(foodItems.id, numericIds));

  const rowsWithPetpoojaIds = await db
    .select({
      name: foodItems.name,
      petpoojaItemId: foodItems.petpoojaItemId,
      petpoojaVariantId: foodItems.petpoojaVariantId,
      petpoojaAddonId: foodItems.petpoojaAddonId,
      taxInclusive: foodItems.taxInclusive,
    })
    .from(foodItems)
    .where(isNotNull(foodItems.petpoojaItemId));

  const rowById = new Map(rows.map((row) => [String(row.id), row]));
  const rowByLowerName = new Map(
    rowsWithPetpoojaIds.map((row) => [
      row.name.trim().toLowerCase(),
      {
        petpoojaItemId: row.petpoojaItemId?.trim() ?? '',
        petpoojaVariantId: row.petpoojaVariantId?.trim() ?? '',
        petpoojaAddonId: row.petpoojaAddonId?.trim() ?? '',
        taxInclusive: row.taxInclusive ?? false,
      },
    ]),
  );

  const missingMappings: string[] = [];
  const mappedItems = items.map((item) => {
    const itemId = item.id.trim();
    const row = rowById.get(itemId);
    if (row) {
      const mappedId = (row.petpoojaItemId ?? '').trim();
      if (!mappedId) {
        missingMappings.push(`${row.name} (local id ${row.id})`);
        return item;
      }
      return {
        ...item,
        id: mappedId,
        variantId: row.petpoojaVariantId || item.variantId,
        addonId: row.petpoojaAddonId || item.addonId,
        taxInclusive: row.taxInclusive ?? false,
      };
    }

    const mappedByName = rowByLowerName.get(item.name.trim().toLowerCase());
    if (mappedByName?.petpoojaItemId) {
      return {
        ...item,
        id: mappedByName.petpoojaItemId,
        variantId: mappedByName.petpoojaVariantId || item.variantId,
        addonId: mappedByName.petpoojaAddonId || item.addonId,
        taxInclusive: mappedByName.taxInclusive,
      };
    }

    if (!/^\d+$/.test(itemId)) {
      missingMappings.push(`${item.name} (unmapped id ${itemId})`);
    }
    return item;
  });

  return { mappedItems, missingMappings };
}

function getNowParts() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return {
    date: `${yyyy}-${mm}-${dd}`,
    time: `${hh}:${mi}:${ss}`,
    createdOn: `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`,
  };
}

export function createPetpoojaSaveOrderPayload(input: CreateSaveOrderPayloadInput): Record<string, unknown> {
  const config = getPetpoojaConfig();
  const now = getNowParts();
  const restaurantName = (process.env.PETPOOJA_RESTAURANT_NAME ?? 'Ananta - By The Hill').trim();
  const desc = (process.env.PETPOOJA_ORDER_DESCRIPTION ?? 'In-room / table dining order').trim();
  const address = input.guest?.roomNumber
    ? `Address: Ananta Resort\nRoom/Table: ${input.guest.roomNumber}`
    : 'Address: Ananta Resort';
  const phone = (input.guest?.phone ?? '').replace(/\D/g, '').slice(-10);
  const customerName = input.guest?.name?.trim() || 'In-house Guest';

  const taxableSubtotal = input.items.reduce((acc, item) => {
    if (item.taxInclusive) return acc;
    return acc + Math.max(Number(item.price || 0) * Number(item.quantity || 0), 0);
  }, 0);
  const taxTotalForPayload = taxableSubtotal > 0 ? Math.max(Number(input.tax) || 0, 0) : 0;
  const halfTax = taxTotalForPayload / 2;

  const orderItems = input.items.map((item) => {
    const unitPrice = Number(item.price || 0);
    const lineAmount = Math.max(unitPrice * Number(item.quantity || 0), 0);
    const lineTax =
      item.taxInclusive || taxableSubtotal <= 0 ? 0 : (lineAmount / taxableSubtotal) * taxTotalForPayload;
    return {
      id: String(item.id),
      name: item.name,
      tax_inclusive: item.taxInclusive === true,
      item_discount: '0.00',
      price: toDecimalString(unitPrice),
      final_price: toDecimalString(unitPrice),
      quantity: String(item.quantity),
      gst_liability: 'restaurant',
      item_tax:
        item.taxInclusive || taxTotalForPayload <= 0
          ? []
          : [
              { id: process.env.PETPOOJA_CGST_ID ?? 'CGST', name: process.env.PETPOOJA_CGST_NAME ?? 'CGST', tax_percentage: '2.5', amount: toDecimalString(lineTax / 2) },
              { id: process.env.PETPOOJA_SGST_ID ?? 'SGST', name: process.env.PETPOOJA_SGST_NAME ?? 'SGST', tax_percentage: '2.5', amount: toDecimalString(lineTax / 2) },
            ],
      description: '',
      variation_name: '',
      variation_id: item.variantId || '',
      AddonItem: item.addonId
        ? { details: [{ id: item.addonId, name: '', price: '0.00', addon_tax: [] }] }
        : { details: [] },
    };
  });

  return {
    app_key: config.appKey,
    app_secret: config.appSecret,
    access_token: config.accessToken,
    orderinfo: {
      OrderInfo: {
        Restaurant: {
          details: {
            restID: config.restId,
            res_name: restaurantName,
            address,
            contact_information: phone,
          },
        },
        Customer: {
          details: {
            name: customerName,
            phone,
            email: input.guest?.email?.trim() ?? '',
            address,
          },
        },
        Order: {
          details: {
            orderID: input.orderId,
            preorder_date: now.date,
            preorder_time: now.time,
            service_charge: '0',
            sc_tax_amount: '0',
            delivery_charges: '0',
            dc_tax_percentage: '0',
            dc_tax_amount: '0',
            packing_charges: '0',
            pc_tax_amount: '0',
            pc_tax_percentage: '0',
            order_type: config.orderType,
            advanced_order: 'N',
            urgent_order: false,
            urgent_time: 0,
            payment_type: config.paymentType,
            table_no: '',
            no_of_persons: '0',
            discount_total: '0.00',
            tax_total: toDecimalString(taxTotalForPayload),
            discount_type: 'F',
            total: toDecimalString(input.total),
            description: desc,
            created_on: now.createdOn,
            enable_delivery: config.enableDelivery,
            callback_url: config.callbackUrl,
          },
        },
        OrderItem: { details: orderItems },
        Tax: {
          details:
            taxTotalForPayload > 0
              ? [
                  { id: process.env.PETPOOJA_CGST_ID ?? 'CGST', title: process.env.PETPOOJA_CGST_NAME ?? 'CGST', type: 'P', price: '2.5', tax: toDecimalString(halfTax), restaurant_liable_amt: toDecimalString(halfTax) },
                  { id: process.env.PETPOOJA_SGST_ID ?? 'SGST', title: process.env.PETPOOJA_SGST_NAME ?? 'SGST', type: 'P', price: '2.5', tax: toDecimalString(halfTax), restaurant_liable_amt: toDecimalString(halfTax) },
                ]
              : [],
        },
      },
      udid: '',
      device_type: 'Web',
    },
  };
}

export async function relayOrderToPetpooja(input: CreateSaveOrderPayloadInput): Promise<PetpoojaRelayResult> {
  const { mappedItems, missingMappings } = await mapLineItemsToPetpoojaIds(input.items);
  const endpoint = process.env.PETPOOJA_SAVE_ORDER_URL?.trim() || DEFAULT_ENDPOINT;
  if (missingMappings.length > 0) {
    return {
      ok: false,
      status: 422,
      error: `Missing Petpooja item mapping for: ${missingMappings.join(', ')}`,
      payload: {},
      endpoint,
    };
  }

  let payload: Record<string, unknown>;
  try {
    payload = createPetpoojaSaveOrderPayload({ ...input, items: mappedItems });
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Failed to prepare Petpooja payload',
      payload: {},
      endpoint,
    };
  }

  try {
    const callPetpooja = async (url: string) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const rawBody = await response.text();
      return {
        endpoint: url,
        status: response.status,
        ok: response.ok,
        rawBody,
        parsedBody: parseJsonSafe(rawBody),
      };
    };

    let firstAttempt = await callPetpooja(endpoint);
    if (firstAttempt.status === 403 && endpoint.includes('/v1/')) {
      firstAttempt = await callPetpooja(endpoint.replace('/v1/', '/V1/'));
    }

    const successFlag = readPetpoojaSuccessFlag(firstAttempt.parsedBody);
    if (!firstAttempt.ok || successFlag !== true) {
      const msg =
        firstAttempt.parsedBody && typeof firstAttempt.parsedBody === 'object'
          ? String((firstAttempt.parsedBody as Record<string, unknown>).message ?? 'Petpooja rejected save_order request')
          : 'Petpooja rejected save_order request';
      return {
        ok: false,
        status: firstAttempt.status,
        error: `${msg} | response=${firstAttempt.rawBody.slice(0, 500)}`,
        response: firstAttempt.parsedBody,
        payload,
        endpoint: firstAttempt.endpoint,
      };
    }

    return {
      ok: true,
      status: firstAttempt.status,
      response: firstAttempt.parsedBody,
      payload,
      endpoint: firstAttempt.endpoint,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Unable to connect to Petpooja',
      payload,
      endpoint,
    };
  }
}
