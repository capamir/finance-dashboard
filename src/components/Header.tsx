// src/components/Header.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

/**
 * The main header component for the application.
 * It uses the `usePathname` hook to highlight the active navigation link.
 * This must be a Client Component.
 * @returns {React.ReactElement} The header component.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              💰 Personal Finance
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/analytics"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/analytics"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Analytics
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
