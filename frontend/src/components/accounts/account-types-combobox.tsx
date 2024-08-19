import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";

interface AccountTypesComboboxProps {
    form: any
}

const accountTypes = [
    { label: "Customer-Direct"},
    { label: "Customer-Channel"},
    { label: "Reseller"},
    { label: "Prospect"},
    { label: "Other"}
] as const

const AccountTypesCombobox = ({form}: AccountTypesComboboxProps) => {
    return <FormField
        control={form.control}
        name="accountType"
        render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>Account Type</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "w-[200px] justify-between",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value
                                    ? accountTypes.find(
                                        (accountType) => accountType.label === field.value
                                    )?.label
                                    : "Select account type"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search account type..." />
                            <CommandList>
                                <CommandEmpty>No language found.</CommandEmpty>
                                <CommandGroup>
                                    {accountTypes.map((accountType) => (
                                        <CommandItem
                                            value={accountType.label}
                                            key={accountType.label}
                                            onSelect={() => {
                                                console.log("Hello " + accountType.label);
                                                form.setValue("accountType", accountType.label)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    accountType.label === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {accountType.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
        )}
    />
}

export default AccountTypesCombobox;