/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { firstLetterUC } from "@/lib/formatters";
import { useEffect, useMemo, useState } from "react";

const CategoryFilterProducts = ({
  products,
  setActiveFilter,
}: {
  products: Product[];
  setActiveFilter: React.Dispatch<React.SetStateAction<Product[]>>;
}) => {
  const [activeCategory, setActiveCategory] = useState<string[]>([]);
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products.map((product) => {
          return product.category;
        })
      )
    );
  }, [products]);

  const handleClick = (category: string) => {
    setActiveCategory((prevState) => {
      return activeCategory.includes(category)
        ? prevState.filter((value) => value !== category)
        : [...prevState, category];
    });
  };

  useEffect(() => {
    const filterProducts = (categories: string[]): Product[] =>
      products.filter((product) => categories.includes(product.category));
    const productsFiltered = filterProducts(activeCategory);
    setActiveFilter(productsFiltered);
  }, [activeCategory, setActiveFilter]);

  return (
    <div className="flex flex-col items-center justify-center w-5/6 sm:w-full">
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-x-2 sm:gap-4 mb-8 sm:mb-6 rounded-3xl sm:rounded-full p-0 sm:p-1 px-0 bg-gradient-to-b from-slate-400 to-slate-900/70 w-full shadow-custom-white-sm">
        {categories.map((category) => (
          <article
            key={category}
            className={`relative flex flex-col items-center justify-center font-bold drop-shadow-md sm:rounded-lg py-3 pb-4 mx-2 mt-2 sm:mt-0 mb-0 cursor-pointer group ${
              activeCategory.includes(category)
                ? "border-2 border-white/80 sm:border-0 bg-slate-400 sm:bg-transparent rounded-2xl"
                : "hover:animate-pulse"
            }`}
            onClick={() => handleClick(category)}
          >
            <h3
              className={`text-lg duration-300 ${
                activeCategory.includes(category)
                  ? "text-white/90 scale-105"
                  : "text-white"
              }`}
            >
              {firstLetterUC(category)}
            </h3>
            <input
              type="radio"
              name={category}
              className="hidden"
              readOnly
              checked={activeCategory.includes(category)}
            />
            <span
              className={`absolute bottom-2 h-1 w-0 rounded-xl transition-all shadow-md duration-300 ease-out ${
                activeCategory.includes(category)
                  ? "w-1/3 left-1/3 bg-white/80 scale-105 bottom-2 sm:bottom-2.5"
                  : "group-hover:w-1/3 left-1/3 bg-white bottom-3 sm:bottom-3"
              }`}
            />
          </article>
        ))}
        <button
          onClick={() => setActiveCategory([])}
          className="relative col-span-2 sm:col-span-1 text-lg text-white font-bold drop-shadow-md rounded-lg py-3 pb-4 mx-2 mb-0 duration-200 active:scale-95 group hover:animate-pulse"
        >
          Clear filter
          <span
            className={`absolute left-1/3 bottom-1 sm:bottom-3 h-1 w-0 rounded-xl bg-white transition-all shadow-md duration-300 ease-out group-hover:w-1/3`}
          />
        </button>
      </section>
    </div>
  );
};

export default CategoryFilterProducts;
