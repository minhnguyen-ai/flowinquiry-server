import { notFound } from "next/navigation";

import { AccountView } from "@/components/accounts/account-view";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { findAccountById } from "@/lib/actions/accounts.action";
import { deobfuscateToNumber } from "@/lib/endecode";

export default async function Page({
  params,
}: {
  params: { accountId: string };
}) {
  const account = await findAccountById(deobfuscateToNumber(params.accountId));
  if (!account) {
    notFound();
  }

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Accounts", link: "/portal/accounts" },
    { title: account.name, link: "#" },
  ];

  return (
    <div className="space-y-4 max-w-[72rem]">
      <Breadcrumbs items={breadcrumbItems} />
      <AccountView entity={account} />
    </div>
  );
}
