import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";

//Layout
import { AppLayout } from "@/app/layouts/AppLayout";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { AppInfoLayout } from "@/app/layouts/AppInfoLayout";

// Pages
import { Home } from "@/app/pages";
import { Login } from "@/features/auth/pages/login";
import { Register } from "@/features/auth/pages/register";

import { Leaderboard } from "@/app/pages/leaderboard";
import { UserPage } from "@/app/pages/user";
import { Realms } from "@/app/pages/realm/realms";
import { RealmPage } from "@/app/pages/realm/realmPage";
import { RealmPostPage } from "@/app/pages/realm/realmPostPage";

import { AdminDashboardPage } from "@/features/auth/components/AdminDashBoardPage";

import { About } from "@/app/pages/about";
import { Settings } from "@/app/pages/settings";
import { Support } from "@/app/pages/support";

// Auth configuration and middleware
import { auth } from "./auth/config/auth-config";
import { authMiddleware } from "./auth/config/middleware";
import { requireAdmin, requireUser, redirectIfLoggedIn } from "../lib/guards";

//api endpoints
import { postRoutes } from "@/features/posts/routes/post-routes";
import { userRoutes } from "@/features/auth/routes/user-routes";
import { realmRoutes } from "@/features/realms/routes/realm-routes";
export type AppContext = {
  // user: SessionUser | null;
};

export default defineApp([
  setCommonHeaders(),
  //setUser
  authMiddleware,
  // Routes/ API-endepunkter
  ...postRoutes,
  ...userRoutes,
  ...realmRoutes,
  route("/api/auth/*", async ({ request }) => {
    try {
      const res = await auth.handler(request);
      if (res.status >= 500)
        console.error("AUTH 500:", await res.clone().text());
      return res;
    } catch (e) {
      console.error("AUTH CRASH:", e);
      console.error("CAUSE:", (e as any)?.cause);
      throw e;
    }
  }),

  route("/admin", [
    () => {
      requireAdmin();
    },
    AdminDashboardPage,
  ]),

  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  /*
    We set up the routes for our application here. 
    Each route is defined using the `route` function, 
    which takes a path and a component to render for that path. 
    The `render` function is used to render the component within the `Document` layout.
  */

  // index page
  render(Document, [
    layout(AuthLayout, [
      route("/login", [
        () => {
          return redirectIfLoggedIn();
        },
        Login,
      ]),
      route("/register", [
        () => {
          return redirectIfLoggedIn();
        },
        Register,
      ]),
    ]),
    layout(AppInfoLayout, [route("/about", About), route("/support", Support)]),
    layout(AppLayout, [
      route("/", Home),
      route("/about", About),

      route("/realms", Realms),
      route("/realms/:realmId", ({ params }) => (
        <RealmPage realmId={String(params.realmId ?? "")} />
      )),
      route("/realms/:realmId/:postId", ({ params }) => (
        <RealmPostPage
          realmId={String(params.realmId ?? "")}
          postId={String(params.postId ?? "")}
        />
      )),
      route("/leaderboard", Leaderboard),
      route("/settings", [
        () => {
          requireUser();
        },
        Settings,
      ]),
      route("/user/:id", ({ params }) => (
        <UserPage userName={String(params.id ?? "")} />
      )),
    ]),
  ]),
]);
