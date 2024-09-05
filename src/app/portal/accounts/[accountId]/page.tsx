import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { findAccount } from "@/lib/actions/accounts.action";
import { AccountType } from "@/types/accounts";
import { ActionResult } from "@/types/commons";

export default async function Page({
  params,
}: {
  params: { accountId: number };
}) {
  let account: AccountType | undefined;
  const result: ActionResult = await findAccount(params.accountId);
  if (result.status == "success") {
    account = result.data as AccountType;
  } else {
    notFound();
  }

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Accounts", link: "/portal/accounts" },
    { title: account.accountName, link: "#" },
  ];
  return (
    <div className="space-y-4 max-w-[72rem]">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="text-2xl">{account.accountName}</div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>Type: {account.accountType}</div>
        <div>Industry: {account.industry}</div>
        <div>Address Line: {account.addressLine1}</div>
        <div>Phone number: {account.phoneNumber}</div>
        <div>Status: {account.status}</div>
      </div>
    </div>
  );
}
