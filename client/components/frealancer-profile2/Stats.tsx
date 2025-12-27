const stats = [
  {
    value: "4",
    label: "Active Contracts",
  },
  {
    value: "120+",
    label: "Projects Completed",
  },
  {
    value: "$42,700",
    label: "Total Earnings",
  },
  {
    value: "95%",
    label: "Job Success Rate",
  },
];

const ProfileStats = () => {
  return (
    <div className="w-[850px] h-[135px] rounded-2xl border border-emerald-200 bg-white p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-[#C2EE7133] px-6 py-4 text-center"
          >
            <p className="text-xl font-semibold text-gray-900">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
