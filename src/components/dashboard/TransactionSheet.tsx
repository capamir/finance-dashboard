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
 * @property {(transaction: Transaction) => void} onSave - Callback to execute when a transaction is saved (added or updated).
 * @property {Transaction | null} [initialData] - Optional transaction data to pre-fill the form for editing.
 */
type TransactionSheetProps = {
  children: React.ReactNode;
  onSave: (transaction: Transaction) => void;
  initialData?: Transaction | null;
};

/**
 * A client component that provides a form within a side sheet for adding or editing transactions.
 * It handles form state, validation, and submission.
 * @param {TransactionSheetProps} props - The component props.
 * @returns {React.ReactElement} The sheet component with the transaction form.
 */
export function TransactionSheet({
  children,
  onSave,
  initialData,
}: TransactionSheetProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // --- Determine Mode ---
  const isEditMode = !!initialData;

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
  });

  // --- Effect to pre-fill form in Edit Mode ---
  React.useEffect(() => {
    if (isEditMode) {
      form.reset({
        description: initialData.description,
        // Convert amount to a positive string for the input field
        amount: String(Math.abs(initialData.amount)),
        date: initialData.date,
        type: initialData.type,
        category: initialData.category,
      });
    } else {
      // Reset to default values for Add Mode
      form.reset({
        description: "",
        amount: "",
        type: "expense",
        date: new Date(),
        category: undefined, // Ensure category is cleared
      });
    }
  }, [initialData, isEditMode, form]);

  /**
   * Handles the form submission process for both adding and editing.
   * @param {TransactionFormData} values - The validated form data.
   */
  function onSubmit(values: TransactionFormData) {
    const amount =
      parseFloat(values.amount) * (values.type === "expense" ? -1 : 1);

    const transactionData: Transaction = {
      // If editing, use the existing ID; otherwise, create a new one.
      id: isEditMode ? initialData.id : `txn_${Date.now()}`,
      ...values,
      amount,
      date: values.date,
    };

    onSave(transactionData);
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {isEditMode ? "Edit Transaction" : "Add a New Transaction"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Update the details of your transaction below."
              : "Enter the details of your transaction below."}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className="grid gap-4 py-4">
            {/* Form fields remain the same */}
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
          </form>
        </Form>
        <SheetFooter>
          <Button onClick={form.handleSubmit(onSubmit)}>
            {isEditMode ? "Save Changes" : "Add Transaction"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
