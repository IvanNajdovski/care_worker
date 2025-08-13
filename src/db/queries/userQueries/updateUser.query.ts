import { eq } from 'drizzle-orm';

import { users } from '@/db/schema';
import { TDrizzleD1Database } from '@/models/types';

interface IUpdateUser {
  id?: string;
  first_name?: string;
  last_name?: string | null;
  email?: string | null;
  user_type?: number | null;
  service_type?: number | null;
  enabled?: boolean;
}
export const updateUserQuery = async (db: TDrizzleD1Database, user: IUpdateUser, userId: string) => {
  // Suppose body can have optional fields to update
  const updateData: Partial<{
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    userType: number | null;
    serviceType: number | null;
    enabled: boolean | null;
    updated_at: string;
  }> = {};

  // Conditionally add properties if they exist in `body`
  if ('first_name' in user) updateData.firstName = user.first_name;
  if ('last_name' in user) updateData.lastName = user.last_name;
  if ('email' in user) updateData.email = user.email;
  if ('user_type' in user) updateData.userType = user.user_type;
  if ('service_type' in user) updateData.serviceType = user.service_type;
  if ('enabled' in user) updateData.enabled = user.enabled;

  // Always update updatedAt
  updateData.updated_at = new Date().toISOString();
  return db.update(users).set(updateData).where(eq(users.id, userId));
};
