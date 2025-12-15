const Navbar = () => {
  return (
    <nav className="top-6 w-full z-50 flex justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-bold text-xl">
         <img src="./logo.svg" alt="" />
        </div>

        {/* Center Menu */}
        <ul className="flex items-center gap-6 bg-[#0f1a18]/90 backdrop-blur-md rounded-full px-8 py-3 text-white">
          <li className="bg-lime-300 text-black px-4 py-1 rounded-full">
            Home
          </li>
          <li className="hover:text-lime-300 cursor-pointer">
            How It Works
          </li>
          <li className="hover:text-lime-300 cursor-pointer">
            Browse Jobs
          </li>
          <li className="hover:text-lime-300 cursor-pointer">
            Find Freelancers
          </li>
          <li className="hover:text-lime-300 cursor-pointer">
            Blog
          </li>
        </ul>

        {/* Login */}
        <button className="bg-[#0f1a18] text-lime-300 px-6 py-2 rounded-full">
          LOG IN
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
