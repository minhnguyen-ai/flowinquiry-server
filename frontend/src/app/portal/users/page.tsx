import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getUsers } from "@/lib/actions/users.action";
import { PageableResult } from "@/types/commons";
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
  const pageableResult: PageableResult<UserType> = await getUsers();
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;
  console.log(`Page ${JSON.stringify(pageableResult)}`);
  const users: UserType[] = pageableResult.content;
  return (
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
                    <Badge key={authority.name}>{authority.name}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Users;
