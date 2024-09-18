"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

import AccountIndustriesSelect from "@/components/accounts/account-industries-select";
import AccountTypesSelect from "@/components/accounts/account-types-select";
import { Heading } from "@/components/heading";
import {
  ExtInputField,
  ExtTextAreaField,
  FormProps,
  SubmitButton,
} from "@/components/ui/ext-form";
import ValuesSelect from "@/components/ui/ext-select-values";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { saveOrUpdateAccount } from "@/lib/actions/accounts.action";
import { validateForm } from "@/lib/validator";
import { accountSchema, AccountType } from "@/types/accounts";
import { ActionResult } from "@/types/commons";

export const AccountForm: React.FC<FormProps<AccountType>> = ({
  initialData,
}: FormProps<AccountType>) => {
  const form = useForm<AccountType>({
    resolver: zodResolver(accountSchema),
    defaultValues: initialData,
  });

  const saveAccountClientAction = async (
    prevState: ActionResult,
    formData: FormData,
  ) => {
    const account = {
      ...initialData,
      ...Object.fromEntries(formData.entries()),
    }!;

    const validatedData = validateForm(account, accountSchema, form);
    if (validatedData) {
      return await saveOrUpdateAccount(
        prevState,
        isEdit,
        account as AccountType,
      );
    }
  };

  const [formState, formAction] = useFormState(saveAccountClientAction, {
    status: "default",
  });

  const isEdit = !!initialData;
  const title = isEdit
    ? `Edit account ${initialData?.accountName}`
    : "Create account";
  const description = isEdit ? "Edit account" : "Add a new account";
  const submitText = isEdit ? "Save changes" : "Create";
  const submitTextWhileLoading = isEdit ? "Saving changes ..." : "Creating ...";

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[72rem]"
          action={formAction}
        >
          <ExtInputField
            form={form}
            required={true}
            fieldName="accountName"
            label="Name"
            placeholder="Account Name"
          />
          <AccountTypesSelect form={form} required={true} />
          <AccountIndustriesSelect form={form} required={true} />
          <ExtInputField
            form={form}
            required={true}
            fieldName="addressLine1"
            label="Address 1"
            placeholder="Address 1"
          />
          <ExtInputField
            form={form}
            fieldName="addressLine2"
            label="Address 2"
            placeholder="Address 2"
          />
          <ExtInputField
            form={form}
            required={true}
            fieldName="city"
            label="City"
            placeholder="City"
          />
          <ExtInputField
            form={form}
            required={true}
            fieldName="state"
            label="State"
            placeholder="State"
          />
          <ExtInputField
            form={form}
            required={true}
            fieldName="postalCode"
            label="Postal Code"
            placeholder="Postal Code"
          />
          <ExtInputField
            form={form}
            fieldName="phoneNumber"
            label="Phone"
            placeholder="Phone number"
          />
          <ExtInputField
            form={form}
            fieldName="website"
            label="Website"
            placeholder="https://example.com"
          />
          <ExtInputField
            form={form}
            fieldName="annualRevenue"
            label="Annual Revenue"
            placeholder="Annual Revenue"
          />
          <ValuesSelect
            form={form}
            fieldName="status"
            label="Status"
            placeholder="Select status"
            required={true}
            values={["Active", "Inactive"]}
          />
          <ExtTextAreaField form={form} fieldName="notes" label="Notes" />
          <SubmitButton
            label={submitText}
            labelWhileLoading={submitTextWhileLoading}
          />
        </form>
      </Form>
    </>
  );
};

export default AccountForm;
