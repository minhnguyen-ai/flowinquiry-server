"use server";

import { get } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { mapEntityToFilterOptions } from "@/lib/mappers";
import { ActionResult, EntityValueDefinition } from "@/types/commons";

export interface TimezoneInfo {
  zoneId: string;
  offset: string;
}

export const getTimezones = async (): Promise<
  ActionResult<Array<TimezoneInfo>>
> => {
  return get<Array<TimezoneInfo>>(`${BACKEND_API}/api/timezones`);
};

export const findEntitiesFilterOptions = async (
  findEntitiesFn: () => Promise<ActionResult<Array<EntityValueDefinition>>>,
) => {
  const { ok, data } = await findEntitiesFn();
  if (ok) {
    return mapEntityToFilterOptions(data!);
  } else {
    throw new Error("Can not load account industries");
  }
};
