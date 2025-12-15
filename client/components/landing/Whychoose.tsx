import React from "react";

const features = [
  {
    title: "Secure Payments",
    desc: "All Contracts And Transactions Are Protected By Our Escrow System.",
    position: "left-top"
  },
  {
    title: "Free To Start",
    desc: "Join Rizlax With No Fees Or Subscriptions — Post Or Apply Instantly.",
    position: "right-top"
  },
  {
    title: "Smart Matching",
    desc: "Find The Right Jobs Or Freelancers Quickly With Advanced Filters.",
    position: "left-bottom"
  },
  {
    title: "Verified Talent",
    desc: "Hire Or Work With Trusted, Verified Professionals Only.",
    position: "right-bottom"
  }
];

const positionClasses = {
  "left-top": "md:absolute md:left-0 md:top-12",
  "right-top": "md:absolute md:right-0 md:top-12",
  "left-bottom": "md:absolute md:left-0 md:bottom-12",
  "right-bottom": "md:absolute md:right-0 md:bottom-12",
};

const WhyChoose = () => {
  return (
    <section className="relative w-full py-24 px-6 md:px-16 bg-gradient-to-br from-[#E9F6DD] to-white rounded-3xl my-12">

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A3B23]">
        WHY CHOOSE RIZLAX
      </h2>

      <p className="text-gray-600 mt-2 max-w-lg">
        Built To Empower Freelancers And Businesses Through Simplicity, Trust, And Innovation
      </p>

      {/* Container */}
      <div className="mt-16 relative flex justify-center items-center">
        
        {/* Floating Feature Cards */}
        {features.map((f, index) => (
          <div
            key={index}
            className={`
            "w-64 p-5 bg-[#F3FCEB] rounded-2xl shadow-sm border border-green-100 mb-6 md:mb-0 " +
  positionClasses[f.position]
            `}
          >
            <h3 className="text-lg font-semibold text-green-900">{f.title}</h3>
            <p className="text-gray-700 text-sm mt-1">{f.desc}</p>
          </div>
        ))}

        {/* Center Image */}
        <img
          src="./tablet.png"  // ← حط الصورة هنا
          alt="Rizlax preview"
          className="w-[450px] md:w-[520px] drop-shadow-xl"
        />
      </div>
    </section>
  );
};

export default WhyChoose;
