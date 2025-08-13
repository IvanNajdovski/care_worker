import { Bool, Num, OpenAPIRoute } from 'chanfana';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { getUsersWithRoles } from '@/db/queries';
import { AppContext } from '@/models/types';
import { User } from '@/models/zod';

export class GetUsers extends OpenAPIRoute {
  schema = {
    summary: 'List Users',
    tags: ['Users'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
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
        description: 'Returns list of users',
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
    const query = (await this.getValidatedData<typeof this.schema>()).query;

    const db = getDB(c.env);

    const usersList = await getUsersWithRoles(db, query);
    return { success: true, data: usersList };
  }
}
