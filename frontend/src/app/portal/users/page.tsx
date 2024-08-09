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
    // const {data:session} = useSession();

    const page = Number(searchParams.page) || 1;
    const pageLimit = Number(searchParams.limit) || 10;
    const country = searchParams.search || null;
    const offset = (page - 1) * pageLimit;

    // useEffect(()=> {
    //     async function fetchUsersInfo() {
    //
    //     }
    // });
    // const res = await fetch(
    //     `http://localhost:8080/api/users`, {
    //         headers: {
    //             'Content-Type':'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'X-TENANT-ID': 'flexwork'
    //         }
    //     }
    // );
    // console.log("RESPONSE " + JSON.stringify(res));
    // if (!res) {
    //     // Return error
    //     return (
    //         <div>Users</div>
    //     );
    // } else {
    //     return (
    //         <div>Users</div>
    //     );
    // }
    return (<div>Users</div>);

}

export default Users;