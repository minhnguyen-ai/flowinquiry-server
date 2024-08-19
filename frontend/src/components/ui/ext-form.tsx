"use client"

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";

interface ExtInputProps {
    form: any,
    fieldName: string,
    label: string,
    placeholder: string,
}

const ExtInputField = ({form, fieldName, label, placeholder}: ExtInputProps)=> {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
}

export {
    ExtInputField
}