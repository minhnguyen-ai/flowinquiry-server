'use client';

import * as z from 'zod';
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

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push('/');
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
                                               <Input
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
                                        <Input
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