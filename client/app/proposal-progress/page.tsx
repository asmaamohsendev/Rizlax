import Button from '@/components/proposal-progress/Button'
import Clientprofile from '@/components/proposal-progress/Clientprofile'
import Proposaldetails from '@/components/proposal-progress/Proposaldetails'
import ProposalStatusTracker from '@/components/proposal-progress/ProposalStatusTracker'
import Readability from '@/components/proposal-progress/Readability'
import React from 'react'

const page = () => {
    return (
        <div className="section-container">
            <div className='flex flex-col gap-2 my-12 w-[1280px] h-[72]'>
                <div className='w-[932px] h-[110px]'>
                <h1 className='bg-gradient-to-r from-[#23343D] via-[#598671] to-[#23343D] bg-clip-text text-transparent text-[48px] font-semibold'>Job Details</h1>
<p className='text-[20px]'>Dashboard / My Proposals / Proposal Details</p>
</div>
<div className='flex gap-4'>
<Readability/>
<div className='flex flex-col gap-4'>
<ProposalStatusTracker/>
<Clientprofile/>
<Button/>
</div>
</div>


<Proposaldetails/>



                <div >

                </div>


            </div>

        </div>
    )
}

export default page
