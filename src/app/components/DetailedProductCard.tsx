"use client";
import { firstLetterUC, formatEUR } from "@/lib/formatters";
import React, { useCallback, useState } from "react";
import Button from "./Button";
import ImageDisplay from "./ImageDisplay";
import RenderStarRating from "./RenderStarRating";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DetailedProductCard = (product: Product) => {
  const [message, setMessage] = useState<string>("");
  const pathname = usePathname();

  const handleAddToCart = useCallback(() => {
    const cartData = sessionStorage.getItem("cart");
    const cartProducts: Product[] = cartData ? JSON.parse(cartData) : [];
    const updatedCart = [...cartProducts, product];
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("storage"));

    setMessage(`${product.title} was added to the cart`);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [product]);

  const splitPathname = () => {
    const last = pathname.split("/").pop();
    if (!last) return undefined;

    return last.split("-").slice(0, -1).map(firstLetterUC).join(" ");
  };

  return (
    <>
      <aside className="text-black/60 font-semibold pb-2">
        {
          <>
            <Link
              href={"/"}
              className="relative hover:text-black/80 group hover:animate-pulse"
            >
              Slate Haven
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 w-0 rounded-xl transition-all shadow-md duration-300 ease-out bg-black/80 group-hover:w-full`}
              />
            </Link>
            <span> / </span>
            <Link
              href={"/products"}
              className="relative hover:text-black/80 group hover:animate-pulse"
            >
              Products
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 w-0 rounded-xl transition-all shadow-md duration-300 ease-out bg-black/80 group-hover:w-full`}
              />
            </Link>
            <span> / </span>
            <h4 className="inline text-black/80">{`${splitPathname()}`}</h4>
          </>
        }
      </aside>
      <section className="flex flex-col lg:flex-row gap-6 ">
        <ImageDisplay
          product={product}
          className="flex flex-col justify-center items-center lg:justify-start lg:items-start"
        />

        <div className="w-full lg:w-2/3 flex flex-col">
          <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-700">
            {product.title}
          </h1>

          <h4 className="mt-2 text-base lg:text-lg xl:text-xl text-gray-500">
            {product.brand}
          </h4>

          <h4 className="text-base lg:text-lg xl:text-xl mt-2 font-semibold text-gray-600">
            {product.description}
          </h4>

          <div className="flex flex-wrap items-center my-4 gap-2">
            <span className="text-2xl font-bold text-red-500">
              {formatEUR(
                product.price * (1 - product.discountPercentage / 100)
              )}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-base xl:text-lg text-gray-800 line-through">
                {formatEUR(product.price)}
              </span>
            )}
          </div>

          <h4
            className={`text-base xl:text-lg ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.availabilityStatus}
          </h4>

          <h4 className="text-base text-gray-500 mt-1">
            Weight: {product.weight} g
          </h4>
          <h4 className="text-base text-gray-500 mt-1">
            Dimensions: {product.dimensions.width} x {product.dimensions.height}{" "}
            x {product.dimensions.depth} cm
          </h4>
          <h4 className="text-red-900 font-bold text-base my-3">{message}</h4>
          <Button
            className="my-3 mx-0 w-full sm:w-60"
            disabled={product.stock <= 0}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            Add to Cart
          </Button>

          <h4 className="text-base xl:text-lg text-gray-500 mt-6">
            {product.shippingInformation}
          </h4>
          <h4 className="text-base xl:text-lg text-gray-500 mt-1">
            {product.warrantyInformation}
          </h4>
          <h4 className="text-base xl:text-lg text-gray-500 mt-1">
            {product.returnPolicy}
          </h4>
        </div>
      </section>

      <section className="mt-10 text-gray-700">
        <div className="flex w-fit">
          <h2 className="text-base lg:text-lg xl:text-2xl font-semibold mr-2">
            Customer Reviews
          </h2>
          <span className="flex items-center justify-center ml-auto pr-2.5 py-1 text-base rounded-full font-semibold drop-shadow-md h-fit">
            {RenderStarRating(product.rating)}
          </span>
        </div>
        <div className="space-y-4 mt-4">
          {product.reviews.map((review, index) => (
            <div key={index} className="border-t pt-4">
              <div className="flex">
                <h4 className="font-semibold mt-1 mr-2 ">
                  {review.reviewerName}
                </h4>
                <h4 className="flex items-center text-base font-semibold pr-2.5 rounded-full drop-shadow-md">
                  {RenderStarRating(review.rating)}
                </h4>
              </div>
              <p className="text-base xl:text-base text-gray-600 my-1">
                {new Date(review.date).toLocaleDateString()}
              </p>

              <h4 className="text-base xl:text-base text-gray-700 my-1">
                {review.comment}
              </h4>
            </div>
          ))}
          {product.reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default DetailedProductCard;
