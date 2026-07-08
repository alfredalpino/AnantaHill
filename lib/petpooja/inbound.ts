type UnknownRecord = Record<string, unknown>;

export type InboundPetpoojaMenuItem = {
  externalId: string;
  variantId?: string;
  addonId?: string;
  name: string;
  description: string;
  price: number | null;
  category: string;
  isVeg: boolean;
  isAvailable: boolean;
  taxInclusive: boolean;
};

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as UnknownRecord;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function parseBoolLike(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase();
    if (['1', 'true', 'yes', 'y', 'on', 'available', 'in_stock'].includes(v)) return true;
    if (['0', 'false', 'no', 'n', 'off', 'unavailable', 'out_of_stock'].includes(v)) return false;
  }
  return fallback;
}

function parseNumber(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;
  const n = Number(value.trim());
  return Number.isFinite(n) ? n : null;
}

function extractItemId(value: UnknownRecord): string {
  const candidates = [
    value.id,
    value.itemid,
    value.item_id,
    value.itemId,
    value.code,
    value.variation_id,
    value.variationid,
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim();
    if (typeof c === 'number' && Number.isFinite(c)) return String(c);
  }
  return '';
}

function extractItemName(value: UnknownRecord): string {
  const candidates = [value.name, value.itemname, value.item_name, value.title];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim();
  }
  return '';
}

function extractItemDescription(value: UnknownRecord): string {
  const candidates = [value.description, value.item_description, value.itemdescription, value.short_desc];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim();
  }
  return '';
}

function extractCategory(value: UnknownRecord): string {
  const candidates = [value.category_name, value.category, value.group_name];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim();
  }
  return 'Uncategorized';
}

function buildCategoryNameById(payload: unknown) {
  const out = new Map<string, string>();
  const root = asRecord(payload);
  if (!root) return out;
  const categories = asArray(root.categories);
  for (const entry of categories) {
    const rec = asRecord(entry);
    if (!rec) continue;
    const id = extractItemId(rec);
    const name = String(rec.categoryname ?? rec.category_name ?? '').trim();
    if (id && name) out.set(id, name);
  }
  return out;
}

function extractCategoryFromItem(item: UnknownRecord, categoryNameById: Map<string, string>): string {
  const direct = extractCategory(item);
  if (direct !== 'Uncategorized') return direct;
  const categoryId = String(item.item_categoryid ?? item.categoryid ?? '').trim();
  if (!categoryId) return 'Uncategorized';
  return categoryNameById.get(categoryId) ?? categoryId;
}

function extractVariantId(item: UnknownRecord): string | undefined {
  const variations = asArray(item.variation);
  for (const entry of variations) {
    const rec = asRecord(entry);
    if (!rec) continue;
    const active = parseBoolLike(rec.active, true);
    const variationId = String(rec.variationid ?? rec.variation_id ?? '').trim();
    if (active && variationId) return variationId;
  }
  return undefined;
}

function buildAddonItemIdsByGroup(payload: unknown) {
  const out = new Map<string, string[]>();
  const root = asRecord(payload);
  if (!root) return out;
  const groups = asArray(root.addongroups);
  for (const entry of groups) {
    const rec = asRecord(entry);
    if (!rec) continue;
    const groupId = String(rec.addongroupid ?? rec.addon_group_id ?? '').trim();
    if (!groupId) continue;
    const items = asArray(rec.addongroupitems);
    const addonIds: string[] = [];
    for (const addonEntry of items) {
      const addon = asRecord(addonEntry);
      if (!addon) continue;
      const active = parseBoolLike(addon.active, true);
      const addonItemId = String(addon.addonitemid ?? addon.addon_item_id ?? '').trim();
      if (active && addonItemId) addonIds.push(addonItemId);
    }
    if (addonIds.length > 0) out.set(groupId, addonIds);
  }
  return out;
}

