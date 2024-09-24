"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Plus,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { contacts_columns_def } from "@/components/contacts/contact-table-columns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DataTable } from "@/components/ui/ext-data-table";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import {
  findNextAccount,
  findPreviousAccount,
} from "@/lib/actions/accounts.action";
import { findContactsByAccountId } from "@/lib/actions/contacts.action";
import { cn } from "@/lib/utils";
import { AccountType } from "@/types/accounts";
import { ActionResult, PageableResult } from "@/types/commons";
import { ContactType } from "@/types/contacts";

import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ViewProps } from "../ui/ext-form";

export const AccountView: React.FC<ViewProps<AccountType>> = ({
  initialData,
}: ViewProps<AccountType>) => {
  const [isOpen, setIsOpen] = useState(true);
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

  const { data: contactQueryResult, isError } = useQuery<
    ActionResult<PageableResult<ContactType>>
  >({
    queryKey: [`contactsPerAccount`, account.id],
    queryFn: async () => {
      return findContactsByAccountId(account.id!);
    },
  });
  if (isError) {
    toast({
      description: `Can not load contacts for the account ${account.accountName}`,
    });
  }

  let contactPageResult = contactQueryResult?.data;

  return (
    <>
      <div className="flex flex-row justify-between gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={navigateToPreviousRecord}
        >
          <ChevronLeft />
        </Button>
        <div className="text-2xl w-full">{account.accountName}</div>
        <Button variant="outline" size="icon" onClick={navigateToNextRecord}>
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
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Details</h4>
          <div className="flex items-center justify-between space-x-4 px-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                {isOpen ? (
                  <ChevronsUp className="h-4 w-4" />
                ) : (
                  <ChevronsDown className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>Type: {account.accountType}</div>
            <div>Industry: {account.industry}</div>
            <div>Address Line: {account.addressLine1}</div>
            <div>Phone number: {account.phoneNumber}</div>
            <div>Status: {account.status}</div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      <div className="flex flex-row justify-between">
        <div className="w-full">Contacts</div>
        <div>
          <Link
            href={"/portal/contacts/new/edit"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> New Contact
          </Link>
        </div>
      </div>
      {contactPageResult?.content === undefined ? (
        <div>can not load contacts</div>
      ) : (
        <DataTable
          columns={contacts_columns_def}
          data={contactPageResult?.content}
        />
      )}
    </>
  );
};
