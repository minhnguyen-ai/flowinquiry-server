import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import { UiAttributes } from "@/types/ui-components";
import React from "react";

interface ExtInputProps {
    form: any,
    fieldName: string,
    label: string,
    placeholder: string,
}

export const ExtInputField = ({form, fieldName, label, placeholder, required}: ExtInputProps & UiAttributes)=> {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}
                    {required && <span className="text-destructive"> *</span>}
                    </FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
}