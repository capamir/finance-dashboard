// src/app/(main)/page.tsx

import * as React from "react";
import { Button } from "@/components/ui/button";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { mockTransactions } from "@/data/mock-data";

export default function DashboardPage() {
  const transactions = mockTransactions;

  return (
    <div className="container relative py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Add Transaction</Button>
      </div>

      <div className="mb-6">
        <SummaryCards transactions={transactions} />
      </div>

      <TransactionsTable data={transactions} />
    </div>
  );
}
