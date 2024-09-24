import AccountForm from "@/components/accounts/account-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { findAccountById } from "@/lib/actions/accounts.action";
import { AccountType } from "@/types/accounts";

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
  let account: AccountType | undefined;

  if (params.accountId == "new") {
  } else {
    const { ok, data } = await findAccountById(params.accountId);
    if (ok) {
      account = data as AccountType;
    }
  }

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <AccountForm initialData={account} key={null} />
    </div>
  );
}
