"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Heading } from "@/components/heading";
import TimezoneSelect from "@/components/shared/timezones-select";
import { Button } from "@/components/ui/button";
import { ExtInputField } from "@/components/ui/ext-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { findUserById } from "@/lib/actions/users.action";
import { obfuscate } from "@/lib/endecode";
import { userSchema } from "@/types/users";

const userSchemaWithFile = userSchema.extend({
  file: z.any().optional(), // Add file as an optional field of any type
});

type UserTypeWithFile = z.infer<typeof userSchemaWithFile>;

export const ProfileForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (data: UserTypeWithFile) => {
    const formData = new FormData();

    const userJsonBlob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    formData.append("userDTO", userJsonBlob);

    const avatarFile = form.watch("file")[0]; // Get the file object directly
    if (avatarFile) {
      formData.append("avatar", avatarFile); // Append the file to FormData
    }

    const response = await fetch("/api/admin/users", {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: formData,
    });
    if (response.ok) {
      router.push(`/portal/users/${obfuscate(user?.id)}`);
    } else {
      const errorData = await response.json();
      toast({
        description: errorData.message || "Failed to update user",
      });
    }
  };

  const [user, setUser] = useState<UserTypeWithFile | undefined>(undefined);

  useEffect(() => {
    async function loadUserInfo() {
      const userData = await findUserById(Number(session?.user?.id));
      setUser({ ...userData, file: undefined });

      if (userData) {
        form.reset(userData);
      }
    }
    loadUserInfo();
  }, []);

  const form = useForm<UserTypeWithFile>({
    resolver: zodResolver(userSchemaWithFile),
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      <Heading
        title="Profile"
        description="Manage your account details here. Update your email, profile picture, password, and other personal information to keep your profile accurate and secure"
      />
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-row gap-4"
        >
          <div>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="file" {...form.register("file")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TimezoneSelect
              form={form}
              required={true}
              fieldName="timezone"
              label="Timezone"
            />
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
            <div className="md:col-span-2 flex flex-row gap-4">
              <Button type="submit">Submit</Button>
              <Button variant="secondary" onClick={() => router.back()}>
                Discard
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
