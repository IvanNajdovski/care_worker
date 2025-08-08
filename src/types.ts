import { DateTime, Str, Uuid } from "chanfana";
import type { Context } from "hono";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

export const Task = z.object({
  name: Str({ example: "lorem" }),
  slug: Str(),
  description: Str({ required: false }),
  completed: z.boolean().default(false),
  due_date: DateTime(),
});

export const User = z.object({
  id: Uuid(),
  first_name: Str(),
  last_name: Str(),
  enabled: z.number(),
  created_at: DateTime(),
  updated_at: DateTime(),
});
