"use server";

import { fetchData } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { AuthorityType } from "@/types/users";

export const getAuthorities = async () => {
  return fetchData<Array<AuthorityType>>(`${BACKEND_API}/api/authorities`);
};
