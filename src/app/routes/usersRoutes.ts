import { Hono } from "hono";

import { GetUsers } from "../../endpoints/getUsers";
import { fromHono } from "chanfana";

const userRoutes = fromHono(new Hono());

userRoutes.get("/", GetUsers);

export { userRoutes };
