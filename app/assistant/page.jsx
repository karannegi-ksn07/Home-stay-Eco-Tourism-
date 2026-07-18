import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssistantClient from "./AssistantClient";

export const metadata = {
  title: "Assistant — EcoStay",
  description: "Chat with our AI-powered EcoStay Assistant to find the perfect rural homestay.",
};

export default function AssistantPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 py-8 dark:bg-gray-950">
        <AssistantClient />
      </main>
      <Footer />
    </>
  );
}
