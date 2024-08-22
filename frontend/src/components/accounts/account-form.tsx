"use client";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Heading} from "@/components/heading";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Form} from "@/components/ui/form";
import AccountTypesSelect from "@/components/accounts/account-types-combobox";
import {saveAccount} from "@/lib/actions/accounts.action";
import {ExtInputField} from "@/components/ui/ext-form";
import {AccountSchema, accountSchema} from "@/types/accounts";
import AccountIndustriesSelect from "@/components/accounts/account-industries-select";
import ValuesSelect from "../ui/ext-select-values";
import { useToast } from "../ui/use-toast";
import { useFormStatus } from "react-dom";

interface AccountFormProps {
    initialData: any | null;
}




export const AccountForm: React.FC<AccountFormProps> = ({initialData}) => {
    const {toast} = useToast();
    

    const defaultValues = initialData
        ? initialData
        : {
            accountName: '',
            accountType: ''
        };

    const form = useForm<AccountSchema>({
        resolver: zodResolver(accountSchema),
        defaultValues
    });

    const saveAccountClientAction = async (formData: FormData) => {
    
        const validation = accountSchema.safeParse(Object.fromEntries(formData.entries()))
        if (validation.error) {
            let errorMessage = "";
            validation.error.issues.forEach((issue)=> {
                errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
            });
            console.log("Error " + errorMessage);
            setTimeout(()=> {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Invalid values. Please fix them before submitting"
                })
            }, 2000);
            form.setError("accountName", {type: "manual", message: "aaa"})
        } else {
            console.log("Data valid " + JSON.stringify(Object.fromEntries(formData.entries())));
        }
    }

    const [open, setOpen] = useState(false);
    const {pending} = useFormStatus();
    const isEdit = !!initialData;
    const title = isEdit ? 'Edit account' : 'Create account';
    const description = isEdit ? 'Edit account' : 'Add a new account';
    const action = isEdit ? 'Save changes' : 'Create';

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description}/>
                {initialData && (
                    <Button
                        disabled={pending}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4"/>
                    </Button>
                )}
            </div>
            <Separator/>
            <Form {...form}>
                <form className="space-y-6" action={saveAccountClientAction}>
                    <ExtInputField form={form} required={true} fieldName="accountName" label="Name" placeholder="Account Name"/>
                    <AccountTypesSelect form={form} required={true}/>
                    <AccountIndustriesSelect form={form} required={true}/>
                    <ExtInputField form={form} fieldName="website" label="Website" placeholder="https://example.com"/>
                    <ValuesSelect form={form} fieldName="status" label="Status" placeholder="Status" required={true} values={["Active", "Inactive"]}/>
                    <Button type="submit" disabled={pending}>{action}</Button>
                </form>
            </Form>
        </>
    );
}

export default AccountForm;