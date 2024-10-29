"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import {
  ExtInputField,
  ExtTextAreaField,
  SubmitButton,
} from "@/components/ui/ext-form";
import { Form } from "@/components/ui/form";
import { createAuthority } from "@/lib/actions/authorities.action";
import { authoritySchema, AuthorityType } from "@/types/authorities";

type NewAuthorityFormProps = {
  onSaveSuccess: () => void;
};

const NewAuthorityForm: React.FC<NewAuthorityFormProps> = ({
  onSaveSuccess,
}) => {
  const form = useForm<AuthorityType>({
    resolver: zodResolver(authoritySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(authority: AuthorityType) {
    await createAuthority(authority);
    onSaveSuccess();
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[72rem]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ExtInputField
            form={form}
            required={true}
            fieldName="descriptiveName"
            label="Name"
            placeholder="Authority Name"
          />
          <ExtTextAreaField
            form={form}
            fieldName="description"
            label="Description"
          />
          <div className="flex items-center gap-2">
            <SubmitButton
              label="Save changes"
              labelWhileLoading="Save changes ..."
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewAuthorityForm;
