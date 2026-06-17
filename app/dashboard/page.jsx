import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Dashboard — EcoStay",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">Dashboard</h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
            Your homestay management dashboard will appear here. This is a placeholder for the
            upcoming host and guest portal.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
