import { openapi } from "../../..";
import { GetUsers } from "./endpoints/getUsers";

openapi.get("/users", GetUsers);
