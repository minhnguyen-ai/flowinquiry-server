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
  onSaveSuccess: (authority: AuthorityType) => void;
  authorityEntity: AuthorityType | undefined;
};

const NewAuthorityForm: React.FC<NewAuthorityFormProps> = ({
  onSaveSuccess,
  authorityEntity,
}) => {
  console.log("Authority", authorityEntity);
  const form = useForm<AuthorityType>({
    resolver: zodResolver(authoritySchema),
    defaultValues: authorityEntity,
  });

  async function onSubmit(authority: AuthorityType) {
    const savedAuthority = await createAuthority(authority);
    onSaveSuccess(savedAuthority);
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-4 max-w-[72rem]"
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
