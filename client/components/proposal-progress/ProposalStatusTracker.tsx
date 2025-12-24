import {
  Check,
  Eye,
  Users,
} from "lucide-react";

const statuses = [
  {
    title: "Proposal Sent",
    date: "June 1, 2024",
    icon: Check,
    completed: true,
  },
  {
    title: "Viewed by client",
    date: "June 1, 2024",
    icon: Eye,
    completed: true,
  },
  {
    title: "Shortlisted",
    date: null,
    icon: Users,
    completed: false,
  },
  {
    title: "Hired",
    date: null,
    icon: Check,
    completed: false,
  },
];

const ProposalStatusTracker = () => {
  return (
    <div className="w-[414px] h-[501px] bg-white rounded-4xl border p-6">
      <h2 className="text-[24px] font-semibold mb-6">
        Status Tracker
      </h2>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-5 top-0 h-full w-px bg-gray-300" />

        <div className="space-y-8">
          {statuses.map((status, index) => {
            const Icon = status.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                
                {/* Icon */}
                <div
                  className={`z-10 flex h-10 w-10 items-center justify-center rounded-full
                    ${
                      status.completed
                        ? "bg-green-700 text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                >
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div>
                  <p
                    className={`font-medium ${
                      status.completed
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {status.title}
                  </p>
                  {status.date && (
                    <p className="text-sm text-gray-400">
                      {status.date}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProposalStatusTracker;
