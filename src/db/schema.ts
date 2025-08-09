import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
  'users',
  {
    id: text('id').primaryKey().notNull(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    email: text('email').notNull(),
    userType: integer('user_type').notNull(),
    serviceType: integer('service_type').notNull(),
    enabled: integer('enabled').notNull().default(0),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  },
  table => ({
    userTypeCheck: sql`check(${table.userType} in (1, 2))`,
    serviceTypeCheck: sql`CHECK (${table.serviceType} IN (1, 2))`,
    enabledCheck: sql`CHECK (${table.enabled} IN (0, 1))`,
  })
);
