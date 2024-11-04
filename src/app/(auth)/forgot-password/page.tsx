"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/lib/actions/users.action";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});
type FormData = z.infer<typeof formSchema>;

const ForgotPasswordPage = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (data: FormData) => {
    console.log("Email", data);
    forgotPassword(data.email);
  };

  return (
    <div
      className="flex justify-center items-start min-h-screen"
      style={{ paddingTop: "100px" }}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid grid-cols-1 gap-6"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email<span className="text-destructive"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} required placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm text-gray-500">
                If you remember your password, you can{" "}
                <a href="/login" className="hover:underline text-primary">
                  log in
                </a>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
