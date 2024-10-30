"use client";

import {
  EntitiesDeleteDialog,
  EntitiesDeleteDialogProps,
} from "@/components/shared/entity-delete-dialog";
import { AccountType } from "@/types/accounts";

export function AccountDeleteDialog({
  ...props
}: EntitiesDeleteDialogProps<AccountType>) {
  return EntitiesDeleteDialog<AccountType>({
    ...props,
  });
}
