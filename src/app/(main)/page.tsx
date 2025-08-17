// src/app/(main)/page.tsx

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { TransactionSheet } from "@/components/dashboard/TransactionSheet";
import { mockTransactions } from "@/data/mock-data";
import { Transaction } from "@/types";

/**
 * The main dashboard page for the application.
 * This is a Client Component to manage the state of transactions.
 */
export default function DashboardPage() {
  const [transactions, setTransactions] =
    React.useState<Transaction[]>(mockTransactions);

  /**
   * Handles adding a new transaction or updating an existing one.
   * Checks if a transaction with the given ID already exists.
   * @param {Transaction} transactionData - The new or updated transaction object.
   */
  const handleSaveTransaction = (transactionData: Transaction) => {
    setTransactions((prevTransactions) => {
      const existingIndex = prevTransactions.findIndex(
        (t) => t.id === transactionData.id
      );

      if (existingIndex > -1) {
        // --- UPDATE ---
        // Create a new array and update the specific transaction at its index.
        const updatedTransactions = [...prevTransactions];
        updatedTransactions[existingIndex] = transactionData;
        return updatedTransactions;
      } else {
        // --- ADD ---
        // Return a new array with the new transaction at the beginning.
        return [transactionData, ...prevTransactions];
      }
    });
  };

  /**
   * Handles deleting a transaction from the state by its ID.
   * @param {string} transactionId - The ID of the transaction to delete.
   */
  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions((prevTransactions) =>
      // Filter out the transaction with the matching ID.
      prevTransactions.filter((t) => t.id !== transactionId)
    );
  };

  return (
    <div className="container relative py-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* This TransactionSheet is for ADDING new transactions */}
        <TransactionSheet onSave={handleSaveTransaction}>
          <Button>Add Transaction</Button>
        </TransactionSheet>
      </div>

      <div className="mb-6">
        <SummaryCards transactions={transactions} />
      </div>

      {/* Pass the new handler functions down to the table */}
      <TransactionsTable
        data={transactions}
        onDelete={handleDeleteTransaction}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}
