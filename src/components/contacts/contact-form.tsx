"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

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
import { saveOrUpdateContact } from "@/lib/actions/contacts.action";
import { validateForm } from "@/lib/validator";
import { contactSchema, ContactType } from "@/types/contacts";

export const ContactForm: React.FC<FormProps<ContactType>> = ({
  initialData,
}: FormProps<ContactType>) => {
  const form = useForm<ContactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: initialData,
  });

  const isEdit = !!initialData;
  const title = isEdit
    ? `Edit contact ${initialData?.firstName} ${initialData?.lastName}`
    : "Create contact";
  const description = isEdit ? "Edit contact" : "Add a new contact";
  const submitText = isEdit ? "Save changes" : "Create";
  const submitTextWhileLoading = isEdit ? "Saving changes ..." : "Creating ...";

  const saveContactClientAction = async (state: any, formData: FormData) => {
    const contact = {
      ...initialData,
      ...Object.fromEntries(formData.entries()),
    }!;

    contact.account = {
      id: 1,
      accountName: "a",
      accountType: "x",
      industry: "s",
      status: "d",
    }; // FIX ME
    console.log(`After assign account ${JSON.stringify(contact)}`);
    if (validateForm(contact, contactSchema, form)) {
      await saveOrUpdateContact(state, isEdit, contact as ContactType);
    }

    return { status: "success" };
  };

  const [formState, formAction] = useFormState(saveContactClientAction, {
    status: "default",
  });

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
            fieldName="firstName"
            label="First Name"
            placeholder="First Name"
          />
          <ExtInputField
            form={form}
            required={true}
            fieldName="lastName"
            label="Last Name"
            placeholder="Last Name"
          />
          <ExtInputField
            form={form}
            required={true}
            fieldName="email"
            label="Email"
            placeholder="Email"
          />
          <ExtInputField
            form={form}
            fieldName="address"
            label="Address"
            placeholder="Address"
          />
          <ExtInputField
            form={form}
            fieldName="city"
            label="City"
            placeholder="City"
          />
          <ExtInputField
            form={form}
            fieldName="state"
            label="State"
            placeholder="State"
          />
          <ExtInputField
            form={form}
            fieldName="postalCode"
            label="Postal Code"
            placeholder="Postal Code"
          />
          <ExtInputField
            form={form}
            fieldName="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
          />
          <ExtInputField
            form={form}
            fieldName="position"
            label="Position"
            placeholder="Position"
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

export default ContactForm;
