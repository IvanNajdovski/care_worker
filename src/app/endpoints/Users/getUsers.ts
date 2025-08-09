import { Bool, Num, OpenAPIRoute } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { users } from '@/db/schema';
import { AppContext, User } from '@/models/zod/types';

export class GetUsers extends OpenAPIRoute {
  schema = {
    tags: ['Users'],
    summary: 'List Users',
    request: {
      query: z.object({
        page: Num({
          description: 'Page number',
          required: false,
        }),
        enabled: Bool({
          description: 'Filter by enabled flag',
          required: false,
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
              data: User.array(),
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const { page, enabled } = (await this.getValidatedData<typeof this.schema>()).query;

    const db = getDB(c.env);

    // Build the query with optional filter
    let query: any = db.select().from(users);

    if (enabled !== undefined) {
      query = query.where(eq(users.enabled, enabled ? 1 : 0));
    }

    // Add pagination (example: page size = 10)
    const pageSize = 10;
    query = query.limit(pageSize).offset(page * pageSize);

    const usersList = await query;
    return { success: true, data: usersList };
  }
}
