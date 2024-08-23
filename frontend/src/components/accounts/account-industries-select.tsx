import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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

interface AccountIndustriesSelectProps {
  form: any;
}

const accountIndustries = [
  { label: "Retail" },
  { label: "Information" },
] as const;

const AccountIndustriesSelect = ({
  form,
  required,
}: AccountIndustriesSelectProps & UiAttributes) => {
  return (
    <FormField
      control={form.control}
      name="industry"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            Industry
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={accountIndustries[0].label}
            {...field}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue defaultValue={accountIndustries[0].label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {accountIndustries?.map((accountIndustry) => (
                <SelectItem
                  key={accountIndustry.label}
                  value={accountIndustry.label}
                >
                  {accountIndustry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AccountIndustriesSelect;
