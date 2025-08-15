// src/types/index.ts

/**
 * Defines the possible categories for a transaction.
 * Using a union of string literals provides strong typing and autocompletion.
 */
export type TransactionCategory =
  | "Salary"
  | "Groceries"
  | "Utilities"
  | "Rent"
  | "Transport"
  | "Dining"
  | "Shopping"
  | "Health"
  | "Entertainment";

/**
 * Defines the structure of a single transaction object.
 * This type will be used throughout the application to ensure data consistency.
 */
export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number; // Positive for income, negative for expenses
  type: "income" | "expense";
  category: TransactionCategory;
};
