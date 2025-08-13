import { OpenAPIRoute } from 'chanfana';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { servicesSubcategories } from '@/db/schema';
import { AppContext } from '@/models/types';
import { ServiceSubcategory } from '@/models/zod';

export class GetSubcategories extends OpenAPIRoute {
  schema = {
    summary: 'Get all service subcategories',
    tags: ['Services'],
    request: {
      query: z.object({
        service_id: z.string().optional(),
      }),
    },
    responses: {
      200: {
        description: 'List of subcategories',
        content: {
          'application/json': {
            schema: ServiceSubcategory.array(),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const { query } = await this.getValidatedData<typeof this.schema>();
    const db = getDB(c.env);
    const allServiceSubcategories = db.select().from(servicesSubcategories);

    if (!query.service_id) {
      return { success: true, data: allServiceSubcategories };
    }

    const allServiceRelatedServiceSubcategories = db
      .select()
      .from(servicesSubcategories)
      .where(eq(servicesSubcategories.service_id, query.service_id));

    return { success: true, data: allServiceRelatedServiceSubcategories };
  }
}
