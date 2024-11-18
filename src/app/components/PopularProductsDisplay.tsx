import Button from "./Button";
import Image from "next/image";
import chevronRight from "../assets/chevron-right.svg";
import Link from "next/link";
import { formatEUR } from "@/lib/formatters";
import DiscountMark from "./DiscountMark";

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
      <article className="relative flex flex-wrap w-fit mb-3 mt-8">
        <h2 className="text-2xl text-black/60 font-bold drop-shadow-lg mr-4">
          Popular Products
        </h2>
        <div
          className={`w-fit flex flex-col group relative hover:animate-pulse pt-1`}
        >
          <Button
            href={"/products"}
            className="relative flex text-xl text-white/90 font-semibold pb-5 pt-0 drop-shadow-md hover:drop-shadow-lg"
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
      <ul className="grid md:grid-cols-3 gap-6 place-items-center">
        {randomProducts(products, 3).map((product) => (
          <li key={product.id} className="h-full">
            <div className="flex flex-col justify-between max-w-sm h-full bg-transparent hover:scale-105 duration-200">
              <article className="flex flex-col justify-between bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden h-full hover:shadow-2xl">
                <Link
                  className="relative w-full flex justify-center"
                  href={`/products/${product.title
                    .toLowerCase()
                    .split(" ")
                    .join("-")}-${product.id}`}
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={250}
                    height={250}
                    className="rounded-t-lg hover:scale-110 duration-200 cursor-pointer auto-dimensions"
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
                  />
                </Link>
                <section className="flex flex-col justify-between p-4 h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
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
                      <h4 className="bg-yellow-400 text-yellow-900 font-semibold px-2.5 py-0.5 rounded-full">{`Rating: ${product.rating} / 5`}</h4>
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
