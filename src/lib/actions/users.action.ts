"use server";

import { auth } from "@/auth";
import { BACKEND_API } from "@/lib/constants";
import { ActionResult } from "@/types/commons";

export const getUsers = async (): Promise<ActionResult> => {
  const session = await auth();

  const res = await fetch(`${BACKEND_API}/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${session.token}`,
    },
  });
  if (res.ok) {
    return {
      ok: true,
      status: "success",
      data: await res.json(),
    };
  } else {
    return {
      ok: false,
      status: "user_error",
      message: `Can not get the users ${res.status}`,
    };
  }
};
