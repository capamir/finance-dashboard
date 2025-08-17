// src/components/charts/SpendingChart.tsx

"use client";

import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types";

type SpendingChartProps = {
  transactions: Transaction[];
};

export function SpendingChart({ transactions }: SpendingChartProps) {
  // --- Data Processing ---
  // We use a Map to efficiently aggregate expenses by category.
  const spendingByCategory = transactions
    // 1. Filter for only expense transactions.
    .filter((t) => t.type === "expense")
    // 2. Aggregate the amounts for each category.
    .reduce((acc, transaction) => {
      const category = transaction.category;
      const amount = Math.abs(transaction.amount); // Use absolute value for chart
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {} as { [key: string]: number });

  // 3. Convert the aggregated data into an array suitable for the chart.
  const chartData = Object.entries(spendingByCategory).map(
    ([category, total]) => ({
      name: category,
      total: total,
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
