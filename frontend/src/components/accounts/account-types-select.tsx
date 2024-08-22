import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UiAttributes } from "@/types/ui-components";

interface AccountTypesSelectProps {
  form: any;
}

const accountTypes = [
  { label: "Customer-Direct" },
  { label: "Customer-Channel" },
  { label: "Reseller" },
  { label: "Prospect" },
  { label: "Other" },
] as const;

const AccountTypesSelect = ({
  form,
  required,
}: AccountTypesSelectProps & UiAttributes) => {
  return (
    <FormField
      control={form.control}
      name="accountType"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            Type
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...field}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an account type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {accountTypes?.map((accountType) => (
                <SelectItem key={accountType.label} value={accountType.label}>
                  {accountType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default AccountTypesSelect;
