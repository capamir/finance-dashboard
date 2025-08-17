// src/components/dashboard/DeleteTransactionDialog.tsx

"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * Props for the DeleteTransactionDialog component.
 * @property {React.ReactNode} children - The trigger element for the dialog.
 * @property {() => void} onDelete - The function to call when deletion is confirmed.
 */
type DeleteTransactionDialogProps = {
  children: React.ReactNode;
  onDelete: () => void;
};

/**
 * A component that renders a confirmation dialog before performing a delete action.
 * @param {DeleteTransactionDialogProps} props - The component props.
 * @returns {React.ReactElement} The alert dialog component.
 */
export function DeleteTransactionDialog({
  children,
  onDelete,
}: DeleteTransactionDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            transaction from your records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
