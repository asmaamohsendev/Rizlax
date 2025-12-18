import SecondaryButton from "../SecondaryButton";

const HeroGrid = () => {
  return (
    <div className="section-container relative ">
      <div className="grid grid-cols-3 gap-6 auto-rows-[350px]">
        {/* Smarter Work - Top Left */}
        <div
          className="col-span-2 rounded-3xl bg-cover bg-center relative flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: "url('./smart.png')" }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />
          <h2 className="relative text-white text-3xl font-bold text-center px-8 leading-snug">
            SMARTER WORK.
            <br />
            STRONGER
            <br />
            CONNECTIONS.
          </h2>
        </div>

        {/* Work Without Limits - Top Right */}
        <div
          className="row-span-2 rounded-3xl bg-cover bg-center relative flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: "url('./frame3.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />
          <h2 className="relative text-white text-4xl font-bold text-center leading-tight">
            WORK
            <br />
            WITHOUT
            <br />
            LIMITS
          </h2>
        </div>

        {/* Join Us - Bottom Left */}
        <div className="absolute top-[35%] right-[38%] w-[370px] h-[340px] rounded-3xl bg-[#0D181D] flex flex-col items-center justify-center text-center p-8 border border-teal-900/20 overflow-hidden">
          <div className="absolute top-[80%] left-1/8 -translate-x-1/2 -translate-y-1/2 w-96 h-92 bg-[#D1EE9C] rounded-full filter blur-3xl opacity-30 " />

          <h3 className="relative z-10 text-white text-4xl font-bold mb-3">
            JOIN US
          </h3>
          <p className="relative z-10 text-white text-md mb-6 leading-relaxed uppercase tracking-wide">
            Be part of a growing community
            <br />
            where talent meets opportunity
          </p>

          <SecondaryButton size={"lg"} className="w-[322px] relative z-10">
            Find Freelancers
          </SecondaryButton>
        </div>
        {/* Where Talent Meets Opportunity - Top Middle */}
        <div
          className="row-span-2 rounded-3xl bg-cover bg-center relative flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: "url('./frame2.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />
          <h2 className="relative text-white text-4xl font-bold text-center leading-tight">
            WHERE TALENT
            <br />
            MEETS
            <br />
            OPPORTUNITY
          </h2>
        </div>
        {/* Your Next Big Project - Bottom Center & Right */}
        <div
          className="col-span-2 rounded-3xl bg-cover bg-center relative flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: "url('./project.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />
          <h2 className="relative text-white text-4xl font-bold text-center leading-tight">
            YOUR NEXT BIG PROJECT
            <br />
            STARTS HERE
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
