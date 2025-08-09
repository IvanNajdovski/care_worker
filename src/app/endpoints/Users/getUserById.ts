import { Bool, Num, OpenAPIRoute, Str } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { users } from '@/db/schema';
import { AppContext, User } from '@/models/zod/types';

export class GetUserById extends OpenAPIRoute {
  schema = {
    tags: ['Users'],
    summary: 'Get User',
    request: {
      params: z.object({
        user_id: Str({
          description: 'User Id',
          required: true,
        }),
      }),
    },
    responses: {
      '200': {
        description: 'Returns a list of users',
        content: {
          'application/json': {
            schema: z.object({
              success: Bool(),
              data: User,
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const { user_id } = (await this.getValidatedData<typeof this.schema>()).params;

    const db = getDB(c.env);

    const user = await db.select().from(users).where(eq(users.id, user_id)).limit(1);

    return { success: true, data: user[0] ?? null };
  }
}
