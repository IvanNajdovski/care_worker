import { users } from '@/db/schema';
import { TDrizzleD1Database } from '@/models/types';

interface IInsertUser {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string | null;
  password_hash: string;
  user_type: number | null;
  service_type: number | null;
  enabled: boolean;
}
export const createUserQuery = async (db: TDrizzleD1Database, user: IInsertUser) => {
  return db.insert(users).values(user);
};
