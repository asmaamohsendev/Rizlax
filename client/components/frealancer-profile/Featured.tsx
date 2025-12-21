import React from 'react'
import Image from "next/image";
import PrimaryButton from "../PrimaryButton";
const Featured = () => {
  return (
       <aside className="w-[850px] h-[550px] bg-[#FFFFFF] rounded-4xl border flex items-center px-6">
<div className='flex flex-col gap-6'>
    <div>
<h2 className='text-[#0D181D] font-semibold text-[32px]'>Featured Work</h2>
</div>
<div className='flex gap-4'>
 <aside className="w-[393px] h-[430px] bg-[#FFFFFF] rounded-3xl border flex items-center ">
    <div className='flex flex-col gap-2'>
<div className='w-[393px] h-[208px] bg-[#F9F9F9]'>
<Image
          src="/photo.svg"
          alt="Freelancer Profile"
          width={64}
          height={64}
          className="flex items-center justify-center h-full rounded-3xl "
        />
</div>

<h1 className='text-[20px] font-semibold text-[#000000]'>E-commerce App Redesign</h1>
<p className='text-[#525252] text-[14px]'>Complete UI/UX redesign for an online fashion <br /> brand’s mobile app. Increased user retention by <br /> 35%.</p>
<PrimaryButton className="w-[362px] rounded-4xl  h-[60px] font-semibold text-[18px]">
    view case study
      </PrimaryButton>
</div>
 </aside>
 <aside className="w-[393px] h-[430px] bg-[#FFFFFF] rounded-3xl border flex items-center ">
    <div className='flex flex-col gap-2 '>
<div className='w-[393px] h-[208px] bg-[#F9F9F9]'>
<Image
          src="/photo.svg"
          alt="Freelancer Profile"
          width={64}
          height={64}
          className="flex items-center justify-center h-full rounded-3xl "
        />
</div>
<h1 className='text-[20px] font-semibold text-[#000000]'>E-commerce App Redesign</h1>
<p className='text-[#525252] text-[14px]'>Complete UI/UX redesign for an online fashion <br /> brand’s mobile app. Increased user retention by <br /> 35%.</p>
<PrimaryButton className="w-[362px] rounded-4xl  h-[60px] font-semibold text-[18px]">
      view case study
      </PrimaryButton>
</div>
 </aside>
 </div>
</div>
</aside>
  )
}

export default Featured
