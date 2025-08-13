import { Bool, OpenAPIRoute } from 'chanfana';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { getUserWithRoles } from '@/db/queries/userQueries/getUserWithRoles.query';
import { IJwtUserPayload } from '@/models/interfaces';
import { AppContext } from '@/models/types';
import { UpdateUserBody, User } from '@/models/zod';

export class GetUserMe extends OpenAPIRoute {
  schema = {
    summary: 'Get User Me',
    tags: ['Users'],
    request: {
      body: {
        headers: z.object({
          authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
        }),
        content: {
          'application/json': {
            schema: UpdateUserBody,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Returns current user',
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
    //@ts-ignore
    const userPayload: IJwtUserPayload = c.get('user') as unknown as IJwtUserPayload;

    if (!userPayload) return c.json({ error: 'Unauthorized' }, 401);
    const db = getDB(c.env);
    const user = await getUserWithRoles(db, userPayload.user_id);

    return c.json({ success: true, data: user });
    // }
  }
}
