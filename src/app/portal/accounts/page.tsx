import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Heading } from "@/components/heading";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAccounts } from "@/lib/actions/accounts.action";
import { cn } from "@/lib/utils";
import { AccountType } from "@/types/accounts";
import { PageableResult} from "@/types/commons";
import {DataTable} from "@/components/ui/ext-data-table";
import {columns} from "@/components/accounts/account-table-columns";

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
    const {ok, data} = await getAccounts();
    if (!ok) {
        throw new Error("Failed to load accounts")
    }
    const page = Number(searchParams.page) || 1;
    console.log("Data " + JSON.stringify(data));
    const pageLimit = data.size || 1;
    const totalElements = data.totalElements;
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
            <DataTable columns={columns} data={data.content} />
        </div>
    );
};

export default AccountsPage;