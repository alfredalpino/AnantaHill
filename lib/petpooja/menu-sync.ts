import { eq, inArray, sql } from 'drizzle-orm';
import { db } from '@/db';
import { foodItems } from '@/db/schema';
import { getHiddenFoodCategories, isCategoryHidden } from '@/lib/food/menu-settings';
import { parsePushmenuItems } from '@/lib/petpooja/inbound';

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function syncPetpoojaMenuPayload(payload: unknown) {
  const parsedItems = parsePushmenuItems(payload);
  if (parsedItems.length === 0) {
    return { receivedItems: 0, mappedItems: 0, createdItems: 0 };
  }

  const hiddenCategories = await getHiddenFoodCategories();

  const externalIds = Array.from(new Set(parsedItems.map((item) => item.externalId).filter(Boolean)));
  const loweredNames = Array.from(
    new Set(parsedItems.map((item) => item.name.trim().toLowerCase()).filter(Boolean)),
  );

  const byExternal = new Map<string, { id: number; adminSuppressed: boolean }>();
  if (externalIds.length > 0) {
    const rows = await db
      .select({
        id: foodItems.id,
        petpoojaItemId: foodItems.petpoojaItemId,
        adminSuppressed: foodItems.adminSuppressed,
      })
      .from(foodItems)
      .where(inArray(foodItems.petpoojaItemId, externalIds));
    for (const row of rows) {
      if (row.petpoojaItemId) {
        byExternal.set(row.petpoojaItemId, { id: row.id, adminSuppressed: row.adminSuppressed });
      }
    }
  }

  const suppressedExternalIds = new Set(
    Array.from(byExternal.entries())
      .filter(([, row]) => row.adminSuppressed)
      .map(([externalId]) => externalId),
  );

  const byLowerName = new Map<string, { id: number; adminSuppressed: boolean }>();
  if (loweredNames.length > 0) {
    const rows = await db
      .select({
        id: foodItems.id,
        name: foodItems.name,
        adminSuppressed: foodItems.adminSuppressed,
      })
      .from(foodItems)
      .where(inArray(sql<string>`lower(${foodItems.name})`, loweredNames));
    for (const row of rows) {
      byLowerName.set(row.name.trim().toLowerCase(), {
        id: row.id,
        adminSuppressed: row.adminSuppressed,
      });
    }
  }

  const existingRows =
    byExternal.size > 0 || byLowerName.size > 0
      ? await db
          .select({
            id: foodItems.id,
            adminAvailabilityOverride: foodItems.adminAvailabilityOverride,
            adminSuppressed: foodItems.adminSuppressed,
          })
          .from(foodItems)
          .where(
            inArray(
              foodItems.id,
              Array.from(
                new Set([
                  ...Array.from(byExternal.values()).map((row) => row.id),
                  ...Array.from(byLowerName.values()).map((row) => row.id),
                ]),
              ),
            ),
          )
      : [];
  const rowMetaById = new Map(existingRows.map((row) => [row.id, row]));

  let mappedCount = 0;
  let createdCount = 0;
  const updates: Array<{
    id: number;
    payload: Partial<{
      petpoojaItemId: string;
      petpoojaVariantId: string;
      petpoojaAddonId: string;
      name: string;
      description: string;
      category: string;
      isVeg: boolean;
      isAvailable: boolean;
      taxInclusive: boolean;
      updatedAt: Date;
    }>;
  }> = [];
  const inserts: Array<{
    petpoojaItemId: string;
    petpoojaVariantId: string | null;
    petpoojaAddonId: string | null;
    name: string;
    description: string;
    category: string;
    price: string;
    isVeg: boolean;
    isAvailable: boolean;
    isHidden: boolean;
    taxInclusive: boolean;
    image: null;
  }> = [];

  for (const item of parsedItems) {
    if (suppressedExternalIds.has(item.externalId)) continue;
    const description = item.description?.trim() ?? '';

    const buildAvailabilityFields = (rowId: number) => {
      const meta = rowMetaById.get(rowId);
      if (meta?.adminSuppressed) return null;
      if (meta?.adminAvailabilityOverride) return {};
      return { isAvailable: item.isAvailable };
    };

    const matchByExternal = byExternal.get(item.externalId);
    if (matchByExternal?.id) {
      if (matchByExternal.adminSuppressed) continue;
      const availabilityFields = buildAvailabilityFields(matchByExternal.id);
      if (availabilityFields === null) continue;
      updates.push({
        id: matchByExternal.id,
        payload: {
          name: item.name,
          description,
          category: item.category,
          petpoojaVariantId: item.variantId ?? '',
          petpoojaAddonId: item.addonId ?? '',
          isVeg: item.isVeg,
          ...availabilityFields,
          taxInclusive: item.taxInclusive,
          updatedAt: new Date(),
        },
      });
      mappedCount += 1;
      continue;
    }

    const matchByName = byLowerName.get(item.name.trim().toLowerCase());
    if (matchByName?.id) {
      if (matchByName.adminSuppressed) continue;
      const availabilityFields = buildAvailabilityFields(matchByName.id);
      if (availabilityFields === null) continue;
      updates.push({
        id: matchByName.id,
        payload: {
          petpoojaItemId: item.externalId,
          petpoojaVariantId: item.variantId ?? '',
          petpoojaAddonId: item.addonId ?? '',
          description,
          category: item.category,
          isVeg: item.isVeg,
          ...availabilityFields,
          taxInclusive: item.taxInclusive,
          updatedAt: new Date(),
        },
      });
      mappedCount += 1;
      continue;
    }

    inserts.push({
      petpoojaItemId: item.externalId,
      petpoojaVariantId: item.variantId ?? null,
      petpoojaAddonId: item.addonId ?? null,
      name: item.name,
      description,
      category: item.category,
      price: String((item.price ?? 0).toFixed(2)),
      isVeg: item.isVeg,
      isAvailable: item.isAvailable,
      isHidden: isCategoryHidden(item.category, hiddenCategories),
      taxInclusive: item.taxInclusive,
      image: null,
    });
    createdCount += 1;
  }

  for (const updateChunk of chunk(updates, 40)) {
    await Promise.all(updateChunk.map((u) => db.update(foodItems).set(u.payload).where(eq(foodItems.id, u.id))));
  }

  for (const insertChunk of chunk(inserts, 200)) {
    await db.insert(foodItems).values(insertChunk);
  }

  return {
    receivedItems: parsedItems.length,
    mappedItems: mappedCount,
    createdItems: createdCount,
  };
}
