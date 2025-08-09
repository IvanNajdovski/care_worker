import type { Context } from 'hono';

import { DateTime, Num, Str, Uuid } from 'chanfana';
import { z } from 'zod';

export type AppContext = Context<{ Bindings: Env }>;

export const User = z.object({
  id: Uuid(),
  first_name: Str(),
  last_name: Str(),
  email: Str(),
  user_type: Num(),
  service_type: Num(),
  enabled: z.number(),
  created_at: DateTime(),
  updated_at: DateTime(),
});

export const UpdateUserBody = z.object({
  first_name: Str().optional(),
  last_name: Str().optional(),
  email: Str().optional(),
  user_type: Num().optional(),
  service_type: Num().optional(),
  enabled: z.number().optional(),
});
