const BlogCards = () => {
  const cards = [1, 2, 3, 4];

  return (
<>
    <div>
            <h1>From the Rizlax Blog</h1>
            <p>Explore tips, stories, and insights to help freelancers and clients succeed.</p>
        </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       
      {cards.map((item) => (
        <div
          key={item}
          className="flex items-start gap-6 bg-[#0B1220] rounded-2xl p-6"
        >
          {/* Image */}
          <img
            src="./hero.jpg"
            alt="Freelancer"
            className="w-28 h-36 object-cover rounded-xl"
          />

          {/* Content */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-400 text-sm mb-1">
                Sarah Johnson • Aug 12, 2025
              </p>

              <h3 className="text-green-400 text-lg font-semibold leading-snug mb-3">
                How To Build A Standout <br />Freelancer Profile
              </h3>

              <p className="text-gray-400 text-sm">
                Learn how to create a profile that attracts top <br /> clients — from
                crafting your bio to showcasing <br /> your best projects.
              </p>
            </div>

            <button className="mt-5 w-fit border border-green-400 text-green-400 px-6 py-2 rounded-full text-sm hover:bg-green-400 hover:text-black transition">
              READ MORE
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default BlogCards;
