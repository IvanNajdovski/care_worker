import { Hono } from 'hono';

import { fromHono } from 'chanfana';

import { HonoAppContext } from '@/models/zod';
import { CreateServicesSubcategory, DeleteServiceSubcategory, GetSubcategories, UpdateServicesSubcategory } from '../endpoints';

const servicesSubcategoriesRoutes = fromHono(new Hono<HonoAppContext>());

servicesSubcategoriesRoutes.get('/', GetSubcategories);
servicesSubcategoriesRoutes.post('/', CreateServicesSubcategory);
servicesSubcategoriesRoutes.put('/:service_id', UpdateServicesSubcategory);
servicesSubcategoriesRoutes.delete('/:service_id', DeleteServiceSubcategory);

export { servicesSubcategoriesRoutes };
