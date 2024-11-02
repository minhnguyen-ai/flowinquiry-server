import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <SessionProvider session={session}>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </SessionProvider>
  );
};

export default MainLayout;
