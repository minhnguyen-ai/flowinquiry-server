"use client";

import type { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AccountTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return <div>Toolbar</div>;
  // const isFiltered = table.getState().columnFilters.length > 0;
  //
  // return (
  //   <div className="flex items-center justify-between">
  //     <div className="flex flex-1 items-center space-x-2">
  //       <Input
  //         placeholder="Filter accounts..."
  //         value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
  //         onChange={(event) =>
  //           table.getColumn("name")?.setFilterValue(event.target.value)
  //         }
  //         className="h-8 w-[150px] lg:w-[250px]"
  //       />
  //       {table.getColumn("status") && (
  //         <DataTableFacetedFilter
  //           column={table.getColumn("status")}
  //           title="Status"
  //           optionsFn={findAccountStatusesFilterOptions}
  //         />
  //       )}
  //       {table.getColumn("type") && (
  //         <DataTableFacetedFilter
  //           column={table.getColumn("type")}
  //           title="Type"
  //           optionsFn={findAccountTypesFilterOptions}
  //         />
  //       )}
  //       {table.getColumn("industry") && (
  //         <DataTableFacetedFilter
  //           column={table.getColumn("industry")}
  //           title="Industry"
  //           optionsFn={findAccountIndustriesFilterOptions}
  //         />
  //       )}
  //       {isFiltered && (
  //         <Button
  //           variant="ghost"
  //           onClick={() => table.resetColumnFilters()}
  //           className="h-8 px-2 lg:px-3"
  //         >
  //           Reset
  //           <X className="ml-2 h-4 w-4" />
  //         </Button>
  //       )}
  //     </div>
  //     <DataTableViewOptions table={table} />
  //   </div>
  // );
}
