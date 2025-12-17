const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Freelance UI/UX Designer",
    text:
      "Rizlax Made It So Easy To Find Amazing Clients. The Process Is Smooth, Transparent, And Completely Stress-Free.",
  },
  {
    name: "David Roberts",
    role: "Startup Founder, New York",
    text:
      "I Hired A Developer Through Rizlax Within Hours. The Communication Tools And Secure Payment System Are Excellent.",
  },
  {
    name: "Amina Khaled",
    role: "Content Writer",
    text:
      "What I Love About Rizlax Is The Fairness – I Get Paid On Time, And The Escrow System Keeps Everything Professional.",
  },
  {
    name: "Sarah Mitchell",
    role: "Freelance UI/UX Designer",
    text:
      "Rizlax Made It So Easy To Find Amazing Clients. The Process Is Smooth, Transparent, And Completely Stress-Free.",
  },
  {
    name: "David Roberts",
    role: "Startup Founder, New York",
    text:
      "I Hired A Developer Through Rizlax Within Hours. The Communication Tools And Secure Payment System Are Excellent.",
  },
  {
    name: "Amina Khaled",
    role: "Content Writer",
    text:
      "What I Love About Rizlax Is The Fairness – I Get Paid On Time, And The Escrow System Keeps Everything Professional.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-20 px-6">
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2E4A3D]">
          WHAT OUR USERS SAY ABOUT RIZLAX
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Find Professionals Across Every Industry — From Creative Design To
          Technical Development.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-[#F2F9E6] rounded-3xl p-8 relative"
          >
            {/* Quote */}
            <div className="text-5xl text-[#2E4A3D] font-bold mb-4">“</div>

            {/* Name */}
            <h3 className="font-semibold text-[#2E4A3D] mb-2">
              {item.name}
            </h3>

            {/* Text */}
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {item.text}
            </p>

            <hr className="border-[#CDE5B2] mb-4" />

            {/* Role */}
            <p className="text-sm text-[#2E4A3D] font-medium mb-3">
              {item.role}
            </p>

            {/* Stars */}
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
