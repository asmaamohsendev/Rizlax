import React from 'react'
import Image from "next/image";
import { Stars } from 'lucide-react';


const Review = () => {
  return (
           <aside className="w-[850px] h-[659px] bg-[#FFFFFF] rounded-4xl border flex items-center px-6">
<div >
<div className=' flex w-[802px] h-[48px] justify-between'>
    <h1 className='text-[32px] text-[#0D181D] font-semibold'>Client Reviews & Ratings</h1>
    <div className='flex gap-2 w-[260px] h-[27px]'>
<Image
          src="/vector.svg"
          alt="star"
          width={24}
          height={24}

          
        />
        <p className='font-medium text-[#000000] text-[18px]'>4.9  </p>
        <p className='text-gray'>(Based on 120 reviews)</p>
        </div>
</div>

           <aside className="w-[802px] h-[169px] bg-[#FFFFFF] rounded-3xl border flex items-center px-6">
<div className='flex flex-col gap-1'>

<div className='flex justify-between gap-2'>
    <div className='flex gap-2'>
<Image
          src="/profile.jpg"
          alt="profile"
          width={60}
          height={60}
          className='rounded-2xl'
        />
        <div className='flex flex-col gap-1'>
        <h1 className='text-[20px] font-semibold text-[#000000]'>John Davis</h1>
        <h2 className='text-[16px] text-[#525252]'>Startup Founder</h2>
        </div>
        </div>
      <Stars/>

</div>
<p>Sarah was exceptional! She delivered a beautiful interface ahead of schedule. Great communicationSarah <br /> was exceptional! She delivered a beautiful interface ahead of schedule. Gr</p>

</div>
</aside>
  <aside className="w-[802px] h-[169px] bg-[#FFFFFF] rounded-3xl border flex items-center px-6">
<div className='flex flex-col gap-1'>

<div className='flex justify-between gap-2'>
    <div className='flex gap-2'>
<Image
          src="/profile.jpg"
          alt="profile"
          width={60}
          height={60}
           className='rounded-2xl'
        />
        <div className='flex flex-col gap-1'>
        <h1 className='text-[20px] font-semibold text-[#000000]'>John Davis</h1>
        <h2 className='text-[16px] text-[#525252]'>Startup Founder</h2>
        </div>
        </div>
</div>
<p>Sarah was exceptional! She delivered a beautiful interface ahead of schedule. Great communicationSarah <br /> was exceptional! She delivered a beautiful interface ahead of schedule. Gr</p>

</div>
</aside>
  <aside className="w-[802px] h-[169px] bg-[#FFFFFF] rounded-3xl border flex items-center px-6">
<div className='flex flex-col gap-1'>

<div className='flex justify-between gap-2'>
    <div className='flex gap-2'>
<Image
          src="/profile.jpg"
          alt="profile"
          width={60}
          height={60}
           className='rounded-2xl'
        />
        <div className='flex flex-col gap-1'>
        <h1 className='text-[20px] font-semibold text-[#000000]'>John Davis</h1>
        <h2 className='text-[16px] text-[#525252]'>Startup Founder</h2>
        </div>
        </div>
</div>
<p>Sarah was exceptional! She delivered a beautiful interface ahead of schedule. Great communicationSarah <br /> was exceptional! She delivered a beautiful interface ahead of schedule. Gr</p>

</div>
</aside>
</div>



</aside>
  )
}

export default Review
