'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    email: z
        .string()
        .email({
            message: 'Invalid email',
        })
        .min(1, {
            message: 'Email is required',
        }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
    confirmPassword: z.string().min(1, {
        message: 'Confirm password is required',
    }),
});

const RegisterForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push('/'); // Navigate to the new post page
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Sign up by adding the info below</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='space-y-6'
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='bg-slate-100 dark:bg-slate-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                            placeholder='Enter name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='bg-slate-100 dark:bg-slate-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                            placeholder='Enter email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            className='bg-slate-100 dark:bg-slate-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                            placeholder='Confirm password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className='w-full'>Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default RegisterForm;