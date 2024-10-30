"use client";

import { type Table } from "@tanstack/react-table";

import { ExportButton } from "@/components/ui/table/data-table-export-button";
import { AuthorityType } from "@/types/authorities";

interface AuthorityTableToolbarActionsProps {
  table: Table<AuthorityType>;
}

export function AuthoritiesTableToolbarActions({
  table,
}: AuthorityTableToolbarActionsProps) {
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
