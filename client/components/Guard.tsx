"use client";

import { useAuth, useIsLoggedIn } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Guard = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useIsLoggedIn();
  const _hasHydrated = useAuth((state) => state._hasHydrated);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only redirect after both client-side and store have hydrated
    if (isClient && _hasHydrated && !isLoggedIn) {
      router.push("/login");
    }
  }, [isClient, _hasHydrated, isLoggedIn, router]);

  // Show loading while hydrating
  if (!isClient || !_hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return <>{children}</>;
};

export default Guard;
