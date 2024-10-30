"use client";

import { type Table } from "@tanstack/react-table";

import { AccountDeleteDialog } from "@/components/accounts/account-delete-dialog";
import { ExportButton } from "@/components/ui/table/data-table-export-button";
import { deleteAccounts } from "@/lib/actions/accounts.action";
import { AccountType } from "@/types/accounts";

interface AccountTableToolbarActionsProps {
  table: Table<AccountType>;
}

export function AccountsTableToolbarActions({
  table,
}: AccountTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <AccountDeleteDialog
          entities={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
          entityName="Account"
          deleteEntitiesFn={deleteAccounts}
        />
      ) : null}
      <ExportButton
        table={table}
        filename="accounts"
        excludeColumns={["select", "actions"]}
      />
    </div>
  );
}
