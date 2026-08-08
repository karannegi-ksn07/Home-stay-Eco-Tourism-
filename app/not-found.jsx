import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-emerald-50 px-4 py-16 text-center dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-200">
        <div className="max-w-md rounded-2xl border border-gray-250 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <span className="text-6xl animate-pulse inline-block mb-4" role="img" aria-label="Mountain and pine trees">
            🏔️
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">404</h1>
          <h2 className="mt-2 text-xl font-bold text-gray-800 dark:text-gray-200">Lost in the Mountains?</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            The page you are looking for has taken a trail less traveled or doesn&apos;t exist. Let&apos;s guide you back to safety.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/" className="inline-flex items-center justify-center font-medium rounded-lg transition-colors px-6 py-2.5 bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-500/20">
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
