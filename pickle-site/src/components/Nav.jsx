import React, { useState } from "react";
import logo from "../images/logonew.png";
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#f3e9d7] text-[#254C38] z-20 w-full top-0 start-0  ">
      <div className="max-w-7xl flex flex-wrap items-center justify-between p-1 md:p-2 mx-auto">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-15" alt="Flowbite Logo" />
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            pickle-fy
          </span>
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-[#254C38] bg-brand rounded md:bg-transparent md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-[#254C38] rounded hover:bg-neutral-tertiary hover:text-[#254C38] md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-[#254C38] rounded hover:bg-neutral-tertiary hover:text-[#254C38] md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-[#254C38] rounded hover:bg-neutral-tertiary hover:text-[#254C38] md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-[#254C38] rounded hover:bg-neutral-tertiary hover:text-[#254C38] md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
