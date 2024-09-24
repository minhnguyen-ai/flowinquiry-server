"use server";

import { redirect } from "next/navigation";

import { get, post, put } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { accountSchema, AccountType } from "@/types/accounts";
import { ActionResult, PageableResult } from "@/types/commons";

export const findAccounts = async (): Promise<
  ActionResult<PageableResult<AccountType>>
> => {
  return get<PageableResult<AccountType>>(`${BACKEND_API}/api/crm/accounts`);
};

export const saveOrUpdateAccount = async (
  prevState: String,
  isEdit: boolean,
  account: AccountType,
): Promise<ActionResult<string>> => {
  const validation = accountSchema.safeParse(account);

  if (validation.success) {
    let response: ActionResult<string>;
    if (isEdit) {
      response = await put<AccountType, string>(
        `${BACKEND_API}/api/crm/accounts/${account.id}`,
        account,
      );
    } else {
      response = await post<AccountType, string>(
        `${BACKEND_API}/api/crm/accounts`,
        account,
      );
    }

    if (response.ok) {
      redirect("/portal/accounts");
    } else {
      return response;
    }
  } else {
    return { ok: false, status: "user_error", message: "Validation failed" };
  }
};

export const findAccountById = async (accountId: number) => {
  return get<AccountType>(`${BACKEND_API}/api/crm/accounts/${accountId}`);
};

export const findPreviousAccount = async (accountId: number) => {
  return get<AccountType>(
    `${BACKEND_API}/api/crm/accounts/previous/${accountId}`,
  );
};

export const findNextAccount = async (accountId: number) => {
  return get<AccountType>(`${BACKEND_API}/api/crm/accounts/next/${accountId}`);
};
