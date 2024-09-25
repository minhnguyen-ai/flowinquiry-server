import React from "react";

import ValuesQuerySelect from "@/components/shared/values-query-select";
import { findAccountStatuses } from "@/lib/actions/accounts.action";
import { EntityValueDefinition } from "@/types/commons";
import { FormFieldProps } from "@/types/ui-components";

const AccountStatusSelect = ({ form, required }: FormFieldProps) => {
  return (
    <ValuesQuerySelect<EntityValueDefinition>
      form={form}
      queryName="accountStatuses"
      fieldName="status"
      fieldLabel="Status"
      fetchDataFn={findAccountStatuses}
      valueKey="value"
      renderTooltip={(entityValueDef: EntityValueDefinition) =>
        `${entityValueDef.description}`
      }
      renderOption={(entityValueDef: EntityValueDefinition) =>
        `${entityValueDef.value}`
      }
      required={required}
      placeholder="Select status"
      noDataMessage="No status found"
      searchPlaceholder="Search status..."
    />
  );
};

export default AccountStatusSelect;
