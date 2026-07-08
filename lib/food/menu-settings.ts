import 'server-only';

import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { foodMenuSettings } from '@/db/schema';

function normalizeCategories(categories: unknown): string[] {
  if (!Array.isArray(categories)) return [];
  return Array.from(
    new Set(
      categories
        .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
        .filter(Boolean),
    ),
  );
}

async function ensureSettingsRow() {
  const existing = await db.select().from(foodMenuSettings).limit(1);
  if (existing.length > 0) return existing[0];
  const [created] = await db.insert(foodMenuSettings).values({ id: 1 }).returning();
  return created;
}

export async function getHiddenFoodCategories(): Promise<string[]> {
  const row = await ensureSettingsRow();
  return normalizeCategories(row.hiddenCategories);
}

export async function setHiddenFoodCategories(categories: string[]): Promise<string[]> {
  const normalized = normalizeCategories(categories);
  const row = await ensureSettingsRow();
  const [updated] = await db
    .update(foodMenuSettings)
    .set({
      hiddenCategories: normalized,
      updatedAt: new Date(),
    })
    .where(eq(foodMenuSettings.id, row.id))
    .returning();
  return normalizeCategories(updated.hiddenCategories);
}

export function isCategoryHidden(category: string, hiddenCategories: string[]): boolean {
  const normalized = category.trim().toLowerCase();
  return hiddenCategories.some((entry) => entry.trim().toLowerCase() === normalized);
}
