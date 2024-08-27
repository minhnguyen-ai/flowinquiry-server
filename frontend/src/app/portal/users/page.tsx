import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div>
      {users?.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>
              {user.firstName}, {user.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            Email: <Link href={`email:${user.email}`}>{user.email}</Link>
            Timezone: {user.timezone}
            Last Login time:{" "}
            {user.lastLoginTime
              ? formatDistanceToNow(user.lastLoginTime, { addSuffix: true })
              : ""}
            Authorities:{" "}
            {user.authorities?.map((authority) => (
              <Badge>{authority.name}</Badge>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Users;
