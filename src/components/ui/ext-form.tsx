"use client";

import React from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UiAttributes } from "@/types/ui-components";

export interface ExtInputProps {
  form: any;
  fieldName: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export interface FormProps<Entity> {
  initialData: Entity | undefined;
}

export interface ViewProps<DValue> {
  entity: DValue;
}

export const ExtInputField = ({
  form,
  fieldName,
  label,
  placeholder,
  required = false,
  type = undefined,
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
            {<Input type={type} placeholder={placeholder} {...field} />}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ExtTextAreaField = ({
  form,
  fieldName,
  label,
  placeholder,
  required,
}: ExtInputProps & UiAttributes) => {
  return (
    <div className="w-full sm:col-span-2">
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
              <Textarea placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
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
