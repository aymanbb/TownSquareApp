"use client";

import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar, Logo } from "@/features/global/components";
import { RealmSideBar } from "@/features/global/components/Aside/Left-SideBar/RealmSideBar";
import { AccountSideBar } from "@/features/global/components/Aside/Right-SideBar/AccountSideBar";
import { useCreateRealmForm } from "@/features/realms/hooks/useCreateRealmForm";
import { authClient } from "@/auth/config/auth-client";
import type { Realm } from "@/features/realms/types/Realm";
import { CreateRealmForm } from "@/features/realms/components/CreateRealmForm";
import { RealmsProvider, useRealms } from "@/features/realms/context/RealmsContext";

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
        className="flex min-h-screen
    relative w-full
    bg-[url('assets/textures/png/BackgroundTexturePanorama.png')]
    bg-cover bg-center
    p-3
     shadow-[0_0_15px_4px_rgba(0,0,0,0.8)]
  "
      >
        <aside className="flex h-screen w-40 flex-col">
          <RealmSideBar onCreateRealmClick={isOpen ? closeForm : openForm} />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>

        {isOpen && (
          <div
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/50
            "
          >
            <CreateRealmForm
              user={user ?? null}
              onRealmCreated={handleRealmCreated}
              onCancel={closeForm}
            />
          </div>
        )}

        <aside className="flex h-screen w-60 flex-col">
          <img
            src="/assets/textures/png/TowerBrickTop.png"
            alt="Profile picture"
            aria-hidden="true"
            className="flex w-full h-40"
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
  )
}