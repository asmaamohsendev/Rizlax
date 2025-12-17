import React from "react";

const steps = [
  {
    img: "./hero.jpg", // ضع الصورة الخاصة بك هنا
    title: "Step 1 — Create Your Free Account",
  },
  {
    img: "./hero.jpg",
    title: "Step 2 — Post Or Apply For Jobs",
  },
  {
    img: "./hero.jpg",
    title: "Step 3 — Collaborate & Get Paid Securely",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-16 px-6 md:px-12 text-center">
      
      {/* Background container */}
      <div className="
        bg-[#0F1D1A] 
        rounded-3xl 
        py-16 
        px-6 
        md:px-16 
        relative 
        overflow-hidden
      "
      >

        {/* Gradient circles background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-60 h-60 bg-green-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#9DFF8D] relative z-10">
          HOW RIZLAX WORKS
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto relative z-10">
          A Seamless Process Designed For Clients And <br /> Freelancers To Connect, 
          Collaborate, And Create Value.
        </p>

        {/* Cards */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 relative z-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="
                w-72 
                bg-[#0B1412] 
                rounded-3xl 
                overflow-hidden 
                shadow-xl 
                hover:scale-105 
                transition 
                duration-300
              "
            >
              {/* Image */}
              <img
                src={step.img}
                alt="step"
                className="w-full h-56 object-cover"
              />

              {/* Text */}
              <div className="p-4 text-left">
                <h3 className="text-white font-semibold text-lg">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>


       


    </section>
  );
};

export default HowItWorks;
