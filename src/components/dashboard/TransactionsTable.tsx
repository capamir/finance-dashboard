// src/components/dashboard/TransactionsTable.tsx

"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types";
import { TransactionSheet } from "./TransactionSheet";
import { DeleteTransactionDialog } from "./DeleteTransactionDialog";

/**
 * Props for the TransactionsTable component.
 * @property {Transaction[]} data - An array of transaction objects to display.
 * @property {(id: string) => void} onDelete - Callback to delete a transaction.
 * @property {(transaction: Transaction) => void} onSave - Callback to save (update) a transaction.
 */
type TransactionsTableProps = {
  data: Transaction[];
  onDelete: (id: string) => void;
  onSave: (transaction: Transaction) => void;
};

/**
 * A client component that renders a table of financial transactions.
 * It includes features like action menus for each row and styled badges for categories.
 * @param {TransactionsTableProps} props - The component props.
 * @returns {React.ReactElement} A card containing a responsive data table.
 */
export function TransactionsTable({
  data,
  onDelete,
  onSave,
}: TransactionsTableProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className="font-medium">
                  {transaction.description}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{transaction.category}</Badge>
                </TableCell>
                <TableCell
                  className={`text-right font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {/* Edit Action */}
                      <TransactionSheet
                        onSave={onSave}
                        initialData={transaction}
                      >
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Edit
                        </DropdownMenuItem>
                      </TransactionSheet>
                      {/* Delete Action */}
                      <DeleteTransactionDialog
                        onDelete={() => onDelete(transaction.id)}
                      >
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Delete
                        </DropdownMenuItem>
                      </DeleteTransactionDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
