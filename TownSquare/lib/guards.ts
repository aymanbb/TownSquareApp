// src/shared/lib/guards.ts
// global middleware guards for authentication and authorization.
// Middleware guards for autentisering og autorisasjon.
import { ErrorResponse, requestInfo } from "rwsdk/worker";

export function requireUser() {
  // Sjekker om brukeren er logget inn.
  const { ctx } = requestInfo;
  if (!ctx.user) {
    throw new ErrorResponse(401, "Error: 401 - Innlogging kreves");
  }
  return ctx.user;
}

export function requireAdmin() {
  // Sjekker om brukeren har admin-rolle.
  const user = requireUser();
  if (user.role !== "admin") {
    throw new ErrorResponse(403, "Error: 403 - Kun admin har tilgang");
  }
  return user;
}

export function redirectIfLoggedIn(to = "/") {
  const { ctx } = requestInfo;
  if (ctx.user) {
    return new Response(null, { status: 302, headers: { Location: to } });
  }
}
