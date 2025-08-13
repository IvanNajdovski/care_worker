import { Bool, OpenAPIRoute } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { users } from '@/db/schema';
import { AppContext } from '@/models/types';
import { VerifyUserEmailBody } from '@/models/zod';

export class VerifyUserEmail extends OpenAPIRoute {
  schema = {
    summary: 'Verify User Email',
    tags: ['Authorization'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: VerifyUserEmailBody,
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
    const { token } = (await this.getValidatedData<typeof this.schema>()).body;

    try {
      const db = getDB(c.env);
      const user = await db.select().from(users).where(eq(users.verification_token, token)).get();

      if (!user) {
        return c.json({ success: false, error: 'Email already registered' }, 500);
      }

      await db.update(users).set({ email_verified: true, verification_token: null }).where(eq(users.id, user.id));
      return { success: true, data: null };
    } catch (error: any) {
      const errorMessage = error?.cause?.message ?? error.message;

      return c.json({ success: false, error: `Internal server error ${errorMessage}` }, 500);
    }
  }
}
