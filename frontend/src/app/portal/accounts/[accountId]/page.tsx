import AccountForm from "@/components/accounts/account-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { findAccount } from "@/lib/actions/accounts.action";
import { Account } from "@/types/accounts";
import { ActionResult } from "@/types/commons";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Accounts", link: "/portal/accounts" },
  { title: "Create", link: "/portal/accounts/new" },
];

export default async function Page({
  params,
}: {
  params: { accountId: number | "new" };
}) {
  let account: Account | undefined;

  if (params.accountId == "new") {
  } else {
    const result: ActionResult = await findAccount(params.accountId);
    if (result.status == "success") {
      account = result.value as Account;
      console.log(`Account ${JSON.stringify(account)}`);
    }
  }

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <AccountForm initialData={account} key={null} />
    </div>
  );
}
