import Image from "next/image";

const FreelancerProfileCard = () => {
  return (
    <div className="w-[414px] h-[621px] rounded-4xl border border-emerald-200 bg-white p-6 shadow-sm">
      {/* Avatar */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="/profile.jpg"
          alt="Celia Hane"
          width={141}
          height={141}
          className="  rounded-3xl object-cover mb-4"
        />

        <div className="flex items-center gap-2">
          <h2 className="text-[24px] font-semibold">Celia Hane</h2>
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs">
            ✓
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          UI/UX Designer | Web & App Design
        </p>

        {/* Rating */}
        <div className="flex items-center gap-3 mt-3 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            ⭐ <span className="font-medium">4.9</span>
            <span className="text-gray-400">(120)</span>
          </span>
          <span>|</span>
          <span className="font-medium">$45/HR</span>
          <span>|</span>
          <span>Remote</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Info */}
      <div className="space-y-3 text-[16px]">
        <InfoRow  label="Location" value="Dubai, UAE"  />
        <InfoRow label="Member Since" value="March 2024" />
        <InfoRow label="Job Success Rate" value="95%" />
        <InfoRow label="Hire Rate" value="80%" />
        <InfoRow label="Repeat Clients" value="70%" />
        <InfoRow label="Total Earnings" value="$45,000+" />
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
};

export default FreelancerProfileCard;
