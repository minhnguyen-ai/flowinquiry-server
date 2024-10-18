import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import TeamView from "@/components/teams/team-view";
import { findTeamById } from "@/lib/actions/teams.action";
import { deobfuscateToNumber } from "@/lib/endecode";

const Page = async ({ params }: { params: { teamId: string } }) => {
  const { ok, data: team } = await findTeamById(
    deobfuscateToNumber(params.teamId),
  );
  if (!ok || !team) {
    notFound();
  }

  const breadcrumbItems = [
    { title: "Dashboard", link: "/portal" },
    { title: "Teams", link: "/portal/teams" },
    { title: team.name, link: "#" },
  ];

  return (
    <div className="space-y-4 max-w-[72rem]">
      <Breadcrumbs items={breadcrumbItems} />
      <TeamView initialData={team} />
    </div>
  );
};

export default Page;
