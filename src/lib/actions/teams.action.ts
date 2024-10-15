"use server";

import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
import { redirect } from "next/navigation";
import qs from "qs";

import { get, post, put } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { ActionResult, PageableResult } from "@/types/commons";
import { teamSchema, TeamSearchParams, TeamType } from "@/types/teams";

export const findTeamById = async (teamId: number) => {
  return get<TeamType>(`${BACKEND_API}/api/teams/${teamId}`);
};

export const saveOrUpdateTeam = async (
  isEdit: boolean,
  team: TeamType,
): Promise<ActionResult<string>> => {
  const validation = teamSchema.safeParse(team);

  if (validation.success) {
    let response: ActionResult<string>;
    if (isEdit) {
      response = await put<TeamType, string>(
        `${BACKEND_API}/api/teams/${team.id}`,
        team,
      );
    } else {
      response = await post<TeamType, string>(`${BACKEND_API}/api/teams`, team);
    }

    if (response.ok) {
      redirect("/portal/teams");
    } else {
      return response;
    }
  } else {
    return { ok: false, status: "user_error", message: "Validation failed" };
  }
};

export async function searchTeams(input: TeamSearchParams) {
  noStore();
  return get<PageableResult<TeamType>>(
    `${BACKEND_API}/api/teams?${qs.stringify(input)}`,
  );
}
