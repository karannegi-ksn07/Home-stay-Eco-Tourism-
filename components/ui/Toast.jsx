"use client";

import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext({
  showToast: () => {},
});

/**
 * Toast notification provider. Wrap your app to enable toast notifications.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const typeStyles = {
    info: "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
    success: "bg-primary-600 text-white",
    error: "bg-red-600 text-white",
    warning: "bg-amber-500 text-white",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:bottom-6 sm:right-6 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm shadow-lg ${typeStyles[toast.type]}`}
            role="status"
          >
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100"
              aria-label="Dismiss notification"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Hook to trigger toast notifications.
 *
 * @returns {{ showToast: (message: string, type?: "info" | "success" | "error" | "warning") => void }}
 */
export function useToast() {
  return useContext(ToastContext);
}

/**
 * Simple toast notification UI component (standalone display).
 *
 * @param {Object} props
 * @param {string} props.message - Toast message text
 * @param {"info" | "success" | "error" | "warning"} [props.type="info"] - Toast type
 * @param {() => void} [props.onDismiss] - Dismiss callback
 */
export default function Toast({ message, type = "info", onDismiss }) {
  const typeStyles = {
    info: "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
    success: "bg-primary-600 text-white",
    error: "bg-red-600 text-white",
    warning: "bg-amber-500 text-white",
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm shadow-lg ${typeStyles[type]}`}
      role="status"
    >
      <span>{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100"
          aria-label="Dismiss notification"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
