import { Hono } from 'hono';

import { fromHono } from 'chanfana';

import { userRoutes } from '@/app/routes/usersRoutes';

const app = new Hono<{ Bindings: Env }>();
// app.route("/users", userRoutes);

// Setup OpenAPI registry
export const openapi = fromHono(app, {
  base: '/api',
  docs_url: '/',
});

// Register OpenAPI endpoints
openapi.route('/users', userRoutes);

export default app;
