const JobHeader = () => {
  return (
    <>
      <h1 className="text-xl font-semibold mb-3">
        Front-End Developer for E-commerce Website
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
        <span className="flex items-center gap-1">🕒 Posted: 3 Hours Ago</span>
        <span className="flex items-center gap-1">💰 Fixed Price</span>
        <span className="flex items-center gap-1">💵 $800 - $1000</span>
        <span className="flex items-center gap-1">⭐ Intermediate</span>
      </div>
    </>
  );
};

export default JobHeader;
