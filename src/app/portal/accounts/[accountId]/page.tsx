import { notFound } from "next/navigation";

import { AccountView } from "@/components/accounts/account-view";
import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
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
    <SimpleContentView title="Accounts" breadcrumbItems={breadcrumbItems}>
      <AccountView entity={account} />
    </SimpleContentView>
  );
}
