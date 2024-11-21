"use client";

import Button from "./Button";

const DiscountCard = () => {
  return (
    <article
      className="relative flex flex-col justify-between items-center bg-gradient-to-br from-gray-700/80 to-gray-900/80 text-white font-semibold rounded-lg p-3 sm:p-6 hover:scale-105 transition-transform duration-300 shadow-custom-white hover:shadow-custom-white-lg w-full h-full"
      style={{
        height: "clamp(330px, 40vw, 360px)",
      }}
      role="region"
      aria-labelledby="discountCardTitle"
    >
      <div className="absolute inset-0 bg-black/40 rounded-lg z-5" />

      <div className="text-center h-2/3 flex flex-col justify-between">
        <h2
          id="discountCardTitle"
          className="text-2xl lg:text-3xl font-extrabold tracking-wide mb-4 drop-shadow-md"
        >
          Limited-Time Offer!
        </h2>
        <p className="italic text-xl lg:text-2xl opacity-90 text-red-500/100 drop-shadow-md">
          Everything’s on discount!
        </p>
        <p className="italic text-base lg:text-xl opacity-90 drop-shadow-md">
          Don’t miss out on our exclusive offers
        </p>
      </div>
      <Button
        href="/products"
        className="bg-white text-gray-800/90 font-bold px-3 py-3 rounded-lg mt-6 hover:bg-gray-300 hover:text-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="View all available deals and discounts"
      >
        View Deals
      </Button>
    </article>
  );
};

export default DiscountCard;
