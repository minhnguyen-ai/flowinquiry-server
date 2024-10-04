import AccountForm from "@/components/accounts/account-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { findAccountById } from "@/lib/actions/accounts.action";
import { deobfuscate } from "@/lib/endecode";
import { AccountType } from "@/types/accounts";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Accounts", link: "/portal/accounts" },
  { title: "Create", link: "/portal/accounts/new" },
];

export default async function Page({
  params,
}: {
  params: { accountId: string | "new" };
}) {
  const { data: account } =
    params.accountId !== "new"
      ? await findAccountById(deobfuscate(params.accountId) as number)
      : { data: undefined as AccountType | undefined };

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <AccountForm initialData={account} />
    </div>
  );
}
