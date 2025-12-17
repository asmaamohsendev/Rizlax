"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/stores/useAuth";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import { fetchWithAuth } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string | null;
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
  isVerified: boolean;
  suspendedUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function UserDetailPage() {
  const { user: currentUser, token, isInitialized } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [suspensionDays, setSuspensionDays] = useState(3);

  useEffect(() => {
    // Wait for initialization before checking auth
    if (!isInitialized) return;

    // Redirect if user is not logged in
    if (!currentUser || !token) {
      router.push("/");
      return;
    }

    // Fetch user data from API
    const fetchUser = async () => {
      try {
        const response = await fetchWithAuth(
          `http://localhost:5007/api/v1/admin/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            router.push("/");
            return;
          }
          if (response.status === 404) {
            setError("User not found");
            setIsLoading(false);
            return;
          }
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [currentUser, token, router, isInitialized, userId]);

  const handleAction = async (
    action: "suspend" | "ban" | "verify",
    days?: number
  ) => {
    if (!token || !user) return;

    setActionLoading(action);
    setError(null);
    setSuccessMessage(null);

    try {
      let endpoint = "";
      let body = {};

      switch (action) {
        case "suspend":
          endpoint = `http://localhost:5007/api/v1/admin/users/${userId}/suspend`;
          body = { days: days || 3 };
          break;
        case "ban":
          endpoint = `http://localhost:5007/api/v1/admin/users/${userId}/ban`;
          break;
        case "verify":
          endpoint = `http://localhost:5007/api/v1/admin/users/${userId}/verify`;
          break;
      }

      const response = await fetchWithAuth(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Failed to ${action} user`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setSuccessMessage(
        `User ${action === "verify" ? "verified" : action + "ned"} successfully`
      );

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(`Error ${action}ing user:`, err);
      setError(
        err instanceof Error ? err.message : `Failed to ${action} user`
      );
    } finally {
      setActionLoading(null);
    }
  };

  // Show loading state while checking auth or initializing
  if (!isInitialized || !currentUser || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-[#C2EE71] flex items-center gap-3">
          <div className="w-2 h-2 bg-[#C2EE71] rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-[#C2EE71] rounded-full animate-pulse"
            style={{ animationDelay: "0.15s" }}
          ></div>
          <div
            className="w-2 h-2 bg-[#C2EE71] rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex relative overflow-hidden bg-black">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C2EE71]/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#C2EE71]/3 rounded-full blur-[100px] animate-pulse"></div>
        </div>
        <Sidebar />
        <main className="flex-1 p-8 lg:ml-64 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
              <p className="text-red-400 font-light">{error}</p>
              <button
                onClick={() => router.push("/users")}
                className="mt-4 px-6 py-2 bg-[#C2EE71] text-black font-light uppercase tracking-wider text-sm hover:bg-[#C2EE71]/80 transition-all"
              >
                Back to Users
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-black">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C2EE71]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#C2EE71]/3 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 lg:ml-64 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={() => router.push("/users")}
                  className="text-[#C2EE71]/50 hover:text-[#C2EE71] font-light text-sm uppercase tracking-wider mb-4 transition-colors"
                >
                  ← Back to Users
                </button>
                <h1 className="text-3xl font-light text-[#C2EE71] uppercase tracking-wide">
                  User Details
                </h1>
                <div className="h-px w-20 bg-[#C2EE71]/50 mt-2"></div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs font-light uppercase tracking-wider border ${
                    user?.status === "ACTIVE"
                      ? "text-green-400 border-green-400/30 bg-green-400/10"
                      : user?.status === "SUSPENDED"
                      ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                      : "text-red-400 border-red-400/30 bg-red-400/10"
                  }`}
                >
                  {user?.status}
                </span>
                {user?.isVerified && (
                  <span className="px-3 py-1 text-xs font-light uppercase tracking-wider text-[#C2EE71] border border-[#C2EE71]/30 bg-[#C2EE71]/10">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          {successMessage && (
            <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-sm text-green-400 font-light">
                {successMessage}
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm text-red-400 font-light">{error}</p>
            </div>
          )}

          {/* User Information Card */}
          <div className="bg-black/40 backdrop-blur-md border border-[#C2EE71]/20 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-light text-[#C2EE71] uppercase tracking-wide mb-6">
              Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  User ID
                </label>
                <p className="text-sm text-[#C2EE71] font-light break-all">
                  {user?.id}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Username
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {user?.name || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Email
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {user?.email}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Status
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {user?.status}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Verified
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {user?.isVerified ? "Yes" : "No"}
                </p>
              </div>
              {user?.suspendedUntil && (
                <div>
                  <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                    Suspended Until
                  </label>
                  <p className="text-sm text-[#C2EE71] font-light">
                    {new Date(user.suspendedUntil).toLocaleDateString()}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Created At
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {new Date(user?.createdAt || "").toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Last Updated
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {new Date(user?.updatedAt || "").toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-black/40 backdrop-blur-md border border-[#C2EE71]/20 rounded-lg p-6">
            <h2 className="text-xl font-light text-[#C2EE71] uppercase tracking-wide mb-6">
              Actions
            </h2>

            <div className="space-y-4">
              {/* Verify User */}
              {!user?.isVerified && (
                <div className="flex items-center justify-between p-4 bg-black/60 border border-[#C2EE71]/10 rounded">
                  <div>
                    <h3 className="text-sm font-light text-[#C2EE71] uppercase tracking-wider mb-1">
                      Verify User
                    </h3>
                    <p className="text-xs text-[#C2EE71]/50 font-light">
                      Mark this user as verified
                    </p>
                  </div>
                  <button
                    onClick={() => handleAction("verify")}
                    disabled={actionLoading === "verify"}
                    className="px-6 py-2 bg-[#C2EE71] text-black font-light uppercase tracking-wider text-sm hover:bg-[#C2EE71]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "verify" ? "Processing..." : "Verify"}
                  </button>
                </div>
              )}

              {/* Suspend User */}
              {user?.status !== "SUSPENDED" && user?.status !== "BANNED" && (
                <div className="flex items-start justify-between p-4 bg-black/60 border border-[#C2EE71]/10 rounded">
                  <div className="flex-1">
                    <h3 className="text-sm font-light text-[#C2EE71] uppercase tracking-wider mb-1">
                      Suspend User
                    </h3>
                    <p className="text-xs text-[#C2EE71]/50 font-light mb-3">
                      Temporarily suspend this user&apos;s account
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={suspensionDays}
                        onChange={(e) =>
                          setSuspensionDays(parseInt(e.target.value) || 3)
                        }
                        disabled={actionLoading === "suspend"}
                        className="w-20 px-3 py-2 bg-black/60 border border-[#C2EE71]/30 text-[#C2EE71] placeholder-[#C2EE71]/30 text-sm font-light focus:outline-none focus:border-[#C2EE71] transition-all disabled:opacity-50 [&::-webkit-inner-spin-button]:text-[#C2EE71] [&::-webkit-outer-spin-button]:text-[#C2EE71]"
                        style={{ color: '#C2EE71', WebkitTextFillColor: '#C2EE71' }}
                      />
                      <span className="text-xs text-[#C2EE71]/50 font-light uppercase">
                        Days
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAction("suspend", suspensionDays)}
                    disabled={actionLoading === "suspend"}
                    className="px-6 py-2 bg-[#F09414] border border-[#F09414]/30 text-yellow-400 font-light uppercase tracking-wider text-sm hover:bg-[#F09414]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "suspend" ? "Processing..." : "Suspend"}
                  </button>
                </div>
              )}

              {/* Ban User */}
              {user?.status !== "BANNED" && (
                <div className="flex items-center justify-between p-4 bg-black/60 border border-[#C2EE71]/10 rounded">
                  <div>
                    <h3 className="text-sm font-light text-[#C2EE71] uppercase tracking-wider mb-1">
                      Ban User
                    </h3>
                    <p className="text-xs text-[#C2EE71]/50 font-light">
                      Permanently ban this user&apos;s account
                    </p>
                  </div>
                  <button
                    onClick={() => handleAction("ban")}
                    disabled={actionLoading === "ban"}
                    className="px-6 py-2 bg-[#ED0006] border border-[#ED0006]/30 text-red-400 font-light uppercase tracking-wider text-sm hover:bg-[#ED0006]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "ban" ? "Processing..." : "Ban"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}