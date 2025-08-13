import { Bool, OpenAPIRoute } from 'chanfana';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { services, servicesSubcategories } from '@/db/schema';
import { AppContext } from '@/models/types';
import { CreateServiceSubcategoryBody, ServiceSubcategory } from '@/models/zod';

export class CreateServicesSubcategory extends OpenAPIRoute {
  schema = {
    summary: 'Create service subcategory',
    tags: ['Services'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
      body: {
        content: {
          'application/json': {
            schema: CreateServiceSubcategoryBody,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Returns a created service subcategory',
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
    const { body } = await this.getValidatedData<typeof this.schema>();
    const serviceSubcategoryUUID = uuidv4();
    const db = getDB(c.env);

    await db.insert(servicesSubcategories).values({
      id: serviceSubcategoryUUID,
      service_id: body.service_id!,
      name: body.name ?? null,
      display_name: body.display_name ?? null,
      description: body.description ?? null,
      enabled: body.enabled ?? false,
    });

    const [insertedServiceSubcategory] = await db.select().from(services).where(eq(services.id, serviceSubcategoryUUID));
    return { success: true, data: insertedServiceSubcategory };
  }
}
