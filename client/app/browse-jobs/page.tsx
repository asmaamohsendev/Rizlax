
import Sidebar from '@/components/freelance- job/Sidebar'
import JobList from '@/components/freelance- job/Joblist'
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';


const Page = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-2">
        Find the Perfect Project for You
      </h1>
      <p className="text-gray-600 mb-6">
        Explore thousands of opportunities across different skills and industries
      </p>

      <div className="grid grid-cols-12 gap-6">
        <Sidebar />
        <JobList />
      </div>
    </div>
    <Footer/>
    </>
  );
}
export default Page