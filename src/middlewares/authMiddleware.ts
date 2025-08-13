import { verify } from 'hono/jwt';

import { getUserWithRoles } from '@/db/queries/userQueries/getUserWithRoles.query';
import { AppContext } from '@/models/zod';

export const authMiddleware = async (c, next) => {
  try {
    const authHeader = c.req.raw.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const token = authHeader.substring(7);
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set('user', payload);
    await next();
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
};

export const isAdminMiddleware = async (c: AppContext, next) => {
  try {
    const userPayload = c.get('user');

    if (userPayload?.role) {
      const user = await getUserWithRoles(c.env, userPayload.user_id);

      if (!user || user.role !== 'admin') {
        return c.json({ error: 'Forbidden' }, 403);
      }
    }
    await next();
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
};

export const isServiceProviderMiddleware = async (c: AppContext, next) => {
  try {
    const userPayload = c.get('user');

    if (userPayload?.role) {
      const user = await getUserWithRoles(c.env, userPayload.user_id);

      if (!user || user.role !== 'service_provider') {
        return c.json({ error: 'Forbidden' }, 403);
      }
    }
    await next();
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
};

export const isServiceClientMiddleware = async (c: AppContext, next) => {
  try {
    const userPayload = c.get('user');

    if (userPayload?.role) {
      const user = await getUserWithRoles(c.env, userPayload.user_id);

      if (!user || user.role !== 'service_client') {
        return c.json({ error: 'Forbidden' }, 403);
      }
    }
    await next();
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
};
