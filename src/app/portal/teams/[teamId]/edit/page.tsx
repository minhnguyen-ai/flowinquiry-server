import { SimpleContentView } from "@/components/admin-panel/simple-content-view";
import { TeamForm } from "@/components/teams/team-form";
import { findTeamById } from "@/lib/actions/teams.action";
import { deobfuscateToNumber } from "@/lib/endecode";

export default async function Page({
  params,
}: {
  params: { teamId: string | "new" };
}) {
  const team =
    params.teamId !== "new"
      ? await findTeamById(deobfuscateToNumber(params.teamId))
      : undefined;

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Teams", link: "/portal/teams" },
    { title: `${team ? `Edit ${team.name}` : "Create"}`, link: "#" },
  ];

  return (
    <SimpleContentView title="Teams" breadcrumbItems={breadcrumbItems}>
      <TeamForm initialData={team} />
    </SimpleContentView>
  );
}
