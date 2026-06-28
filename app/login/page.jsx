"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Input, useToast } from "@/components/ui";

export default function LoginPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    const newErrors = { email: "", password: "" };
    let hasError = false;

    // Validate email
    if (!email) {
      newErrors.email = "Email address is required";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      showToast("Please fix the validation errors", "error");
      return;
    }

    setIsSubmitting(true);
    showToast("Authenticating user credentials...", "info");

    // Simulate login response
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Successfully logged in!", "success");
      // Clear fields on successful mock login
      setEmail("");
      setPassword("");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-gray-50/50 px-4 py-16 dark:bg-gray-950">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign in to your EcoStay host or traveler account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              error={errors.email}
              disabled={isSubmitting}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              error={errors.password}
              disabled={isSubmitting}
            />

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                />
                Remember me
              </label>
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Forgot password?
              </a>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-2.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6 text-center text-sm dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">Don&apos;t have an account? </span>
            <a href="#" className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Sign up
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

