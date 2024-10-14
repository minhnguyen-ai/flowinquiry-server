import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import AppFooter from "@/components/themes/footer";
import AppHeader from "@/components/themes/header/app-header";
import AppSidebar from "@/components/themes/sidebar/sidebar-main";
import LayoutContentProvider from "@/providers/layout-content-provider";
import LayoutProvider from "@/providers/layout-provider";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <SessionProvider session={session}>
      <LayoutProvider>
        <AppHeader />
        <AppSidebar />
        <LayoutContentProvider>{children}</LayoutContentProvider>
        <AppFooter />
      </LayoutProvider>
    </SessionProvider>
  );
};

export default MainLayout;
