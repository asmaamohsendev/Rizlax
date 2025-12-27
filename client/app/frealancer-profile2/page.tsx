"use client";

import { useState } from "react";

import FreelancerProfileCard from "@/components/frealancer-profile2/FreelancerProfileCard";
import Stats from "@/components/frealancer-profile2/Stats";
import PersonalInfoCard from "@/components/frealancer-profile2/PersonalInfoCard";
import Skils2 from "@/components/frealancer-profile2/Skils2";
import Featured2 from "@/components/frealancer-profile2/Featured2";
import MyJobs from "@/components/frealancer-profile2/MyJobs";
import WalletCard from "@/components/frealancer-profile2/WalletCard";
import Myproposal from"@/components/frealancer-profile2/Myproposal";
/* ================= Tabs ================= */
const tabs = [
  { key: "personal", label: "Personal Info" },
  { key: "jobs", label: "My Jobs" },
  { key: "proposals", label: "Proposals" },
  { key: "messages", label: "Messages" },
  { key: "wallet", label: "Wallet" },
  { key: "reviews", label: "Reviews" },
  { key: "settings", label: "Settings" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const Page = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("personal");

  return (
    <div className="section-container">
      {/* Header */}
      <div className="flex flex-col gap-6 w-[1280px] mx-auto ">
        <h1 className="text-[48px] font-semibold">Profile</h1>

        <div className="border-b border-gray-200">
          <div className="flex gap-6 text-sm font-medium">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 ${
                  activeTab === tab.key
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-4 mt-6 w-[1280px] mx-auto">
        {/* العمود الأيسر */}
        <div className="flex flex-col gap-4">
          <FreelancerProfileCard />
          <WalletCard/>
         
        </div>

        {/* العمود الأيمن */}
        <div className="flex flex-col gap-4 flex-1">
          <Stats />

          {activeTab === "personal" && (
            <>
              <PersonalInfoCard />
              <Skils2 />
              <Featured2 />
              <MyJobs/>
              <Myproposal/>
            </>
          )}

          {activeTab === "jobs" && <MyJobs />}
 {activeTab === "proposals" && <Myproposal />}
 
          {/* باقي التابات غير منفذة */}
          {activeTab !== "personal" &&
            activeTab !== "jobs" &&
            activeTab !== "proposals" &&
            activeTab !== "wallet" && (
              <div className="bg-white p-6 rounded-xl border">
                {tabs.find((t) => t.key === activeTab)?.label} coming soon…
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Page;
