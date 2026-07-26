import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui";
import { AuthProvider } from "@/components/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata = {
  title: "EcoStay — Homestay & Eco-Tourism",
  description: "Connect with rural homestay hosts and discover eco-friendly travel experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <ToastProvider>{children}</ToastProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

