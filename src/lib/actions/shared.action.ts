"use server";

import { get } from "@/lib/actions/commons.action";
import { BACKEND_API } from "@/lib/constants";
import { ActionResult } from "@/types/commons";

export interface TimezoneInfo {
  zoneId: string;
  offset: string;
}

export const getTimezones = async (): Promise<
  ActionResult<Array<TimezoneInfo>>
> => {
  return get<Array<TimezoneInfo>>(`${BACKEND_API}/api/timezones`);
};
