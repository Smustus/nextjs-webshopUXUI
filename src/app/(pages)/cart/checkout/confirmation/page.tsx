"use client";
import Button from "@/app/components/Button";
import CartCalculation from "@/app/components/CartCalculation";

import { getCartProducts } from "@/lib/utils/getProducts";

import { formatEUR } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConfirmationPage = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [uniqueProducts, setUniqueProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const products = getCartProducts();
    setCartProducts(products);
    setUniqueProducts(accumulatedProdArr(products));
  }, []);

  const productAmount = (productID: number) => {
    return cartProducts.filter((product) => product.id === productID).length;
  };

  const accumulatedProdArr = (cartProducts: Product[]) => {
    const newArr: Product[] = [];
    const cartIds = new Set();
    cartProducts.forEach((product) => {
      if (!cartIds.has(product.id)) {
        cartIds.add(product.id);
        newArr.push(product);
      }
    });
    return newArr;
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white px-4 mt-6 rounded-3xl shadow-lg">
      <div className="p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Thank you for your purchase!
        </h1>
        <h4 className="text-gray-600 mt-4 mb-8 text-center">
          You will receive a confirmation email shortly with your order details.
        </h4>

        <h4 className="text-gray-600 mt-6 text-center"></h4>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Summary order:{" "}
            <p className="font-semibold inline">{"orderNumber"}</p>
          </h2>
          <div className="mt-4 space-y-4">
            {uniqueProducts &&
              uniqueProducts.map((product: Product, index: number) => (
                <article
                  key={`${product.id}-${index}`}
                  className={`grid grid-cols-[1fr,2fr,1fr] sm:grid-cols-[1fr,1fr,3fr,1fr] w-full items-center ml-2 xl:ml-0 mr-2 mb-1`}
                >
                  <section className="flex flex-col items-center justify-center text-stone-800 font-semibold text-center mr-auto">
                    <label
                      htmlFor={`quantity-${product.id}`}
                      className="text-sm"
                    >
                      Quantity:
                    </label>
                    <h4>{productAmount(product.id)}</h4>
                  </section>

                  <Link
                    className="hidden sm:flex justify-center items-center"
                    href={`/products/${product.title
                      .toLowerCase()
                      .split(" ")
                      .join("-")}-${product.id}`}
                  >
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={90}
                      height={90}
                      className="rounded-t-lg hover:scale-105 duration-200 cursor-pointer small-auto-dimensions"
                    />
                  </Link>

                  <div
                    className={`flex items-center ${
                      window.innerWidth < 640
                        ? "cursor-pointer hover:bg-slate-300/40 rounded-lg"
                        : ""
                    }`}
                  >
                    <section className="p-4 flex flex-col justify-center">
                      <h3 className="text-base font-bold text-gray-800">
                        {product.title}
                      </h3>

                      <h4
                        className={`mt-1 font-semibold text-sm ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stock > 0 ? `In Stock` : "Out of Stock"}
                      </h4>
                      <h4 className="text-sm font-semibold text-gray-500 mt-1">
                        {product.shippingInformation}
                      </h4>
                    </section>
                  </div>
                  <div className="flex items-start justify-end mx-2">
                    <section className="flex">
                      <span className="text-base font-bold text-red-500">
                        {formatEUR(
                          product.price *
                            (1 - product.discountPercentage / 100) *
                            productAmount(product.id)
                        )}
                      </span>
                    </section>
                  </div>
                </article>
              ))}
            <CartCalculation cartProducts={cartProducts} deliveryCost={499} />
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-0 md:gap-2">
          <Button className="" onClick={() => router.push("/")}>
            Back to Homepage
          </Button>
          <Button className="" onClick={() => router.push("/products")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationPage;
