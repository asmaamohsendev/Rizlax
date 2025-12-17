"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import Card from "@/components/layout/card";
import { fetchWithAuth } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function DashboardPage() {
  const { user, token, isInitialized } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Wait for initialization before checking auth
    if (!isInitialized) return;

    // Redirect if user is not logged in
    if (!user || !token) {
      router.push("/");
      return;
    }

    // Fetch users data from API
    const fetchUsers = async () => {
      try {
        const response = await fetchWithAuth(
          "http://localhost:5007/api/v1/admin/users",
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
          throw new Error("Failed to fetch users");
        }
        const data: ApiResponse = await response.json();
        if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("Unexpected API response format:", data);
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [user, token, router, isInitialized]);

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

      <main className="flex-1 p-8 lg:ml-64 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-light text-[#C2EE71] uppercase tracking-wide">
              Dashboard
            </h1>
            <div className="h-px w-50 bg-[#C2EE71]/50 mt-2"></div>
          </div>

          {/* Content */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              title="Total Users"
              value={users.length}
              subtitle="As of today"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              trend={{ isPositive: true, value: 8.5 }}
              color="green"
            />
            {/* Add more Card components as needed */}
          </div>
        </div>
      </main>
    </div>
  );
}
