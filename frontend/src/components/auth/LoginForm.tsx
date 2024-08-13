'use client';

import * as z from 'zod';
import { signIn } from "next-auth/react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";

import {useRouter} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";


const formSchema = z.object({
    email: z.string().email({message: 'Invalid email'}).min(1, {message: 'Email is required'}),
    password: z.string().min(1, {message: 'Password is required'}),
});

const LoginForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            console.log(`Start signin ${data.email} and ${data.password}`)
            const response = await signIn("credentials", {
                "username": data.email,
                "email": data.email,
                "password": data.password,
                callbackUrl: "/",
                redirect: false,
            });
            console.log("Login success " + JSON.stringify(response));
            router.push("/portal");
        }
        catch (error){
            console.log("ERROR" + error);
            // setError("Invalid credentials");
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Log into your account with your credentials</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}
                          className='space-y-6'
                    >
                        <FormField control={form.control}
                                   name='email'
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel
                                               className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                                               Email
                                           </FormLabel>
                                           <FormControl>
                                               <Input autoComplete="email"
                                                   className='bg-slate-100 dark:bg-slate-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                                   placeholder='Enter email'
                                                   {...field}
                                               />
                                           </FormControl>
                                       </FormItem>
                                   )
                                   }>
                        </FormField>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input autoComplete="current-password"
                                            type='password'
                                            className='bg-slate-100 dark:bg-slate-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                            placeholder='Enter password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button className='w-full'>Sign In</Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default LoginForm;