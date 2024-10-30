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
      <ExportButton
        table={table}
        filename="accounts"
        excludeColumns={["select", "actions"]}
      />
    </div>
  );
}
