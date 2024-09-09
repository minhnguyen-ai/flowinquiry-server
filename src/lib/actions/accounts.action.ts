"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { BACKEND_API } from "@/lib/constants";
import { accountSchema, AccountType } from "@/types/accounts";
import { ActionResult } from "@/types/commons";

export const getAccounts = async (): Promise<ActionResult> => {
  const session = await auth();

  const res = await fetch(`${BACKEND_API}/api/crm/accounts`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${session?.user?.accessToken}`,
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

export const saveOrUpdateAccount = async (
  prevState: ActionResult,
  isEdit: boolean,
  account: AccountType,
): Promise<ActionResult> => {
  const validation = accountSchema.safeParse(account);

  if (validation.success) {
    let response;
    const session = await auth();
    if (isEdit) {
      response = await fetch(`${BACKEND_API}/api/crm/accounts/${account.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(account),
      });
    } else {
      response = await fetch(`${BACKEND_API}/api/crm/accounts`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(account),
      });
    }

    if (response.ok) {
      redirect("/portal/accounts");
    } else {
      return { status: "system_error", message: response.statusText };
    }
  } else {
    return { status: "user_error" };
  }
};

export const findAccount = async (accountId: number): Promise<ActionResult> => {
  const session = await auth();
  const response = await fetch(`${BACKEND_API}/api/crm/accounts/${accountId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });
  if (response.ok) {
    return { status: "success", value: await response.json() };
  } else {
    return { status: "system_error", message: response.statusText };
  }
};
