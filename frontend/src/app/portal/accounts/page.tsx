import {auth} from "@/auth";
import {BACKEND_API} from "@/lib/constants";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {Heading} from "@/components/heading";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {columns} from "@/components/tables/user-tables/columns";
import {AccountTable} from "@/components/tables/account-tables/account-table";


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

    const res = await fetch(
        `${BACKEND_API}/api/accounts`, {
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${session.token}`
            }
        }
    ).catch((error) => console.error("Error fetching data", error));

    if (!res) {
        return (
            <div>Users: Can not load data</div>
        );
    } else {
        const accounts = res.json();
        const totalUsers = 100; //1000
        const pageCount = Math.ceil(totalUsers / pageLimit);
        return (
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems}/>

                <div className="flex items-start justify-between">
                    <Heading
                        title={`Users (${totalUsers})`}
                        description="Manage users"
                    />

                    <Link
                        href={'/portal/users/new'}
                        className={cn(buttonVariants({variant: 'default'}))}
                    >
                        <Plus className="mr-2 h-4 w-4"/> Add New
                    </Link>
                </div>
                <Separator/>

                <AccountTable
                    searchKey="email"
                    pageNo={page}
                    columns={columns}
                    totalUsers={totalUsers}
                    data={accounts}
                    pageCount={pageCount}
                />
            </div>
        );
    }
}

export default Accounts;