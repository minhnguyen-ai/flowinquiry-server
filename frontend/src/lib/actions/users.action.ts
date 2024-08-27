"use server";

import { auth } from "@/auth";
import { BACKEND_API } from "@/lib/constants";
import { AccountType } from "@/types/accounts";
import { PageableResult } from "@/types/commons";

export const getUsers = async (): Promise<PageableResult<AccountType>> => {
  try {
    const session = await auth();

    console.log(`Token ${JSON.stringify(session)}`);
    const res = await fetch(`${BACKEND_API}/api/accounts`, {
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
