"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import AccountSelectField from "@/components/accounts/account-id-select";
import ContactStatusSelect from "@/components/contacts/contact-status-select";
import { Heading } from "@/components/heading";
import {
  ExtInputField,
  ExtTextAreaField,
  FormProps,
  SubmitButton,
} from "@/components/ui/ext-form";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { saveOrUpdateContact } from "@/lib/actions/contacts.action";
import { validateForm } from "@/lib/validator";
import { contactSchema, ContactType } from "@/types/contacts";

export const ContactForm = ({ initialData }: FormProps<ContactType>) => {
  const form = useForm<ContactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: { ...initialData, accountId: 1 },
  });

  async function onSubmit(contact: ContactType) {
    // contact.accountId = 1;
    if (validateForm(contact, contactSchema, form)) {
      await saveOrUpdateContact(isEdit, contact);
    }
  }

  const isEdit = !!initialData;
  const title = isEdit
    ? `Edit contact ${initialData?.firstName} ${initialData?.lastName}`
    : "Create contact";
  const description = isEdit ? "Edit contact" : "Add a new contact";
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
          onSubmit={form.handleSubmit(onSubmit)}
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
          <AccountSelectField label="aaa" value="Account" />
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
          <ContactStatusSelect form={form} required={true} />
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
