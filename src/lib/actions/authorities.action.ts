"use server";

import { get } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { AuthorityType } from "@/types/users";

export const getAuthorities = async () => {
  return get<Array<AuthorityType>>(`${BACKEND_API}/api/authorities`);
};
