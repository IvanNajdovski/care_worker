import bcrypt from 'bcryptjs';
import { Bool, OpenAPIRoute } from 'chanfana';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { users } from '@/db/schema';
import { AppContext, RegisterUserBody, User } from '@/models/zod';

export class CreateUser extends OpenAPIRoute {
  schema = {
    summary: 'Create User',
    tags: ['Users'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
      body: {
        content: {
          'application/json': {
            schema: RegisterUserBody,
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
    const { password, ...body } = (await this.getValidatedData<typeof this.schema>()).body;
    const userUUID = uuidv4();
    const db = getDB(c.env);

    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      id: userUUID,
      first_name: body.first_name,
      last_name: body.last_name ?? null,
      email: body.email ?? null,
      password_hash: passwordHash,
      user_type: body.user_type ?? null,
      service_type: body.service_type ?? null,
      enabled: true,
    });

    // Then fetch the inserted user by id
    const insertedUser = await db.select().from(users).where(eq(users.id, userUUID)).get();
    return { success: true, data: insertedUser };
  }
}
