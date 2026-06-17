import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Login — EcoStay",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">Login</h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
            The login form will be available here in a future phase. This is a placeholder page with
            no authentication logic.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
