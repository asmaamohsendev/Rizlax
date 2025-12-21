import React from "react";
import Image from "next/image";

const categoriesData = [
  {
    title: "Web & App Development",
    image: "./circle1.svg",
  },
  {
    title: "Digital Marketing",
    image: "./circle2.svg",
  },
  {
    title: "UI/UX Design",
    image: "./circle3.svg",
  },
  {
    title: "Video & Animation",
    image: "./circle4.svg",
  },
];

const Categories: React.FC = () => {
  return (
    <section className="section-container  text-center">
      <div className="pt-32 pb-36">
      <div className="flex flex-col gap-4">
        <h2 className="text-5xl l font-extrabold bg-gradient-to-r from-[#23343D] via-[#598671] to-[#23343D] bg-clip-text text-transparent">
          EXPLORE POPULAR CATEGORIES
        </h2>

        <p className="text-[18px] text-gray-600 mt-3 mx-auto">
          Find Professionals Across Every Industry — From Creative Design To
          Technical Development.
        </p>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-8">
        {categoriesData.map((cat, index) => (
          <div
            key={index}
            className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center bg-[#0D1514] shadow-xl"
            style={{
              boxShadow: "0 0 60px rgba(164, 255, 125, 0.25) inset",
            }}
          >
            {/* layer blur */}
            <div className="relative w-16 h-16 mb-4">
              {/* Blur effect behind the image */}
              <div className="absolute inset-0 -translate-y-2 scale-140 rounded-full bg-gradient-to-r via-[#598671]  opacity-100 blur-[15px]" />

              <Image
                src={cat.image}
                alt={cat.title}
                className="relative z-10 w-full h-full object-contain drop-shadow-lg"
                width={48}
                height={48}
              />
            </div>

            <p className="font-semibold text-white text-center px-4">
              {cat.title}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-12 text-2xl font-semibold text-gray-800 hover:text-green-600 transition">
        SEE ALL
      </button>
      </div>
    </section>
  );
};

export default Categories;
