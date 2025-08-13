import { Bool, OpenAPIRoute, Str } from 'chanfana';
import { z } from 'zod';

import { getUserWithRoles } from '@/db/queries/userQueries/getUserWithRoles.query';
import { AppContext, User } from '@/models/zod';

export class GetUserById extends OpenAPIRoute {
  schema = {
    summary: 'Get User',
    tags: ['Users'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
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

    const user = await getUserWithRoles(c.env, user_id);

    return { success: true, data: user ?? null };
  }
}
