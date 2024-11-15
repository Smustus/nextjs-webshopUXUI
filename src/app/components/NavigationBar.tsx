"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Cart from "./Cart";
import Image from "next/image";
import bars from "../assets/bars.svg";

const NavigationBar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About\u00A0us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed flex flex-row justify-between sm:justify-around sm:items-center pt-4 pb-5 pr-6 pl-6 font-black text-xl h-fit w-full transition-colors duration-300 z-20 ${
        scrolled
          ? "text-white bg-gradient-to-b from-slate-600 to-slate-900"
          : "bg-transparent text-white"
      }`}
    >
      <section className="flex sm:justify-start lg:justify-center mb-1 pl-4 md:pl-12 lg:pl-0 h-fit lg:w-full">
        Brand
      </section>

      <section
        className={`sm:bg-transparent absolute sm:relative sm:flex sm:flex-row top-0 left-0 sm:top-auto sm:left-auto sm:justify-between items-center mb-0 mt-0 sm:mb-1 sm:mt-0 mx-auto h-screen sm:h-fit w-screen sm:w-full duration-200 ${
          menuOpen
            ? "bg-black/90 flex flex-col justify-start items-center opacity-100 pt-36"
            : "hidden"
        }`}
      >
        {navLinks.map((link, index) =>
          pathname === link.href ? (
            <div
              key={`${link.label}-${index}`}
              className={`w-fit sm:w-full text-center flex flex-col justify-center px-4 my-6 sm:my-0 group relative active:scale-95 duration-200 ${
                menuOpen ? "block" : "hidden sm:block"
              }`}
            >
              <Link
                href={link.href}
                onClick={() => {
                  if (window.innerWidth < 640) {
                    setMenuOpen(!menuOpen);
                  }
                }}
                className="relative pb-2 pt-6 sm:pt-3"
              >
                {link.label}
                <span
                  className={`absolute left-1/4 -bottom-0 h-1 w-1/2 bg-white rounded-xl duration-300 ease-out`}
                />
              </Link>
            </div>
          ) : (
            <div
              key={`${link.label}-${index}`}
              className={`w-fit sm:w-full text-center flex flex-col justify-center px-4 my-0 group relative hover:animate-pulse ${
                menuOpen ? "block" : "hidden sm:block"
              }`}
            >
              <Link
                href={link.href}
                onClick={() => {
                  if (window.innerWidth < 640) {
                    setMenuOpen(!menuOpen);
                  }
                }}
                className="relative pb-2 pt-6 sm:pt-3"
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0 h-1 w-0 bg-white rounded-xl transition-all duration-300 ease-out group-hover:w-full ${
                    pathname === link.href ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            </div>
          )
        )}
      </section>
      <Button
        className="block sm:hidden xs:mr-12"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Image src={bars} alt={"Menu"} className="nav-dimensions" />
      </Button>
      <Cart />
    </nav>
  );
};

export default NavigationBar;

/* "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Cart from "./Cart";

const NavigationBar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed flex justify-between items-center p-4 font-black text-xl w-full transition-colors duration-300 z-20 ${
        scrolled
          ? "text-white bg-gradient-to-b from-slate-600 to-slate-900"
          : "bg-transparent text-white"
      }`}
    >
      <div className="text-2xl w-full">Brand</div>
      <button
        className="md:hidden flex items-center justify-center p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="material-icons text-white z-20">
          {menuOpen ? "Close" : "Menu"}
        </span>
      </button>


      <div
        className={`md:relative w-screen h-screen md:w-auto md:h-auto md:flex items-center transition-transform duration-300 ease-in-out bg-slate-900 md:bg-transparent ${
          menuOpen ? "translate-x-0" : ""
        }`}
      >
        <section className="flex flex-col md:flex-row justify-center items-center w-full md:w-auto space-y-6 md:space-y-0 md:space-x-6 text-center mt-20 md:mt-0">
        
          {navLinks.map((link, index) =>
            pathname === link.href ? (
              <div
                key={`${link.label}-${index}`}
                className="flex flex-col justify-center mx-6 group relative active:scale-95 duration-200"
              >
                <Button href={link.href} className="pb-1">
                  {link.label}
                </Button>
                <span
                  className={`absolute left-1/4 -bottom-1 h-1 w-1/2 bg-white rounded-xl duration-300 ease-out`}
                />
              </div>
            ) : (
              <div
                key={`${link.label}-${index}`}
                className="flex flex-col justify-center mx-6 group relative hover:animate-pulse"
              >
                <Link href={link.href} className="pb-1">
                  {link.label}
                </Link>
                <span
                  className={`absolute left-0 -bottom-1 h-1 w-0 bg-white rounded-xl transition-all duration-300 ease-out group-hover:w-full ${
                    pathname === link.href ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )
          )}
        </section>
      </div>
      
      <Cart />
    </nav>
  );
};

export default NavigationBar; */
