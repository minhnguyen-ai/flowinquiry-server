import AccountForm from "@/components/accounts/account-form";
import { Breadcrumbs } from "@/components/breadcrumbs";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Accounts", link: "/portal/accounts" },
  { title: "Create", link: "/portal/accounts/new" },
];

export default function Page() {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <AccountForm initialData={null} key={null} />
    </div>
  );
}
