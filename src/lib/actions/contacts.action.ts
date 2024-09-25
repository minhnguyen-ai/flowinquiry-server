"use server";

import { redirect } from "next/navigation";

import { get, post, put } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import {
  ActionResult,
  EntityValueDefinition,
  PageableResult,
} from "@/types/commons";
import { contactSchema, ContactType } from "@/types/contacts";

export const findContactById = async (
  contactId: number,
): Promise<ActionResult<ContactType>> => {
  return get<ContactType>(`${BACKEND_API}/api/crm/contacts/${contactId}`);
};

export const findContactsByAccountId = async (
  accountId: number,
): Promise<ActionResult<PageableResult<ContactType>>> => {
  return get<PageableResult<ContactType>>(
    `${BACKEND_API}/api/crm/contacts/account/${accountId}`,
  );
};

export const findContactStatuses = async (): Promise<
  ActionResult<Array<EntityValueDefinition>>
> => {
  return get<Array<EntityValueDefinition>>(
    `${BACKEND_API}/api/crm/values?entityType=contact&&valueKey=status`,
  );
};

export const saveOrUpdateContact = async (
  isEdit: boolean,
  contact: ContactType,
): Promise<ActionResult<string>> => {
  const validation = contactSchema.safeParse(contact);

  if (validation.success) {
    let response: ActionResult<string>;
    if (isEdit) {
      response = await put<ContactType, string>(
        `${BACKEND_API}/api/crm/contacts/${contact.id}`,
        contact,
      );
    } else {
      response = await post<ContactType, string>(
        `${BACKEND_API}/api/crm/contacts`,
        contact,
      );
    }

    if (response.ok) {
      redirect("/portal/contacts");
    } else {
      return response;
    }
  } else {
    return { ok: false, status: "user_error", message: "Validation failed" };
  }
};
