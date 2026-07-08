import type { MenuItem } from '@/types';

export type ApiFoodItem = {
  id: number;
  name: string;
  description?: string | null;
  price: string | number;
  category: string;
  isVeg?: boolean | null;
  isAvailable?: boolean | null;
  isHidden?: boolean | null;
  image?: string | null;
  petpoojaItemId?: string | null;
  taxInclusive?: boolean | null;
};

const DEFAULT_FOOD_IMAGE =
  'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400';

function isCategoryHidden(category: string, hiddenCategories: string[]): boolean {
  const normalized = category.trim().toLowerCase();
  return hiddenCategories.some((entry) => entry.trim().toLowerCase() === normalized);
}

export function mapApiFoodItemsToMenu(data: ApiFoodItem[], hiddenCategories: string[] = []): MenuItem[] {
  return data
    .filter((f) => !f.isHidden)
    .filter((f) => !isCategoryHidden(f.category, hiddenCategories))
    .filter((f) => Number(f.price) > 0)
    .map((f) => ({
      id: String(f.id),
      name: f.name,
      description: f.description?.trim() || '',
      price: Number(f.price),
      category: f.category,
      isVeg: f.isVeg ?? true,
      isAvailable: f.isAvailable !== false,
      image: f.image || DEFAULT_FOOD_IMAGE,
      petpoojaItemId: f.petpoojaItemId ?? undefined,
      taxInclusive: f.taxInclusive ?? undefined,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
