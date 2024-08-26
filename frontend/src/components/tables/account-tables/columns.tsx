"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Circle, HelpCircle } from "lucide-react";

import { DataTableColumnHeader } from "@/components/tables/data-table-column-header";
import { DataTableRowActions } from "@/components/tables/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { AccountType } from "@/types/accounts";

const status_options = [
  {
    value: "active",
    label: "Active",
    icon: HelpCircle,
  },
  {
    value: "inactive",
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => {
      const status = status_options.find(
        (status) => status.value === row.getValue("state"),
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
      // return (<div>{field.toDateString()}</div>);
      return <div>Hello</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
