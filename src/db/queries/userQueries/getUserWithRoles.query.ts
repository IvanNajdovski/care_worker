import { eq } from 'drizzle-orm';

import { getDB } from '@/db/db';
import { roles, userRoles, users } from '@/db/schema';
import { ExtendedEnv } from '@/models/zod';

export const getUserWithRoles = async (env: ExtendedEnv, userId: string) => {
  const db = getDB(env);
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
