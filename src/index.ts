import { fromHono } from "chanfana";
import { Hono } from "hono";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { userRoutes } from "./app/routes/usersRoutes";
import { GetUsers } from "./endpoints/getUsers";

const app = new Hono<{ Bindings: Env }>();
// app.route("/users", userRoutes);

// Setup OpenAPI registry
export const openapi = fromHono(app, {
  base: "/api",
  docs_url: "/",
});

// Register OpenAPI endpoints
openapi.route("/users", userRoutes);

export default app;
