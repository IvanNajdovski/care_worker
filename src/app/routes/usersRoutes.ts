import { Hono } from 'hono';

import { fromHono } from 'chanfana';

import { CreateUser, DeleteUser, GetUserById, GetUsers, UpdateUser } from '@/app/endpoints';

const userRoutes = fromHono(new Hono());

userRoutes.get('/', GetUsers);
userRoutes.get('/:user_id', GetUserById);
userRoutes.post('/', CreateUser);
userRoutes.put('/:user_id', UpdateUser);
userRoutes.delete('/:user_id', DeleteUser);

export { userRoutes };
