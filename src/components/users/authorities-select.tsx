import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UiAttributes } from "@/types/ui-components";

interface AuthoritiesSelectProps {
  form: any;
  label: string;
}

const authorities = [{ label: "Retail" }, { label: "Information" }] as const;

const AuthoritiesSelect = ({
  form,
  label,
  required,
}: AuthoritiesSelectProps & UiAttributes) => {
  return (
    <FormField
      control={form.control}
      name="authority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={authorities[0].label}
            {...field}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue defaultValue={authorities[0].label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {authorities?.map((authority) => (
                <SelectItem key={authority.label} value={authority.label}>
                  {authority.label}
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

export default AuthoritiesSelect;
