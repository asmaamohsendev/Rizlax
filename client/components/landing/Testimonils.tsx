import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Freelance UI/UX Designer",
    text: "Rizlax Made It So Easy To Find Amazing Clients. The Process Is Smooth, Transparent, And Completely Stress-Free.",
  },
  {
    name: "David Roberts",
    role: "Startup Founder, New York",
    text: "I Hired A Developer Through Rizlax Within Hours. The Communication Tools And Secure Payment System Are Excellent.",
  },
  {
    name: "Amina Khaled",
    role: "Content Writer",
    text: "What I Love About Rizlax Is The Fairness – I Get Paid On Time, And The Escrow System Keeps Everything Professional.",
  },
  {
    name: "Sarah Mitchell",
    role: "Freelance UI/UX Designer",
    text: "Rizlax Made It So Easy To Find Amazing Clients. The Process Is Smooth, Transparent, And Completely Stress-Free.",
  },
  {
    name: "David Roberts",
    role: "Startup Founder, New York",
    text: "I Hired A Developer Through Rizlax Within Hours. The Communication Tools And Secure Payment System Are Excellent.",
  },
  {
    name: "Amina Khaled",
    role: "Content Writer",
    text: "What I Love About Rizlax Is The Fairness – I Get Paid On Time, And The Escrow System Keeps Everything Professional.",
  },
];

const Testimonials = () => {
  return (
    <section className="section-container bg-white py-20 ">
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
      <div className="flex flex-wrap justify-between gap-6  mx-auto">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-[#F2F9E6] w-[405px] h-[390px] rounded-3xl p-8 relative">
            <div className="flex items-center gap-6  mb-8">
              {/* Quote */}
              <Image src="/quoteIcon.svg" alt="Quote" width={64} height={64} />
              {/* Name */}
              <h3 className="font-bold text-2xl text-primary-teal mb-2">
                {item.name}
              </h3>
            </div>

            {/* Text */}
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {item.text}
            </p>

            <hr className="border-[#CDE5B2] mb-4" />

            {/* Role */}
            <div className="flex flex-col gap-6">
              <p className="text-md text-[#2E4A3D] font-medium">
                {item.role}
              </p>

              {/* Stars */}
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    <Image src="/starIcon.svg" alt="Star" width={32} height={32} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
