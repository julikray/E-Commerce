import React from "react";
import logo from "../assets/image/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-[#f3f6fa] ">
      <div className="w-[85%] flex flex-wrap justify-between mx-auto border-b py-5 md-lg:pb-10  sm:pb-6 ">
        <img className="w-[190px] h-[70px] " src={logo} alt="logo" />

   
        <div className="mb-6 ">
          <div className="flex flex-col gap-3 ">
              <span className="text-sm font-medium">Contact Us:</span>
            <ul className="flex flex-col gap-2 text-slate-600 ">
              <li>Addresss : Hajipur , Vaishali </li>
              <li>Phone : +91 83457487450 </li>
              <li>Email : e-commerce@gmail.com </li>
            </ul>
          </div>
        </div>

        <div className="mb-6 flex  gap-4">
          <span className="text-sm font-medium">Follow Us:</span>
          <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition">
            <FaLinkedinIn />
          </a>
        </div>
      

  
      </div>

      <div className="w-[85%] mx-auto py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Your E-commerce. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
