"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/stores/useAuth";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import { fetchWithAuth } from "@/lib/api";

interface Job {
  id: string;
  clientId: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Job;
}

export default function JobDetailPage() {
  const { user: currentUser, token, isInitialized } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Wait for initialization before checking auth
    if (!isInitialized) return;

    // Redirect if user is not logged in
    if (!currentUser || !token) {
      router.push("/");
      return;
    }

    // Fetch job data from API
    const fetchJob = async () => {
      try {
        const response = await fetchWithAuth(
          `http://localhost:5007/api/v1/admin/jobs/${jobId}`,
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
            setError("Job not found");
            setIsLoading(false);
            return;
          }
          throw new Error("Failed to fetch job");
        }

        const result: ApiResponse = await response.json();
        if (result.success && result.data) {
          setJob(result.data);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [currentUser, token, router, isInitialized, jobId]);

  const handleStatusUpdate = async (newStatus: Job["status"]) => {
    if (!token || !job) return;

    setActionLoading(newStatus);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetchWithAuth(
        `http://localhost:5007/api/v1/admin/jobs/${jobId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update job status");
      }

      const result: ApiResponse = await response.json();
      if (result.success && result.data) {
        setJob(result.data);
        setSuccessMessage(`Job status updated to ${newStatus} successfully`);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Error updating job status:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update job status"
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

  if (error && !job) {
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
                onClick={() => router.push("/jobs")}
                className="mt-4 px-6 py-2 bg-[#C2EE71] text-black font-light uppercase tracking-wider text-sm hover:bg-[#C2EE71]/80 transition-all"
              >
                Back to Jobs
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
                  onClick={() => router.push("/jobs")}
                  className="text-[#C2EE71]/50 hover:text-[#C2EE71] font-light text-sm uppercase tracking-wider mb-4 transition-colors"
                >
                  ← Back to Jobs
                </button>
                <h1 className="text-3xl font-light text-[#C2EE71] uppercase tracking-wide">
                  Job Details
                </h1>
                <div className="h-px w-20 bg-[#C2EE71]/50 mt-2"></div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs font-light uppercase tracking-wider border ${
                    job?.status === "OPEN"
                      ? "text-green-400 border-green-400/30 bg-green-400/10"
                      : job?.status === "IN_PROGRESS"
                      ? "text-blue-400 border-blue-400/30 bg-blue-400/10"
                      : job?.status === "COMPLETED"
                      ? "text-[#C2EE71] border-[#C2EE71]/30 bg-[#C2EE71]/10"
                      : "text-red-400 border-red-400/30 bg-red-400/10"
                  }`}
                >
                  {job?.status}
                </span>
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

          {/* Job Information Card */}
          <div className="bg-black/40 backdrop-blur-md border border-[#C2EE71]/20 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-light text-[#C2EE71] uppercase tracking-wide mb-6">
              Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Job ID
                </label>
                <p className="text-sm text-[#C2EE71] font-light break-all">
                  {job?.id}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Client ID
                </label>
                <p className="text-sm text-[#C2EE71] font-light break-all">
                  {job?.clientId}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Title
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {job?.title}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Description
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {job?.description}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Budget
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  ${job?.budget.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Category
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {job?.category}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Status
                </label>
                <p className="text-sm text-[#C2EE71] font-light uppercase">
                  {job?.status}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Created At
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {new Date(job?.createdAt || "").toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-xs font-light text-[#C2EE71]/50 uppercase tracking-wider mb-2">
                  Last Updated
                </label>
                <p className="text-sm text-[#C2EE71] font-light">
                  {new Date(job?.updatedAt || "").toLocaleDateString()}
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
              {/* Mark as In Progress */}
              {job?.status === "OPEN" && (
                <div className="flex items-center justify-between p-4 bg-black/60 border border-[#C2EE71]/10 rounded">
                  <div>
                    <h3 className="text-sm font-light text-[#C2EE71] uppercase tracking-wider mb-1">
                      Mark as In Progress
                    </h3>
                    <p className="text-xs text-[#C2EE71]/50 font-light">
                      Move this job to in progress status
                    </p>
                  </div>
                  <button
                    onClick={() => handleStatusUpdate("IN_PROGRESS")}
                    disabled={actionLoading === "IN_PROGRESS"}
                    className="px-6 py-2 bg-blue-500 border border-blue-500/30 text-blue-400 font-light uppercase tracking-wider text-sm hover:bg-blue-500/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "IN_PROGRESS"
                      ? "Processing..."
                      : "In Progress"}
                  </button>
                </div>
              )}

              {/* Mark as Completed */}
              {(job?.status === "OPEN" || job?.status === "IN_PROGRESS") && (
                <div className="flex items-center justify-between p-4 bg-black/60 border border-[#C2EE71]/10 rounded">
                  <div>
                    <h3 className="text-sm font-light text-[#C2EE71] uppercase tracking-wider mb-1">
                      Mark as Completed
                    </h3>
                    <p className="text-xs text-[#C2EE71]/50 font-light">
                      Mark this job as completed
                    </p>
                  </div>
                  <button
                    onClick={() => handleStatusUpdate("COMPLETED")}
                    disabled={actionLoading === "COMPLETED"}
                    className="px-6 py-2 bg-[#C2EE71] text-black font-light uppercase tracking-wider text-sm hover:bg-[#C2EE71]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "COMPLETED"
                      ? "Processing..."
                      : "Complete"}
                  </button>
                </div>
              )}

              {/* Cancel Job */}
              {job?.status !== "CANCELLED" && job?.status !== "COMPLETED" && (
                <div className="flex items-center justify-between p-4 bg-black/60 border border-[#C2EE71]/10 rounded">
                  <div>
                    <h3 className="text-sm font-light text-[#C2EE71] uppercase tracking-wider mb-1">
                      Cancel Job
                    </h3>
                    <p className="text-xs text-[#C2EE71]/50 font-light">
                      Cancel this job permanently
                    </p>
                  </div>
                  <button
                    onClick={() => handleStatusUpdate("CANCELLED")}
                    disabled={actionLoading === "CANCELLED"}
                    className="px-6 py-2 bg-[#ED0006] border border-[#ED0006]/30 text-red-400 font-light uppercase tracking-wider text-sm hover:bg-[#ED0006]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "CANCELLED" ? "Processing..." : "Cancel"}
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