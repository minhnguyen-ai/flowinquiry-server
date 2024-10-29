"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "../ui/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  isRemembered: z.oboolean(),
});

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      isRemembered: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/portal",
      redirect: false,
    });

    if (response?.error === null) {
      router.push("/portal");
    } else {
      toast({
        variant: "destructive",
        title: "Sign-in failure",
        description:
          "Unable to authenticate using the account details provided.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Log into your account with your credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      className="bg-slate-100 dark:bg-slate-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      className="bg-slate-100 dark:bg-slate-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRemembered"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remember me</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button className="w-full">Sign In</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
