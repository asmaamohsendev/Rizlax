import FreelancerCard from "@/components/find-freelancers/FreelancerCard";
import Sidebar from "@/components/freelance- job/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col gap-2 my-12">
        <h2 className="font-semibold text-5xl">
          Find the Right Talent for Your Project
        </h2>
        <p className="font-normal text-xl">
          Browse skilled professionals, review their profiles, and hire the
          perfect freelancer for your next project.
        </p>
      </div>
      <div className="flex justify-between w-full">
        <div>
          <Sidebar />
        </div>

        <div className="grid grid-cols-2 gap-8">
          {Array.from({ length: 6 }, (_, index) => (
            <FreelancerCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
