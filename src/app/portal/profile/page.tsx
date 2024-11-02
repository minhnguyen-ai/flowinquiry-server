import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
import { ProfileForm } from "@/components/forms/profile-form";
import { BACKEND_API } from "@/lib/constants";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Profile", link: "/portal/profile" },
];

const ProfilePage = () => {
  console.log(`Resource server ${BACKEND_API}`);
  return (
    <SimpleContentView title="Profile" breadcrumbItems={breadcrumbItems}>
      <ProfileForm resourceServer={`${BACKEND_API}/api/files`} key={null} />
    </SimpleContentView>
  );
};

export default ProfilePage;
