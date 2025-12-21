import React from 'react'
const skills = ["React", "JavaScript", "Tailwind", "UI Design" ,"Tailwind", "UI Design", "UI Design"];
const skils = ["React", "JavaScript", "Tailwind", "UI Design" ,"Tailwind", "UI Design", "UI Design"];

const Skils = () => {
  return (
   <aside className="w-[850px] h-[212px] bg-[#FFFFFF] rounded-4xl border flex items-center px-6">
<div className='flex flex-col gap-6'>
<div>
<h2 className='text-[#0D181D] font-semibold text-[32px]'>Skills</h2>
</div>

 <div className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-[#F0F0F0A3] text-sm rounded-3xl text-[#23343D]"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {skils.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-[#F0F0F0A3] text-sm rounded-3xl text-[#23343D]"
          >
            {skill}
          </span>
        ))}
      </div>
      </div>
      
   </aside>
  )
}

export default Skils
