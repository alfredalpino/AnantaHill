import {
  boolean,
  date,
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// ---------------------------------------------------------------------------
// Guests / auth
// ---------------------------------------------------------------------------

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  phone: text('phone').unique(),
  email: text('email').unique(),
  googleSub: text('google_sub').unique(),
  isVip: boolean('is_vip').notNull().default(false),
  preferences: text('preferences'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const otpChallenges = pgTable('otp_challenges', {
  id: serial('id').primaryKey(),
  phone: text('phone').notNull(),
  purpose: text('purpose').notNull().default('login'),
  providerRef: text('provider_ref'),
  codeHash: text('code_hash'),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  consumedAt: timestamp('consumed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  pinHash: text('pin_hash').notNull(),
  role: text('role').notNull().default('staff'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ---------------------------------------------------------------------------
// Rooms & halls
// ---------------------------------------------------------------------------

export const rooms = pgTable('rooms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique(),
  category: text('category').notNull().default('Rooms'),
  description: text('description'),
  basePrice: decimal('base_price', { precision: 10, scale: 2 }).notNull().default('0'),
  capacity: integer('capacity').notNull().default(2),
  totalRooms: integer('total_rooms').notNull().default(1),
  isAvailable: boolean('is_available').notNull().default(true),
  viewLabel: text('view_label'),
  amenities: text('amenities').array().notNull().default([]),
  images: text('images').array().notNull().default([]),
  mainImage: text('main_image'),
  checkinCloudMappedCode: text('checkin_cloud_mapped_code'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const halls = pgTable('halls', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  capacity: text('capacity'),
  description: text('description'),
  amenities: text('amenities').array().notNull().default([]),
  images: text('images').array().notNull().default([]),
  mainImage: text('main_image'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  publicId: text('public_id').notNull().unique(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  roomId: integer('room_id').references(() => rooms.id, { onDelete: 'set null' }),
  guestName: text('guest_name').notNull(),
  email: text('email'),
  phone: text('phone'),
  checkIn: date('check_in').notNull(),
  checkOut: date('check_out').notNull(),
  guests: integer('guests').notNull().default(1),
  nights: integer('nights'),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull().default('0'),
  tax: decimal('tax', { precision: 10, scale: 2 }).notNull().default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull().default('0'),
  specialRequests: text('special_requests'),
  status: text('status').notNull().default('Pending'),
  paymentProvider: text('payment_provider'),
  paymentStatus: text('payment_status').notNull().default('PENDING'),
  paymentOrderId: text('payment_order_id'),
  paymentId: text('payment_id'),
  paymentSignature: text('payment_signature'),
  checkinCloudBookingId: text('checkin_cloud_booking_id'),
  checkinCloudSyncStatus: text('checkin_cloud_sync_status').notNull().default('pending'),
  checkinCloudSyncMessage: text('checkin_cloud_sync_message'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const tableReservations = pgTable('table_reservations', {
  id: serial('id').primaryKey(),
  publicId: text('public_id').notNull().unique(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  guestName: text('guest_name').notNull(),
  phone: text('phone'),
  email: text('email'),
  reservationDate: date('reservation_date').notNull(),
  reservationTime: text('reservation_time').notNull(),
  guests: integer('guests').notNull().default(2),
  requests: text('requests'),
  status: text('status').notNull().default('Pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const enquiries = pgTable('enquiries', {
  id: serial('id').primaryKey(),
  publicId: text('public_id').notNull().unique(),
  guestName: text('guest_name').notNull(),
  email: text('email'),
  phone: text('phone'),
  subject: text('subject'),
  message: text('message').notNull(),
  type: text('type').notNull().default('general'),
  status: text('status').notNull().default('New'),
  hallId: integer('hall_id').references(() => halls.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ---------------------------------------------------------------------------
// Payments & sync logs
// ---------------------------------------------------------------------------

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  kind: text('kind').notNull(),
  referenceId: integer('reference_id').notNull(),
  provider: text('provider').notNull().default('razorpay'),
  providerOrderId: text('provider_order_id'),
  providerPaymentId: text('provider_payment_id'),
  providerSignature: text('provider_signature'),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('INR'),
  status: text('status').notNull().default('PENDING'),
  rawPayload: text('raw_payload'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const petpoojaWebhookLogs = pgTable('petpooja_webhook_logs', {
  id: serial('id').primaryKey(),
  endpoint: text('endpoint').notNull(),
  method: text('method').notNull().default('POST'),
  headers: text('headers'),
  payload: text('payload'),
  responseStatus: integer('response_status'),
  responseBody: text('response_body'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const checkincloudSyncLogs = pgTable('checkincloud_sync_logs', {
  id: serial('id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookings.id, { onDelete: 'cascade' }),
  direction: text('direction').notNull().default('outbound'),
  action: text('action'),
  requestPayload: text('request_payload'),
  responsePayload: text('response_payload'),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ---------------------------------------------------------------------------
// Dining / Petpooja
// ---------------------------------------------------------------------------

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
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const foodMenuSettings = pgTable('food_menu_settings', {
  id: integer('id').primaryKey().default(1),
  hiddenCategories: text('hidden_categories').array().notNull().default([]),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const petpoojaStoreState = pgTable('petpooja_store_state', {
  id: serial('id').primaryKey(),
  storeOpen: boolean('store_open').notNull().default(true),
  lastPayload: text('last_payload'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const userFoodOrders = pgTable('food_orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
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
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
