"use client";

import PrimaryButton from "../PrimaryButton";

type Proposal = {
  id: number;
  jobTitle: string;
  client: string;
  status: "Accepted" | "Pending" | "Rejected";
  date: string;
  budget: string;
};

const proposals: Proposal[] = [
  {
    id: 1,
    jobTitle: "Website for Tech Agency",
    client: "Morris Borer-Rath",
    status: "Accepted",
    date: "2024-07-26",
    budget: "$800",
  },
  {
    id: 2,
    jobTitle: "Website for Tech Agency",
    client: "Morris Borer-Rath",
    status: "Accepted",
    date: "2024-07-26",
    budget: "$800",
  },
  {
    id: 3,
    jobTitle: "Website for Tech Agency",
    client: "Morris Borer-Rath",
    status: "Accepted",
    date: "2024-07-26",
    budget: "$800",
  },
];

const statusStyles = {
  Accepted: "bg-[#77CC7D29] text-[#77CC7D]",
  Pending: "bg-yellow-100 text-yellow-600",
  Rejected: "bg-red-100 text-red-600",
};

const MyProposal = () => {
  return (
    <div className="w-[850px] h-[491px] bg-white rounded-4xl border p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[32px] font-semibold">My Proposals</h2>
        <button className="text-sm font-medium text-gray-600 hover:text-black">
          View All
        </button>
      </div>

      {/* Table */}
      <div className=" rounded-xl border w-[802px] h-[281px]">
        <table className="w-[802px] h-[281px] ">
          <thead className=" bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 text-[14px] text-[#333333] font-medium">Job Title</th>
              <th className="text-left px-4 py-3 text-[14px] text-[#333333] font-medium">Client</th>
              <th className="text-left px-4 py-3 text-[14px] text-[#333333] font-medium">Status</th>
              <th className="text-left px-4 py-3 text-[14px] text-[#333333] font-medium">Date</th>
              <th className="text-left px-4 py-3 text-[14px] text-[#333333] font-medium">Budget</th>
            </tr>
          </thead>

          <tbody>
            {proposals.map((proposal) => (
              <tr
                key={proposal.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 text-[13px] text-[#333333]">{proposal.jobTitle}</td>
                <td className="px-4 py-4 text-[13px] text-[#333333]">{proposal.client}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[13px] text-[#333333] font-medium ${
                      statusStyles[proposal.status]
                    }`}
                  >
                    {proposal.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-[13px] text-[#333333]">{proposal.date}</td>
                <td className="px-4 py-4  text-[13px] text-[#333333]">
                  {proposal.budget}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Button */}
      <div className="mt-6">
        <PrimaryButton className="w-[234px] h-[50px] rounded-full text-[#D1EE9C] bg-gradient-to-r from-gray-800 to-gray-600 font-semibold hover:brightness-110 transition">
          CREATE NEW PROPOSAL
        </PrimaryButton>
      </div>
    </div>
  );
};

export default MyProposal;
