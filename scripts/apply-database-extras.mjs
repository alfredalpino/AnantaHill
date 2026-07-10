import postgres from 'postgres';

export async function applyDatabaseExtras(databaseUrl) {
  const sql = postgres(databaseUrl, {
    prepare: false,
    max: 1,
    ssl: databaseUrl.includes('sslmode=require') ? 'require' : undefined,
  });

  try {
    try {
      await sql`CREATE EXTENSION IF NOT EXISTS btree_gist`;
    } catch (error) {
      console.warn(
        '[db] Could not enable btree_gist extension:',
        error instanceof Error ? error.message : String(error),
      );
    }

    await sql`
      INSERT INTO food_menu_settings (id, hidden_categories)
      VALUES (1, ARRAY[]::text[])
      ON CONFLICT (id) DO NOTHING
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS food_items_petpooja_item_id_idx
      ON food_items (petpooja_item_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS food_orders_pos_order_id_idx
      ON food_orders (pos_order_id)
    `;
  } finally {
    await sql.end({ timeout: 2 }).catch(() => undefined);
  }
}

// Backwards compatibility for older imports.
export const applyLocalDatabaseExtras = applyDatabaseExtras;
