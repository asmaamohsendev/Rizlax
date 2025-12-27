"use client";
import Image from "next/image";
type Job = {
  id: number;
  title: string;
  client: string;
  budget: string;
  posted: string;
  progress:number;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "E-Commerce Website Redesign",
    client: "John Davis",
    budget: "$1,500",
    posted:" Sept 20, 2025",
    progress:80
  },
  {
    id: 2,
    title: "E-commerce Website Redesign",
    client: "John Davis",
    budget: "$1,500",
    posted: "Sept 20, 2025",
    progress:80
  },
   {
    id: 3,
    title: "E-commerce Website Redesign",
    client: "John Davis",
    budget: "$1,500",
   posted: "Sept 20, 2025",
   progress:80
  },
  
];

const MyJobs = () => {
  return (
    <div className="w-[850px] h-[863px] bg-white rounded-4xl border p-6">
      <div className="flex justify-between">
      <h2 className="text-[32px] font-semibold mb-4">My Jobs</h2>
<button className="text-sm font-medium text-gray-600 hover:text-black">
          View All
        </button>
        </div>
      <div className="flex flex-col gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-3xl bg-gray-50 w-[802px] h-[229px]">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
            <h3 className="font-medium text-[20px]">{job.title}</h3>
            <button className="w-[83px] h-[32px] bg-[#77CC7D29] text-[#77CC7D] rounded-3xl">active</button>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-1 items-center">
            <p className="text-gray-500">Client: </p>
            <Image src={"/profile.jpg"} alt="profile" width={30} height={30} className="rounded-4xl"/>
            <p className="text-sm "> {job.client}</p>
            </div>
             <span className="text-gray-300">|</span>
            <div className="flex gap-1 items-center">
            <p className="text-gray-500">Budget:</p>
            <p className="text-sm"> {job.budget}</p>
            </div>
             <span className="text-gray-300 ">|</span>
            <div className="flex gap-1 items-center">
            <p className="text-gray-500">posted:</p>
              <p className="text-sm"> {job.posted}</p>
              </div>
</div>
</div>
            {/* Progress Bar */}
            <div className=" flex flex-col gap-1 mt-2 w-[234px] h-[23px] ">
              <div className="flex justify-between">
              <p className="text-[10px] text-[#525252]">Milestones 2/3</p>
              <p className="text-xs text-gray-500 mt-1">%{job.progress} </p>
              </div>
              <div className="h-[4px] w-[234px]  bg-gray-200 rounded-3xl">
                
                <div
                  className="h-[4px] w-[234px] bg-black rounded-3xl"
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>
             
            </div>
            <div className="mt-12">
<a
  href="#"
  className="text-[16px] font-semibold uppercase text-[#0D181D] underline underline-offset-4 hover:opacity-70 transition"
>
  View Contract
</a>
          </div>
          </div>
        ))}
       
      </div>
    </div>
  );
};

export default MyJobs;
