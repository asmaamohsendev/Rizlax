import React from "react";
import Image from "next/image";
import Tag from "../Tag";
import PrimaryButton from "../PrimaryButton";

const skills = ["React", "JavaScript", "Tailwind", "UI Design"];

const FreelancerCard = () => {
  return (
    <div className="bg-[#0D181D] w-[410px] h-[500px] rounded-3xl flex items-center flex-col gap-6">
      <div className="flex flex-col items-center pt-6 gap-4 mx-auto">
        {/* Profile Image */}
        <Image
          src="/freelancerProfile.jpg"
          alt="Freelancer Profile"
          width={141}
          height={141}
          className="rounded-3xl"
        />
        {/** Name and Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-2xl text-white">Celia Hane</h3>
            <Image
              src="/verfiedBadgeIcon.svg"
              alt="Verified Badge"
              width={28.68}
              height={27.45}
            />
          </div>
          <p className="text-[14px] text-white">
            UI/UX Designer | Web & App Design
          </p>
        </div>
        {/** Ratings, Rate, hire type */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/starIcon.svg" alt="Star Icon" width={16} height={16} />
            <p className="font-medium text-[14px] text-white">4.9 (120 )</p>
          </div>

          <div className="border h-4 border-primary-lime" />

          <p className="font-medium text-[14px] text-white">$45/hr</p>

          <div className="border h-4 border-primary-lime" />

          <p className="font-medium text-[14px] text-white">Remote</p>
        </div>
        {/** Description */}
        <p className="font-normal text-[13px] text-center text-[#DADADA]">
          Creative designer focused on user-centered design and <br /> clean
          interfaces for web and mobile apps.
        </p>
      </div>
      <div className="flex  gap-4 ">
        {/** Skills Tags */}
        {skills.map((skill) => (
          <Tag key={skill} text={skill} />
        ))}
      </div>
      <PrimaryButton className="w-[377px]">
        Invite
      </PrimaryButton>
    </div>
  );
};

export default FreelancerCard;
