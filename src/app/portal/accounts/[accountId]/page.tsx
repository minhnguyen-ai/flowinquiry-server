import { notFound } from "next/navigation";

import { AccountView } from "@/components/accounts/account-view";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { findAccount } from "@/lib/actions/accounts.action";

export default async function Page({
  params,
}: {
  params: { accountId: number };
}) {
  const { ok, data: account } = await findAccount(params.accountId);
  if (!ok) {
    notFound();
  }

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Accounts", link: "/portal/accounts" },
    { title: account!.accountName, link: "#" },
  ];

  return (
    <div className="space-y-4 max-w-[72rem]">
      <Breadcrumbs items={breadcrumbItems} />
      <AccountView initialData={account!} />
    </div>
  );
}
