import {
  boolean,
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const foodItems = pgTable('food_items', {
  id: serial('id').primaryKey(),
  petpoojaItemId: text('petpooja_item_id'),
  petpoojaVariantId: text('petpooja_variant_id'),
  petpoojaAddonId: text('petpooja_addon_id'),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  isVeg: boolean('is_veg').notNull().default(true),
  taxInclusive: boolean('tax_inclusive').notNull().default(false),
  image: text('image'),
  isAvailable: boolean('is_available').notNull().default(true),
  isHidden: boolean('is_hidden').notNull().default(false),
  adminAvailabilityOverride: boolean('admin_availability_override').notNull().default(false),
  adminSuppressed: boolean('admin_suppressed').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const foodMenuSettings = pgTable('food_menu_settings', {
  id: integer('id').primaryKey().default(1),
  hiddenCategories: text('hidden_categories').array().notNull().default([]),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const petpoojaStoreState = pgTable('petpooja_store_state', {
  id: serial('id').primaryKey(),
  storeOpen: boolean('store_open').notNull().default(true),
  lastPayload: text('last_payload'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userFoodOrders = pgTable('food_orders', {
  id: serial('id').primaryKey(),
  guestName: text('guest_name'),
  guestPhone: text('guest_phone'),
  guestEmail: text('guest_email'),
  items: text('items').notNull(),
  roomNumber: text('room_number'),
  paymentProvider: text('payment_provider'),
  paymentStatus: text('payment_status').default('PENDING'),
  paymentOrderId: text('payment_order_id'),
  paymentId: text('payment_id'),
  paymentSignature: text('payment_signature'),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  posOrderId: text('pos_order_id'),
  posSyncStatus: text('pos_sync_status').default('pending'),
  posSyncMessage: text('pos_sync_message'),
  posOrderStatus: text('pos_order_status'),
  errorMessage: text('error_message'),
  status: text('status').default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
});
