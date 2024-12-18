import Button from "./Button";
import Image from "next/image";
import chevronRight from "../assets/chevron-right.svg";
import Link from "next/link";
import { formatEUR } from "@/lib/formatters";
import DiscountMark from "./DiscountMark";
import RenderStarRating from "./RenderStarRating";

type ProductData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const PopularProductsDisplay = async () => {
  const productData = await fetch("https://dummyjson.com/products");
  const { products }: ProductData = await productData.json();

  const randomProducts = (products: Product[], amount: number) => {
    const randomIndices: number[] = [];
    do {
      const randomNum = Math.ceil(Math.random() * products.length);
      if (!randomIndices.includes(randomNum)) randomIndices.push(randomNum);
    } while (randomIndices.length !== amount);

    return products.filter((product) => randomIndices.includes(product.id));
  };

  return (
    <>
      <article className="relative flex flex-wrap w-fit mb-2 mt-8">
        <h2
          className="text-2xl text-black/60 font-bold drop-shadow-lg mr-4"
          id="popular-products-heading"
        >
          Popular Products
        </h2>
        <div
          className="w-fit flex flex-col group relative pt-1"
          aria-labelledby="popular-products-heading"
        >
          <Button
            href={"/products"}
            className="relative flex text-xl text-white/90 font-semibold pb-5 pt-0 drop-shadow-md hover:drop-shadow-lg"
            aria-label="Show all popular products"
          >
            Show all
            <Image
              src={chevronRight}
              alt={"Products"}
              className="small-arrow-dimensions ml-2"
            />
            <span
              className={`absolute bottom-4 h-1 w-0 bg-white rounded-xl transition-all duration-300 ease-out group-hover:w-full`}
            />
          </Button>
        </div>
      </article>
      <ul
        className="grid md:grid-cols-3 gap-6 place-items-center"
        role="list"
        aria-labelledby="popular-products-heading"
      >
        {randomProducts(products, 3).map((product) => (
          <li key={product.id} className="h-full">
            <div className="flex flex-col justify-between max-w-sm h-full bg-transparent hover:scale-105 duration-200 overflow-hidden">
              <article
                className="flex flex-col justify-between bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden h-full hover:shadow-2xl"
                aria-labelledby={`product-title-${product.id}`}
              >
                <Link
                  className="relative w-full flex justify-center"
                  href={`/products/${product.title
                    .toLowerCase()
                    .split(" ")
                    .join("-")}-${product.id}`}
                  aria-label={`View details about ${product.title}`}
                >
                  <Image
                    src={product.thumbnail}
                    alt={`Image of ${product.title}`}
                    width={250}
                    height={250}
                    className="rounded-t-lg hover:scale-110 duration-200 cursor-pointer popular-auto-dimensions"
                  />
                  <DiscountMark
                    discountPercent={Number(
                      (
                        (1 -
                          (product.price *
                            (1 - product.discountPercentage / 100)) /
                            product.price) *
                        100
                      ).toFixed(1)
                    )}
                    position="top-2 left-0"
                  />
                </Link>
                <section className="flex flex-col justify-between p-4 h-full">
                  <div>
                    <h3
                      id={`product-title-${product.id}`}
                      className="text-lg font-semibold text-gray-800"
                    >
                      {product.title}
                    </h3>
                    <h4 className="text-sm text-gray-600 my-2">
                      {product.description}
                    </h4>
                  </div>
                  <div className="flex flex-wrap justify-between pt-auto">
                    <section className="flex flex-col">
                      <span className="text-xl font-bold text-red-500 ">
                        {formatEUR(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="text-sm text-gray-800 line-through">
                          {formatEUR(product.price)}
                        </span>
                      )}
                    </section>

                    <section className="flex flex-col text-sm">
                      <h4
                        className="font-semibold pl-2.5 py-0.5 rounded-full"
                        aria-label={`Product rating: ${product.rating} stars`}
                      >
                        {RenderStarRating(product.rating)}
                      </h4>
                      <h4 className="text-gray-600 font-bold text-end m-1">{`${product.reviews.length} reviews`}</h4>
                    </section>
                  </div>
                </section>
              </article>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PopularProductsDisplay;
