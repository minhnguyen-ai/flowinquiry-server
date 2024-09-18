import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProfileForm } from "@/components/forms/profile-form";
import { BACKEND_API } from "@/lib/constants";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Profile", link: "/portal/profile" },
];

const ProfilePage = () => {
  console.log(`Resource server ${BACKEND_API}`);
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <ProfileForm resourceServer={`${BACKEND_API}/api/files`} key={null} />
    </div>
  );
};

export default ProfilePage;
