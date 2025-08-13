import { ResendEmailService } from '@/services';
import bcrypt from 'bcryptjs';
import { Bool, OpenAPIRoute } from 'chanfana';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { users } from '@/db/schema';
import { AppContext, RegisterUserBody } from '@/models/zod';

export class RegisterUser extends OpenAPIRoute {
  schema = {
    summary: 'Register(create) User',
    tags: ['Authorization'],
    request: {
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
        description: 'Returns the user authorization token',
        content: {
          'application/json': {
            schema: z.object({
              success: Bool(),
              data: z.string(),
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
    const token = nanoid(32);
    const passwordHash = await bcrypt.hash(password, 10); // 10 = salt rounds

    try {
      await db.insert(users).values({
        id: userUUID,
        first_name: body.first_name,
        last_name: body.last_name ?? null,
        email: body.email ?? null,
        password_hash: passwordHash,
        verification_token: token,
        user_type: body.user_type ?? null,
        service_type: body.service_type ?? null,
        enabled: true,
      });
    } catch (error: any) {
      const errorMessage = error?.cause?.message ?? error.message;
      if (errorMessage.includes('UNIQUE constraint failed: users.email')) {
        return c.json({ success: false, error: 'Email already registered' }, 400);
      }

      return c.json({ success: false, error: 'Internal server error' }, 500);
    }

    const [user] = await db
      .select({
        id: users.id,
        firstName: users.first_name,
        lastName: users.last_name,
        email: users.email,
        emailVerified: users.email_verified,
        userVerified: users.user_verified,
        userType: users.user_type,
        serviceType: users.service_type,
        enabled: users.enabled,
        createdAt: users.created_at,
        updatedAt: users.updated_at,
      })
      .from(users)
      .where(eq(users.id, userUUID));

    await ResendEmailService.sendRegistrationEmail(c, user, token);

    return { success: true, data: user };
  }
}
