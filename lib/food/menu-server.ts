import 'server-only';

import { db } from '@/db';
import { foodItems } from '@/db/schema';
import type { MenuItem } from '@/types';
import { mapApiFoodItemsToMenu, type ApiFoodItem } from '@/lib/food/menu';
import { syncPetpoojaMenuOnLoad } from '@/lib/food/sync-on-load';
import { getHiddenFoodCategories } from '@/lib/food/menu-settings';

export async function fetchRawFoodItemsFromDb(): Promise<ApiFoodItem[]> {
  const allFood = await db.select().from(foodItems).orderBy(foodItems.id);
  return allFood as ApiFoodItem[];
}

export async function getFoodMenuForDisplay(): Promise<MenuItem[]> {
  await syncPetpoojaMenuOnLoad('dining page');
  const raw = await fetchRawFoodItemsFromDb();
  const hiddenCategories = await getHiddenFoodCategories();
  return mapApiFoodItemsToMenu(raw, hiddenCategories);
}
