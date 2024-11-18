"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import homeLogo from "../assets/house.svg";
import shopLogo from "../assets/basket-shopping.svg";
import aboutLogo from "../assets/book-open.svg";

const NavigationBarPhone = () => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Home", image: homeLogo.src },
    { href: "/products", label: "Products", image: shopLogo.src },
    { href: "/about", label: "About\u00A0us", image: aboutLogo.src },
  ];

  return (
    <nav
      className={`flex fixed bottom-0 sm:hidden flex-row justify-center items-center font-black text-lg h-fit w-full p-1 pb-2 z-20 text-white bg-gradient-to-b from-slate-500 to-slate-900`}
    >
      <section className={`flex flex-row justify-around items-center w-full`}>
        {navLinks.map((link, index) =>
          pathname === link.href ? (
            <div
              key={`${link.label}-${index}`}
              className={`w-full text-center flex justify-center pb-3 mx-4 group active:scale-95 duration-200`}
            >
              <Link
                href={link.href}
                onClick={() => {
                  if (window.innerWidth < 640) {
                    setMenuOpen(!menuOpen);
                  }
                }}
                className="relative flex flex-col justify-center items-center pb-2 pt-4 mx-2"
              >
                <Image
                  width={30}
                  height={30}
                  src={link.image}
                  alt={link.label}
                  className="nav-dimensions-phone"
                />
                {link.label}
                <span
                  className={`absolute left-1/4 bottom-0 h-1 w-1/2 bg-white rounded-xl duration-300 ease-out`}
                />
              </Link>
            </div>
          ) : (
            <div
              key={`${link.label}-${index}`}
              className={`w-full text-center flex flex-col justify-center pb-3 mx-4 group hover:animate-pulse rounded-full`}
            >
              <Link
                href={link.href}
                onClick={() => {
                  if (window.innerWidth < 640) {
                    setMenuOpen(!menuOpen);
                  }
                }}
                className="relative flex flex-col justify-center items-center pb-2 pt-4 mx-2"
              >
                <Image
                  width={30}
                  height={30}
                  src={link.image}
                  alt={link.label}
                  className="nav-dimensions-phone"
                />
                {link.label}
                <span
                  className={`absolute left-50 -bottom-0 h-1 w-0 bg-white rounded-xl transition-all duration-300 ease-out group-hover:w-1/2`}
                />
              </Link>
            </div>
          )
        )}
      </section>
    </nav>
  );
};

export default NavigationBarPhone;
