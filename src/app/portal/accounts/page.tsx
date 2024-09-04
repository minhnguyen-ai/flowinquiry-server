import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/heading";
import { columns } from "@/components/tables/account-tables/columns";
import { DataTable } from "@/components/tables/data-table";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAccounts } from "@/lib/actions/accounts.action";
import { cn } from "@/lib/utils";
import { AccountType } from "@/types/accounts";
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
  const pageableResult: PageableResult<AccountType> = await getAccounts();
  const page = Number(searchParams.page) || 1;
  const pageLimit = pageableResult.size || 1;
  const totalElements = pageableResult.totalElements;
  const pageCount = Math.ceil(totalElements / pageLimit);
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-row justify-between">
        <Heading
          title={`Accounts (${totalElements})`}
          description="Manage accounts"
        />

        <Link
          href={"/portal/accounts/new/edit"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="mr-2 h-4 w-4" /> New Account
        </Link>
      </div>
      <Separator />
      <DataTable columns={columns} data={pageableResult.content} />
    </div>
  );
};

export default AccountsPage;
