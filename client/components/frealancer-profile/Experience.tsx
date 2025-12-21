import React from 'react'

const stats = [
  { value: "5+ Years", label: " Experience" },
  { value: "120+", label: "Projects Completed" },
  { value: "120+", label: "Projects Completed" },
  { value: "95%", label: "Job Success Rate" },
]

const Experience = () => {
  return (
    <aside className="w-[850px] h-[135px] bg-white rounded-3xl border flex items-center px-6">
      <div className="flex gap-4 w-[803px]  h-[87px] justify-between">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#F1F8E8] rounded-2xl px-8 py-5 min-w-[180px] text-center"
          >
            <h3 className="text-xl font-semibold text-[#23343D]">
              {stat.value}
            </h3>
            <p className="text-[#525252] text[14px] text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Experience
