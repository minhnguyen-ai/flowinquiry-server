import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
import { TeamForm } from "@/components/teams/team-form";

const breadcrumbItems = [
  { title: "Dashboard", link: "/portal" },
  { title: "Teams", link: "/portal/teams" },
  { title: "Create", link: "/portal/teams/new" },
];

const Page = () => {
  return (
    <SimpleContentView title="Teams" breadcrumbItems={breadcrumbItems}>
      <TeamForm initialData={undefined} />
    </SimpleContentView>
  );
};

export default Page;
