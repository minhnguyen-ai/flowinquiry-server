"use server";

import { auth } from "@/auth";
import { BACKEND_API } from "@/lib/constants";
import { Account, accountSchema } from "@/types/accounts";
import { ActionResult, PageableResult } from "@/types/commons";

export const getAccounts = async (): Promise<PageableResult<Account>> => {
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

export const saveOrUpdateAccount = async (
  prevState: ActionResult,
  isEdit: boolean,
  formData: FormData,
): Promise<ActionResult> => {
  const validation = accountSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (validation.success) {
    const session = await auth();
    if (isEdit) {
      console.log(
        "Edit: " + JSON.stringify(Object.fromEntries(formData.entries())),
      );
      const response = await fetch(`${BACKEND_API}/api/accounts/`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
    } else {
      const response = await fetch(`${BACKEND_API}/api/accounts`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
    }

    if (response.ok) {
      return { status: "success" };
    } else {
      return { status: "system_error", text: response.statusText };
    }
  } else {
    return { status: "user_error" };
  }
};

export const findAccount = async (accountId: number): Promise<ActionResult> => {
  const session = await auth();
  const response = await fetch(`${BACKEND_API}/api/accounts/${accountId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${session?.token}`,
    },
  });
  if (response.ok) {
    return { status: "success", value: await response.json() };
  } else {
    return { status: "system_error", text: response.statusText };
  }
};
