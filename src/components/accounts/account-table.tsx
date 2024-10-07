"use client";

import React from "react";

import { accounts_columns_def } from "@/components/accounts/account-table-columns";
import { AccountsTableToolbarActions } from "@/components/accounts/account-table-toolbar-actions";
import { DataTableAdvancedToolbar } from "@/components/ui/table/advanced/data-table-advanced-toolbar";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { searchAccounts } from "@/lib/actions/accounts.action";
import { AccountType } from "@/types/accounts";
import { DataTableFilterField } from "@/types/table";

interface AccountsTableProps {
  accountsPromise: ReturnType<typeof searchAccounts>;
  enableAdvancedFilter: boolean;
}

export function AccountsTable({
  accountsPromise,
  enableAdvancedFilter = false,
}: AccountsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  const { data, pageCount } = React.use(accountsPromise);
  console.log(`Page count ${pageCount} ${data.length}`);
  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => accounts_columns_def, []);

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<AccountType>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter names...",
    },
    // FIX ME: load status, type from database
    // {
    //     label: "Status",
    //     value: "status",
    //     options: tasks.status.enumValues.map((status) => ({
    //         label: status[0]?.toUpperCase() + status.slice(1),
    //         value: status,
    //         icon: getStatusIcon(status),
    //         withCount: true,
    //     })),
    // },
    // {
    //     label: "Type",
    //     value: "type",
    //     options: tasks.priority.enumValues.map((priority) => ({
    //         label: priority[0]?.toUpperCase() + priority.slice(1),
    //         value: priority,
    //         icon: getPriorityIcon(priority),
    //         withCount: true,
    //     })),
    // },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: enableAdvancedFilter,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
  });

  const Toolbar = enableAdvancedFilter
    ? DataTableAdvancedToolbar
    : DataTableToolbar;

  return (
    <DataTable table={table} floatingBar={null}>
      <Toolbar table={table} filterFields={filterFields}>
        <AccountsTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
  );
}
