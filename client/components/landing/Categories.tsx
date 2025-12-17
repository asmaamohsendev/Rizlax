import React from "react";

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
    <section className="w-full py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2A4E45]">
        EXPLORE <span className="text-green-500">POPULAR CATEGORIES</span>
      </h2>

      <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
        Find Professionals Across Every Industry — From Creative Design To Technical Development.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-10">
        {categoriesData.map((cat, index) => (
          <div
            key={index}
            className="w-56 h-56 rounded-full flex flex-col items-center justify-center bg-[#0D1514] shadow-xl"
            style={{
              boxShadow: "0 0 60px rgba(164, 255, 125, 0.25) inset",
            }}
          >
            <div className="w-16 h-16 mb-4">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-contain"
              />
            </div>

            <p className="font-semibold text-white text-center px-4">
              {cat.title}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-12 text-lg font-semibold text-gray-800 hover:text-green-600 transition">
        SEE ALL
      </button>
    </section>
  );
};

export default Categories;
