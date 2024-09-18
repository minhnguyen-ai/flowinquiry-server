"use server";

import { fetchData } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { PageableResult } from "@/types/commons";
import { UserType } from "@/types/users";

export const getUsers = async () => {
  return fetchData<PageableResult<UserType>>(`${BACKEND_API}/api/users`);
};
