// src/components/Header.tsx

import * as React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * The main header component for the application.
 * It serves as a container for top-level navigation and actions,
 * like the theme toggle. This is a Server Component.
 * @returns {React.ReactElement} The header component.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-5 flex h-14 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              💰 Personal Finance
            </span>
          </a>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
