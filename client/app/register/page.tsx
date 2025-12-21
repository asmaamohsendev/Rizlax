"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useIsLoggedIn } from "@/stores/useAuth";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import Checkbox from "@/components/Checkbox";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, setLoading, setError, clearError } =
    useAuth();

  const isLoggedIn = useIsLoggedIn();
  const _hasHydrated = useAuth((state) => state._hasHydrated);

  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("EG");
  const [agree, setAgree] = useState(false);
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
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
            password,
            country,
            role: role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      register(data.user, data.accessToken);
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
                    Create Your Account
                  </h2>
                  <p className="text-[14px] text-gray-600">
                    Join thousands of clients and freelancers growing their
                    careers on Rizlax.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <label className="text-[16px] font-medium block text-black ">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-[509px]"
                        placeholder="John Doe"
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
                    </div>

                    <div className="flex flex-col gap-4">
                      <label className="text-[16px] font-medium block text-black ">
                        Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-[509px] border border-[#DADADA] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 p-4 rounded-3xl transition-all duration-200 outline-none"
                      >
                        <option value="EG">Egypt</option>
                        <option value="USA">United States</option>
                        <option value="CAN">Canada</option>
                        <option value="UK">United Kingdom</option>
                        {/* Add more countries as needed */}
                      </select>
                      {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                          <p className="text-sm text-red-400 font-light">
                            {error}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* agree to terms and conditions */}
                    <Checkbox
                      checked={agree}
                      onChange={(checked) => setAgree(checked)}
                      label={
                        <p className="text-black text-[15px]">
                          Agree to
                          <Link
                            href="/terms"
                            className="text-primary-sage underline"
                          >
                            {" "}
                            Terms
                          </Link>{" "}
                          &{" "}
                          <Link
                            href="/privacy"
                            className="text-primary-sage underline"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      }
                    />
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
                    {/* Already have an account */}
                    <p className=" text-black text-center mt-[110px] ">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-primary-sage underline"
                      >
                        Log in
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
