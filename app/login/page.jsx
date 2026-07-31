"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Input, useToast } from "@/components/ui";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { showToast } = useToast();
  const { login, token } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If token already exists, redirect straight to dashboard
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  const handleLogin = async (e) => {
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
    }

    setErrors(newErrors);

    if (hasError) {
      showToast("Please fix the validation errors", "error");
      return;
    }

    setIsSubmitting(true);
    showToast("Authenticating user credentials...", "info");

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      showToast("Successfully logged in!", "success");
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } else {
      showToast(result.error || "Invalid email or password", "error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-gray-50/50 px-4 py-16 dark:bg-gray-950">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign in to your EcoStay account
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

            <Button
              variant="primary"
              type="submit"
              className="w-full py-2.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative flex items-center justify-center my-4">
              <hr className="w-full border-gray-200 dark:border-gray-800" />
              <span className="absolute px-3 bg-white dark:bg-gray-900 text-xs text-gray-500">Or continue with</span>
            </div>

            <Button
              variant="secondary"
              type="button"
              className="w-full py-2.5 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-800"
              onClick={() => {
                window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
              }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.48c0,-0.61 -0.06,-1.2 -0.17,-1.72z" fill="#4285F4" />
                  <path d="M12,20.7c2.43,0 4.47,-0.8 5.96,-2.2l-3.3,-2.58c-0.92,0.62 -2.1,0.98 -3.3,0.98c-2.34,0 -4.32,-1.58 -5.03,-3.7H2.88v2.68c1.5,2.98 4.6,5.02 8.12,5.02z" fill="#34A853" />
                  <path d="M6.97,13.2a5.2,5.2,0,0,1,0,-3.4V7.12H2.88A8.94,8.94,0,0,0,1.8,11.5c0,1.55 0.4,3.02 1.08,4.38L6.97,13.2z" fill="#FBBC05" />
                  <path d="M12,6.8c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.47,4.07 14.43,3.3 12,3.3c-3.52,0 -6.62,2.04 -8.12,5.02L6.97,11C7.68,8.88 9.66,6.8 12,6.8z" fill="#EA4335" />
                </g>
              </svg>
              Sign In with Google
            </Button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6 text-center text-sm dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">Don&apos;t have an account? </span>
            <a href="/signup" className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Sign up
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


