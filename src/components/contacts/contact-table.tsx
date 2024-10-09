"use client";

import React from "react";

import { contacts_columns_def } from "@/components/contacts/contact-table-columns";
import { ContactsTableToolbarActions } from "@/components/contacts/contact-table-toolbar-actions";
import { DataTableAdvancedToolbar } from "@/components/ui/table/advanced/data-table-advanced-toolbar";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { useFetchData } from "@/hooks/use-fetch-data-values";
import {
  findContactStatuses,
  searchContacts,
} from "@/lib/actions/contacts.action";
import { ContactType } from "@/types/contacts";
import { DataTableFilterField } from "@/types/table";

interface ContactsTableProps {
  contactPromise: ReturnType<typeof searchContacts>;
  enableAdvancedFilter: boolean;
}

export function ContactsTable({
  contactPromise,
  enableAdvancedFilter = false,
}: ContactsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  const { data, pageCount } = React.use(contactPromise);
  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => contacts_columns_def, []);

  const contactStatuses = useFetchData(findContactStatuses);

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
  const filterFields: DataTableFilterField<ContactType>[] = [
    {
      label: "First Name",
      value: "firstName",
      placeholder: "Filter names...",
    },
    {
      label: "Status",
      value: "status",
      options: contactStatuses.map((status) => ({
        label: status,
        value: status,
        icon: undefined,
        withCount: true,
      })),
    },
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
        <ContactsTableToolbarActions table={table} />
      </Toolbar>
    </DataTable>
  );
}
