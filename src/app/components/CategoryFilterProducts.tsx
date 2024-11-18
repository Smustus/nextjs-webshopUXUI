"use client";
import { firstLetterUC } from "@/lib/formatters";
import { useEffect, useMemo, useState } from "react";
import Button from "./Button";

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
    <>
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4 mb-8 sm:mb-6">
        {categories.map((category) => (
          <article
            key={category}
            className={`relative flex flex-col items-center justify-center font-bold drop-shadow-md rounded-lg py-3 mx-2 mb-2 cursor-pointer group ${
              activeCategory.includes(category) ? "" : "hover:animate-pulse"
            }`}
            onClick={() => handleClick(category)}
          >
            <h3 className="text-lg">{firstLetterUC(category)}</h3>
            <input
              type="radio"
              name={category}
              className="hidden"
              readOnly
              checked={activeCategory.includes(category)}
            />
            <span
              className={`absolute bottom-1 sm:bottom-2 h-1 w-0 rounded-xl bg-white transition-all shadow-md duration-300 ease-out  ${
                activeCategory.includes(category)
                  ? "left-50 w-1/2"
                  : "group-hover:w-full left-0 "
              }`}
            />
          </article>
        ))}
        <Button
          onClick={() => setActiveCategory([])}
          className="col-span-2 sm:col-span-1 rounded-full"
        >
          Clear All
        </Button>
      </section>
    </>
  );
};

export default CategoryFilterProducts;
