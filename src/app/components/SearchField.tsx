"use client";
import Image from "next/image";
import magGlass from "../assets/magnifyingGlass2.svg";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ProductData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type ProductSearch = { id: number; title: string };

const SearchField = () => {
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState<ProductSearch[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [matchingElements, setMatchingElements] = useState<ProductSearch[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const getData = async () => {
    try {
      const productData = await fetch("https://dummyjson.com/products");
      const { products }: ProductData = await productData.json();
      const productNames = products.map(({ id, title }) => ({ id, title }));
      setProducts(productNames);
      return productNames;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getData();
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput, products]);

  useEffect(() => {
    if (searchInput.trim()) {
      setMatchingElements(filteredProducts);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
      setMatchingElements([]);
    }
  }, [searchInput, products, filteredProducts]);

  const initiateSearch = (product: ProductSearch) => {
    setDropdownVisible(false);
    if (searchInput.trim()) {
      const reformattedSearch = product.title
        .toLowerCase()
        .split(" ")
        .join("-");
      router.push(`/products/${reformattedSearch}-${product.id}`);
    }
  };

  return (
    <section className="mb-8 xl:mb-10">
      <article
        ref={searchRef}
        className="relative flex font-semibold text-gray-700 rounded-full shadow-lg min-h-12 duration-300"
        role="search"
      >
        <figure>
          <Image
            src={magGlass}
            alt="Search"
            className="bg-white rounded-l-full py-1 pl-2 magGlas-dimensions"
          />
        </figure>

        <label htmlFor="searchField" className="sr-only">
          Search for products
        </label>
        <input
          name="searchField"
          id="searchField"
          type="text"
          placeholder="Search products..."
          className="text-lg pl-2 rounded-r-full focus-visible:outline-none focus-visible:shadow-xl max-w-64 sm:max-w-none"
          onChange={(e) => setSearchInput(e.target.value)}
          aria-autocomplete="list"
          aria-controls="product-list"
          aria-activedescendant={
            dropdownVisible && matchingElements.length > 0 ? `product-0` : ""
          }
        />

        {dropdownVisible && (
          <ul
            id="product-list"
            role="listbox"
            className="absolute top-full right-0 w-full bg-white border border-gray-200 shadow-md rounded-lg max-h-48 overflow-y-auto z-40"
            aria-live="polite"
          >
            {matchingElements.length > 0 ? (
              matchingElements.map((product, index) => (
                <li
                  id={`product-${index}`}
                  key={product.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:bg-gray-200"
                  tabIndex={0}
                  onClick={() => initiateSearch(product)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      initiateSearch(product);
                    }
                  }}
                >
                  {product.title}
                </li>
              ))
            ) : (
              <li
                className="px-4 py-2 text-gray-500"
                aria-live="polite"
                role="alert"
              >
                No matches found
              </li>
            )}
          </ul>
        )}
      </article>
    </section>
  );
};

export default SearchField;
