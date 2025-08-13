import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Roles table
export const roles = sqliteTable('roles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description'),
});

// UserRoles join table with composite primary key
export const userRoles = sqliteTable(
  'user_roles',
  {
    user_id: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    role_id: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  },
  table => ({
    // Composite primary key on user_id + role_id
    pk: sql`PRIMARY KEY (${table.user_id}, ${table.role_id})`,
  })
);

// Users table
export const users = sqliteTable(
  'users',
  {
    id: text('id').primaryKey().notNull(),
    first_name: text('first_name'),
    last_name: text('last_name'),
    user_verified: integer('user_verified', { mode: 'boolean' }).notNull().default(false),
    email: text('email').notNull().unique(),
    email_verified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
    verification_token: text('verification_token'),
    password_hash: text('password_hash').notNull(),
    user_type: integer('user_type').notNull(),
    service_type: integer('service_type').notNull(),
    enabled: integer('enabled', { mode: 'boolean' }).notNull().default(false),
    created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  },
  table => ({
    user_type_check: sql`check(${table.user_type} in (1, 2))`,
    service_type_check: sql`CHECK (${table.service_type} IN (1, 2))`,
    enabled_check: sql`CHECK (${table.enabled} IN (0, 1))`,
  })
);

// Services table
export const services = sqliteTable('services', {
  id: text('id').primaryKey().notNull(),
  name: text('name'),
  display_name: text('display_name'),
  description: text('description'),
  provider_description: text('provider_description'),
  client_description: text('client_description'),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(false),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Service Subcategories table
export const servicesSubcategories = sqliteTable(
  'services_subcategories',
  {
    id: text('id').primaryKey().notNull(),
    service_id: text('service_id')
      .notNull()
      .references(() => services.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    name: text('name'),
    display_name: text('display_name'),
    description: text('description'),
    enabled: integer('enabled', { mode: 'boolean' }).notNull().default(false),
    created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  },
  table => ({
    serviceIdIdx: index('idx_services_subcategories_service_id').on(table.service_id),
  })
);
