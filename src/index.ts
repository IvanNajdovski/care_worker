import { Hono } from 'hono';

import { fromHono } from 'chanfana';

import { authorizationRoutes, servicesRoutes, servicesSubcategoriesRoutes, userRoutes } from '@/app/routes/';
import { HonoAppContext } from './models/zod';

const app = new Hono<HonoAppContext>();
app.basePath('/api/v1');

// Setup OpenAPI registry
export const openapi = fromHono(app, {
  base: '/api/v1',
  docs_url: '/',
});

// Register OpenAPI endpoints
openapi.route('/api/v1/auth', authorizationRoutes);
openapi.route('/api/v1/users', userRoutes);
openapi.route('api/v1/services', servicesRoutes);
openapi.route('api/v1/services-subcategories', servicesSubcategoriesRoutes);

export default app;
