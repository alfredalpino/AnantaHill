import 'server-only';

import { inArray } from 'drizzle-orm';
import { db } from '@/db';
import { foodItems } from '@/db/schema';
import type { FoodLineItem } from '@/lib/payments/foodPricing';
import { getHiddenFoodCategories, isCategoryHidden } from '@/lib/food/menu-settings';

export async function validateOrderableFoodItems(items: FoodLineItem[]): Promise<string | null> {
  const ids = items
    .map((item) => Number.parseInt(String(item.id), 10))
    .filter((id) => Number.isFinite(id));

  if (ids.length !== items.length) {
    return 'Invalid menu item in order';
  }

  const rows = await db
    .select({
      id: foodItems.id,
      name: foodItems.name,
      price: foodItems.price,
      isAvailable: foodItems.isAvailable,
      isHidden: foodItems.isHidden,
      adminSuppressed: foodItems.adminSuppressed,
      category: foodItems.category,
    })
    .from(foodItems)
    .where(inArray(foodItems.id, ids));

  const byId = new Map(rows.map((row) => [row.id, row]));
  const hiddenCategories = await getHiddenFoodCategories();

  for (const item of items) {
    const id = Number.parseInt(String(item.id), 10);
    const row = byId.get(id);
    if (!row || row.adminSuppressed || row.isHidden) {
      return `${item.name} is no longer available`;
    }
    if (row.isAvailable === false) {
      return `${row.name} is out of stock`;
    }
    if (isCategoryHidden(row.category, hiddenCategories)) {
      return `${row.name} is unavailable (category hidden)`;
    }
    const dbPrice = Number(row.price);
    if (!Number.isFinite(dbPrice) || dbPrice <= 0) {
      return `${row.name} is unavailable`;
    }
    if (Math.abs(dbPrice - Number(item.price)) > 0.01) {
      return `Price changed for ${row.name}. Refresh the menu and try again.`;
    }
  }

  return null;
}
