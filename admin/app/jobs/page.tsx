"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import { fetchWithAuth } from "@/lib/api";

interface Job {
  id: string;
  clientId: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Job[];
}

export default function UsersPage() {
  const { user, token, isInitialized } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for initialization before checking auth
    if (!isInitialized) return;

    // Redirect if user is not logged in
    if (!user || !token) {
      router.push("/");
      return;
    }

    // Fetch jobs data from API
    const fetchJobs = async () => {
      try {
        const response = await fetchWithAuth(
          "http://localhost:5007/api/v1/admin/jobs",
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
          throw new Error("Failed to fetch jobs");
        }

        const result: ApiResponse = await response.json();

        if (result.success && result.data && Array.isArray(result.data)) {
          setJobs(result.data);
        } else {
          console.error("Unexpected API response format:", result);
          setJobs([]);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [user, token, router, isInitialized]);

  // Show loading state while checking auth or initializing
  if (!isInitialized || !user || isLoading) {
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-light text-[#C2EE71] uppercase tracking-wide">
                  Jobs
                </h1>
                <div className="h-px w-20 bg-[#C2EE71]/50 mt-2"></div>
              </div>
              <div className="text-sm text-[#C2EE71]/50 font-light">
                Total: {jobs.length}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/40 backdrop-blur-md border border-[#C2EE71]/20">
              <thead>
                <tr className="border-b border-[#C2EE71]/20">
                  <th className="px-6 py-4 text-left text-xs font-light text-[#C2EE71] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-light text-[#C2EE71] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-light text-[#C2EE71] uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-light text-[#C2EE71] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-sm text-[#C2EE71]/50"
                    >
                      No jobs found
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-[#C2EE71]/10 hover:bg-[#C2EE71]/5 transition-colors cursor-pointer"
                      onClick={() => {
                        router.push(`/jobs/${job.id}`);
                      }}
                    >
                      <td className="px-6 py-4 text-sm text-[#C2EE71]/70 font-light">
                        {job.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#C2EE71]/70 font-light">
                        {job.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#C2EE71]/70 font-light">
                        ${job.budget.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#C2EE71]/70 font-light uppercase">
                        {job.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
