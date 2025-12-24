import { StarIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
const Clientprofile = () => {
  return (
    <div className="w-[414px] h-[590px] rounded-4xl border  bg-white p-6 ">
      <h2 className="text-[24px] font-semibold mb-4">About the Client</h2>

      {/* Profile */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/profile.jpg"
          alt="Client"
          width={77}
          height={70}
          className=" rounded-2xl object-cover"
        />
        <div>
          <p className="font-semibold text-[20px]">Celia Hane</p>
          <div className="flex items-center text-sm text-gray-600">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1 text-[15px] font-medium " />
            4.9/5
          </div>
        </div>
      </div>

      {/* Verified Info */}
      <div className="space-y-2 border-t border-b py-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CheckBadgeIcon className="w-5 h-5 text-green-500" />
          Payment Method Verified
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CheckBadgeIcon className="w-5 h-5 text-green-500" />
          Phone Number Verified
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2 text-sm text-gray-700 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-500">Location:</span>
          <span className="font-medium">Dubai, UAE</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Member Since:</span>
          <span className="font-medium">March 2024</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Jobs Posted:</span>
          <span className="font-medium">15</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Hire Rate:</span>
          <span className="font-medium">80%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total Spent:</span>
          <span className="font-medium">$12,000</span>
        </div>
      </div>

     
     
    </div>
    
  );
};

export default Clientprofile;
