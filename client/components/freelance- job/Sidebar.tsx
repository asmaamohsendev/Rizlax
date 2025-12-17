// src/components/Sidebar.tsx
const Sidebar = () => {
  return (
    <aside className="col-span-3 bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold mb-4">Filter</h2>

      {/* Category */}
      <FilterSection title="Category">
        <Checkbox label="Development & IT" />
        <Checkbox label="Design & Creative" />
        <Checkbox label="Finance & Accounting" />
      </FilterSection>

      {/* Experience */}
      <FilterSection title="Experience Level">
        <Checkbox label="Entry" />
        <Checkbox label="Intermediate" />
        <Checkbox label="Expert" />
      </FilterSection>

      {/* Buttons */}
      <div className="flex gap-2 mt-6">
        <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg">
          Apply
        </button>
        <button className="flex-1 border py-2 rounded-lg">
          Reset
        </button>
      </div>
    </aside>
  );
}

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
export default Sidebar