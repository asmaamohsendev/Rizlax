import Jobheader from '@/components/jobdetails-view/Jobheader'
import JobDescription from '@/components/jobdetails-view/JobDescription'
import Skills from '@/components/jobdetails-view/Skills'
import ProjectDetails from '@/components/jobdetails-view/ProjectDetails'
import ClientCard from '@/components/jobdetails-view/Clientcard'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SubmitProposal from '@/components/jobdetails-view/Submitproposal'
import PaymentStructure from '@/components/jobdetails-view/Paymentstructure'
import { Milestone } from 'lucide-react'

const JobDetails = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
<h1>Job Details</h1>
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-6">
            
          Home / Browse Jobs / <span className="text-gray-700">Job Details</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 bg-white rounded-2xl border p-6">
            <Jobheader />
            <JobDescription />
            <Skills/>
            <ProjectDetails />
          </div>

          {/* RIGHT */}
          <ClientCard />
        </div>
      </div>
    </div>
    <SubmitProposal/>
    <Footer/>
    </>
  );
};

export default JobDetails;
