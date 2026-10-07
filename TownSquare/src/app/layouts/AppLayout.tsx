import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar } from "@/features/global/components";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="app">
      <Header>
        <img src="/assets/icons/svg/logo.svg" alt="Application's Logo" />
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
