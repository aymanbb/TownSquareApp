import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";

//Layout
import { AppLayout } from "@/app/layouts/AppLayout";

// Pages
import { Home } from "@/app/pages";
import { Login } from "@/app/pages/login";
import { Register } from "@/app/pages/register";

import { User } from "@/app/pages/user";
import { Realms } from "@/app/pages/realm/realms";
import { RealmPage } from "@/app/pages/realm/realmPage";
import { RealmPostPage } from "@/app/pages/realm/realmPostPage";

import { About } from "@/app/pages/about";
import { Settings } from "@/app/pages/settings";
import { Support } from "@/app/pages/support";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
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
    layout(AppLayout, [
      route("/", Home),
      route("/about", About),
      route("/login", Login),
      route("/register", Register),
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
      route("/about", About),
      route("/support", Support),
    ]),
  ]),
]);
