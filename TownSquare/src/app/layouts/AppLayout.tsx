"use client";

import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar } from "@/features/global/components";
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
        <NavBar />
      </Header>

      <div className="flex min-h-screen">
        <aside className="flex h-screen w-40 flex-col">
          <RealmSideBar onCreateRealmClick={isOpen ? closeForm : openForm} />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>

        {isOpen && (
          <CreateRealmForm
            user={user ?? null}
            onRealmCreated={handleRealmCreated}
            onCancel={closeForm}
          />
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