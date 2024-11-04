"use client";

import {
  EntitiesDeleteDialog,
  RowEntitiesDeleteDialogProps,
} from "@/components/shared/table-entity-delete-dialog";
import { AccountType } from "@/types/accounts";

export function AccountDeleteDialog({
  ...props
}: RowEntitiesDeleteDialogProps<AccountType>) {
  return EntitiesDeleteDialog<AccountType>({
    ...props,
  });
}
