"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/dist/client/link";

type Role = "CLIENT" | "FREELANCER";

function RoleCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden p-6 w-[447px] h-[268px] rounded-2xl border cursor-pointer shadow-sm transition-colors duration-300
        ${selected ? "bg-primary-lime" : "border-gray-200"}`}
    >
      {/* محتوى الكارت */}
      <div className="flex items-center gap-6 justify-center h-full text-center">
        {children}
      </div>
    </div>
  );
}

export default function ChooseRolePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  const handleNext = () => {
    if (!role) return;
    localStorage.setItem("Role", role);
    router.push("/register");
  };

  return (
    <>
      <div className="section-container ">
        <Link href="/" className="cursor-pointer">
          <div className="absolute top-6 flex items-center gap-2 text-white font-bold text-xl">
            <Image src="./logo.svg" alt="" width={220} height={60} />
          </div>
        </Link>
      </div>
      <div className="section-container flex flex-col items-center justify-center gap-8 min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold  text-center">Join Rizlax</h1>
          <p className="text-center text-[14px] text-gray-600">
            Join thousands of clients and freelancers growing their careers on
            Rizlax.
          </p>
        </div>

        <div className="flex gap-8 mt-10 mb-16">
          <RoleCard
            selected={role === "FREELANCER"}
            onClick={() => setRole("FREELANCER")}
          >
            <Image
              src={`${
                role === "FREELANCER"
                  ? "/selectedFreelancerChooseRole.svg"
                  : "/freelancerChooseRole.svg"
              }`}
              alt="Freelancer Role"
              width={80}
              height={80}
            />
            <h2 className="font-semibold text-2xl text-left">
              Freelancer - I want to work and earn
            </h2>
          </RoleCard>
          <RoleCard
            selected={role === "CLIENT"}
            onClick={() => setRole("CLIENT")}
          >
            <Image
              src={`${
                role === "CLIENT"
                  ? "/selectedClientChooseRole.svg"
                  : "/clientChooseRole.svg"
              }`}
              alt="Client Role"
              width={80}
              height={80}
            />
            <h2 className="font-semibold text-2xl text-left">
              Client – I want to hire talent
            </h2>
          </RoleCard>
        </div>

        <PrimaryButton className="w-[497px] h-[54px]" onClick={handleNext}>NEXT</PrimaryButton>
      </div>
    </>
  );
}
