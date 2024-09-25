import React from "react";

import ValuesQuerySelect from "@/components/shared/values-query-select";
import { findContactStatuses } from "@/lib/actions/contacts.action";
import { EntityValueDefinition } from "@/types/commons";
import { FormFieldProps } from "@/types/ui-components";

const ContactStatusSelect = ({ form, required }: FormFieldProps) => {
  return (
    <ValuesQuerySelect<EntityValueDefinition>
      form={form}
      queryName="contactStatuses"
      fieldName="status"
      fieldLabel="Status"
      fetchDataFn={findContactStatuses}
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

export default ContactStatusSelect;
