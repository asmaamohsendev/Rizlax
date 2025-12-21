"use client";

import Image from "next/image";
import { useAuth } from "@/stores/useAuth";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const {
    login,
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
    user,
    isInitialized,
  } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Only redirect if initialized and user exists
    if (isInitialized && user) {
      router.push("/dashboard");
    }
  }, [user, router, isInitialized]);

  // Show loading while initializing
  if (!isInitialized) {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          role: "ADMIN",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.user, data.accessToken);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C2EE71]/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C2EE71]/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/logoWhite.svg"
              alt="Rizlax Logo"
              width={200}
              height={200}
              priority
              className="drop-shadow-2xl"
              style={{ width: "auto", height: "200px" }}
            />
          </div>
          <h1 className="text-4xl font-light text-[#C2EE71] mb-3 uppercase tracking-wide">
            Admin Portal
          </h1>
          <div className="h-px w-20 bg-[#C2EE71]/50 mx-auto"></div>
        </div>

        {/* Login Form */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-[#C2EE71]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-400 font-light">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-xs font-light text-[#C2EE71] mb-2 uppercase tracking-wider"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-black/60 border border-[#C2EE71]/30 text-[#C2EE71] placeholder-[#C2EE71]/30 focus:outline-none focus:border-[#C2EE71] transition-all disabled:opacity-50 font-light"
                placeholder="admin@rizlax.com"
              />
            </div>

            {/* Password Input */}
            <div className="group">
              <label
                htmlFor="password"
                className="block text-xs font-light text-[#C2EE71] mb-2 uppercase tracking-wider"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-black/60 border border-[#C2EE71]/30 text-[#C2EE71] placeholder-[#C2EE71]/30 focus:outline-none focus:border-[#C2EE71] transition-all disabled:opacity-50 font-light"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 border-[#C2EE71]/30 bg-black/60 text-[#C2EE71] focus:ring-[#C2EE71] disabled:opacity-50"
                />
                <span className="ml-2 text-xs text-[#C2EE71]/70 font-light uppercase tracking-wider">
                  Remember
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C2EE71] hover:bg-[#C2EE71]/80 text-black font-light py-3 px-4 transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm border border-[#C2EE71]/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Accessing...
                </span>
              ) : (
                "Access System"
              )}
            </button>
          </form>

          {/* Security Badge */}
          <div className="mt-6 pt-6 border-t border-[#C2EE71]/20">
            <div className="flex items-center justify-center space-x-2 text-[#C2EE71]/50 text-xs">
              <span className="text-[#C2EE71]">●</span>
              <span className="uppercase tracking-wider font-light">
                Secure Connection
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-[#C2EE71]/30 text-xs font-light uppercase tracking-wider">
            © 2025 Rizlax
          </p>
        </div>
      </div>
    </main>
  );
}
