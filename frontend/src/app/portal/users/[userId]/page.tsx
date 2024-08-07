import {Breadcrumbs} from "@/components/breadcrumbs";
import {UserForm} from "@/components/forms/user-form";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/portal' },
    { title: 'User', link: '/portal/users' },
    { title: 'Create', link: '/portal/users/new' }
];

export default function Page() {

    return (
        <div className="space-y-4">
            <Breadcrumbs items={breadcrumbItems}/>
            <UserForm
                initialData={null}
                key={null}
            />
        </div>
    );
}