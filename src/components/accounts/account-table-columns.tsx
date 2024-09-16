"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Circle, HelpCircle } from "lucide-react";
import Link from "next/link";

import { DataTableRowActions } from "@/components/accounts/account-table-cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/ext-data-table-column-header";
import { AccountType } from "@/types/accounts";

const status_options = [
  {
    value: "Active",
    label: "Active",
    icon: HelpCircle,
  },
  {
    value: "InActive",
    label: "InActive",
    icon: Circle,
  },
];
export const columns: ColumnDef<AccountType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "accountName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div>
        <Link href={`/portal/accounts/${row.original.id}`}>
          {row.getValue("accountName")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "accountType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("accountType")}</div>,
  },
  {
    accessorKey: "industry",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Industry" />
    ),
    cell: ({ row }) => <div>{row.getValue("industry")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = status_options.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const field = row.getValue("createdAt") as Date;
      return <div>{new Date(field).toDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
