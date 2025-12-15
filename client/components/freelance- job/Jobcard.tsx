export default function JobCard() {
  return (
    <div className="bg-slate-900 text-white p-5 rounded-xl">

      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">
          Front-End Developer For E-Commerce Website
        </h3>
        <span className="text-emerald-400">$800 - Fixed</span>
      </div>

      <p className="text-gray-400 text-sm mt-2">
        Looking for a skilled Front-End Developer using React & Tailwind.
      </p>

      <div className="flex gap-2 mt-3">
        <Tag text="React" />
        <Tag text="Tailwind" />
        <Tag text="UI Design" />
      </div>

      <div className="flex justify-between text-gray-400 text-sm mt-4">
        <span>Experience: Intermediate</span>
        <span>3 hours ago • Egypt</span>
      </div>

    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs">
      {text}
    </span>
  );
}
