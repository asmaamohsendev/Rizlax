import React from "react";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";

const Hero = () => {
  return (
    <section
      className="
        section-container
        h-[820px]  rounded-3xl py-10 md:p-16 
        bg-cover bg-center 
        text-white 
        relative
     
      "
      style={{
        backgroundImage: "url('./hero.jpg')", // ← ضع صورة الخلفية الخاصة بك
      }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10 rounded-3xl"></div>

      {/* Content */}
      <div className="relative w-[963px] z-10 flex flex-col gap-16 ">
        <div className="gap-2">
          <h1 className="text-7xl font-extrabold leading-normal">
            CONNECTING TOP TALENT <br />
            WITH AMBITIOUS <br />
            BUSINESSES
          </h1>

          <p className="text-2xl text-gray-300 mt-4">
            Rizlax Helps Businesses Find Expert Freelancers And Empowers <br />{" "}
            Professionals To Grow Their Careers — Faster, Smarter, And With
            Trust.
          </p>
        </div>
        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <PrimaryButton className="w-[303px]" size="lg">
            FIND FREELANCERS
          </PrimaryButton>

          <SecondaryButton className="w-[303px]" size="lg">
            BROWSE JOBS
          </SecondaryButton>
        </div>
      </div>

      {/* Stats Boxes */}
      <div className="absolute bottom-10 z-10 mt-12 flex flex-col md:flex-row w-[1160px] justify-between">
        <div className="bg-black/40 backdrop-blur-[30%] p-4 md:p-8 rounded-4xl flex items-center gap-3 md:gap-6 min-w-[200px] md:min-w-[280px]">
          <span className="text-3xl md:text-5xl text-green-400">✔</span>
          <div>
            <p className="text-2xl md:text-4xl font-bold">25K+</p>
            <p className="text-gray-300 text-sm md:text-lg">
              Projects Completed
            </p>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md p-4 md:p-8 rounded-2xl flex items-center gap-3 md:gap-6 min-w-[200px] md:min-w-[280px]">
          <span className="text-3xl md:text-5xl text-yellow-400">⭐</span>
          <div>
            <p className="text-2xl md:text-4xl font-bold">4.9/5</p>
            <p className="text-gray-300 text-sm md:text-lg">User Rating</p>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md p-4 md:p-8 rounded-2xl flex items-center gap-3 md:gap-6 min-w-[200px] md:min-w-[280px]">
          <span className="text-3xl md:text-5xl text-blue-400">🌍</span>
          <div>
            <p className="text-2xl md:text-4xl font-bold">120+</p>
            <p className="text-gray-300 text-sm md:text-lg">
              Countries Connected
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
