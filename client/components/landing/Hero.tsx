import React from "react";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <section
      className="
        w-full rounded-3xl p-10 md:p-16 
        bg-cover bg-center 
        text-white 
        relative
     
      "
      style={{
        backgroundImage: "url('./hero.jpg')" // ← ضع صورة الخلفية الخاصة بك
      }}
    >
    
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10 rounded-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          CONNECTING TOP TALENT <br />
          WITH AMBITIOUS <br />
          BUSINESSES
        </h1>

        <p className="text-gray-300 mt-4 max-w-lg">
          Rizlax Helps Businesses Find Expert Freelancers And Empowers Professionals
          To Grow Their Careers — Faster, Smarter, And With Trust.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
           <button className="
            bg-[#2d3d3a] text-[#d9ffe3] 
            py-3 px-6 rounded-full 
            font-semibold hover:opacity-80 transition
          ">
            FIND FREELANCERS
          </button>

          <button className="
            border border-[#d9ff9e] text-[#d9ff9e] 
            py-3 px-6 rounded-full
            font-semibold hover:bg-[#d9ff9e]/10 transition
          ">
            FIND WORK
          </button>

        </div>
      </div>

      {/* Stats Boxes */}
      <div className="relative z-10 mt-12 flex flex-col md:flex-row gap-20 justify-center">

        <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 min-w-[180px]">
          <span className="text-green-400 text-2xl">✔</span>
          <div>
            <p className="text-xl font-bold">25K+</p>
            <p className="text-gray-300 text-sm">Projects Completed</p>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 min-w-[180px]">
          <span className="text-yellow-400 text-2xl">⭐</span>
          <div>
            <p className="text-xl font-bold">4.9/5</p>
            <p className="text-gray-300 text-sm">User Rating</p>
          </div>
        </div>
      

         <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 min-w-[180px]">
          <span className="text-blue-400 text-2xl">🌍</span>
          <div>
            <p className="text-xl font-bold">120+</p>
            <p className="text-gray-300 text-sm">Countries Connected</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
