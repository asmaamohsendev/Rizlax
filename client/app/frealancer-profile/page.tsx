import About from '@/components/frealancer-profile/About'
import Experience from '@/components/frealancer-profile/Experience'
import Featured from '@/components/frealancer-profile/Featured'
import ProfileCard from '@/components/frealancer-profile/ProfileCard'
import Review from '@/components/frealancer-profile/Review'
import Skils from '@/components/frealancer-profile/Skils'
import React from 'react'

const page = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col gap-2 my-12 w-[1280px] h-[72]">
        <h2 className="font-semibold text-5xl bg-gradient-to-r from-[#23343D] via-[#598671] to-[#23343D] bg-clip-text text-transparent ">
          Sarah Mitchell — UI/UX DESIGNER
        </h2>
        </div>

        <div className='flex flex-col gap-6'>
            <div className='flex gap-4'>
                <ProfileCard/>
        <div>
            <Experience/>
              <About/>
               <Skils/>
               <Featured/>
               <Review/>
        </div>
        </div>
       
      
       
        
        </div>
    </div>
  )
}

export default page
