import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";

//Layout
import { AppLayout } from "@/app/layouts/AppLayout";

// Pages
import { Home } from "@/app/pages";
import { Login } from "@/features/auth/pages/login";
import { Register } from "@/features/auth/pages/register";

import { Leaderboard } from "@/app/pages/leaderboard";
import { User } from "@/app/pages/user";
import { Realms } from "@/app/pages/realm/realms";
import { RealmPage } from "@/app/pages/realm/realmPage";
import { RealmPostPage } from "@/app/pages/realm/realmPostPage";

import { AdminDashboardPage } from "@/features/auth/components/AdminDashBoardPage";

import { About } from "@/app/pages/about";
import { Settings } from "@/app/pages/settings";
import { Support } from "@/app/pages/support";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { AppInfoLayout } from "@/app/layouts/AppInfoLayout";
import { auth } from "./auth/auth";
import { authMiddleware } from "./auth/middleware";
import { requireAdmin } from "../lib/guards";
export type AppContext = {
  // user: SessionUser | null;
};

export default defineApp([
  setCommonHeaders(),
  //setUser
  authMiddleware,

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

  // Routes
  // index page
  render(Document, [
    layout(AuthLayout, [route("/login", Login), route("/register", Register)]),
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
      route("/settings", Settings),
      route("/user/:userId", ({ params }) => (
        <User userId={String(params.userId ?? "")} />
      )),
      route("/leaderboard", Leaderboard),
    ]),
  ]),
]);
