// src/app/(main)/layout.tsx

import * as React from "react";
import { Header } from "@/components/Header";

/**
 * This layout applies to all routes within the (main) group.
 * It includes the main application header.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
