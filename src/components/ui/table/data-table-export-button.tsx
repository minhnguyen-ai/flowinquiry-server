import { DownloadIcon } from "@radix-ui/react-icons"; // Assume you have this icon component
import { Table } from "@tanstack/react-table";
import React from "react";

import { Button } from "@/components/ui/button";
import { exportTableToCSV } from "@/lib/export";

// Assume you have this utility function

interface ExportButtonProps<TData> {
  table: Table<TData>; // You can replace `any` with the appropriate table type if necessary
  filename: string; // Filename for the exported CSV
  excludeColumns?: (keyof TData | "select" | "actions")[]; // Optional columns to exclude from export
}

export const ExportButton = <TData,>({
  table,
  filename,
  excludeColumns = [], // Default to an empty array if not provided
}: ExportButtonProps<TData>) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        exportTableToCSV(table, {
          filename,
          excludeColumns,
        })
      }
    >
      <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
      Export
    </Button>
  );
};
