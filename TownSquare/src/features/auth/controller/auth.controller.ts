import { registerSchema } from "../types/auth.registerschema";
import { UsernameTakenError, EmailTakenError } from "../service/auth.errors";
import type { AuthService } from "../service/auth.service";

export const createAuthController = (authService: AuthService) => ({
  register: async (request: Request): Promise<Response> => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ message: "Invalid JSON" }, { status: 400 });
    }

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    try {
      const user = await authService.register(parsed.data);
      return Response.json(user, { status: 201 });
    } catch (e) {
      if (e instanceof UsernameTakenError || e instanceof EmailTakenError) {
        return Response.json({ message: e.message }, { status: 409 });
      }
      console.error("register failed", e);
      return Response.json({ message: "Something went wrong" }, { status: 500 });
    }
  },
});