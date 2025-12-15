const HeroGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-6 p-6 bg-black min-h-screen">

      {/* Smarter Work */}
      <div
        className="col-span-2 rounded-3xl bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('./smart.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-3xl" />
        <h2 className="relative text-white text-3xl font-semibold text-center px-6">
          SMARTER WORK. STRONGER <br /> CONNECTIONS.
        </h2>
      </div>

      {/* Where Talent Meets Opportunity */}
      <div
        className="col-span-2 row-span-2 rounded-3xl bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('./frame2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-3xl" />
        <h2 className="relative text-white text-3xl font-semibold text-center">
          WHERE TALENT <br /> MEETS <br /> OPPORTUNITY
        </h2>
      </div>

      {/* Work Without Limits */}
      <div
        className="col-span-1 row-span-2 rounded-3xl bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('./frame3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-3xl" />
        <h2 className="relative text-white text-2xl font-semibold text-center">
          WORK <br /> WITHOUT <br /> LIMITS
        </h2>
      </div>

      {/* Join Us */}
      <div className="col-span-1 rounded-3xl bg-gradient-to-br from-[#1B2A2A] to-[#0B1220] flex flex-col items-center justify-center text-center p-6">
        <h3 className="text-white text-xl font-semibold mb-2">
          JOIN US
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Be part of a growing community where talent meets opportunity
        </p>
        <button className="border border-green-400 text-green-400 px-6 py-2 rounded-full text-sm hover:bg-green-400 hover:text-black transition">
          FIND FREELANCERS
        </button>
      </div>

      {/* Your Next Big Project */}
      <div
        className="col-span-2 rounded-3xl bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('./project.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-3xl" />
        <h2 className="relative text-white text-3xl font-semibold text-center">
          YOUR NEXT BIG PROJECT <br /> STARTS HERE
        </h2>
      </div>

    </div>
  );
};

export default HeroGrid;
