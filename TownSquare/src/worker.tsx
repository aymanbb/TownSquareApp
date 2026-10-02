import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";

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
  render(Document, [route("/", Home)]),
  // Login & Register pages
  render(Document, [route("/login", Login)]),
  render(Document, [route("/register", Register)]),
  // Realms
  render(Document, [route("/realms", Realms)]),
  // A specific realm page
  render(Document, [
    route("/realms/:realmId", ({ params }) => (
      <RealmPage realmId={String(params.realmId ?? "")} />
    )),
  ]),
  // A specific post in a realm
  render(Document, [
    route("/realms/:realmId/:postId", ({ params }) => (
      <RealmPostPage
        realmId={String(params.realmId ?? "")}
        postId={String(params.postId ?? "")}
      />
    )),
  ]),
  // Settings page
  render(Document, [route("/settings", Settings)]),
  // User page
  render(Document, [
    route("/user/:userId", ({ params }) => (
      <User userId={String(params.userId ?? "")} />
    )),
  ]),
  // About and Support pages
  render(Document, [route("/about", About)]),
  render(Document, [route("/support", Support)]),
]);
