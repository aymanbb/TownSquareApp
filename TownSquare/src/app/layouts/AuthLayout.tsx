import type { LayoutProps } from "rwsdk/router";
import { Header, Footer, NavBar, Logo } from "@/features/global/components";

export function AuthLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="app">
      <Header>
        {requestInfo && (
          <span>Path: {new URL(requestInfo.request.url).pathname}</span>
        )}
        <Logo />
        <NavBar />
      </Header>
      <main
        className="flex min-h-screen
    relative w-full
    bg-[url('assets/textures/png/LoginPageBackground.png')]
    bg-cover bg-center
    p-3
     shadow-[0_0_15px_4px_rgba(0,0,0,0.8)]"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
