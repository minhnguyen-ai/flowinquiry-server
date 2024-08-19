"use client";

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Heading} from "@/components/heading";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Form} from "@/components/ui/form";
import AccountTypesCombobox from "@/components/accounts/account-types-combobox";
import {saveAccount} from "@/lib/actions/accounts.action";
import {ExtInputField} from "@/components/ui/ext-form";
import {AccountSchema, accountSchema} from "@/types/accounts";

interface AccountFormProps {
    initialData: any | null;
}


export const AccountForm: React.FC<AccountFormProps> = ({initialData}) => {
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
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
                        disabled={loading}
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
                <form className="space-y-6" action={saveAccount}>
                    <ExtInputField form={form} fieldName="accountName" label="Name" placeholder="Account Name"/>
                    <AccountTypesCombobox form={form}/>
                    <ExtInputField form={form} fieldName="industry" label="Industry" placeholder="Industry"/>
                    <ExtInputField form={form} fieldName="website" label="Website" placeholder="https://example.com"/>
                    <Button type="submit" disabled={loading}>{action}</Button>
                </form>
            </Form>
        </>
    );
}

export default AccountForm;