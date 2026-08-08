"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { Button, Modal, Skeleton, useToast } from "@/components/ui";

export default function HomePage() {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homestays`);
        if (!res.ok) throw new Error("Failed to load featured homestays");
        const data = await res.json();
        // Since all seeded data are Uttarakhand locations, take the first 3
        setHomestays(data.slice(0, 3));
      } catch (err) {
        console.error("Error loading featured listings:", err);
        showToast("Unable to load featured homestays. Please try again later.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, [showToast]);

  const handleBookNow = (homestayName) => {
    showToast(`✓ Booking request for "${homestayName}" submitted successfully!`, "success");
  };

  const handleViewDetails = (homestay) => {
    setSelectedHomestay(homestay);
    setIsDetailOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/50 dark:bg-gray-950 transition-colors duration-200">
        <Hero />

        {/* Why Choose EcoStay Section */}
        <section className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-150/50 dark:border-gray-900 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">Our Pillars</span>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                Why Choose EcoStay
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                Experience conscious travel that preserves local heritage, uplifts mountain communities, and respects nature.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Point 1 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800/80 shadow-sm transition-all hover:scale-[1.01]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 shadow-sm">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Verified Local Homestays</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Every home is personally visited and vetted by our team to guarantee safety, authentic mountain vibes, and comfort.
                </p>
              </div>
              {/* Point 2 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800/80 shadow-sm transition-all hover:scale-[1.01]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 shadow-sm">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Authentic Mountain Experiences</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Enjoy home-cooked Garhwali and Kumaoni organic food, participate in farming, and explore offbeat trekking trails.
                </p>
              </div>
              {/* Point 3 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800/80 shadow-sm transition-all hover:scale-[1.01]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 shadow-sm">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Support Local Communities</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Your booking directly supports rural hosts, funds local community development projects, and helps preserve traditional livelihoods.
                </p>
              </div>
              {/* Point 4 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800/80 shadow-sm transition-all hover:scale-[1.01]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 shadow-sm">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Sustainable Tourism</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Stay at homes practicing waste segregation, rainwater harvesting, solar heating, and reducing carbon footprints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Listings Grid Section */}
        <section id="featured-homestays" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-150/50 dark:border-gray-900 bg-gray-50/30 dark:bg-gray-950/40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">Featured Stays</span>
              <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                Featured Uttarakhand Homestays
              </h2>
              <p className="text-sm text-gray-650 dark:text-gray-400">
                Handpicked sustainable eco-friendly stays for your next adventure in Devbhoomi
              </p>
            </div>

            {/* Skeletons Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col overflow-hidden rounded-2xl border border-gray-250 bg-white p-5 space-y-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                  >
                    <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex gap-3 pt-2">
                      <Skeleton className="h-9 flex-1 rounded-lg" />
                      <Skeleton className="h-9 flex-1 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : homestays.length === 0 ? (
              /* Empty state in case no homestays are seeded */
              <div className="text-center py-12 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 max-w-md mx-auto shadow-sm">
                <span className="text-4xl">🏡</span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No Homestays Available</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-450">
                  We are currently updating our listings. Please check back shortly!
                </p>
              </div>
            ) : (
              /* Featured Listings Grid */
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {homestays.map((stay) => (
                  <Card
                    key={stay._id || stay.name}
                    title={stay.name}
                    description={stay.description}
                    image={stay.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"}
                    imageAlt={`Scenic mountain retreat homestay: ${stay.name}`}
                  >
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <svg className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {stay.location}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        ₹{stay.price} <span className="text-xs font-normal text-gray-400">/ night</span>
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => handleViewDetails(stay)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 shadow-sm shadow-primary-500/10 hover:shadow-md transition-all active:scale-[0.98]"
                        onClick={() => handleBookNow(stay.name)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Explore Uttarakhand Destinations Section */}
        <section id="destinations" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-150/50 dark:border-gray-900 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">Destinations</span>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                Explore Uttarakhand Destinations
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                Venture into pristine alpine valleys, spiritual riverbanks, and scenic mountain trails.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { name: "Mussoorie", tag: "Queen of Hills", img: "/images/destination_mussoorie.png" },
                { name: "Rishikesh", tag: "Yoga & Adventure", img: "/images/destination_rishikesh.png" },
                { name: "Auli", tag: "Alpine Meadows", img: "/images/destination_auli.png" },
                { name: "Chopta", tag: "Mini Switzerland", img: "/images/destination_chopta.png" },
                { name: "Nainital", tag: "Lake District", img: "/images/destination_nainital.png" },
              ].map((dest) => (
                <div key={dest.name} className="group relative h-80 overflow-hidden rounded-2xl border border-gray-150/30 dark:border-gray-800 shadow-sm cursor-pointer">
                  <Image
                    src={dest.img}
                    alt={`Scenic viewpoint in ${dest.name}, Uttarakhand`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg font-bold tracking-tight">{dest.name}</h3>
                    <p className="text-xs text-gray-300 font-medium mt-1">{dest.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About EcoStay Section */}
        <section id="about" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 bg-gray-50/30 dark:bg-gray-950/40 border-b border-gray-150/50 dark:border-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">Our Mission</span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                  Connecting Travelers with Local Mountain Communities
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  EcoStay was born in the foothills of the Himalayas to bridge the gap between conscious travelers and remote mountain villages. We aim to distribute tourism revenue more equitably to support local micro-economies and prevent rural outmigration.
                </p>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  By promoting low-impact tourism, zero plastic usage, organic local meals, and encouraging water conservation, we protect the fragile Himalayan ecosystem while ensuring authentic, life-enriching cultural exchanges for hosts and visitors alike.
                </p>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 pt-6 border-t border-gray-200 dark:border-gray-800/80">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Trusted Local Hosts</h4>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Vetted mountain families managing stays with care.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Sustainable Tourism</h4>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Properties dedicated to water and waste conservation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Authentic Experiences</h4>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Traditional Garhwali & Kumaoni food and storytelling.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote layout for Host */}
              <div className="p-8 rounded-2xl bg-primary-50/50 dark:bg-primary-950/10 border border-primary-100/50 dark:border-primary-900/30">
                <span className="text-4xl text-primary-600 dark:text-primary-400 select-none">“</span>
                <p className="text-base italic text-gray-700 dark:text-gray-350 leading-relaxed font-medium">
                  Hosting travelers has not only given my family a sustainable income but has allowed us to share our culture, stories, and organic mountain food with the world.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center font-bold text-primary-700 dark:text-primary-300 text-sm">
                    D
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Devendra Singh</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Homestay Host in Chopta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Details Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={selectedHomestay?.name || "Homestay Details"}
        className="max-w-lg"
      >
        {selectedHomestay && (
          <div className="space-y-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-150 dark:bg-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedHomestay.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"}
                alt={selectedHomestay.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedHomestay.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                  <svg className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedHomestay.location}, Uttarakhand
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  ₹{selectedHomestay.price}
                </span>
                <p className="text-xs text-gray-400">per night</p>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-800" />

            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Description</h4>
              <p className="text-sm text-gray-650 dark:text-gray-450 leading-relaxed">
                {selectedHomestay.description || "No description provided."}
              </p>
            </div>

            {selectedHomestay.contact && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Contact Host</h4>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-350">
                  📞 {selectedHomestay.contact}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-3">
              <Button
                variant="secondary"
                className="flex-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsDetailOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="flex-1 shadow-md shadow-primary-500/10 hover:shadow-md hover:shadow-primary-500/20 active:scale-[0.98] transition-all"
                onClick={() => {
                  setIsDetailOpen(false);
                  handleBookNow(selectedHomestay.name);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </>
  );
}