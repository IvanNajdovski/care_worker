import { Bool, OpenAPIRoute } from 'chanfana';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { services, servicesSubcategories } from '@/db/schema';
import { AppContext, Service } from '@/models/zod';

export class GetServices extends OpenAPIRoute {
  schema = {
    summary: 'Get all services',
    tags: ['Services'],
    request: {
      query: z.object({
        subcategories: z
          .string()
          .optional()
          .transform(val => val === 'true'),
      }),
    },
    responses: {
      200: {
        description: 'List of available services (with optional subcategories)',
        content: {
          'application/json': {
            schema: z.object({
              success: Bool(),
              data: Service.array(),
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const { query } = await this.getValidatedData<typeof this.schema>();

    const db = getDB(c.env);
    const allServices = await db.select().from(services);

    if (!query.subcategories) {
      return { success: true, data: allServices };
    }

    // Fetch all subcategories in one query
    const allSubcategories = await db.select().from(servicesSubcategories);

    // Group subcategories by service_id
    const subMap = allSubcategories.reduce((acc, sub) => {
      if (!acc[sub.service_id]) acc[sub.service_id] = [];
      acc[sub.service_id].push(sub);
      return acc;
    }, {});

    // Attach subcategories to each service
    const result = allServices.map(svc => ({
      ...svc,
      subcategories: subMap[svc.id] || [],
    }));
    return { success: true, data: result };
  }
}
