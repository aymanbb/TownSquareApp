import { route } from "rwsdk/router";
import { userController } from "../controller/user-controller";
import type { Result } from "@/features/utils/Result";

// Setter HTTP-statusen ut fra resultatet, så feil ikke blir sendt som 200 OK
const toResponse = (result: Result<unknown>) =>
  Response.json(result, {
    status: result.success ? 200 : (result.error.code ?? 500),
  });

export const userRoutes = [
  route("/api/v1/users", {
    get: async () => toResponse(await userController.list()),
  }),
  route("/api/v1/users/:id", {
    get: async ({ params }) => toResponse(await userController.get(params.id)),
  }),
  route("/api/v1/users/name/:name", {
    // rwsdk dekoder ikke params, så "Bj%C3%B8rn" må gjøres om til "Bjørn"
    get: async ({ params }) =>
      toResponse(await userController.getByName(params.name)),
  }),

  route("/api/v1/users/:id/admin", {
    get: async ({ params }) =>
      toResponse(await userController.isAdmin(params.id)),
  }),
];
