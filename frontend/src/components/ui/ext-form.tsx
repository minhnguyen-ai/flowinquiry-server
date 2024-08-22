"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UiAttributes } from "@/types/ui-components";
import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface ExtInputProps {
  form: any;
  fieldName: string;
  label: string;
  placeholder: string;
}

export interface FormProps<Entity> {
  initialData: Entity | undefined;
}

export const ExtInputField = ({
  form,
  fieldName,
  label,
  placeholder,
  required,
}: ExtInputProps & UiAttributes) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface SubmitButtonProps {
  label: string;
  labelWhileLoading: string;
}
export const SubmitButton = ({
  label,
  labelWhileLoading,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {!pending ? label : labelWhileLoading}
    </Button>
  );
};
