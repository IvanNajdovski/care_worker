import { drizzle } from 'drizzle-orm/d1';

import { ExtendedEnv } from '@/models/zod';
import * as schema from './schema';

export function getDB(env: ExtendedEnv) {
  return drizzle(env.DB, { schema });
}
