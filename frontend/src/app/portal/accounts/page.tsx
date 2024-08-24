import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/heading";
import { AccountTable } from "@/components/tables/account-tables/account-table";
import { columns } from "@/components/tables/account-tables/columns";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAccounts } from "@/lib/actions/accounts.action";
import { cn } from "@/lib/utils";
import { Account } from "@/types/accounts";
import { PageableResult } from "@/types/commons";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Accounts", link: "/portal/accounts" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const AccountsPage = async ({ searchParams }: paramsProps) => {
  const session = await auth();

  const pageableResult: PageableResult<Account> = await getAccounts();

  const page = Number(searchParams.page) || 1;
  const pageLimit = pageableResult.size;
  const totalElements = pageableResult.totalElements;
  const pageCount = Math.ceil(totalElements / pageLimit);
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Accounts (${totalElements})`}
          description="Manage accounts"
        />

        <Link
          href={"/portal/accounts/new"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Separator />

      <AccountTable
        searchKey="name"
        pageNo={page}
        columns={columns}
        totalUsers={totalElements}
        data={pageableResult.content}
        pageCount={pageCount}
      />
    </div>
  );
};

export default AccountsPage;
