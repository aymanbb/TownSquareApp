import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar } from "@/features/global/components";
import { SideBar } from "@/features/global/components/Aside/SideBar";

export function AuthLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="app">
      <Header>
        {requestInfo && (
          <span>Path: {new URL(requestInfo.request.url).pathname}</span>
        )}
        <NavBar />
      </Header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
