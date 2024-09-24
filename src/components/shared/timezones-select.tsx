"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { getTimezones, TimezoneInfo } from "@/lib/actions/shared.action";
import { cn } from "@/lib/utils";
import { ActionResult } from "@/types/commons";
import { UiAttributes } from "@/types/ui-components";

interface TimezonesSelectProps {
  form: any;
}

const timezoneInfos = [
  { label: "Customer-Direct" },
  { label: "Customer-Channel" },
  { label: "Reseller" },
  { label: "Prospect" },
  { label: "Other" },
];

const TimezoneSelect = ({
  form,
  required,
}: TimezonesSelectProps & UiAttributes) => {
  const { data: timezonesResult, isError } = useQuery<
    ActionResult<Array<TimezoneInfo>>
  >({
    queryKey: [`timezones`],
    queryFn: async () => {
      return getTimezones();
    },
  });

  if (isError || !timezonesResult) {
    toast({
      description: `Can not load timezones`,
    });
    return <div>Can not load timezones</div>;
  } else {
    let timezoneInfos = timezonesResult.data;

    return (
      <FormField
        control={form.control}
        name="timezone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Timezone
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-[400px] justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? (() => {
                          const selectedTimezone = timezoneInfos?.find(
                            (timezone) => timezone.zoneId === field.value,
                          );

                          return selectedTimezone
                            ? `${selectedTimezone.zoneId} ${selectedTimezone.offset}`
                            : "Select timezone";
                        })()
                      : "Select timezone"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Search timezone..." />
                  <CommandList>
                    <CommandEmpty>No timezone found.</CommandEmpty>
                    <CommandGroup>
                      {timezoneInfos?.map((timezone) => (
                        <CommandItem
                          value={timezone.zoneId}
                          key={timezone.zoneId}
                          onSelect={() => {
                            form.setValue("timezone", timezone.zoneId);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              timezone.zoneId === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {timezone.offset} {timezone.zoneId}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    );
  }
};

export default TimezoneSelect;
