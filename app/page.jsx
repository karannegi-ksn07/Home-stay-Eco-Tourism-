import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

const featuredHomestays = [
  {
    title: "Himalayan Village Retreat",
    description:
      "Wake up to snow-capped peaks and warm hospitality in a traditional wooden homestay nestled in the Himalayas.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageAlt: "Mountain homestay with scenic Himalayan views",
  },
  {
    title: "Kerala Backwater Eco-Home",
    description:
      "Experience serene backwater life with organic meals, canoe rides, and sustainable living practices.",
    image: "https://images.unsplash.com/photo-1602002418080-a3aac4ba8a39?w=800&q=80",
    imageAlt: "Kerala backwater homestay surrounded by greenery",
  },
  {
    title: "Rajasthan Desert Camp",
    description:
      "Stay under starlit skies in a desert camp with local folk music, camel safaris, and authentic Rajasthani cuisine.",
    image: "https://images.unsplash.com/photo-1451337516015-6b65e2042cba?w=800&q=80",
    imageAlt: "Desert camp homestay in Rajasthan",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                Featured Homestays
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Handpicked eco-friendly stays for your next rural adventure
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredHomestays.map((stay) => (
                <Card
                  key={stay.title}
                  title={stay.title}
                  description={stay.description}
                  image={stay.image}
                  imageAlt={stay.imageAlt}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
