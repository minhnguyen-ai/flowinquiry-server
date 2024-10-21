import { Breadcrumbs } from "@/components/breadcrumbs";
import { UserForm } from "@/components/users/user-form";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Users", link: "/portal/users" },
  { title: "Create", link: "/portal/users/edit/new" },
];

export default function Page() {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <UserForm initialData={null} key={null} />
    </div>
  );
}
