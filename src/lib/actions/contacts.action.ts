"use server";

import { redirect } from "next/navigation";

import { doAdvanceSearch, get, post, put } from "@/lib/actions/commons.action";
import { findEntitiesFilterOptions } from "@/lib/actions/shared.action";
import { BACKEND_API } from "@/lib/constants";
import { EntityValueDefinition, PageableResult } from "@/types/commons";
import { contactSchema, ContactType } from "@/types/contacts";
import { Filter } from "@/types/query";

export const findContactById = async (
  contactId: number,
): Promise<ContactType> => {
  return get<ContactType>(`${BACKEND_API}/api/crm/contacts/${contactId}`);
};

export const findContactsByAccountId = async (
  accountId: number,
): Promise<PageableResult<ContactType>> => {
  return get<PageableResult<ContactType>>(
    `${BACKEND_API}/api/crm/contacts/account/${accountId}`,
  );
};

export const findContactStatuses = async (): Promise<
  Array<EntityValueDefinition>
> => {
  return get<Array<EntityValueDefinition>>(
    `${BACKEND_API}/api/crm/values?entityType=contact&&valueKey=status`,
  );
};

export const findContactStatusesFilterOptions = async () => {
  return findEntitiesFilterOptions(findContactStatuses);
};

export async function searchContacts(filters: Filter[]) {
  return doAdvanceSearch<ContactType>(
    `${BACKEND_API}/api/crm/contacts/search`,
    filters,
  );
}

export const saveOrUpdateContact = async (
  isEdit: boolean,
  contact: ContactType,
): Promise<void> => {
  const validation = contactSchema.safeParse(contact);

  if (validation.success) {
    if (isEdit) {
      await put<ContactType, string>(
        `${BACKEND_API}/api/crm/contacts/${contact.id}`,
        contact,
      );
    } else {
      await post<ContactType, string>(
        `${BACKEND_API}/api/crm/contacts`,
        contact,
      );
    }

    redirect("/portal/contacts");
  }
};

export const findPreviousContact = async (contactId: number) => {
  return get<ContactType>(
    `${BACKEND_API}/api/crm/contacts/previous/${contactId}`,
  );
};

export const findNextContact = async (contactId: number) => {
  return get<ContactType>(`${BACKEND_API}/api/crm/contacts/next/${contactId}`);
};
