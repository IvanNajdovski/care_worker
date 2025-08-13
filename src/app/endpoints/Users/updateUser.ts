import { Bool, OpenAPIRoute, Str } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { users } from '@/db/schema';
import { AppContext, UpdateUserBody, User } from '@/models/zod';

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
        description: 'Returns the updated user',
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

    // Suppose body can have optional fields to update
    const updateData: Partial<{
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      userType: number | null;
      serviceType: number | null;
      enabled: boolean | null;
      updated_at: string;
    }> = {};

    // Conditionally add properties if they exist in `body`
    if ('first_name' in body) updateData.firstName = body.first_name;
    if ('last_name' in body) updateData.lastName = body.last_name;
    if ('email' in body) updateData.email = body.email;
    if ('user_type' in body) updateData.userType = body.user_type;
    if ('service_type' in body) updateData.serviceType = body.service_type;
    if ('enabled' in body) updateData.enabled = body.enabled;

    // Always update updatedAt
    updateData.updated_at = new Date().toISOString();

    await db.update(users).set(updateData).where(eq(users.id, params.user_id));

    const [updatedUser] = await db.select().from(users).where(eq(users.id, params.user_id));

    return { success: true, data: updatedUser };
  }
}
