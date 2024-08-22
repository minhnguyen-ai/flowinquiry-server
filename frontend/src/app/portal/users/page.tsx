import UsersList from "@/components/users/users-list";
import { User } from "@/types/commons";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/heading";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UserTable } from "@/components/tables/user-tables/user-table";
import { columns } from "@/components/tables/user-tables/columns";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import { BACKEND_API } from "@/lib/constants";

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
  const session = await auth();

  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(`${BACKEND_API}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${session.token}`,
    },
  }).catch((error) => console.error("Error fetching data", error));

  if (!res) {
    return <div>Users: Can not load data</div>;
  } else {
    const users = res.json();
    const totalUsers = 100; //1000
    const pageCount = Math.ceil(totalUsers / pageLimit);
    return (
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`Users (${totalUsers})`} description="Manage users" />

          <Link
            href={"/portal/users/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <UserTable
          searchKey="email"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={users}
          pageCount={pageCount}
        />
      </div>
    );
  }
};

export default Users;
