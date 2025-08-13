import { sign } from 'hono/jwt';

import bcrypt from 'bcryptjs';
import { Bool, OpenAPIRoute } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { users } from '@/db/schema';
import { AppContext } from '@/models/types';
import { LoginUserBody } from '@/models/zod';

export class LoginUser extends OpenAPIRoute {
  schema = {
    summary: 'Login User',
    tags: ['Authorization'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: LoginUserBody,
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Returns user authorization token',
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
    const { email, password } = (await this.getValidatedData<typeof this.schema>()).body;
    const db = getDB(c.env);
    try {
      const user = await db.select().from(users).where(eq(users.email, email)).get();
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        throw new Error('Invalid credentials');
      }

      const token = await sign(
        { user_id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
        c.env.JWT_SECRET
      );

      return { success: true, data: token };
    } catch (error: any) {
      const errorMessage = error?.cause?.message ?? error.message;

      if (errorMessage.includes('Invalid credentials')) {
        return c.json({ success: false, error: 'Invalid credentials' }, 401);
      }
    }
  }
}
