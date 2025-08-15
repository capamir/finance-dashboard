import { z } from "zod";
import { TransactionCategory } from "@/types";

export const transactionCategories: [
  TransactionCategory,
  ...TransactionCategory[]
] = [
  "Salary",
  "Groceries",
  "Utilities",
  "Rent",
  "Transport",
  "Dining",
  "Shopping",
  "Health",
  "Entertainment",
];

export const transactionFormSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required.",
  }),

  amount: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Amount must be a valid number.",
  }),

  date: z.date(),

  type: z.enum(["income", "expense"]),

  category: z.enum(transactionCategories),
});

export type TransactionFormData = z.infer<typeof transactionFormSchema>;
