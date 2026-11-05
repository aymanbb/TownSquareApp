"use client";

import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, Logo } from "@/features/global/components";
import { NavBar } from "@/features/global/components/NavBar/NavBar";

import { RealmSideBar } from "@/features/global/components/Aside/Left-SideBar/RealmSideBar";
import { AccountSideBar } from "@/features/global/components/Aside/Right-SideBar/AccountSideBar";
import { useCreateRealmForm } from "@/features/realms/hooks/useCreateRealmForm";
import { authClient } from "@/auth/config/auth-client";
import type { Realm } from "@/features/realms/types/Realm";
import { CreateRealmForm } from "@/features/realms/components/CreateRealmForm";
import {
  RealmsProvider,
  useRealms,
} from "@/features/realms/context/RealmsContext";

function AppLayoutInner({ children, requestInfo }: LayoutProps) {
  const { isOpen, openForm, closeForm } = useCreateRealmForm();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { addRealm } = useRealms();

  function handleRealmCreated(created: Realm) {
    console.log("Realm created in layout: ", created);
    addRealm(created);
  }

  return (
    <div className="app">
      <Header>
        <Logo />
        <NavBar />
      </Header>

      <div
        className="grid min-h-screen grid-cols-1 gap-3
    md:grid-cols-[10rem_minmax(0,1fr)]
    lg:grid-cols-[10rem_minmax(0,1fr)_15rem]
    relative w-full
    bg-[url('assets/textures/png/BackgroundTexturePanorama.png')]
    bg-cover bg-center
    p-3
     shadow-[0_0_15px_4px_rgba(0,0,0,0.8)]
  "
      >
        <aside className="order-2 flex flex-col md:order-none md:h-screen short:h-auto">
          <RealmSideBar onCreateRealmClick={isOpen ? closeForm : openForm} />
        </aside>

        <main className="order-1 min-w-0 md:order-none">{children}</main>

        {isOpen && (
          <div
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/50 p-4
              overflow-y-auto
            "
          >
            <CreateRealmForm
              user={user ?? null}
              onRealmCreated={handleRealmCreated}
              onCancel={closeForm}
            />
          </div>
        )}

        <aside className="order-3 flex flex-col md:col-span-2 lg:col-span-1 lg:order-none lg:h-screen">
          <img
            src="/assets/textures/png/TowerBrickTop.png"
            alt="Profile picture"
            aria-hidden="true"
            className="hidden w-full h-40 lg:flex"
          />
          <AccountSideBar />
        </aside>
      </div>
      <Footer />
    </div>
  );
}

export function AppLayout({ children }: LayoutProps) {
  return (
    <RealmsProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </RealmsProvider>
  );
}
