import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/Card";

export const metadata = {
  title: "About — EcoStay",
};

const features = [
  {
    title: "Sustainable Tourism",
    description: "We promote low-impact travel that respects and preserves local ecosystems, flora, and fauna, ensuring nature thrives for generations to come.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    imageAlt: "Verdent forest depicting sustainable ecosystem",
  },
  {
    title: "Rural Empowerment",
    description: "By connecting hosts directly with travelers, we keep tourism revenue within local villages, supporting micro-economies and traditional livelihoods.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    imageAlt: "Local market representing rural trade",
  },
  {
    title: "Eco-Friendly Travel",
    description: "Our homestays follow carbon-minimizing guidelines, using organic farming practices, solar power, composting, and zero plastic policies.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    imageAlt: "Alpine green mountains showing eco environment",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-gray-950">
        {/* Hero Header */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-emerald-50 py-16 text-center dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              About EcoStay
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
              EcoStay is a community-driven homestay platform dedicated to connecting conscious eco-tourists 
              with authentic rural hosts. We believe in travel that enriches the traveler, sustains local cultures, 
              and protects our planet.
            </p>
          </div>
        </section>

        {/* Feature Blocks */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              Our Core Pillars
            </h2>
            <p className="mt-3 text-sm text-gray-500 sm:text-base dark:text-gray-400">
              The principles that guide our efforts toward sustainable and impactful travel
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                title={feature.title}
                description={feature.description}
                image={feature.image}
                imageAlt={feature.imageAlt}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

