import { Context, Env } from 'hono';

import { AnyD1Database } from 'drizzle-orm/d1';

import { IJwtUserPayload } from '../interfaces';

export interface ExtendedEnv extends Env {
  RESEND_API_KEY: 're_N8K1pfDk_NqnggMBrYfwGJeNE3r7fwkkB';
  JWT_SECRET: 'care_app-babysitter';
  DB: AnyD1Database;
}
export type CustomContext = {
  user?: IJwtUserPayload;
};

export type HonoAppContext = { Bindings: ExtendedEnv; Variables: CustomContext };

export type AppContext = Context<HonoAppContext>;
