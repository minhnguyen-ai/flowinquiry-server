"use client";

import { type Table } from "@tanstack/react-table";

import { ExportButton } from "@/components/ui/table/data-table-export-button";
import { ContactType } from "@/types/contacts";

interface ContactsTableToolbarActionsProps {
  table: Table<ContactType>;
}

export function ContactsTableToolbarActions({
  table,
}: ContactsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/*{table.getFilteredSelectedRowModel().rows.length > 0 ? (*/}
      {/*  <AccountDeleteDialog*/}
      {/*    accounts={table*/}
      {/*      .getFilteredSelectedRowModel()*/}
      {/*      .rows.map((row) => row.original)}*/}
      {/*    onSuccess={() => table.toggleAllRowsSelected(false)}*/}
      {/*  />*/}
      {/*) : null}*/}
      {/*<CreateTaskDialog />*/}
      {/*FIX ME: redirect to create account*/}
      <ExportButton
        table={table}
        filename="accounts"
        excludeColumns={["select", "actions"]}
      />
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
