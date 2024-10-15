import { Breadcrumbs } from "@/components/breadcrumbs";
import { TeamForm } from "@/components/teams/team-form";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Teams", link: "/portal/teams" },
  { title: "Create", link: "/portal/teams/new" },
];

const Page = () => {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <TeamForm initialData={undefined} />
    </div>
  );
};

export default Page;
