import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar } from "@/features/global/components";
import { RealmSideBar } from "@/features/global/components/Aside/Left-SideBar/RealmSideBar";
import { AccountSideBar } from "@/features/global/components/Aside/Right-SideBar/AccountSideBar";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="app">
      <Header>
        {requestInfo && (
          <span>Path: {new URL(requestInfo.request.url).pathname}</span>
        )}
        <NavBar />
      </Header>

      <div className="flex min-h-screen">
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
