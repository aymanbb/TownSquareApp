import { route } from "rwsdk/router";
import { userController } from "../controller/user-controller";

export const userRoutes = [
  route("/api/v1/users", {
    get: async () => Response.json(await userController.list()),
  }),
  route("/api/v1/users/:id", {
    get: async ({ params }) =>
      Response.json(await userController.get(params.id)),
  }),
  route("/api/v1/users/:id/admin", {
    get: async ({ params }) =>
      Response.json(await userController.isAdmin(params.id)),
  }),
];
