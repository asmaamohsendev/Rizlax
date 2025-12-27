"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useIsLoggedIn } from "@/stores/useAuth";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";

export default function RegisterPage() {
  const router = useRouter();
  const { login, isLoading, error, setLoading, setError, clearError } =
    useAuth();

  const isLoggedIn = useIsLoggedIn();
  const _hasHydrated = useAuth((state) => state._hasHydrated);

  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const storedRole = localStorage.getItem("Role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    if (mounted && _hasHydrated && isLoggedIn) {
      router.push("/dashboard");
    }
  }, [mounted, _hasHydrated, isLoggedIn, router]);

  useEffect(() => {
    if (mounted && _hasHydrated && !role) {
      router.push("/choose-role");
    }
  }, [mounted, _hasHydrated, role, router]);
  if (!mounted) return null;

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
          role: role,
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
    <>
      <div className=""></div>
      <div className="section-container  ">
        <div className="flex gap-10">
          {/* Left side (Form) */}
          <div className=" bg-white flex flex-col h-[976px] ">
            <Link href="/" className="cursor-pointer mb-12 mt-[29px]">
              <div className="flex items-center text-white font-bold text-xl">
                <Image src="./logo.svg" alt="" width={220} height={60} />
              </div>
            </Link>
            <div className="w-full mx-auto">
              <div className="flex flex-col text-left">
                <div className="flex flex-col gap-2 mb-8">
                  <h2 className="text-4xl font-bold  text-gray-800">
                    Welcome Back
                  </h2>
                  <p className="text-[14px] text-gray-600">
                    Log in to continue to your dashboard.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <label className="text-[16px] font-medium block text-black ">
                        Email Address
                      </label>
                      <Input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[509px]"
                        placeholder="john.doe@example.com"
                      />
                      {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                          <p className="text-sm text-red-400 font-light">
                            {error}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      <label className="text-[16px] font-medium block text-black ">
                        Password
                      </label>
                      <div className="flex flex-col gap-2">
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-[509px]"
                          placeholder="••••••••"
                        />
                        {error && (
                          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                            <p className="text-sm text-red-400 font-light">
                              {error}
                            </p>
                          </div>
                        )}
                        {/* forgot password link */}
                        <Link
                          href="/forgot-password"
                          className="text-primary-sage text-[13px] text-right underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <p className="text-sm text-red-400 font-light">
                          {error}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="relative w-[509px] pt-16">
                    <PrimaryButton
                      type="submit"
                      disabled={isLoading}
                      className="w-[509px] h-[54px] "
                    >
                      {isLoading ? "Loading..." : "NEXT"}
                    </PrimaryButton>
                    {/* dont have an account */}
                    <p className=" text-black text-center mt-[350px] ">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/register"
                        className="text-primary-sage underline"
                      >
                        SIGN UP
                      </Link>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right side (Image) */}
          <div className="relative w-[791px] h-[976px] mt-6 rounded-4xl overflow-hidden">
            <div
              className="absolute  inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('./frame2.jpg')" }}
            ></div>
            <div className="absolute inset-0  bg-black opacity-30"></div>
            <div className="absolute inset-0 w-[791px] h-[976px] flex items-center justify-center">
              <h2 className="absolute top-8 left-10 text-white text-[64px] font-bold">
                Connecting Top <br /> Talent with Ambit
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
