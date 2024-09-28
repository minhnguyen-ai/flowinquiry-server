"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Circle, HelpCircle } from "lucide-react";
import Link from "next/link";

import { DataTableRowActions } from "@/components/contacts/contact-table-cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/ext-data-table-column-header";
import { ContactType } from "@/types/contacts";

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
export const contacts_columns_def: ColumnDef<ContactType>[] = [
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
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div>
        <Link href={`/portal/contacts/${row.original.id}`}>
          {row.getValue("firstName")} fff {row.getValue("lastName")}brert
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("status")}
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
