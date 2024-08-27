
import { auth } from "@/auth";
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
  const session = await auth();

  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const pageableResult: PageableResult<UserType> = await getUsers();
  console.log(`Page ${JSON.stringify(pageableResult)}`);

  return <>Users</>;
};

export default Users;
