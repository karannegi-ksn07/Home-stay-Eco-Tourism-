"use client";

import { useState, useEffect } from "react";
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

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                Featured Uttarakhand Homestays
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
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
                    <Skeleton className="aspect-[16/10] w-full rounded-xl" />
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
                  We are currently updates our listings. Please check back shortly!
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
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        📍 {stay.location}
                      </span>
                      <span className="text-base font-semibold text-green-600 dark:text-green-400">
                        ₹{stay.price} <span className="text-xs font-normal text-gray-500">/ night</span>
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewDetails(stay)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 shadow-sm shadow-primary-500/20"
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
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                  📍 {selectedHomestay.location}, Uttarakhand
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
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  📞 {selectedHomestay.contact}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setIsDetailOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="flex-1 shadow-md shadow-primary-500/20"
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
