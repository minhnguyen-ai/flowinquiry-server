"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { fetchData } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { PageableResult } from "@/types/commons";
import { userSchema, UserType } from "@/types/users";

export const getUsers = async () => {
  return fetchData<PageableResult<UserType>>(`${BACKEND_API}/api/users`);
};

export const createUser = async (user: UserType) => {
  const validation = userSchema.safeParse(user);
  if (validation.success) {
    const session = await auth();
    const response = await fetch(`${BACKEND_API}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      redirect("/portal/users");
    } else {
      return { ok: true, status: "system_error", message: response.statusText };
    }
  } else {
    return { ok: false, status: "user_error" };
  }
};
