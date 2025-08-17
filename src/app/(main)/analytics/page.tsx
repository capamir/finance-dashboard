// src/app/(main)/analytics/page.tsx

import * as React from "react";
import { SpendingChart } from "@/components/charts/SpendingChart";
import { mockTransactions } from "@/data/mock-data";

export default function AnalyticsPage() {
  // In a real application, this data would be fetched from an API.
  const transactions = mockTransactions;

  return (
    <div className="container relative py-6 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          A visual overview of your financial activity.
        </p>
      </div>

      {/* Render the spending chart, passing the transaction data */}
      <div className="grid gap-6">
        <SpendingChart transactions={transactions} />
      </div>
    </div>
  );
}
