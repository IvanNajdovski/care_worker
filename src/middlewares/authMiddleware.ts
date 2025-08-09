import jwt from 'jsonwebtoken';

export function authMiddleware(secret: string) {
  return async (c, next) => {
    try {
      const authHeader = c.req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
      const token = authHeader.substring(7);
      const payload = jwt.verify(token, secret);
      c.set('user', payload);
      await next();
    } catch {
      return c.json({ error: 'Unauthorized' }, 401);
    }
  };
}
