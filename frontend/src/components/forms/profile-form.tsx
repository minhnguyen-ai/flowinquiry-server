"use client";

import React from "react";
import {z} from "zod";
import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BACKEND_API} from "@/lib/constants";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

interface ProfileFormProps {
    initialData: any | null;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({initialData}) => {
    const handleSubmit = async (data: z.infer<typeof formSchema>) => {

        // Handle form submission logic here
    };

    const formSchema = z.object({
        email: z.string().email({
            message: "Invalid email address",
        }),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
    })

    const {data:session} = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: `${session?.user?.email}`,
            firstName: `${session?.user?.firstName}`,
            lastName: `${session?.user?.lastName}`
        }
    });

    const handleFileUpload = async (event) => {
        console.log(`Start upload file ${BACKEND_API}`);
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        console.log("Upload file " + file);

        const response = await fetch(`/api/files/singleUpload`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${session?.token}`
            },
            body: formData,
        }).catch((error)=> console.error("Error uploading file", error));

            console.log(" uploading file successfully");
    }

    return (
        <Card>
            <h4>Profile</h4>

            <div className="profile-picture-section">
                <Avatar>
                    <AvatarImage/>
                    <AvatarFallback>HN</AvatarFallback>
                </Avatar>
                <input type="file" onChange={handleFileUpload}/>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} readOnly/>
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
                                    <Input placeholder="aaa ${session}" {...field} />
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Card>
    );
}
