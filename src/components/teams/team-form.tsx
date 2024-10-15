"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  ExtInputField,
  ExtTextAreaField,
  FormProps,
  SubmitButton,
} from "@/components/ui/ext-form";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { saveOrUpdateTeam } from "@/lib/actions/teams.action";
import { validateForm } from "@/lib/validator";
import { teamSchema, TeamType } from "@/types/teams";

export const TeamForm = ({ initialData }: FormProps<TeamType>) => {
  const router = useRouter();

  const form = useForm<TeamType>({
    resolver: zodResolver(teamSchema),
    defaultValues: initialData,
  });

  async function onSubmit(team: TeamType) {
    if (validateForm(team, teamSchema, form)) {
      await saveOrUpdateTeam(isEdit, team);
    }
  }

  const isEdit = !!initialData;
  const title = isEdit ? `Edit team ${initialData?.name}` : "Create team";
  const description = isEdit ? "Edit team" : "Add a new team";
  const submitText = isEdit ? "Save changes" : "Create";
  const submitTextWhileLoading = isEdit ? "Saving changes ..." : "Creating ...";

  return (
    <div className="bg-card px-6 py-6">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[72rem]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ExtInputField
            form={form}
            required={true}
            fieldName="name"
            label="Name"
            placeholder="Team Name"
          />
          <ExtTextAreaField form={form} fieldName="slogan" label="Slogan" />
          <ExtTextAreaField
            form={form}
            fieldName="description"
            label="Description"
          />
          <div className="flex items-center gap-2">
            <SubmitButton
              label={submitText}
              labelWhileLoading={submitTextWhileLoading}
            />
            <Button variant="secondary" onClick={() => router.back()}>
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
