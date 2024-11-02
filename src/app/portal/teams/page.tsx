import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
import { TeamList } from "@/components/teams/team-list";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Teams", link: "/portal/teams" },
];

const TeamsIndex = async () => {
  return (
    <SimpleContentView title="Teams" breadcrumbItems={breadcrumbItems}>
      <TeamList />
    </SimpleContentView>
  );
};

export default TeamsIndex;
