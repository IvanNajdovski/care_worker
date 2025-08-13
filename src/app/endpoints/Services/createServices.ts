import { Bool, OpenAPIRoute } from 'chanfana';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { getDB } from '@/db/db';
import { services } from '@/db/schema';
import { AppContext } from '@/models/types';
import { CreateServiceBody, Service } from '@/models/zod';

export class CreateServices extends OpenAPIRoute {
  schema = {
    summary: 'Create services',
    tags: ['Services'],
    request: {
      headers: z.object({
        authorization: z.string().startsWith('Bearer ').describe('Authorization JWT token'),
      }),
      body: {
        content: {
          'application/json': {
            schema: CreateServiceBody,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Returns a created service',
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
    const { body } = await this.getValidatedData<typeof this.schema>();
    const serviceUUID = uuidv4();
    const db = getDB(c.env);

    await db.insert(services).values({ id: serviceUUID, ...body });

    const [insertedService] = await db.select().from(services).where(eq(services.id, serviceUUID));
    return { success: true, data: insertedService };
  }
}
