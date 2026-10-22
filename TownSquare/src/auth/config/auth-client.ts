// This file creates and exports a singleton instance of the Better Auth client.
// authclient is used to interact with the Better Auth API from the client side.
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();
