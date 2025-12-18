import Image from "next/image";
import Tag from "../Tag"

export default function JobCard() {
  return (
    <div className="bg-[#0D181D] w-fit  flex flex-col gap-4 text-white p-6 rounded-4xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex justify-between gap-4">
            <h3 className="font-semibold text-2xl">
              Front-End Developer For E-Commerce Website
            </h3>
            <span className="text-[#77CC7D] font-medium text-2xl">
              $800 - Fixed
            </span>
          </div>

          {/* Body */}
          <p className="text-gray-400 text-sm font-normal">
            We’re looking for a skilled front-end developer to redesign our
            e-commerce platform using React <br /> and Tailwind CSS.We’re
            looking for a skilled front-end developer to redesign our e-commerce
            platform using React and Tailwind CSS.
          </p>

          {/* border */}
          <div className="w-full h-[1px] bg-primary-teal " />

          {/* details */}
          <div className="flex items-center gap-4 my-1.5 text-sm text-[#DADADA]">
            <span className="flex items-center gap-2">
              Experience: <span className="text-white">Intermediate</span>
            </span>

            <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>

            <span className="flex items-center gap-2">
              Posted: <span className="text-white">3 Hours Ago</span>
            </span>

            <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>

            <span className="flex items-center gap-2">
              Location: <span className="text-white">Egypt</span>
            </span>
          </div>

          {/* border */}
          <div className="w-full h-[1px] bg-primary-teal " />

          {/* Tags and footer */}
          <div className="flex gap-2 text-primary-lime ">
            <Tag text="React" />
            <Tag text="java script" />
            <Tag text="Tailwind" />
            <Tag text="UI Design" />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="./verfiedBadgeIcon.svg"
                alt="Verified Badge"
                width={28.68}
                height={27.45}
              />
              <h3 className="font-semibold text-[15px] text-white">Verfied</h3>
            </div>
            <Image
              src="./heartIcon.svg"
              alt="Heart Icon"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


