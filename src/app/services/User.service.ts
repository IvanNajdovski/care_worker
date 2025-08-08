import { Context } from "hono";

export class UserService {
  constructor() {}

  public getUsers = async (c: Context) => {
    try {
      const { results } = await c.env.CARE_DB.prepare(
        `SELECT * FROM users;`
      ).all();
      return results;
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error.response);
    }
  };
}
