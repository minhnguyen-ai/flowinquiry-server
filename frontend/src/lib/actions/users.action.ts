"use server";

import { auth } from "@/auth";
import { BACKEND_API } from "@/lib/constants";
import { PageableResult } from "@/types/commons";
import { UserType } from "@/types/users";

export const getUsers = async (): Promise<PageableResult<UserType>> => {
  try {
    const session = await auth();

    console.log(`Token ${JSON.stringify(session)}`);
    const res = await fetch(`${BACKEND_API}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } else {
      console.log("Failed " + res);
      // throw new Error("");
    }
  } catch (error) {
    // throw new Error("Server error");
    console.log("Error " + error);
  }
};
