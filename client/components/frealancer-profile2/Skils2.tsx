import React from 'react'
const skills = ["React", "JavaScript", "Tailwind", "UI Design" ,"Tailwind", "UI Design", "UI Design"];
const skils = ["React", "JavaScript", "Tailwind", "UI Design" ,"Tailwind", "UI Design", "UI Design"];
import { CheckIcon } from 'lucide-react';
import { PencilIcon } from 'lucide-react';
import { useState } from "react";
const Skils2 = () => {
   const [isEditing, setIsEditing] = useState(false);
  return (
   <aside className="w-[850px] h-[212px] bg-[#FFFFFF] rounded-4xl border flex items-center px-6">
<div className='flex flex-col gap-6'>
<div className='flex justify-between'>
<h2 className='text-[#0D181D] font-semibold text-[32px]'>Skills</h2>
 <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
          >
            {isEditing ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Save
              </>
            ) : (
              <>
                <PencilIcon className="h-4 w-4" />
                Edit
              </>
            )}
          </button>
</div>
 

 <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 w-[100.86px] h-[28px] bg-[#F0F0F0A3] text-sm rounded-3xl text-[#23343D]"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {skils.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 w-[100.86px] h-[28px] bg-[#F0F0F0A3] text-sm rounded-3xl text-[#23343D]"
          >
            {skill}
          </span>
        ))}
      </div>
      </div>
      
   </aside>
  );
};

export default Skils2
