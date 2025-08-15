// src/data/mock-data.ts

import { Transaction } from "@/types";

/**
 * A mock dataset of transactions to be used for UI development and testing.
 * This simulates the data that would typically be fetched from a database or API.
 */
export const mockTransactions: Transaction[] = [
  {
    id: "txn_1",
    date: new Date("2024-07-01"),
    description: "Monthly Salary",
    amount: 5000,
    type: "income",
    category: "Salary",
  },
  {
    id: "txn_2",
    date: new Date("2024-07-01"),
    description: "Apartment Rent",
    amount: -1500,
    type: "expense",
    category: "Rent",
  },
  {
    id: "txn_3",
    date: new Date("2024-07-03"),
    description: "Weekly Groceries",
    amount: -125.5,
    type: "expense",
    category: "Groceries",
  },
  {
    id: "txn_4",
    date: new Date("2024-07-05"),
    description: "Electricity Bill",
    amount: -75.2,
    type: "expense",
    category: "Utilities",
  },
  {
    id: "txn_5",
    date: new Date("2024-07-07"),
    description: "Dinner with friends",
    amount: -55,
    type: "expense",
    category: "Dining",
  },
  {
    id: "txn_6",
    date: new Date("2024-07-10"),
    description: "New pair of shoes",
    amount: -200,
    type: "expense",
    category: "Shopping",
  },
  {
    id: "txn_7",
    date: new Date("2024-07-12"),
    description: "Train ticket",
    amount: -30,
    type: "expense",
    category: "Transport",
  },
];
