"use client";

import {
  EntitiesDeleteDialog,
  EntitiesDeleteDialogProps,
} from "@/components/shared/entity-delete-dialog";
import { AccountType } from "@/types/accounts";

export function AccountDeleteDialog({
  entities,
  showTrigger = true,
  onSuccess,
  ...props
}: EntitiesDeleteDialogProps<AccountType>) {
  return EntitiesDeleteDialog<AccountType>({
    entities,
    showTrigger,
    onSuccess,
    ...props,
  });
}
