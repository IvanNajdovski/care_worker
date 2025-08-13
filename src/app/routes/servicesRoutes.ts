import { Hono } from 'hono';

import { fromHono } from 'chanfana';

import { CreateServices, DeleteService, GetServices, UpdateServices } from '@/app/endpoints';
import { HonoAppContext } from '@/models/types';

const servicesRoutes = fromHono(new Hono<HonoAppContext>());

servicesRoutes.get('/', GetServices);
servicesRoutes.post('/', CreateServices);
servicesRoutes.put('/:service_id', UpdateServices);
servicesRoutes.delete('/:service_id', DeleteService);

export { servicesRoutes };
