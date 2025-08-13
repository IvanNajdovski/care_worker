import { eq } from 'drizzle-orm';

import { users } from '@/db/schema';
import { TDrizzleD1Database } from '@/models/types';

export const deleteUserQuery = async (db: TDrizzleD1Database, user_id: string) => {
  return db.delete(users).where(eq(users.id, user_id));
};
