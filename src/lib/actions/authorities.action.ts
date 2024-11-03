"use server";

import { get, post } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { AuthorityType } from "@/types/authorities";
import { PageableResult } from "@/types/commons";

export const getAuthorities = async () => {
  return get<PageableResult<AuthorityType>>(`${BACKEND_API}/api/authorities`);
};

export const findAuthorityByName = async (name: string) => {
  return get<AuthorityType>(`${BACKEND_API}/api/authorities/${name}`);
};

export const createAuthority = async (authority: AuthorityType) => {
  return post<AuthorityType, AuthorityType>(
    `${BACKEND_API}/api/authorities`,
    authority,
  );
};
