"use client";

import React, { useEffect, useState } from "react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
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
      const data = await getAuthorities();
      setAuthorities(data);
    };

    fetchAuthorities();
  }, []);

  if (authorities === undefined) {
    return <div>Can not load authorities</div>;
  }

  return (
    <FormField
      control={form.control}
      name="authorities"
      render={({ field }) => {
        // Define a custom onValuesChange handler
        const handleValuesChange = (newValues: String[]) => {
          const filteredAuthorities = authorities
            .filter((authority) =>
              newValues.includes(authority.descriptiveName),
            )
            .map((authority) => authority.name);
          field.onChange(filteredAuthorities);
        };

        return (
          <FormItem>
            <FormLabel>
              {label}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
            <MultiSelector
              onValuesChange={handleValuesChange}
              values={field.value}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select authorities" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {authorities.map((authority) => (
                    <MultiSelectorItem
                      key={authority.name}
                      value={authority.descriptiveName}
                    >
                      <span>{authority.descriptiveName}</span>
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default AuthoritiesSelect;
