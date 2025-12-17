const ProjectDetails = () => {
  return (
    <section>
      <h2 className="font-semibold mb-4">Project Details</h2>

      <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700">
        <Detail label="Expected Duration" value="2-3 weeks" />
        <Detail label="Start Date" value="November 15, 2025" />
        <Detail label="Location" value="Remote" />
        <Detail label="Proposals Sent" value="25 - 40" />
      </div>

      <div className="flex items-center gap-2 mt-4 text-green-600 text-sm">
        ✔ Verified
      </div>
    </section>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default ProjectDetails;
