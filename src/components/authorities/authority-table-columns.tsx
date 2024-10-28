"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { AuthorityTableRowActions } from "@/components/authorities/authority-table-cell-action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { obfuscate } from "@/lib/endecode";
import { AuthorityType } from "@/types/authorities";

export const authorities_columns_def: ColumnDef<AuthorityType>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <Button variant="link" asChild>
        <Link href={`/portal/accounts/${obfuscate(row.original.name!)}`}>
          {row.getValue("name")}
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <AuthorityTableRowActions row={row} />,
  },
];
