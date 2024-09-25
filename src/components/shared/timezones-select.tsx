import React from "react";

import ValuesQuerySelect from "@/components/shared/values-query-select";
import { getTimezones, TimezoneInfo } from "@/lib/actions/shared.action";
import { FormFieldProps } from "@/types/ui-components";

const TimezoneSelect = ({ form, required }: FormFieldProps) => {
  return (
    <ValuesQuerySelect<TimezoneInfo>
      form={form}
      queryName="timezones"
      fieldName="timezone"
      fieldLabel="Timezone"
      fetchDataFn={getTimezones}
      valueKey="zoneId"
      renderOption={(timezone: TimezoneInfo) =>
        `${timezone.offset} ${timezone.zoneId}`
      }
      required={required}
      placeholder="Select timezone"
      noDataMessage="No timezone found"
      searchPlaceholder="Search timezone..."
    />
  );
};

export default TimezoneSelect;
