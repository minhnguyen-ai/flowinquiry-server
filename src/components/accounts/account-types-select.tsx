import React from "react";

import ValuesQuerySelect from "@/components/shared/values-query-select";
import { findAccountTypes } from "@/lib/actions/accounts.action";
import { EntityValueDefinition } from "@/types/commons";
import { FormFieldProps } from "@/types/ui-components";

const AccountTypesSelect = ({ form, required }: FormFieldProps) => {
  return (
    <ValuesQuerySelect<EntityValueDefinition>
      form={form}
      queryName="accountTypes"
      fieldName="type"
      fieldLabel="Type"
      fetchDataFn={findAccountTypes}
      valueKey="value"
      renderTooltip={(entityValueDef: EntityValueDefinition) =>
        `${entityValueDef.description}`
      }
      renderOption={(entityValueDef: EntityValueDefinition) =>
        `${entityValueDef.value}`
      }
      required={required}
      placeholder="Select type"
      noDataMessage="No type found"
      searchPlaceholder="Search type..."
    />
  );
};

export default AccountTypesSelect;
