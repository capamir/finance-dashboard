"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { AddTransactionSheet } from "@/components/dashboard/AddTransactionSheet";
import { mockTransactions } from "@/data/mock-data";
import { Transaction } from "@/types";

export default function DashboardPage() {
  // transactions state with our mock data.
  const [transactions, setTransactions] =
    React.useState<Transaction[]>(mockTransactions);

  // Handles adding a new transaction to the state.
  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions,
    ]);
  };

  return (
    <div className="container relative py-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* Wrap the Button with the AddTransactionSheet component */}
        <AddTransactionSheet onTransactionAdded={handleAddTransaction}>
          <Button>Add Transaction</Button>
        </AddTransactionSheet>
      </div>

      {/* The components below will now re-render when the 'transactions' state changes */}
      <div className="mb-6">
        <SummaryCards transactions={transactions} />
      </div>

      <TransactionsTable data={transactions} />
    </div>
  );
}
