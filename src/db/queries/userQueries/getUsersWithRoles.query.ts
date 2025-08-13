import { eq } from 'drizzle-orm';

import { users } from '@/db/schema';
import { TDrizzleD1Database } from '@/models/types';

interface IGetUsersQuery {
  enabled?: boolean;
  page?: number;
}
export const getUsersWithRoles = async (db: TDrizzleD1Database, query: IGetUsersQuery) => {
  const { enabled, page } = query;
  let dbQuery: any = db.select().from(users);

  if (enabled !== undefined) {
    dbQuery = dbQuery.where(eq(users.enabled, enabled ? true : false));
  }

  const pageSize = 10;
  dbQuery = dbQuery.limit(pageSize).offset(page * pageSize);
  return dbQuery;
};
