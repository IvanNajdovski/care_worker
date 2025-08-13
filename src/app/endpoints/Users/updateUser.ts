import { Bool, OpenAPIRoute, Str } from 'chanfana';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { getUserWithRoles, updateUserQuery } from '@/db/queries';
import { AppContext } from '@/models/types';
import { UpdateUserBody, User } from '@/models/zod';

export class UpdateUser extends OpenAPIRoute {
  schema = {
    summary: 'Update User',
    tags: ['Users'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
      params: z.object({
        user_id: Str({ description: 'User id' }),
      }),
      body: {
        content: {
          'application/json': {
            schema: UpdateUserBody,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Returns updated user',
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
    const { body, params } = await this.getValidatedData<typeof this.schema>();

    const db = getDB(c.env);

    await updateUserQuery(db, body, params.user_id);

    const updatedUser = await getUserWithRoles(db, params.user_id);

    return { success: true, data: updatedUser };
  }
}
