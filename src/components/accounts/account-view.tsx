"use client";

import {ChevronDown, ChevronLeft, ChevronRight, ChevronsDown, ChevronsUp, ChevronsUpDown} from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";
import {
  findNextAccount,
  findPreviousAccount,
} from "@/lib/actions/accounts.action";
import { AccountType } from "@/types/accounts";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ViewProps } from "../ui/ext-form";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";

export const AccountView: React.FC<ViewProps<AccountType>> = ({
  initialData,
}: ViewProps<AccountType>) => {
    const [isOpen, setIsOpen] = useState(false)
  const [account, setAccount] = useState<AccountType>(initialData);

  const navigateToPreviousRecord = async () => {
    const { ok, data } = await findPreviousAccount(account.id!);
    if (ok) {
      setAccount(data!);
    } else {
      toast({
        description: "You reach the first record",
      });
    }
  };

  const navigateToNextRecord = async () => {
    const { ok, data } = await findNextAccount(account.id!);
    if (ok) {
      setAccount(data!);
    } else {
      toast({
        description: "You reach the last record",
      });
    }
  };

  return (
    <>
      <div className="flex flex-row">
      <Button  variant="outline" size="icon" onClick={navigateToPreviousRecord}>
        <ChevronLeft />
      </Button>
      <div className="text-2xl">{account.accountName}</div>
      <Button  variant="outline" size="icon" onClick={navigateToNextRecord}>
        <ChevronRight />
      </Button>
      </div>
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>Type: {account.accountType}</div>
            <div>Industry: {account.industry}</div>
            <div>Address Line: {account.addressLine1}</div>
            <div>Phone number: {account.phoneNumber}</div>
            <div>Status: {account.status}</div>
          </div>
        </CardContent>
      </Card>
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[350px] space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                    Details
                </h4>
                <div className="flex items-center justify-between space-x-4 px-4">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                            {isOpen? <ChevronsUp className="h-4 w-4"/>:<ChevronsDown className="h-4 w-4"/> }
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>Type: {account.accountType}</div>
                        <div>Industry: {account.industry}</div>
                        <div>Address Line: {account.addressLine1}</div>
                        <div>Phone number: {account.phoneNumber}</div>
                        <div>Status: {account.status}</div>
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    </>
  );
};
