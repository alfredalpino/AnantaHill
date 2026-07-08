export type FoodLineItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function computeFoodTotals(items: FoodLineItem[]) {
  const subtotal = round2(
    items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
  );
  const gstPercent = Number(process.env.FOOD_GST_PERCENT ?? 5);
  const tax = round2((subtotal * (Number.isFinite(gstPercent) ? gstPercent : 5)) / 100);
  const total = round2(subtotal + tax);
  return {
    subtotal,
    tax,
    total,
    totalSubunits: Math.round(total * 100),
  };
}
