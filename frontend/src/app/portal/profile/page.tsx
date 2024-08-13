import {Breadcrumbs} from "@/components/breadcrumbs";
import {ProfileForm} from "@/components/forms/profile-form";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/portal'},
    {title: 'Profile', link: '/portal/profile'}
];

const ProfilePage = () => {

    return (
        <div className="space-y-4">
            <Breadcrumbs items={breadcrumbItems}/>
            <ProfileForm
                initialData={null}
                key={null}
            />
        </div>
    );
};

export default ProfilePage;