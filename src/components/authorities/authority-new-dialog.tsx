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

type NewAuthorityDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewAuthorityDialog: React.FC<NewAuthorityDialogProps> = ({
  open,
  setOpen,
}) => {
  const handleCloseDialog = () => {
    setOpen(false);
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
        <NewAuthorityForm onSave={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default NewAuthorityDialog;
