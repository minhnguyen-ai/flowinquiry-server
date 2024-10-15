import { Breadcrumbs } from "@/components/breadcrumbs";
import { TeamList } from "@/components/teams/team-list";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Teams", link: "/portal/teams" },
];

const TeamsIndex = async () => {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <TeamList />
    </div>
  );
};

export default TeamsIndex;
