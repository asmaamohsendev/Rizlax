// src/components/JobList.tsx
import JobCard from "./Jobcard";

const jobs = Array.from({ length: 5 });

const JobList = () => {
  return (
    <main className="col-span-9 space-y-4">
      {jobs.map((_, i) => (
        <JobCard key={i} />
      ))}
    </main>
  );
}
export default JobList