function extractAddonId(item: UnknownRecord, addonItemIdsByGroup: Map<string, string[]>): string | undefined {
  const addons = asArray(item.addon);
  for (const entry of addons) {
    const rec = asRecord(entry);
    if (!rec) continue;
    const groupId = String(rec.addon_group_id ?? rec.addongroupid ?? '').trim();
    if (!groupId) continue;
    const addonIds = addonItemIdsByGroup.get(groupId);
    if (addonIds && addonIds.length > 0) return addonIds[0];
  }
  return undefined;
}

function extractPrice(value: UnknownRecord): number | null {
  const candidates = [value.price, value.rate, value.final_price, value.selling_price];
  for (const c of candidates) {
    const n = parseNumber(c);
    if (n !== null) return n;
  }
  return null;
}

function extractTaxInclusive(value: UnknownRecord): boolean {
  return parseBoolLike(
    value.tax_inclusive ?? value.is_tax_inclusive ?? value.taxinclusive ?? value.taxInclusive,
    false,
  );
}

function gatherItemNodes(payload: unknown): UnknownRecord[] {
  const queue: unknown[] = [payload];
  const out: UnknownRecord[] = [];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    if (Array.isArray(current)) {
      queue.push(...current);
      continue;
    }
    const rec = asRecord(current);
    if (!rec) continue;
    const id = extractItemId(rec);
    const name = extractItemName(rec);
    if (id && name) out.push(rec);
    for (const v of Object.values(rec)) {
      if (Array.isArray(v) || (v && typeof v === 'object')) queue.push(v);
    }
  }
  return out;
}

export function parsePushmenuItems(payload: unknown): InboundPetpoojaMenuItem[] {
  const root = asRecord(payload);
  const itemArray = asArray(root?.items);
  const categoryNameById = buildCategoryNameById(payload);
  const addonItemIdsByGroup = buildAddonItemIdsByGroup(payload);
  const nodes =
    itemArray.length > 0
      ? itemArray.map((entry) => asRecord(entry)).filter((x): x is UnknownRecord => Boolean(x))
      : gatherItemNodes(payload);
  const dedup = new Map<string, InboundPetpoojaMenuItem>();
  for (const node of nodes) {
    const externalId = extractItemId(node);
    const name = extractItemName(node);
    if (!externalId || !name) continue;
    const isAvailableFromStock = parseBoolLike(node.in_stock, true);
    const isAvailableFromActive = parseBoolLike(node.active, true);
    const itemAttribute = String(node.item_attributeid ?? '').trim();
    const isVeg = itemAttribute ? itemAttribute === '1' : parseBoolLike(node.is_veg ?? node.veg, true);
    dedup.set(externalId, {
      externalId,
      variantId: extractVariantId(node),
      addonId: extractAddonId(node, addonItemIdsByGroup),
      name,
      description: extractItemDescription(node),
      price: extractPrice(node),
      category: extractCategoryFromItem(node, categoryNameById),
      isVeg,
      isAvailable: isAvailableFromStock && isAvailableFromActive,
      taxInclusive: extractTaxInclusive(node),
    });
  }
  return Array.from(dedup.values());
}

export function parseItemIds(payload: unknown): string[] {
  const root = asRecord(payload) ?? {};
  const direct = [root.item_id, root.itemId, root.itemID, root.id];
  const fromList = asArray(root.item_ids ?? root.itemIds ?? root.itemID ?? root.ids);
  const ids: string[] = [];

  for (const v of [...direct, ...fromList]) {
    if (typeof v === 'string' && v.trim()) ids.push(v.trim());
    if (typeof v === 'number' && Number.isFinite(v)) ids.push(String(v));
  }

  if (ids.length > 0) return Array.from(new Set(ids));
  const nodes = gatherItemNodes(payload);
  for (const node of nodes) {
    const id = extractItemId(node);
    if (id) ids.push(id);
  }
  return Array.from(new Set(ids));
}

export function parseStoreOpen(payload: unknown): boolean | null {
  const root = asRecord(payload);
  if (!root) return null;
  const candidate =
    root.store_open ?? root.is_open ?? root.open ?? root.store_status ?? root.status;
  if (candidate === undefined) return null;
  return parseBoolLike(candidate, true);
}
