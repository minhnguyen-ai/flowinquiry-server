"use client";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Heading} from "@/components/heading";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Form} from "@/components/ui/form";
import AccountTypesSelect from "@/components/accounts/account-types-select";
import {ExtInputField, SubmitButton} from "@/components/ui/ext-form";
import {AccountSchema, accountSchema} from "@/types/accounts";
import AccountIndustriesSelect from "@/components/accounts/account-industries-select";
import ValuesSelect from "../ui/ext-select-values";
import { useToast } from "../ui/use-toast";
import {saveAccount} from "@/lib/actions/accounts.action";

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
            setTimeout(()=> {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Invalid values. Please fix them before submitting"
                })
            }, 2000);
            form.setError("accountName", {message: "zydfd"})
        } else {
            console.log("Data valid " + JSON.stringify(Object.fromEntries(formData.entries())));
        }

        await saveAccount(formData);
    }

    const [open, setOpen] = useState(false);
    const isEdit = !!initialData;
    const title = isEdit ? 'Edit account' : 'Create account';
    const description = isEdit ? 'Edit account' : 'Add a new account';
    const submitText = isEdit ? 'Save changes' : 'Create';
    const submitTextWhileLoading = isEdit ? 'Saving changes ...' : 'Creating ...';

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description}/>
                {initialData && (
                    <Button
                        // disabled={pending}
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
                    <SubmitButton label={submitText} labelWhileLoading={submitTextWhileLoading}/>
                </form>
            </Form>
        </>
    );
}

export default AccountForm;