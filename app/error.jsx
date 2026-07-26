"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Route Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-900">
        <span className="text-5xl" role="img" aria-label="Error graphic">🛠️</span>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Something went wrong!</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          An error occurred in this section of the application. Feel free to reload or try resetting the view.
        </p>
        {error?.message && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-left text-xs font-mono text-red-650 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
            {error.message}
          </div>
        )}
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="secondary" onClick={() => window.location.href = "/"}>
            Go Home
          </Button>
          <Button variant="primary" onClick={reset} className="shadow-sm shadow-primary-500/20">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
