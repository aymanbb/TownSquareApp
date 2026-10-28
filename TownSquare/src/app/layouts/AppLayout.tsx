import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, Logo } from "@/features/global/components";
import { NavBar } from "@/features/global/components/NavBar/NavBar";

import { RealmSideBar } from "@/features/global/components/Aside/Left-SideBar/RealmSideBar";
import { AccountSideBar } from "@/features/global/components/Aside/Right-SideBar/AccountSideBar";

/*
        {requestInfo && (
          <span>Path: {new URL(requestInfo.request.url).pathname}</span>
        )}
*/

export function AppLayout({ children, requestInfo }: LayoutProps) {
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
          <RealmSideBar />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
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
