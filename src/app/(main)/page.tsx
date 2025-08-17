// src/app/(main)/page.tsx

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { TransactionSheet } from "@/components/dashboard/TransactionSheet";
import { TransactionTableFilters } from "@/components/dashboard/TransactionTableFilters";
import { mockTransactions } from "@/data/mock-data";
import { Transaction } from "@/types";

/**
 * The main dashboard page for the application.
 * This is a Client Component to manage the state of transactions and filters.
 */
export default function DashboardPage() {
  // --- Main Data State ---
  const [transactions, setTransactions] =
    React.useState<Transaction[]>(mockTransactions);

  // --- Filter States ---
  const [descriptionFilter, setDescriptionFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("all"); // 'all', 'income', or 'expense'

  // --- State Management Handlers ---
  const handleSaveTransaction = (transactionData: Transaction) => {
    setTransactions((prev) => {
      const existingIndex = prev.findIndex((t) => t.id === transactionData.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = transactionData;
        return updated;
      }
      return [transactionData, ...prev];
    });
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
  };

  // --- Derived State for Filtering ---
  // This computes the filtered list on every render based on the current filter state.
  const filteredTransactions = React.useMemo(() => {
    return transactions.filter((transaction) => {
      // Description filter (case-insensitive)
      const descriptionMatch = transaction.description
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase());

      // Type filter
      const typeMatch = typeFilter === "all" || transaction.type === typeFilter;

      return descriptionMatch && typeMatch;
    });
  }, [transactions, descriptionFilter, typeFilter]);

  return (
    <div className="container relative py-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <TransactionSheet onSave={handleSaveTransaction}>
          <Button>Add Transaction</Button>
        </TransactionSheet>
      </div>

      {/* Summary cards now show data for the *filtered* transactions */}
      <div className="mb-6">
        <SummaryCards transactions={filteredTransactions} />
      </div>

      {/* Add the new filter component */}
      <div className="mb-6">
        <TransactionTableFilters
          description={descriptionFilter}
          onDescriptionChange={setDescriptionFilter}
          type={typeFilter}
          onTypeChange={setTypeFilter}
        />
      </div>

      {/* The table now displays the *filtered* transactions */}
      <TransactionsTable
        data={filteredTransactions}
        onDelete={handleDeleteTransaction}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}
