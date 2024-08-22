import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UiAttributes } from "@/types/ui-components";


interface AccountIndustriesSelectProps {
    form: any
}

const accountIndustries = [
    { label: "Customer-Direct"},
    { label: "Customer-Channel"},
    { label: "Reseller"},
    { label: "Prospect"},
    { label: "Other"}
] as const

const AccountIndustriesSelect = ({form, required}: AccountIndustriesSelectProps & UiAttributes) => {
    return <FormField
        control={form.control}
        name="accountType"
        render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>Industry
                {required && <span className="text-destructive"> *</span>}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}
                {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an account industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {accountIndustries?.map((accountIndustry) => (
                        <SelectItem key={accountIndustry.label} value={accountIndustry.label}>
                            {accountIndustry.label}
                        </SelectItem>
                    ))}
                </SelectContent>
              </Select>

            </FormItem>
        )}
    />
}

export default AccountIndustriesSelect;