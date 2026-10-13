import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar } from "@/features/global/components";

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
