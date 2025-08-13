"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

/**
 * A client-side component that wraps the NextThemesProvider to provide theme
 * functionality (light, dark, system) to the entire application.
 * This is the recommended setup for using next-themes with the Next.js App Router.
 * @param {ThemeProviderProps} props - The props for the theme provider.
 * @returns {React.ReactElement} The theme provider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
