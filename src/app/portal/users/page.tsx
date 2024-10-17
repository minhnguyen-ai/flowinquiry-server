import { Breadcrumbs } from "@/components/breadcrumbs";
import { UserList } from "@/components/users/users-list";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Users", link: "/portal/users" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Users = async ({ searchParams }: paramsProps) => {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <UserList />
    </div>
  );
};

export default Users;
