import { Bool, Num, OpenAPIRoute } from 'chanfana';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { users } from '@/db/schema';
import { AppContext, User } from '@/models/zod/types';

export class CreateUser extends OpenAPIRoute {
  schema = {
    tags: ['Users'],
    summary: 'Create User',
    request: {
      body: {
        content: {
          'application/json': {
            schema: User,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Returns a created user',
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
    const body = (await this.getValidatedData<typeof this.schema>()).body;
    const userUUID = uuidv4();
    const db = getDB(c.env);
    await db.insert(users).values({
      id: userUUID,
      firstName: body.first_name,
      lastName: body.last_name ?? null,
      email: body.email ?? null,
      userType: body.user_type ?? null,
      serviceType: body.service_type ?? null,
      enabled: body.enabled ?? 0, // default to 0 if nullish
    });

    // Then fetch the inserted user by id
    const [insertedUser] = await db.select().from(users).where(eq(users.id, userUUID));
    return { success: true, data: insertedUser };
  }
}
