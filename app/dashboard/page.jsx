"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Input, Modal, Loader, Skeleton, useToast } from "@/components/ui";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { showToast } = useToast();
  const { token, loading, logout } = useAuth();
  const router = useRouter();

  // State management
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [homestays, setHomestays] = useState([]);
  const [selectedHomestay, setSelectedHomestay] = useState(null);

  // Form states
  const [homestayForm, setHomestayForm] = useState({
    name: "",
    price: "",
    location: "",
    description: "",
    contact: "",
    image: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Check auth status
  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [token, loading, router]);

  // Fetch only current user's listings
  const fetchMyListings = useCallback(async () => {
    if (!token) return;
    setFetching(true);
    try {
      const res = await fetch("http://localhost:5000/api/homestays/my-listings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setHomestays(data);
      } else {
        showToast("Session expired, logging out.", "error");
        logout();
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      showToast("Failed to load listings.", "error");
    } finally {
      setFetching(false);
    }
  }, [token, showToast, logout]);

  useEffect(() => {
    if (token) {
      fetchMyListings();
    }
  }, [token, fetchMyListings]);

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!homestayForm.name.trim()) errors.name = "Name is required";
    if (!homestayForm.location.trim()) errors.location = "Location is required";
    
    const priceNum = Number(homestayForm.price);
    if (!homestayForm.price) {
      errors.price = "Price is required";
    } else if (isNaN(priceNum) || priceNum <= 0) {
      errors.price = "Price must be a positive number";
    }

    if (homestayForm.contact && !/^[+0-9\s-]{10,15}$/.test(homestayForm.contact.trim())) {
      errors.contact = "Please enter a valid phone number (10-15 digits)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setHomestayForm({
      name: "",
      price: "",
      location: "",
      description: "",
      contact: "",
      image: "",
    });
    setFormErrors({});
    setIsCreateOpen(true);
  };

  // Create Listing
  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please fix the validation errors", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/homestays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...homestayForm,
          price: Number(homestayForm.price),
        }),
      });

      if (!res.ok) throw new Error("Failed request");

      const data = await res.json();
      setHomestays((prev) => [...prev, data]);
      showToast("✓ Homestay listing created successfully!", "success");
      setIsCreateOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Error creating listing", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (homestay) => {
    setSelectedHomestay(homestay);
    setHomestayForm({
      name: homestay.name || "",
      price: homestay.price || "",
      location: homestay.location || "",
      description: homestay.description || "",
      contact: homestay.contact || "",
      image: homestay.image || "",
    });
    setFormErrors({});
    setIsEditOpen(true);
  };

  // Edit Listing
  const handleEditListing = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please fix the validation errors", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/homestays/${selectedHomestay._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...homestayForm,
          price: Number(homestayForm.price),
        }),
      });

      if (!res.ok) throw new Error("Failed to update listing");

      const data = await res.json();
      setHomestays((prev) =>
        prev.map((item) => (item._id === selectedHomestay._id ? data : item))
      );
      showToast("✓ Listing updated successfully!", "success");
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Error updating listing", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Confirm Modal
  const handleOpenDelete = (homestay) => {
    setSelectedHomestay(homestay);
    setIsDeleteOpen(true);
  };

  // Delete Listing
  const handleDeleteListing = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/homestays/${selectedHomestay._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete listing");

      setHomestays((prev) => prev.filter((item) => item._id !== selectedHomestay._id));
      showToast("✓ Listing deleted successfully!", "success");
      setIsDeleteOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Error deleting listing", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Security gate redirection loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50/50 dark:bg-gray-950">
        <Loader size="lg" />
      </div>
    );
  }

  if (!token) return null;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-gray-50/50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950 transition-colors duration-200">
        <div className="mx-auto max-w-7xl">
          
          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Host Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage your Uttarakhand homestays and lodging listings
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={fetchMyListings} disabled={fetching}>
                {fetching ? <Loader size="sm" /> : "Refresh"}
              </Button>

              <Button variant="primary" onClick={handleOpenCreate} className="shadow-sm shadow-primary-500/20">
                Add Listing
              </Button>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-800 mb-8" />

          {/* LISTINGS CONTAINER */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Properties</h2>

            {fetching ? (
              /* Loading Skeletons Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-gray-250 bg-white p-5 space-y-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                  >
                    <Skeleton className="aspect-[16/10] w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex gap-3 pt-2">
                      <Skeleton className="h-9 flex-1 rounded-lg" />
                      <Skeleton className="h-9 flex-1 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : homestays.length === 0 ? (
              /* Premium Empty State */
              <div className="text-center py-16 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 max-w-lg mx-auto shadow-sm">
                <span className="text-5xl" role="img" aria-label="House with garden">🏡</span>
                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">No homestays yet</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Create your first listing to start hosting tourists in Uttarakhand!
                </p>
                <Button
                  variant="primary"
                  className="mt-6 shadow-md shadow-primary-500/20"
                  onClick={handleOpenCreate}
                >
                  Create Your First Listing
                </Button>
              </div>
            ) : (
              /* Active Listings Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homestays.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="relative aspect-[16/10] w-full bg-gray-100 dark:bg-gray-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">📍 {item.location}</p>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-455 mt-2 line-clamp-2 flex-1">
                        {item.description || "No description provided."}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-extrabold text-green-600 dark:text-green-400">
                          ₹{item.price} <span className="text-xs font-normal text-gray-400">/ night</span>
                        </span>
                        {item.contact && (
                          <span className="text-xs font-mono text-gray-400">📞 {item.contact}</span>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2 border-t border-gray-100 dark:border-gray-800/80 pt-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleOpenEdit(item)}
                        >
                          Edit Details
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1 text-red-650 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/20"
                          onClick={() => handleOpenDelete(item)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* CREATE MODAL */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => !submitting && setIsCreateOpen(false)}
        title="Add New Homestay Listing"
        className="max-w-md"
      >
        <form onSubmit={handleCreateListing} className="space-y-4">
          <Input
            label="Property Name *"
            placeholder="e.g. Kedarnath View Cottage"
            value={homestayForm.name}
            onChange={(e) => setHomestayForm({ ...homestayForm, name: e.target.value })}
            error={formErrors.name}
            disabled={submitting}
            required
          />

          <Input
            label="Location in Uttarakhand *"
            placeholder="e.g. Guptkashi"
            value={homestayForm.location}
            onChange={(e) => setHomestayForm({ ...homestayForm, location: e.target.value })}
            error={formErrors.location}
            disabled={submitting}
            required
          />

          <Input
            label="Price per Night (₹) *"
            type="number"
            placeholder="e.g. 1800"
            value={homestayForm.price}
            onChange={(e) => setHomestayForm({ ...homestayForm, price: e.target.value })}
            error={formErrors.price}
            disabled={submitting}
            required
          />

          <Input
            label="Contact Info / Phone Number"
            placeholder="e.g. +91-9876543210"
            value={homestayForm.contact}
            onChange={(e) => setHomestayForm({ ...homestayForm, contact: e.target.value })}
            error={formErrors.contact}
            disabled={submitting}
          />

          <Input
            label="Image URL (Unsplash or Pexels link)"
            placeholder="e.g. https://images.unsplash.com/..."
            value={homestayForm.image}
            onChange={(e) => setHomestayForm({ ...homestayForm, image: e.target.value })}
            disabled={submitting}
          />

          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              rows={3}
              placeholder="Describe your homestay, local organic food, eco-friendly features..."
              value={homestayForm.description}
              onChange={(e) => setHomestayForm({ ...homestayForm, description: e.target.value })}
              disabled={submitting}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCreateOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="shadow-sm shadow-primary-500/20">
              {submitting ? <Loader size="sm" label="Creating..." /> : "Submit Listing"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => !submitting && setIsEditOpen(false)}
        title="Edit Homestay Details"
        className="max-w-md"
      >
        <form onSubmit={handleEditListing} className="space-y-4">
          <Input
            label="Property Name *"
            value={homestayForm.name}
            onChange={(e) => setHomestayForm({ ...homestayForm, name: e.target.value })}
            error={formErrors.name}
            disabled={submitting}
            required
          />

          <Input
            label="Location in Uttarakhand *"
            value={homestayForm.location}
            onChange={(e) => setHomestayForm({ ...homestayForm, location: e.target.value })}
            error={formErrors.location}
            disabled={submitting}
            required
          />

          <Input
            label="Price per Night (₹) *"
            type="number"
            value={homestayForm.price}
            onChange={(e) => setHomestayForm({ ...homestayForm, price: e.target.value })}
            error={formErrors.price}
            disabled={submitting}
            required
          />

          <Input
            label="Contact Info / Phone Number"
            value={homestayForm.contact}
            onChange={(e) => setHomestayForm({ ...homestayForm, contact: e.target.value })}
            error={formErrors.contact}
            disabled={submitting}
          />

          <Input
            label="Image URL"
            value={homestayForm.image}
            onChange={(e) => setHomestayForm({ ...homestayForm, image: e.target.value })}
            disabled={submitting}
          />

          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              rows={3}
              value={homestayForm.description}
              onChange={(e) => setHomestayForm({ ...homestayForm, description: e.target.value })}
              disabled={submitting}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsEditOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="shadow-sm shadow-primary-500/20">
              {submitting ? <Loader size="sm" label="Saving..." /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => !submitting && setIsDeleteOpen(false)}
        title="Confirm Deletion"
        className="max-w-sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-650 dark:text-gray-400">
            Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">"{selectedHomestay?.name}"</span>?
            This action is permanent and cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDeleteOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              className="bg-red-600 hover:bg-red-750 border-red-600 text-white focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={handleDeleteListing}
              disabled={submitting}
            >
              {submitting ? <Loader size="sm" /> : "Yes, Delete Listing"}
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </>
  );
}