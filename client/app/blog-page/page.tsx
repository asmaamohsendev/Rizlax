import React from 'react'
import Image from "next/image";
import Howbuild from '@/components/Blog-page/Howbuild';
const page = () => {
    return (
        <div className='section-container'>
            <div className=' flex flex-col my-12 gap-6 '>
                <div className='flex flex-col gap w-[932px] h-[110px]'>

                    <h1 className=' text-[48px] font-semibold bg-gradient-to-r from-[#23343D] via-[#598671] to-[#23343D] bg-clip-text text-transparent '>From the Rizlax Blog</h1>
                    <p className='text-[20px] text-[#525252]'>Explore tips, stories, and insights to help freelancers and clients succeed.</p>
                </div>
                <aside className="w-[722px] h-[54px] bg-white rounded-3xl border flex items-center px-6">
                    <div className='flex gap-4'>
                        <Image
                            src="/Group.svg"
                            alt="Freelancer Profile"
                            width={22}
                            height={22}

                        />
                        <p className='text-[#B9B9B9] text-[13px]'>Search for jobs by title, skills, or keywords…</p>
                    </div>
                </aside>
            </div>
            <div className='h-[429px] '>
                <Howbuild />
            </div>
        </div>
    )
}

export default page
