import React from "react";
import { ImLocation2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-[#254C38] text-white pt-10 pb-10 pl-10">
      <p id="title" className="text-3xl p-2">
        Bharath Lab
      </p>
      <p className="text-lg p-2">book your appointment today</p>
      <div className="flex justify-start items-center">
        <FaInstagram size={50} />
        <a
          className=""
          href="https://www.instagram.com/bharath_lab_pdtr"
          target="_blank"
        >
          @bharath_lab
        </a>
      </div>
    </footer>
  );
}

export default Footer;
