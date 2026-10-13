import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar } from "@/features/global/components";

export function AppInfoLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="app">
      <Header>
        {requestInfo && (
          <span>Path: {new URL(requestInfo.request.url).pathname}</span>
        )}
        <NavBar />
      </Header>

      <main className="min-w-0 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
