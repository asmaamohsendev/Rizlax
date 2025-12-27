"use client";

import {
  useAuth,
  useIsLoggedIn,
  useIsProfileCompleted,
} from "@/stores/useAuth";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Guard = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useIsLoggedIn();
  const isProfileCompleted = useIsProfileCompleted();
  const _hasHydrated = useAuth((state) => state._hasHydrated);
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && _hasHydrated && !isLoggedIn) {
      router.push("/login");
    } else if (isClient && _hasHydrated && isLoggedIn && !isProfileCompleted) {
      router.replace("/onboarding");
    } else if (
      isClient &&
      _hasHydrated &&
      isLoggedIn &&
      isProfileCompleted &&
      (pathname === "/login" || pathname === "/onboarding")
    ) {
      router.push("/dashboard");
    }

  }, [isClient, _hasHydrated, isLoggedIn, isProfileCompleted, pathname, router]);

  // Show loading while hydrating
  if (!isClient || !_hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

if (!isLoggedIn && pathname !== "/login") return null;

  return <>{children}</>;
};

export default Guard;
