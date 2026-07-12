"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Input, useToast } from "@/components/ui";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { showToast } = useToast();
  const { register, token } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If token already exists, redirect straight to dashboard
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  const handleSignup = async (e) => {
    
    e.preventDefault();
    console.log("SIGNUP BUTTON CLICKED");
    
    // Clear previous errors
    const newErrors = { name: "", email: "", password: "" };
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
    showToast("Registering account...", "info");

    const result = await register(name, email, password);
    setIsSubmitting(false);

    if (result.success) {
      showToast("Registration successful! Please login.", "success");
      setName("");
      setEmail("");
      setPassword("");
      router.push("/login");
    } else {
      showToast(result.error || "Registration failed", "error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-gray-50/50 px-4 py-16 dark:bg-gray-950">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign up for an EcoStay account
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              error={errors.name}
              disabled={isSubmitting}
            />

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
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6 text-center text-sm dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">Already have an account? </span>
            <a href="/login" className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Sign in
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
