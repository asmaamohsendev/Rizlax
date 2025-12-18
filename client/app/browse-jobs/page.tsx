
import Sidebar from '@/components/freelance- job/Sidebar'
import JobList from '@/components/freelance- job/Joblist'
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';


const Page = () => {
  return (
    <>
    <Navbar/>
    <div className="section-container p-6">
      <h1 className="text-2xl font-semibold mb-2">
        Find the Perfect Project for You
      </h1>
      <p className="text-gray-600 mb-6">
        Explore thousands of opportunities across different skills and industries
      </p>

      <div className="flex  gap-8">
        <Sidebar />
        <JobList />
      </div>
    <Footer/>
    </div>
    </>
  );
}
export default Page