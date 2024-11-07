"use client";

import React from "react";

import NewAuthorityForm from "@/components/authorities/authority-new-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthorityType } from "@/types/authorities";

type NewAuthorityDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveSuccess: (savedAuthority: AuthorityType) => void;
  authorityEntity?: AuthorityType | undefined;
};

const NewAuthorityDialog: React.FC<NewAuthorityDialogProps> = ({
  open,
  setOpen,
  onSaveSuccess,
  authorityEntity = undefined,
}) => {
  const handleCloseDialog = (savedAuthority: AuthorityType) => {
    setOpen(false);
    onSaveSuccess(savedAuthority);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Authority</DialogTitle>
          <DialogDescription>
            Create a new authority to access resources
          </DialogDescription>
        </DialogHeader>
        <NewAuthorityForm
          authorityEntity={authorityEntity}
          onSaveSuccess={handleCloseDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewAuthorityDialog;
