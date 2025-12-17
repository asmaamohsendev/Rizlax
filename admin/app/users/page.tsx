"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
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

export default function UsersPage() {
  const { user, token, isInitialized } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

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
          if (data.pagination) {
            setPagination(data.pagination);
          }
        } else {
          console.error("Unexpected API response format:", data);
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
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
                  Users
                </h1>
                <div className="h-px w-20 bg-[#C2EE71]/50 mt-2"></div>
              </div>
              <div className="text-sm text-[#C2EE71]/50 font-light">
                Total: {pagination.total}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black/40 backdrop-blur-md border border-[#C2EE71]/20">
              <thead>
                <tr className="border-b border-[#C2EE71]/20">
                  <th className="px-6 py-4 text-left text-xs font-light text-[#C2EE71] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-light text-[#C2EE71] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-light text-[#C2EE71] uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-sm text-[#C2EE71]/50"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((usr) => (
                    <tr
                      key={usr.id}
                      className="border-b border-[#C2EE71]/10 hover:bg-[#C2EE71]/5 transition-colors"
                      onClick={() => {
                        router.push(`/users/${usr.id}`);
                      }}
                    >
                      <td className="px-6 py-4 text-sm text-[#C2EE71]/70 font-light">
                        {usr.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#C2EE71]/70 font-light">
                        {usr.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#C2EE71]/70 font-light uppercase">
                        {usr.role}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          {pagination.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-[#C2EE71]/50 font-light">
                Page {pagination.page} of {pagination.totalPages}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
