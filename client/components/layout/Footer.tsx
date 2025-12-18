import Image from "next/image";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="section-container flex justify-center py-10">
      <div
        className="
          w-full
          rounded-[40px]
          bg-gradient-to-br
          from-[#0f1a18] via-[#0b1412] to-[#1c2d22]
          text-white
          px-10 py-12
        "
      >
        {/* Logo & Description */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-center items-center gap-2 text-3xl font-bold">
             <Image width={400} height={107} src="./logoWhite.svg" alt="logo"/>
          </div>

          <p className="text-white text-center mt-3  mx-auto text-sm">
            Empowering freelancers and clients to connect, collaborate,
            and grow – all in one secure platform.
            <br />
            Start your freelance journey today – it’s free to join!
          </p>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-primary-lime mb-10" />

        {/* Links */}
        <div className="flex justify-between px-20 gap-10 text-sm">
          {/* Quick Links */}
          <div>
            <h4 className="text-primary-lime text-xl font-semibold mb-4">
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
            <h4 className="text-primary-lime text-xl font-semibold mb-4">
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
            <h4 className="text-primary-lime text-xl font-semibold mb-4">
              Follow us
            </h4>
            <div className="flex items-center gap-6 text-lg">
              <Image src="./instaIcon.svg" alt="Instagram" width={24} height={24} />
              <Image src="./linkedInIcon.svg" alt="LinkedIn" width={24} height={24} />
              <Image src="./facebookIcon.svg" alt="Facebook" width={24} height={24} />
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
