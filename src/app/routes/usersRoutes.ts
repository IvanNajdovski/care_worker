import { Hono } from 'hono';

import { authMiddleware } from '@/middlewares';
import { fromHono } from 'chanfana';

import { CreateUser, DeleteUser, GetUserById, GetUserMe, GetUsers, UpdateUser } from '@/app/endpoints';
import { HonoAppContext } from '@/models/zod';

const userRoutes = fromHono(new Hono<HonoAppContext>());

userRoutes.get('/', authMiddleware, GetUsers);
userRoutes.get('/me', authMiddleware, GetUserMe);
userRoutes.get('/:user_id', authMiddleware, GetUserById);

userRoutes.post('/', authMiddleware, CreateUser);
userRoutes.put('/:user_id', authMiddleware, UpdateUser);
userRoutes.delete('/:user_id', authMiddleware, DeleteUser);

export { userRoutes };
