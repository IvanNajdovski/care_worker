// hono.d.ts
import 'hono';

import { IJwtUserPayload } from './src/models/interfaces';

declare module 'hono' {
  interface ContextVariableMap {
    user: IJwtUserPayload;
  }
}
