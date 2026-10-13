import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar } from "@/features/global/components";

/*
        {requestInfo && (
          <span>Path: {new URL(requestInfo.request.url).pathname}</span>
        )}
*/

export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="app">
      <Header>
        <NavBar />
      </Header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
