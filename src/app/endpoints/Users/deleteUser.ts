import { Bool, OpenAPIRoute, Str } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { users } from '@/db/schema';
import { AppContext, User } from '@/models/zod';

export class DeleteUser extends OpenAPIRoute {
  schema = {
    summary: 'Delete User',
    tags: ['Users'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
      params: z.object({
        user_id: Str({ description: 'User id' }),
      }),
    },
    responses: {
      '200': {
        description: 'Returns the deleted user',
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

    const userToDelete = await db.select().from(users).where(eq(users.id, user_id)).get();

    if (!userToDelete) {
      return c.json({ error: 'User not found' }, 404);
    }

    await db.delete(users).where(eq(users.id, user_id));

    return { success: true, data: userToDelete };
  }
}
