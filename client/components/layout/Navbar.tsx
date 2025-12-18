import Image from "next/image";
import PrimaryButton from "../PrimaryButton";

const Navbar = () => {
  return (
    <nav className="section-container top-6 w-full z-50 flex justify-center">
      {/* Navbar Container */}
      <div className="w-full flex items-center justify-between  py-4 ">
        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Image src="./logo.svg" alt="" width={220} height={60} />
        </div>

        {/* Center Menu */}
        <ul className="w-fit h-[70px] bg-[#0D181D] flex items-center gap-16 backdrop-blur-md rounded-full px-6 py-4 text-white">
          <li className="bg-[#D1EE9C] text-[#23343D] from-[#23343D] via-[#598671] to-[#23343D] px-4 py-1 rounded-full">
            Home
          </li>
          <li className="hover:text-lime-300 cursor-pointer">How It Works</li>
          <li className="hover:text-lime-300 cursor-pointer">Browse Jobs</li>
          <li className="hover:text-lime-300 cursor-pointer">
            Find Freelancers
          </li>
          <li className="hover:text-lime-300 cursor-pointer">Blog</li>
        </ul>

        {/* Login */}
        <PrimaryButton className="w-[244px]" size="lg">Login</PrimaryButton>
      </div>
    </nav>
  );
};

export default Navbar;
