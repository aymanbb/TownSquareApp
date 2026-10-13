import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar } from "@/features/global/components";
import { SideBar } from "@/features/global/components/Aside/SideBar";

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
        <aside className="flex h-screen w-36 flex-col">
          <SideBar />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
