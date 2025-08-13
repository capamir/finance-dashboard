// src/app/(main)/page.tsx

import * as React from "react";

/**
 * The main landing page for the application, rendered within the (main) layout.
 * This is a Server Component.
 */
export default function HomePage() {
  return (
    <div className="container relative py-6">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
      <p className="text-muted-foreground">
        This is the main content area. The header above is part of the layout
        for this route group.
      </p>
    </div>
  );
}
