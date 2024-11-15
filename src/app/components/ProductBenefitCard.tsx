"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import makeupPic2 from "../assets/makeupPic2.webp";
import groceries2 from "../assets/groceries.webp";

type Views = {
  category: string;
  title: string;
  benefits: string[];
  image?: string;
}[];

const ProductBenefitCard = () => {
  const [activeView, setActiveView] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  const views: Views = [
    {
      category: "beauty",
      title: "Beauty Products",
      benefits: [
        "Nourish your skin with all natural ingredients.",
        "No animal tested products",
      ],
      image: makeupPic2.src,
    },
    {
      category: "furniture",
      title: "Furniture",
      benefits: [
        "Elegant and durable designs for your home.",
        "Created from ethically produced materials",
      ],
    },
    {
      category: "fragrances",
      title: "Fragrances",
      benefits: [
        "Long-lasting and captivating scents.",
        "No animal tested products.",
      ],
    },
    {
      category: "groceries",
      title: "Groceries",
      benefits: ["Only organic, fresh non-GMO produce delivered to your door."],
      image: groceries2.src,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setActiveView((prev) => (prev + 1) % views.length);
        setIsFading(false);
      }, 100);
    }, 10000);

    return () => clearInterval(interval);
  }, [views.length]);

  return (
    <Link
      href={"/about"}
      className="row-start-3 md:row-start-auto col-span-2 md:col-span-1 md:block w-full h-full fade"
    >
      <article
        className={`relative flex flex-col items-center justify-between text-center bg-black/20 text-white/90 font-semibold rounded-lg sm:p-6 w-full h-full bg-cover bg-no-repeat bg-center hover:scale-105 duration-200 shadow-md hover:shadow-xl md:text-base lg:text-lg tracking-wide p-4 ${
          isFading ? "fade-out" : "fade"
        }`}
        style={{
          backgroundImage: `url(${views[activeView].image})`,
          height: "clamp(320px, 40vw, 360px)",
        }}
      >
        <div className="absolute inset-0 bg-black/70 rounded-lg" />
        <h3 className="text-xl sm:text-2xl font-bold mb-2 italic z-10">
          {views[activeView].title}
        </h3>
        <aside className="flex flex-col italic z-10">
          {views[activeView].benefits.map((benefit, index) => (
            <h4 key={`${index}-${benefit}`} className="mb-2">
              {benefit}
            </h4>
          ))}
        </aside>
        <p className="italic z-10">Click to learn more about us</p>
      </article>
    </Link>
  );
};

export default ProductBenefitCard;
