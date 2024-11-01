"use server";

import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
import { redirect } from "next/navigation";

import { doAdvanceSearch, get, post, put } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { PageableResult } from "@/types/commons";
import { Filter, Pagination } from "@/types/query";
import { teamSchema, TeamType } from "@/types/teams";
import { UserType } from "@/types/users";

export const findTeamById = async (teamId: number) => {
  return get<TeamType>(`${BACKEND_API}/api/teams/${teamId}`);
};

export const saveOrUpdateTeam = async (
  isEdit: boolean,
  team: TeamType,
): Promise<void> => {
  const validation = teamSchema.safeParse(team);

  if (validation.success) {
    if (isEdit) {
      await put<TeamType, string>(`${BACKEND_API}/api/teams/${team.id}`, team);
    } else {
      await post<TeamType, string>(`${BACKEND_API}/api/teams`, team);
    }

    redirect("/portal/teams");
  }
};

export async function searchTeams(
  filters: Filter[] = [],
  pagination: Pagination,
) {
  noStore();
  return doAdvanceSearch<TeamType>(
    `${BACKEND_API}/api/teams/search`,
    filters,
    pagination,
  );
}

export async function findMembersByTeamId(teamId: number) {
  return get<PageableResult<UserType>>(
    `${BACKEND_API}/api/teams/${teamId}/members`,
  );
}
