import { Bool, OpenAPIRoute, Str } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { servicesSubcategories } from '@/db/schema';
import { AppContext, ServiceSubcategory, UpdateServiceBody } from '@/models/zod';

export class UpdateServicesSubcategory extends OpenAPIRoute {
  schema = {
    summary: 'Update service subcategory',
    tags: ['Services'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
      params: z.object({
        service_subcategory_id: Str({ description: 'Service subcategory id' }),
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
        description: 'Returns the updated service subcategory',
        content: {
          'application/json': {
            schema: z.object({
              success: Bool(),
              data: ServiceSubcategory,
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
      enabled: boolean | null;
      updated_at: string | null;
    }> = {};

    // Conditionally add properties if they exist in `body`
    if ('name' in body) updateData.name = body.name;
    if ('display_name' in body) updateData.display_name = body.display_name;
    if ('description' in body) updateData.description = body.description;
    if ('enabled' in body) updateData.enabled = body.enabled;

    // Always update updatedAt
    updateData.updated_at = new Date().toISOString();

    await db.update(servicesSubcategories).set(updateData).where(eq(servicesSubcategories.id, params.service_subcategory_id));

    const [updatedServiceSubcategory] = await db
      .select()
      .from(servicesSubcategories)
      .where(eq(servicesSubcategories.id, params.service_subcategory_id));

    return { success: true, data: updatedServiceSubcategory };
  }
}
