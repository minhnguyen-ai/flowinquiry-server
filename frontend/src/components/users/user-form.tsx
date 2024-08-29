"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { ExtInputField, ExtTextAreaField } from "@/components/ui/ext-form";
import {
  Form,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AuthoritiesSelect from "@/components/users/authorities-select";

interface UserFormProps {
  initialData: any | null;
}

const userSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  description: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialData;
  const title = isEdit ? "Edit User" : "Create User";
  const description = isEdit ? "Edit user" : "Add a new user";
  const action = isEdit ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        description: "",
      };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    try {
      setLoading(true);
      router.refresh();
      router.push(`/portal/users`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[72rem]"
        >
          <ExtInputField
            form={form}
            required={true}
            fieldName="email"
            label="Email"
            placeholder="Email"
          />
          <AuthoritiesSelect form={form} label="Authority" />
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
          <ExtTextAreaField
            form={form}
            fieldName="description"
            label="Description"
          />
          <Button
            type="submit"
            disabled={loading}
            className="px-4 py-2 sm:col-span-2"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
