import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center px-4 py-10">
      <div
        className="
          w-full max-w-6xl
          rounded-[40px]
          bg-gradient-to-br
          from-[#0f1a18] via-[#0b1412] to-[#1c2d22]
          text-white
          px-10 py-12
        "
      >
        {/* Logo & Description */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 text-3xl font-bold">
             <img src="./logo.svg" alt="logo" className="w-9xl h-9 " />
          </div>

          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
            Empowering freelancers and clients to connect, collaborate,
            and grow – all in one secure platform.
            <br />
            Start your freelance journey today – it’s free to join!
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-green-700/40 mb-10" />

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          {/* Quick Links */}
          <div>
            <h4 className="text-green-400 font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">How It Works</li>
              <li className="hover:text-white cursor-pointer">Browse Jobs</li>
              <li className="hover:text-white cursor-pointer">Find Freelancers</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-green-400 font-semibold mb-4">
              Legal & Policies
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-green-400 font-semibold mb-4">
              Follow us
            </h4>
            <div className="flex gap-4 text-lg">
              <FaInstagram className="hover:text-green-400 cursor-pointer" />
              <FaLinkedinIn className="hover:text-green-400 cursor-pointer" />
              <FaFacebookF className="hover:text-green-400 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-xs mt-12">
          © 2025 Rizlax. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
