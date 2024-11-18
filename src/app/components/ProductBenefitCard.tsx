"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import makeupPic2 from "../assets/makeupPic2.webp";
import groceries2 from "../assets/groceries.webp";
import furniture2 from "../assets/furniture2.jpg";
import perfume2 from "../assets/perfume2.jpg";

type View = {
  category: string;
  title: string;
  benefits: string[];
  image?: string;
};

const ProductBenefitCard = () => {
  const [state, setState] = useState({ activeView: 0, isFading: false });

  const views: View[] = useMemo(
    () => [
      {
        category: "beauty",
        title: "Beauty Products",
        benefits: [
          "Nourish your skin with all natural ingredients",
          "No animal tested products",
        ],
        image: makeupPic2.src,
      },
      {
        category: "furniture",
        title: "Furniture",
        benefits: [
          "Elegant and durable designs for your home",
          "Crafted from ethically produced materials",
        ],
        image: furniture2.src,
      },
      {
        category: "fragrances",
        title: "Fragrances",
        benefits: [
          "Long-lasting and captivating scents",
          "No animal tested products",
        ],
        image: perfume2.src,
      },
      {
        category: "groceries",
        title: "Groceries",
        benefits: [
          "Only organic, fresh non-GMO produce delivered to your door",
        ],
        image: groceries2.src,
      },
    ],
    []
  );

  const updateView = useCallback(() => {
    setState((prev) => ({ ...prev, isFading: true }));
    setTimeout(() => {
      setState((prev) => ({
        activeView: (prev.activeView + 1) % views.length,
        isFading: false,
      }));
    }, 100);
  }, [views.length]);

  useEffect(() => {
    const interval = setInterval(updateView, 10000);
    return () => clearInterval(interval);
  }, [updateView]);

  const { activeView, isFading } = state;

  return (
    <Link
      href={"/about"}
      className="row-start-3 md:row-start-auto col-span-2 md:col-span-1 md:block w-full h-full fade"
    >
      <article
        className={`relative flex flex-col items-center justify-between text-center bg-black/20 text-white/90 rounded-lg sm:p-6 w-full h-full bg-cover bg-no-repeat bg-center hover:scale-105 duration-200 shadow-md hover:shadow-xl md:text-base lg:text-lg tracking-wide p-4 ${
          isFading ? "fade-out" : "fade"
        }`}
        style={{
          backgroundImage: `url(${views[activeView].image})`,
          height: "clamp(330px, 40vw, 360px)",
        }}
      >
        <div className="absolute inset-0 bg-black/70 rounded-lg" />
        <h3 className="text-2xl lg:text-3xl font-black mb-2 italic z-10 drop-shadow-md">
          {views[activeView].title}
        </h3>
        <aside className="flex flex-col italic z-10">
          {views[activeView].benefits.map((benefit, index) => (
            <h4
              key={`${index}-${benefit}`}
              className="text-base lg:text-xl mb-2 drop-shadow-md font-bold "
            >
              {benefit}
            </h4>
          ))}
        </aside>
        <p className="text-lg italic z-10 drop-shadow-md font-bold">
          Click to learn more about us
        </p>
      </article>
    </Link>
  );
};

export default ProductBenefitCard;
