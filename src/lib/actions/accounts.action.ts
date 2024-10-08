"use server";

import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import qs from "qs";

import { get, post, put } from "@/lib/actions/commons.action";
import { findEntitiesFilterOptions } from "@/lib/actions/shared.action";
import { BACKEND_API } from "@/lib/constants";
import {
  accountSchema,
  AccountSearchParams,
  AccountType,
} from "@/types/accounts";
import {
  ActionResult,
  EntityValueDefinition,
  PageableResult,
} from "@/types/commons";

export const findAccounts = async (): Promise<
  ActionResult<PageableResult<AccountType>>
> => {
  return get<PageableResult<AccountType>>(`${BACKEND_API}/api/crm/accounts`);
};

export const findAccountStatuses = async (): Promise<
  ActionResult<Array<EntityValueDefinition>>
> => {
  return get<Array<EntityValueDefinition>>(
    `${BACKEND_API}/api/crm/values?entityType=account&&valueKey=status`,
  );
};

export const findAccountStatusesFilterOptions = async () => {
  return findEntitiesFilterOptions(findAccountStatuses);
};

export const findAccountTypes = async (): Promise<
  ActionResult<Array<EntityValueDefinition>>
> => {
  return get<Array<EntityValueDefinition>>(
    `${BACKEND_API}/api/crm/values?entityType=account&&valueKey=type`,
  );
};

export const findAccountTypesFilterOptions = async () => {
  return findEntitiesFilterOptions(findAccountTypes);
};

export const findAccountIndustries = async (): Promise<
  ActionResult<Array<EntityValueDefinition>>
> => {
  return get<Array<EntityValueDefinition>>(
    `${BACKEND_API}/api/crm/values?entityType=account&&valueKey=industry`,
  );
};

export const findAccountIndustriesFilterOptions = async () => {
  return findEntitiesFilterOptions(findAccountIndustries);
};

export const saveOrUpdateAccount = async (
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

export async function searchAccounts(input: AccountSearchParams) {
  noStore();
  console.log(`Search accounts ${qs.stringify(input)}`);
  const { ok, data: pageResult } = await get<PageableResult<AccountType>>(
    `${BACKEND_API}/api/crm/accounts?${qs.stringify(input)}`,
  );
  if (ok) {
    return { data: pageResult!.content, pageCount: pageResult!.totalPages };
  } else {
    throw new Error("Can not get entities");
  }
}

export async function deleteAccounts(input: { ids: number[] }) {
  revalidatePath("/");
  return {
    data: null,
    error: null,
  };
}
