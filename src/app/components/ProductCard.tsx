"use client";
import { formatEUR } from "@/lib/formatters";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import DiscountMark from "./DiscountMark";
import RenderStarRating from "./RenderStarRating";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [message, setMessage] = useState<string>("");
  const discountPrice = useMemo(
    () => product.price * (1 - product.discountPercentage / 100),
    [product.price, product.discountPercentage]
  );

  const discountPercent = useMemo(
    () => Number(((1 - discountPrice / product.price) * 100).toFixed(1)),
    [product.price, discountPrice]
  );

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

  return (
    <div className="flex flex-col justify-between max-w-sm h-full bg-transparent hover:scale-105 duration-200">
      <article className="relative bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden h-full hover:shadow-2xl">
        <Link
          className="relative w-full h-60 flex justify-center"
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
          <DiscountMark discountPercent={discountPercent} />
        </Link>
        <section className="p-4 pb-8 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.title}
          </h3>
          <h4 className="text-sm text-gray-600 mt-1">{product.description}</h4>
          <div className="flex items-start justify-between mt-4">
            <section className="flex flex-col">
              <span className="text-xl font-bold text-red-500 ">
                {formatEUR(discountPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-800 line-through">
                  {formatEUR(product.price)}
                </span>
              )}
            </section>

            <section className="flex flex-col text-sm">
              <h4 className="text-end font-semibold pl-2.5 py-0.5 rounded-full">
                {RenderStarRating(product.rating)}
              </h4>
              <h4 className="text-gray-600 font-bold text-end m-1">{`${product.reviews.length} reviews`}</h4>
            </section>
          </div>
          <h4
            className={`mt-2 font-semibold text-sm ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `In Stock` : "Out of Stock"}
          </h4>
          <h4 className="text-sm font-semibold text-gray-500 mt-1">
            {product.shippingInformation}
          </h4>
          <h4 className="text-red-900 font-bold text-sm text-center my-2">
            {message}
          </h4>
        </section>
      </article>
      <Button
        className="m-auto mt-4 -translate-y-10 rounded-full duration-200 w-56 md:w-44 xl:w-56"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          handleAddToCart();
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
