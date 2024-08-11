import UserList from "@/components/users/UserList";
import {User} from "@/types/User";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {Heading} from "@/components/heading";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {UserTable} from "@/components/tables/user-tables/user-table";
import {columns} from "@/components/tables/user-tables/columns";
import {toast} from "@/components/ui/use-toast";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {auth} from "@/auth";
import {BACKEND_API} from "@/lib/constants";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/portal' },
    { title: 'Users', link: '/portal/users' }
];

type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};


const Users = async ({searchParams}: paramsProps) => {
    const session = await auth();

    const page = Number(searchParams.page) || 1;
    const pageLimit = Number(searchParams.limit) || 10;
    const country = searchParams.search || null;
    const offset = (page - 1) * pageLimit;

    const res = await fetch(
        `${BACKEND_API}/api/users`, {
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${session.token}`
            }
        }
    );

    if (!res) {
        // Return error
        return (
            <div>Users: Can not load</div>
        );
    } else {
        const users = await res.json();
        console.log(`Users ${JSON.stringify(users)}`);
        return (
            <div>Load users ${JSON.stringify(users)}</div>
        );
    }

}

export default Users;