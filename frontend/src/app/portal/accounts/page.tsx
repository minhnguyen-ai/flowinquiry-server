import {auth} from "@/auth";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {Heading} from "@/components/heading";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {AccountTable} from "@/components/tables/account-tables/account-table";
import {getAccounts} from "@/lib/actions/accounts.action";
import {columns} from "@/components/tables/account-tables/columns";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/portal' },
    { title: 'Accounts', link: '/portal/accounts' }
];

type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};

const Accounts = async ({searchParams}: paramsProps) => {
    const session = await auth();

    const page = Number(searchParams.page) || 1;
    const pageLimit = Number(searchParams.limit) || 10;
    const country = searchParams.search || null;
    const offset = (page - 1) * pageLimit;

    const accounts = getAccounts()

    const totalUsers = 100; //1000
    const pageCount = Math.ceil(totalUsers / pageLimit);
    return (
        <div className="space-y-4">
            <Breadcrumbs items={breadcrumbItems}/>

            <div className="flex items-start justify-between">
                <Heading
                    title={`Accounts (${totalUsers})`}
                    description="Manage accounts"
                />

                <Link
                    href={'/portal/accounts/new'}
                    className={cn(buttonVariants({variant: 'default'}))}
                >
                    <Plus className="mr-2 h-4 w-4"/> Add New
                </Link>
            </div>
            <Separator/>

            <AccountTable
                searchKey="name"
                pageNo={page}
                columns={columns}
                totalUsers={totalUsers}
                data={accounts}
                pageCount={pageCount}
            />
        </div>
    );
}

export default Accounts;