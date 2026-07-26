"use client";

import React from "react";
import { Button } from "@/components/ui";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-950 transition-colors duration-200">
          <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-900">
            <span className="text-5xl" role="img" aria-label="Error graphic">⚠️</span>
            <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Something went wrong</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              An unexpected runtime error occurred. Please try reloading the page or reset the state to continue.
            </p>
            {this.state.error?.message && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-left text-xs font-mono text-red-650 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                {this.state.error.message}
              </div>
            )}
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="secondary" onClick={() => this.setState({ hasError: false, error: null })}>
                Reset State
              </Button>
              <Button variant="primary" onClick={this.handleReload} className="shadow-sm shadow-primary-500/20">
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
