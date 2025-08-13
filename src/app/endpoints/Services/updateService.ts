import { Bool, OpenAPIRoute, Str } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { services } from '@/db/schema';
import { AppContext } from '@/models/types';
import { Service, UpdateServiceBody } from '@/models/zod';

export class UpdateServices extends OpenAPIRoute {
  schema = {
    summary: 'Create services',
    tags: ['Services'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
      params: z.object({
        service_id: Str({ description: 'Service id' }),
      }),
      body: {
        content: {
          'application/json': {
            schema: UpdateServiceBody,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Returns the updated service',
        content: {
          'application/json': {
            schema: z.object({
              success: Bool(),
              data: Service,
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
      name: string | null;
      display_name: string | null;
      description: string | null;
      provider_description: string | null;
      client_description: string | null;
      enabled: boolean | null;
      updated_at: string | null;
    }> = {};

    // Conditionally add properties if they exist in `body`
    if ('name' in body) updateData.name = body.name;
    if ('display_name' in body) updateData.display_name = body.display_name;
    if ('description' in body) updateData.description = body.description;
    if ('provider_description' in body) updateData.provider_description = body.provider_description;
    if ('client_description' in body) updateData.client_description = body.client_description;
    if ('enabled' in body) updateData.enabled = body.enabled;

    // Always update updatedAt
    updateData.updated_at = new Date().toISOString();

    await db.update(services).set(updateData).where(eq(services.id, params.service_id));

    const [updatedService] = await db.select().from(services).where(eq(services.id, params.service_id));

    return { success: true, data: updatedService };
  }
}
