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
  const [sortOption, setSortOption] = useState<string>("");

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, [products]);

  const handleClick = (category: string) => {
    setActiveCategory((prevState) =>
      prevState.includes(category)
        ? prevState.filter((value) => value !== category)
        : [...prevState, category]
    );
  };

  const sortProducts = (products: Product[], option: string): Product[] => {
    switch (option) {
      case "price":
        return [...products].sort((a, b) => a.price - b.price);
      case "title":
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  };

  useEffect(() => {
    const filterProducts = (categories: string[]): Product[] =>
      products.filter((product) => categories.includes(product.category));

    let filteredProducts = filterProducts(activeCategory);

    if (sortOption) {
      filteredProducts = sortProducts(filteredProducts, sortOption);
    }

    setActiveFilter(filteredProducts);
  }, [activeCategory, sortOption, setActiveFilter]);

  return (
    <div className="flex flex-col items-end justify-center w-5/6 sm:w-full mb-4 p-0">
      <section
        className="grid grid-cols-2 sm:grid-cols-5 gap-x-2 sm:gap-0 lg:gap-12 mb-4 sm:mb-2 rounded-3xl sm:rounded-full p-0 sm:p-1 px-0 w-full h-44 sm:h-16"
        aria-label="Category filter"
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`relative flex flex-col items-center justify-center font-bold drop-shadow-md rounded-full py-3 pb-4 mx-2 lg:mx-4 mt-2 sm:mt-0 mb-0 cursor-pointer group ${
              activeCategory.includes(category)
                ? "border-2 border-white/70 bg-gradient-to-br from-slate-400 to-slate-800"
                : "hover:animate-pulse"
            }`}
            onClick={() => handleClick(category)}
            aria-pressed={activeCategory.includes(category)}
            aria-label={`Filter by category: ${firstLetterUC(category)}`}
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
            <span
              className={`absolute bottom-2 h-1 w-0 rounded-xl transition-all shadow-md duration-300 ease-out ${
                activeCategory.includes(category)
                  ? "w-1/3 left-1/3 bg-white/80 scale-105 bottom-2 sm:bottom-2.5"
                  : "group-hover:w-1/3 left-1/3 bg-white bottom-3 sm:bottom-3"
              }`}
            />
          </button>
        ))}
        <button
          onClick={() => setActiveCategory([])}
          className="relative col-span-2 sm:col-span-1 text-lg text-white font-bold drop-shadow-md rounded-lg py-3 pb-4 mx-2 mb-0 duration-200 active:scale-95 group hover:animate-pulse"
          aria-label="Clear all filters"
        >
          Clear filter
          <span
            className={`absolute left-1/3 bottom-1 sm:bottom-3 h-1 w-0 rounded-xl bg-white transition-all shadow-md duration-300 ease-out group-hover:w-1/3`}
          />
        </button>
      </section>

      <div className="flex items-center justify-center mb-2 sm:mr-4 last:text-lg text-black/80">
        <label htmlFor="sort" className="mr-2 text-white">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="rounded-xl px-4 py-2"
          aria-label="Sort products"
        >
          <option value="">Select</option>
          <option value="price">Price</option>
          <option value="title">Name</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryFilterProducts;
