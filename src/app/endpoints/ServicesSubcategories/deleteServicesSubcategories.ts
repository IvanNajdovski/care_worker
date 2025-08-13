import { Bool, OpenAPIRoute, Str } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { servicesSubcategories } from '@/db/schema';
import { AppContext } from '@/models/types';
import { Service } from '@/models/zod';

export class DeleteServiceSubcategory extends OpenAPIRoute {
  schema = {
    summary: 'Delete Service subcategory',
    tags: ['Services'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
      params: z.object({
        service_subcategory_id: Str({ description: 'Service id' }),
      }),
    },
    responses: {
      '200': {
        description: 'Returns the deleted service subcategory',
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
    const { service_subcategory_id } = (await this.getValidatedData<typeof this.schema>()).params;
    const db = getDB(c.env);

    const [serviceToDelete] = await db.select().from(servicesSubcategories).where(eq(servicesSubcategories.id, service_subcategory_id));

    if (!serviceToDelete) {
      return c.json({ error: 'Service not found' }, 404);
    }

    await db.delete(servicesSubcategories).where(eq(servicesSubcategories.id, service_subcategory_id));

    return { success: true, data: serviceToDelete };
  }
}
