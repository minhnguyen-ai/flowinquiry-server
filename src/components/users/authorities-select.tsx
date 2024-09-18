"use client";

import React, { useEffect, useState } from "react";

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
import { getAuthorities } from "@/lib/actions/authorities.action";
import { UiAttributes } from "@/types/ui-components";
import { AuthorityType } from "@/types/users";

interface AuthoritiesSelectProps {
  form: any;
  label: string;
}

const AuthoritiesSelect = ({
  form,
  label,
  required,
}: AuthoritiesSelectProps & UiAttributes) => {
  const [authorities, setAuthorities] = useState<Array<AuthorityType>>();
  useEffect(() => {
    const fetchAuthorities = async () => {
      const { ok, data } = await getAuthorities();
      if (ok) {
        setAuthorities(data);
      }
    };

    fetchAuthorities();
  }, []);

  if (authorities === undefined) {
    return <div>Can not load authorities</div>;
  }
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
            defaultValue={authorities[0].name}
            {...field}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue defaultValue={authorities[0].name} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {authorities?.map((authority) => (
                <SelectItem key={authority.name} value={authority.name}>
                  {authority.descriptiveName}
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
