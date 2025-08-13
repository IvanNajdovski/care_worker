import { eq } from 'drizzle-orm';

import { roles, userRoles, users } from '@/db/schema';
import { TDrizzleD1Database } from '@/models/types';

export const getUserWithRoles = async (db: TDrizzleD1Database, userId: string) => {
  return db
    .select({
      id: users.id,
      first_name: users.first_name,
      last_name: users.last_name,
      email: users.email,
      role: roles.name,
    })
    .from(users)
    .leftJoin(userRoles, eq(users.id, userRoles.user_id))
    .leftJoin(roles, eq(userRoles.role_id, roles.id))
    .where(eq(users.id, userId))
    .groupBy(users.id)
    .get();
};
