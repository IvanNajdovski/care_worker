import { Context } from 'hono';

interface IUpdatedContext {
  _headers: any;
  _userGroups: any[];
}

export interface IExtendedContext extends Context, IUpdatedContext {}
