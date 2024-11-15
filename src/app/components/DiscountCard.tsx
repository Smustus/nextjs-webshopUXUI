"use client";

import Button from "./Button";

const DiscountCard = () => {
  return (
    <article
      className="relative flex flex-col justify-between items-center bg-gradient-to-br from-gray-700/80 to-gray-900/80 text-white font-semibold rounded-lg p-3 sm:p-6 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl w-full h-full max-w-md mx-auto"
      style={{
        height: "clamp(330px, 40vw, 360px)",
      }}
    >
      <div className="absolute inset-0 bg-black/10 rounded-lg" />
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide mb-4">
          Limited-Time Offer!
        </h2>
        <p className="italic text-base md:text-xl opacity-90">
          Don’t miss out on our exclusive discounts.
        </p>
      </div>
      <Button
        href="/products"
        className="bg-white text-gray-700/90 font-bold px-3 py-3 rounded-lg mt-6 hover:bg-gray-300 hover:text-gray-800 hover:shadow-lg transition-all duration-200 active:scale-95"
      >
        View Deals
      </Button>
    </article>
  );
};

export default DiscountCard;
