"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
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

export const AccountView: React.FC<ViewProps<AccountType>> = ({
  initialData,
}: ViewProps<AccountType>) => {
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
      <Button onClick={navigateToPreviousRecord}>
        <ChevronLeft />
      </Button>
      <div className="text-2xl">{account.accountName}</div>
      <Button onClick={navigateToNextRecord}>
        <ChevronRight />
      </Button>
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
      <Card>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>Type: {account.accountType}</div>
                  <div>Industry: {account.industry}</div>
                  <div>Address Line: {account.addressLine1}</div>
                  <div>Phone number: {account.phoneNumber}</div>
                  <div>Status: {account.status}</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};
