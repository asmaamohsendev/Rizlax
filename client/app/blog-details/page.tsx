import React from 'react'
import Image from 'next/image'
import Howchoose from '@/components/Blog-details/Howchoose'

import Card from '@/components/Blog-details/Card'

const page = () => {
    return (
        <div className="section-container">
            <div className='flex flex-col gap-2 my-12 w-[1280px] h-[72]'>
                <div className='flex gap-3'>
                    <Image
                        src="/profile.jpg"
                        alt="profile"
                        width={40}
                        height={40}
                        className='rounded-[40px]'
                    />
                    <h1 className='text-[#180F02] text-[20px] font-medium'>Sarah Mitchell</h1>
                </div>
           <div>
            <Howchoose/>
           </div>
         <div>
      <Card/>

         </div>
            </div>
        </div>
    )
}

export default page
