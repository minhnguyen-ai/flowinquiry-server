'use client';

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";

interface UserFormProps {
    initialData: any | null;
}

const userSchema = z.object({
    email: z.string().min(1, {message: 'Email is required'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    firstName: z.string().min(1, {message: 'First name is required'}),
    lastName: z.string().min(1, {message: 'Last name is required'}),
    description: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

export const UserForm: React.FC<UserFormProps> = ({initialData}) => {

    const router = useRouter();
    const {toast} = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const isEdit = !!initialData;
    const title = isEdit ? 'Edit User' : 'Create User';
    const action = isEdit ? 'Save changes' : 'Create';

    const defaultValues = initialData
        ? initialData
        : {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            description: ''
        };

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues
    });

    const onSubmit = async (data: z.infer<typeof userSchema>) => {
        try {
            setLoading(true);
            router.refresh();
            router.push(`/portal/users`);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    disabled={isEdit}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">{action}</Button>
            </form>
        </Form>
    )
}