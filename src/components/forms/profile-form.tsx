"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import TimezoneSelect from "@/components/shared/timezones-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { toast } from "@/components/ui/use-toast";

interface ProfileFormProps {
  resourceServer: String;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ resourceServer }) => {
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    // Handle form submission logic here
  };

  const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  });

  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: `${session?.user?.email}`,
      firstName: `${session?.user?.firstName}`,
      lastName: `${session?.user?.lastName}`,
    },
  });

  const [avatarPath, setAvatarPath] = useState("");

  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", fileInput?.current?.files?.[0]!);

    const response = await fetch(`/api/files/singleUpload?type=avatar`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: formData,
    });
    if (response.ok) {
      const uploadFileResult = await response.json();
      setAvatarPath(`${resourceServer}/${uploadFileResult["path"]}`);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Can not upload the profile picture. Please try again",
      });
    }
  };

  return (
    <Card>
      <h4>Profile</h4>

      <div className="profile-picture-section">
        <Avatar>
          <AvatarImage src={avatarPath} />
          <AvatarFallback>HN</AvatarFallback>
        </Avatar>
        <input type="file" onChange={handleFileUpload} ref={fileInput} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
          <TimezoneSelect form={form} required={true} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
};
