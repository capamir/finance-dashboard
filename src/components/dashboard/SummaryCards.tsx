import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types";

type SummaryCardsProps = {
  transactions: Transaction[];
};

/**
 * A server component that displays summary financial metrics (Balance, Income, Expenses)
 * based on a list of transactions.
 */
export function SummaryCards({ transactions }: SummaryCardsProps) {
  // --- Data Calculation ---
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {
        // Expense amounts are negative, so we add them directly.
        acc.expenses += transaction.amount;
      }
      acc.balance += transaction.amount;
      return acc;
    },
    { income: 0, expenses: 0, balance: 0 }
  );

  // --- Formatting ---
  // Use Intl.NumberFormat for robust and locale-aware currency formatting.
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Total Balance Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary.balance)}
          </div>
        </CardContent>
      </Card>

      {/* Total Income Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(summary.income)}
          </div>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {/* Expenses are stored as negative, so multiply by -1 for display */}
            {formatCurrency(summary.expenses * -1)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
