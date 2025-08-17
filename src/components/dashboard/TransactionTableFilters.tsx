// src/components/dashboard/TransactionTableFilters.tsx

"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Props for the TransactionTableFilters component.
 * @property {string} description - The current value of the description filter.
 * @property {(value: string) => void} onDescriptionChange - Callback to update the description filter.
 * @property {string} type - The current value of the type filter ('all', 'income', 'expense').
 * @property {(value: string) => void} onTypeChange - Callback to update the type filter.
 */
type TransactionTableFiltersProps = {
  description: string;
  onDescriptionChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
};

/**
 * A component that provides UI controls for filtering the transactions table.
 * @param {TransactionTableFiltersProps} props - The component props.
 * @returns {React.ReactElement} A set of filter inputs.
 */
export function TransactionTableFilters({
  description,
  onDescriptionChange,
  type,
  onTypeChange,
}: TransactionTableFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Filter by description..."
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="flex-1" // This tells the input to take up all available space
      />

      <Select value={type} onValueChange={onTypeChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          {" "}
          {/* Fixed width on desktop, full on mobile */}
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
