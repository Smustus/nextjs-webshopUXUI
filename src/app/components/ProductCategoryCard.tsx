"use client";
import Button from "./Button";
import makeUpPic from "../assets/makeupPic.webp";
import furnitureUpPic from "../assets/furniturePic.webp";
import perfumePic from "../assets/perfumePic.webp";
import groceriesPic2 from "../assets/groceries3.webp";
import { useCallback, useEffect, useState } from "react";
import { firstLetterUC } from "@/lib/formatters";
import chevronRight from "../assets/chevron-right.svg";
import chevronLeft from "../assets/chevron-left.svg";
import Image from "next/image";

const ProductCategoryCard = () => {
  const [activeSlide, setActiveSlide] = useState<number>(2);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const slides = [
    {
      category: "beauty",
      image: makeUpPic.src,
      phrase: "Uncover Your True Radiance",
    },
    {
      category: "furniture",
      image: furnitureUpPic.src,
      phrase: "Elevate Your Space",
    },
    {
      category: "fragrances",
      image: perfumePic.src,
      phrase: "A Scent for Every Occasion",
    },
    {
      category: "groceries",
      image: groceriesPic2.src,
      phrase: "Freshness Straight to Your Door",
    },
  ];

  const handleChange = useCallback(
    (change: number) => {
      setActiveSlide((prevSlide) => {
        const newSlide = prevSlide + change;
        if (newSlide === -1) {
          return slides.length - 1;
        }
        if (newSlide === slides.length) {
          return 0;
        }
        return newSlide;
      });
    },
    [slides.length]
  );

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 639);
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <article
      className={`col-span-2 md:col-span-3 flex flex-col sm:flex-row justify-between items-center relative w-full min-w-80 min-h-40 bg-cover bg-no-repeat bg-center rounded-lg hover:scale-105 duration-200 shadow-custom-white hover:shadow-custom-white-lg`}
      style={{
        backgroundImage: `url(${slides[activeSlide].image})`,
        height: "clamp(300px, 40vw, 340px)",
      }}
    >
      <div className="absolute inset-0 bg-black/30 rounded-lg z-5" />

      {isLargeScreen ? (
        <>
          <button
            className="flex justify-center items-center relative z-10 font-bold text-lg drop-shadow-lg p-2 ml-4 rounded-full w-14 h-14 bg-black/60 hover:bg-black/90 duration-200 hover:scale-105"
            onClick={() => handleChange(-1)}
            aria-label="Previous"
          >
            <Image
              src={chevronLeft}
              alt={"Previous"}
              className="arrow-dimensions drop-shadow-md"
            />
          </button>
          <article className="flex flex-col justify-center items-center text-white rounded-full p-1">
            <Button
              href={"/products"}
              className="bg-black/60 relative z-10 font-bold text-xl text-center md:text-2xl shadow-md drop-shadow-lg py-2 px-6 rounded-full hover:bg-black/80 hover:scale-105 hover:shadow-lg active:scale-100 duration-200 w-fit italic tracking-wide backdrop-blur-sm"
            >
              {firstLetterUC(slides[activeSlide].category)}
            </Button>
            <p className="text-white text-center z-10 font-bold text-base sm:text-lg italic tracking-wide backdrop-blur-sm rounded-full">
              {slides[activeSlide].phrase}
            </p>
          </article>
          <button
            className="flex justify-center items-center relative z-10 font-bold text-lg drop-shadow-lg p-2 mr-4 rounded-full w-14 h-14 bg-black/60 hover:bg-black/90 duration-200 hover:scale-105"
            onClick={() => handleChange(1)}
            aria-label="Next"
          >
            <Image
              src={chevronRight}
              alt={"Next"}
              className="arrow-dimensions drop-shadow-md"
            />
          </button>
        </>
      ) : (
        <>
          <article className="flex flex-col justify-center items-center rounded-full p-1 my-auto">
            <Button
              href={"/products"}
              className="bg-black/60 relative z-10 font-bold text-xl text-center md:text-2xl shadow-md drop-shadow-lg py-2 px-6 rounded-full hover:bg-black/80 hover:scale-105 hover:shadow-lg active:scale-100 duration-200 w-fit italic tracking-wide backdrop-blur-sm"
            >
              {firstLetterUC(slides[activeSlide].category)}
            </Button>
            <p className="text-white text-center z-10 font-bold text-base sm:text-lg italic tracking-wide backdrop-blur-sm rounded-full">
              {slides[activeSlide].phrase}
            </p>
          </article>
          <div className="flex mb-4">
            <button
              className="flex justify-center items-center relative z-10 font-bold text-lg drop-shadow-lg p-2 mx-6 rounded-full w-14 h-14 bg-black/60 hover:bg-black/90 duration-200 hover:scale-105"
              onClick={() => handleChange(-1)}
              aria-label="Previous"
            >
              <Image
                src={chevronLeft}
                alt={"Previous"}
                className="arrow-dimensions drop-shadow-md"
              />
            </button>
            <button
              className="flex justify-center items-center relative z-10 font-bold text-lg drop-shadow-lg p-2 mx-6 rounded-full w-14 h-14 bg-black/60 hover:bg-black/90 duration-200 hover:scale-105"
              onClick={() => handleChange(1)}
              aria-label="Next"
            >
              <Image
                src={chevronRight}
                alt={"Next"}
                className="arrow-dimensions drop-shadow-md"
              />
            </button>
          </div>
        </>
      )}
    </article>
  );
};

export default ProductCategoryCard;
