import Image from "next/image";
import PrimaryButton from "../PrimaryButton";

const ProfileCard = () => {
  return (
    <div className="w-[414px] h-[815px] rounded-4xl border bg-white p-6 flex flex-col items-center gap-4">
      
      {/* Avatar */}
      <div className="relative">
        <Image
          src="/profile.jpg"
          alt="profile"
          width={90}
          height={90}
          className="rounded-2xl object-cover"
        />
      </div>

      {/* Name */}
      <div className="flex items-center gap-2">
        <h2 className="text-[20px] font-semibold text-[#0D181D]">
          Celig Hane
        </h2>
        <span className="text-green-500 text-sm">✔</span>
      </div>

      {/* Title */}
      <p className="text-center text-[14px] text-[#525252]">
        UI/UX Designer | Web & App Design
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 text-[14px]">
        <span className="text-yellow-400">★</span>
        <span className="font-medium">4.9</span>
        <span className="text-gray-400">(120)</span>
        <span className="mx-1">|</span>
        <span className="font-medium">$45/HR</span>
        <span className="mx-1">|</span>
        <span className="text-gray-500">Remote</span>
      </div>

      {/* Info */}
      <div className="w-full text-[14px] space-y-2 mt-2">
        {[
          ["Location:", "Dubai, UAE"],
          ["Member Since:", "March 2024"],
          ["Job Success Rate:", "95%"],
          ["Hire Rate:", "80%"],
          ["Repeat Clients:", "70%"],
          ["Total Earnings:", "$45,000+"],
        ].map(([label, value], index) => (
          <div key={index} className="flex justify-between text-[#525252]">
            <span>{label}</span>
            <span className="font-medium text-[#0D181D]">{value}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
     <PrimaryButton className="w-[362px] rounded-4xl  h-[60px] font-semibold text-[18px]">
   Invite to Job
      </PrimaryButton>

      <button className="w-[366px] h-[60px] rounded-full border font-medium text-[#0D181D]">
        SEND MESSAGE
      </button>
    </div>
  );
};

export default ProfileCard;
