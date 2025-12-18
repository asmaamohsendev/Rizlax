import React from "react";
import Image from "next/image";

const steps = [
  {
    img: "/hero.jpg",
    title: "Step 1 — Create Your Free Account",
    details:
      "Sign up as a freelancer or client in minutes. It's completely free! Build your profile, verify your email, and you're ready to connect.",
  },
  {
    img: "/hero.jpg",
    title: "Step 2 — Post Or Apply For Jobs",
    details:
      "Clients can post a job with all job details. Freelancers browse available jobs, filter by skills, and send proposals that match their expertise.",
  },
  {
    img: "/hero.jpg",
    title: "Step 3 — Collaborate & Get Paid Securely",
    details:
      "Chat, share files, and work together in real-time. Once the work is approved, payments are released safely through the Rizlax system.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-container w-full h-dvh py-16 text-center">
      {/* Background container */}
      <div
        className="
        h-[562px]
        bg-[#0F1D1A] 
        rounded-3xl 
        py-16 
        px-6 
        md:px-16 
        relative 
      "
      >
        {/* Gradient circles background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-60 h-60 bg-green-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Title */}
        <h2 className="text-5xl md:text-4xl font-bold text-[#C2EE71] relative z-10">
          HOW RIZLAX WORKS
        </h2>

        {/* Subtitle */}
        <p className="text-white mt-3 max-w-2xl mx-auto relative z-10">
          A Seamless Process Designed For Clients And <br /> Freelancers To
          Connect, Collaborate, And Create Value.
        </p>

        {/* Cards */}
        <div className="mt-14 flex justify-center gap-8 relative z-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="
                w-[384px]
                h-[548px]
                bg-[#0B1412]
                z-20
                rounded-3xl
                shadow-xl
                hover:scale-105
                transition-all
                duration-500
                relative
                border-2 border-[#D1EE9C61]
                overflow-hidden
                group
              "
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${step.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Title - moves up on hover */}
              <div className="absolute bottom-0 left-0 w-full p-6 transition-all duration-500 ease-in-out group-hover:-translate-y-32">
                <h3 className="text-white text-left font-semibold text-xl leading-tight">
                  {step.title}
                </h3>
              </div>

              {/* Details - slides up from bottom on hover */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent">
                <p className="text-gray-300 text-left text-md leading-relaxed pt-16">
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
