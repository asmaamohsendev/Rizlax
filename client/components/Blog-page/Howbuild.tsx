import React from 'react'
import Image from "next/image";

const Howbuild = () => {
    return (
        <div >
            <div className='flex gap-16'>
                <div>
                    <Image
                        src="/coming.png"
                        alt="comming soon"
                        width={664}
                        height={429}
                        className='rounded-4xl h-[429px]'
                    />
                </div>
                <div className='flex gap-0.5'>
                    <p>Sarah Johnson
                    </p>
                    <Image src="/sguare.svg" alt="" width={6} height={1} className='bg-[#C2EE71] h-1.5 rounded-full' />
                    <p>Aug 12, 2025</p>
                </div>
            </div>
            <h1 className='text-[#0D181D] text-[36px] font-semibold'>How to Build a Standout Freelancer Profile</h1>
            <p>Learn how to create a profile that attracts top clients — from crafting your <br />bio to showcasing your best projects. Learn how to create a profile that <br />attracts top clients — from crafting your bio to showcasing your best <br />projects.Learn how to create a profile that attracts top clients — from <br />crafting your bio to showcasing your best projects.Learn how to create a <br /> profile that attracts top clients — from crafting your bio to showcasing your <br /> best projects. Learn how to create a profile that attracts top clients — from <br />crafting your bio to showcasing your best projects.Learn how to create a <br /> profile that attracts top clients — from crafting your <br /> bio to showcasing your </p>


        </div>
    )
}

export default Howbuild
