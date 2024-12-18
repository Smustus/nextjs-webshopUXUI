"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Cart from "./Cart";
import Image from "next/image";
import bars from "../assets/bars.svg";
import BrandLogo from "../assets/SlateHaven.webp";
import user from "../assets/user.svg";

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
      className={`static sm:fixed flex flex-row justify-between sm:justify-around items-center font-black text-xl h-fit w-full transition-colors duration-300 z-20 ${
        scrolled
          ? "text-white sm:bg-gradient-to-b sm:from-slate-600 sm:to-slate-900"
          : "bg-transparent text-white"
      }`}
    >
      <section className="relative flex justify-center sm:justify-center h-full w-full sm:w-1/2 lg:w-full lg:pl-0 sm:pl-4 md:pl-12">
        <Image
          src={BrandLogo}
          alt={"SlateHaven brand logo"}
          priority={false}
          className="brandLogo"
        />
      </section>

      <section
        className={`sm:bg-transparent absolute sm:relative sm:flex sm:flex-row sm:justify-between items-center top-0 left-0 sm:top-auto sm:left-auto mb-0 mt-0 sm:mb-1 sm:mt-0 mx-auto h-screen sm:h-fit w-screen sm:w-full duration-200 ${
          menuOpen
            ? "bg-black/90 flex flex-col justify-start items-center opacity-100 pt-36"
            : "hidden"
        }`}
      >
        {navLinks.map((link, index) =>
          pathname === link.href ? (
            <div
              key={`${link.label}-${index}`}
              className={`w-fit sm:w-full text-center flex flex-col justify-center pb-3 px-4 my-0 group relative active:scale-95 duration-200 ${
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
                className="relative pb-2 pt-6 sm:pt-3 drop-shadow-md"
                role="link"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`absolute left-1/4 -bottom-0 h-1 w-1/2 bg-white rounded-xl duration-300 shadow-md ease-out`}
                />
              </Link>
            </div>
          ) : (
            <div
              key={`${link.label}-${index}`}
              className={`w-fit sm:w-full text-center flex flex-col justify-center pb-3 px-4 my-0 group relative hover:animate-pulse ${
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
                className="relative pb-2 pt-6 sm:pt-3 drop-shadow-md"
                role="link"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0 h-1 w-0 bg-white rounded-xl transition-all duration-300 ease-out shadow-md group-hover:w-full ${
                    pathname === link.href ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            </div>
          )
        )}
      </section>
      <Button
        className="hidden sm:hidden absolute left-4  justify-center items-center mr-7 w-14 h-14"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <Image src={bars} alt={"Menu"} className="nav-dimensions" />
      </Button>
      <section className="absolute top-0 right-0 sm:relative grid grid-cols-1 sm:grid-cols-[1fr,1fr] sm:grid-rows-1 gap-y-6 w-screen sm:w-1/2 lg:w-full p-6 pb-4 sm:pt-0 sm:pr-4 lg:pr-0 md:pl-0">
        <section
          className={`relative flex flex-col items-center col-start-1 group cursor-pointer lg:mx-auto xl:mx-auto w-fit ${
            pathname !== "/account" ? "hover:animate-pulse" : ""
          }`}
          role="link"
        >
          <Image src={user} alt={"User"} className="account-dimensions" />
          <h4 className="text-sm">Account</h4>
          {pathname === "/account" ? (
            <span className="absolute left-1/4 bottom-1 sm:-bottom-1 h-1 w-1/2 bg-white rounded-xl duration-300 ease-out" />
          ) : (
            <span className="absolute left-0 bottom-1 sm:-bottom-1 h-1 w-0 bg-white rounded-xl transition-all duration-300 ease-out group-hover:w-full" />
          )}
        </section>
        <Cart />
      </section>
    </nav>
  );
};

export default NavigationBar;
