"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader } from "@/components/ui";

export default function ProfilePage() {
  const { user, token, loading, logout } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [token, loading, router]);

  useEffect(() => {
    const getProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setProfileData(data.user);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setFetching(false);
      }
    };

    if (token) {
      getProfile();
    }
  }, [token, logout]);

  if (loading || (token && fetching)) {
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
      <main className="flex-1 bg-gray-50 px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-3xl font-bold text-gray-950 dark:text-white">Your Profile</h1>
          <p className="mt-2 text-sm text-gray-500">Secure user account and credentials configuration.</p>

          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4 rounded-xl border border-gray-150 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
              <div className="h-16 w-16 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl font-bold uppercase">
                {profileData?.name ? profileData.name[0] : (profileData?.email ? profileData.email[0] : "?")}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-950 dark:text-white">{profileData?.name || "Guest User"}</h3>
                <p className="text-sm text-gray-500">{profileData?.email}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-150 p-4 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase">User ID</span>
                <p className="mt-1 text-sm font-mono text-gray-800 dark:text-gray-200">{profileData?.id || "N/A"}</p>
              </div>

              <div className="rounded-xl border border-gray-150 p-4 dark:border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase">Registered On</span>
                <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                  {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  }) : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
