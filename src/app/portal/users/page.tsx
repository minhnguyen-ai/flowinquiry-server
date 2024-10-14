import { formatDistanceToNow } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUsers } from "@/lib/actions/users.action";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/users";

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
  const { ok, data } = await getUsers();
  if (!ok) {
    // throw new Error("Can not load users"); // TODO: fixit
  }

  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;
  const pageableResult = data!;
  const users: UserType[] = pageableResult.content;
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="bg-card px-6 py-6">
        <div className="flex flex-row justify-between">
          <Heading
            title={`Users (${pageableResult.totalElements})`}
            description="Manage users"
          />

          <Link
            href={"/portal/users/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> New User
          </Link>
        </div>
        <Separator />
        <div className="flex flex-row flex-wrap space-x-4 space-y-4 content-around">
          {users?.map((user) => (
            <Card key={user.id} className="w-[28rem]">
              <CardContent className="p-5">
                <div className="flex flex-col">
                  <div className="text-2xl text-amber-500">
                    {user.firstName}, {user.lastName}
                  </div>
                  <div>
                    <b>Email:</b>{" "}
                    <Link href={`mailto:${user.email}`}>{user.email}</Link>
                  </div>
                  <div>Timezone: {user.timezone}</div>
                  <div>
                    Last login time:{" "}
                    {user.lastLoginTime
                      ? formatDistanceToNow(new Date(user.lastLoginTime), {
                          addSuffix: true,
                        })
                      : ""}
                  </div>
                  <div className="flex flex-row space-x-1">
                    Authorities:{" "}
                    <div className="flex flex-row flex-wrap space-x-1">
                      {user.authorities?.map((authority) => (
                        <Badge key={authority.name}>
                          {authority.descriptiveName}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
