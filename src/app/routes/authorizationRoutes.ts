import { Hono } from 'hono';

import { fromHono } from 'chanfana';

import { LoginUser, RegisterUser, VerifyUserEmail } from '@/app/endpoints';
import { HonoAppContext } from '@/models/types';

const authorizationRoutes = fromHono(new Hono<HonoAppContext>());

authorizationRoutes.post('/register', RegisterUser);
authorizationRoutes.post('/verify_email', VerifyUserEmail);
authorizationRoutes.post('/login', LoginUser);

export { authorizationRoutes };
