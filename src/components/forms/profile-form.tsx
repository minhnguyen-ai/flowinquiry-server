"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ProfileFormProps {
  initialData: any | null;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
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

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: `${session?.user?.email}`,
      firstName: `${session?.user?.firstName}`,
      lastName: `${session?.user?.lastName}`,
    },
  });

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
    }).catch((error) => console.error("Error uploading file", error));

    console.log(" uploading file successfully");
  };

  return (
    <Card>
      <h4>Profile</h4>

      <div className="profile-picture-section">
        <Avatar>
          <AvatarImage />
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
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="aaa ${session}" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
};
