// src/components/Sidebar.tsx
const Sidebar = () => {
  return (
    <aside className="w-[414px] bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold mb-4">Filter</h2>

      <div className="w-full max-w-xl">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search for jobs by title, skills, or keywords..."
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <Checkbox label="Development & IT" />
        <Checkbox label="Design & Creative" />
        <Checkbox label="Finance & Accounting" />
        <Checkbox label="Sales & Marketing" />
        <Checkbox label="Admin & Customer Support" />
        <Checkbox label="Writing & Translation" />
        <Checkbox label="Engineering & Architecture" />
      </FilterSection>

      {/* Experience */}
      <FilterSection title="Experience Level">
        <Checkbox label="Entry" />
        <Checkbox label="Intermediate" />
        <Checkbox label="Expert" />
      </FilterSection>
      <FilterSection title="Project Type">
        <Checkbox label="Fixed Price" />
        <Checkbox label="Hourly" />
      </FilterSection>
      <FilterSection title="Posted Date">
        <Checkbox label="Last 24 hours" />
        <Checkbox label="This Week" />
        <Checkbox label="This Month" />
      </FilterSection>

      <FilterSection title="Location">
        <Checkbox label="Remote" />
        <Checkbox label="Specific Country" />
      </FilterSection>

      {/* Buttons */}
      <div className="flex gap-2 mt-6">
        <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg">
          Apply
        </button>
        <button className="flex-1 border py-2 rounded-lg">Reset</button>
      </div>
    </aside>
  );
};

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input type="checkbox" className="rounded" />
      {label}
    </label>
  );
}
export default Sidebar;
