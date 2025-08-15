// src/components/dashboard/AddTransactionSheet.tsx

"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import {
  transactionFormSchema,
  TransactionFormData,
  transactionCategories,
} from "@/lib/validators";
import { Transaction } from "@/types";

/**
 * Props for the AddTransactionSheet component.
 * @property {React.ReactNode} children - The trigger element for the sheet.
 * @property {(transaction: Transaction) => void} onTransactionAdded - Callback to execute when a new transaction is successfully submitted.
 */
type AddTransactionSheetProps = {
  children: React.ReactNode;
  onTransactionAdded: (transaction: Transaction) => void;
};

/**
 * A client component that provides a form within a side sheet for adding new transactions.
 * It handles form state, validation, and submission.
 * @param {AddTransactionSheetProps} props - The component props.
 * @returns {React.ReactElement} The sheet component with the transaction form.
 */
export function AddTransactionSheet({
  children,
  onTransactionAdded,
}: AddTransactionSheetProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // --- React Hook Form Initialization ---
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      description: "",
      amount: "",
      type: "expense",
      date: new Date(),
    },
  });

  /**
   * Handles the form submission process.
   * @param {TransactionFormData} values - The validated form data.
   */
  function onSubmit(values: TransactionFormData) {
    const amount =
      parseFloat(values.amount) * (values.type === "expense" ? -1 : 1);

    const newTransaction: Transaction = {
      id: `txn_${Date.now()}`, // Simple unique ID for now
      ...values,
      amount,
      date: values.date, // Ensure date is a Date object
    };

    onTransactionAdded(newTransaction);
    form.reset(); // Reset form fields to default values
    setIsOpen(false); // Close the sheet
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a New Transaction</SheetTitle>
          <SheetDescription>
            Enter the details of your transaction below.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Groceries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Field */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Field */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type Field */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transactionCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="pt-4">
              <Button type="submit">Add Transaction</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
