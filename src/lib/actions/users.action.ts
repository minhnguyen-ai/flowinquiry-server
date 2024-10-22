"use server";

import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { doAdvanceSearch } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { userSchema, UserSearchParams, UserType } from "@/types/users";

export async function searchUsers(input: UserSearchParams) {
  noStore();
  return doAdvanceSearch<UserType>(`${BACKEND_API}/api/users/search`);
}

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
