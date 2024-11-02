import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
import { UserForm } from "@/components/users/user-form";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Users", link: "/portal/users" },
  { title: "Create", link: "/portal/users/edit/new" },
];

export default function Page() {
  return (
    <SimpleContentView title="Users" breadcrumbItems={breadcrumbItems}>
      <UserForm initialData={null} key={null} />
    </SimpleContentView>
  );
}
