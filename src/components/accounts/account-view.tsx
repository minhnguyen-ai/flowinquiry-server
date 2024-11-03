"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { ContactsTable } from "@/components/contacts/contact-table";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  findNextAccount,
  findPreviousAccount,
} from "@/lib/actions/accounts.action";
import { searchContacts } from "@/lib/actions/contacts.action";
import { obfuscate } from "@/lib/endecode";
import { navigateToRecord } from "@/lib/navigation-record";
import { cn } from "@/lib/utils";
import { AccountType } from "@/types/accounts";
import { PageableResult } from "@/types/commons";
import { ContactType } from "@/types/contacts";

import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ViewProps } from "../ui/ext-form";

export const AccountView: React.FC<ViewProps<AccountType>> = ({
  entity,
}: ViewProps<AccountType>) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [account, setAccount] = useState<AccountType>(entity);
  const [contactPromise, setContactPromise] = useState<
    Promise<PageableResult<ContactType>>
  >(
    searchContacts([
      { field: "account.id", operator: "eq", value: account.id! },
    ]),
  );

  useEffect(() => {
    if (account && pathname !== `/portal/accounts/${obfuscate(account.id)}`) {
      router.replace(`/portal/accounts/${obfuscate(account.id)}`);
    }
  }, [account, router]);

  const navigateToPreviousRecord = async () => {
    const previousAccount = await navigateToRecord(
      findPreviousAccount,
      "You reach the first record",
      account.id!,
    );
    setAccount(previousAccount);
  };

  const navigateToNextRecord = async () => {
    const nextAccount = await navigateToRecord(
      findNextAccount,
      "You reach the last record",
      account.id!,
    );
    setAccount(nextAccount);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-row justify-between gap-4">
        <Button
          variant="outline"
          className="px-2"
          size="icon"
          onClick={navigateToPreviousRecord}
        >
          <ChevronLeft className="text-gray-400" />
        </Button>
        <div className="text-2xl w-full">{account.name}</div>
        <Button variant="outline" size="icon" onClick={navigateToNextRecord}>
          <ChevronRight className="text-gray-400" />
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 px-4 py-4 gap-4 md:grid-cols-2">
            <div>Type: {account.type}</div>
            <div>Industry: {account.industry}</div>
            <div>Address Line: {account.addressLine1}</div>
            <div>Phone number: {account.phoneNumber}</div>
            <div>
              Status: <Badge variant="outline">{account.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
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
          <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
            <div>
              Type: <Badge variant="outline">{account.type}</Badge>
            </div>

            <div>
              Industry:{" "}
              <Badge variant="outline" className="bg-amber-300">
                {account.industry}
              </Badge>
            </div>

            <div>Address Line:{account.addressLine1}</div>
            <div>Phone number: {account.phoneNumber}</div>
            <div>
              Status:{" "}
              <Badge variant="outline" className="bg-amber-300">
                {account.status}
              </Badge>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      <div className="flex flex-row justify-between">
        <div className="text-xl w-full">Contacts</div>
        <div>
          <Link
            href={`/portal/contacts/new/edit?accountId=${obfuscate(account.id)}&&accountName=${account.name}`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> New Contact
          </Link>
        </div>
      </div>
      <ContactsTable
        contactPromise={contactPromise}
        enableAdvancedFilter={false}
      />
    </div>
  );
};
