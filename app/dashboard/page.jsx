"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Input, Modal, Loader, useToast } from "@/components/ui";

const mockBookings = [
  { id: "BK-209", guest: "Aria Sharma", homestay: "Himalayan Village Retreat", dates: "Jun 24 - Jun 28", status: "Confirmed" },
  { id: "BK-208", guest: "Rohan Das", homestay: "Kerala Backwater Eco-Home", dates: "Jul 02 - Jul 09", status: "Pending" },
  { id: "BK-207", guest: "Elena Petrova", homestay: "Rajasthan Desert Camp", dates: "Jul 15 - Jul 18", status: "Confirmed" },
];

export default function DashboardPage() {
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [bookings] = useState(mockBookings);

  const [newHomestay, setNewHomestay] = useState({
    name: "",
    price: "",
    location: ""
  });

  const [homestays, setHomestays] = useState([]);

  // ✅ FETCH BACKEND DATA (VISIBLE IN NETWORK TAB)
  useEffect(() => {
    console.log("API CALL STARTED");

    fetch("http://localhost:5000/api/homestays")
      .then((res) => {
        console.log("STATUS:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("DATA RECEIVED:", data);
        setHomestays(data);
      })
      .catch((err) => {
        console.log("FETCH ERROR:", err);
        showToast("Failed to load homestays", "error");
      });
  }, [showToast]);

  const simulateLoading = () => {
    setIsLoading(true);
    showToast("Refreshing dashboard...", "info");

    setTimeout(() => {
      setIsLoading(false);
      showToast("Updated successfully!", "success");
    }, 1500);
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();

    if (!newHomestay.name || !newHomestay.price || !newHomestay.location) {
      showToast("Fill all fields", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/homestays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHomestay),
      });

      if (!res.ok) throw new Error("Failed request");

      const data = await res.json();

      setHomestays((prev) => [...prev, data]);

      showToast("Listing created!", "success");

      setIsModalOpen(false);
      setNewHomestay({ name: "", price: "", location: "" });

    } catch (err) {
      console.log(err);
      showToast("Error creating listing", "error");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-gray-50/50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">

          {/* HOMESTAYS FROM BACKEND */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {homestays.map((item, index) => (
              <div
                key={item.id || index}
                className="rounded-xl border bg-white p-5 shadow-sm dark:bg-gray-900"
              >
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">📍 {item.location}</p>
                <p className="text-green-600 font-semibold mt-2">
                  ₹ {item.price} / night
                </p>
              </div>
            ))}
          </div>

          {/* HEADER */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-sm text-gray-500">
                Manage homestays and bookings
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={simulateLoading}>
                {isLoading ? <Loader size="sm" /> : "Refresh"}
              </Button>

              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Add Listing
              </Button>
            </div>
          </div>

          {/* BOOKINGS TABLE */}
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-4 border-b font-semibold">
              Recent Bookings
            </div>

            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Guest</th>
                  <th className="p-3">Homestay</th>
                  <th className="p-3">Dates</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="p-3">{b.id}</td>
                    <td className="p-3">{b.guest}</td>
                    <td className="p-3">{b.homestay}</td>
                    <td className="p-3">{b.dates}</td>
                    <td className="p-3">{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Listing"
      >
        <form onSubmit={handleCreateListing} className="space-y-4">

          <Input
            label="Name"
            value={newHomestay.name}
            onChange={(e) =>
              setNewHomestay({ ...newHomestay, name: e.target.value })
            }
          />

          <Input
            label="Location"
            value={newHomestay.location}
            onChange={(e) =>
              setNewHomestay({ ...newHomestay, location: e.target.value })
            }
          />

          <Input
            label="Price"
            type="number"
            value={newHomestay.price}
            onChange={(e) =>
              setNewHomestay({ ...newHomestay, price: e.target.value })
            }
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>

        </form>
      </Modal>

      <Footer />
    </>
  );
}