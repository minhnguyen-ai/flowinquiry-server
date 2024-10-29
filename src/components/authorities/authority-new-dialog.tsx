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
  onSaveSuccess: () => void;
};

const NewAuthorityDialog: React.FC<NewAuthorityDialogProps> = ({
  open,
  setOpen,
  onSaveSuccess,
}) => {
  const handleCloseDialog = () => {
    setOpen(false);
    onSaveSuccess();
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
        <NewAuthorityForm onSaveSuccess={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default NewAuthorityDialog;
