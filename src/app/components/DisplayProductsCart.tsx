"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatEUR } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { sortById } from "../../lib/utils/sortProducts";
import { useRouter } from "next/navigation";

type DisplayProductsCartProps = {
  cartProducts: Product[];
  uniqueProducts: Product[];
  setCartProducts: Dispatch<SetStateAction<Product[]>>;
  setUniqueProducts: Dispatch<SetStateAction<Product[]>>;
};

const DisplayProductsCart = ({
  cartProducts,
  uniqueProducts,
  setCartProducts,
  setUniqueProducts,
}: DisplayProductsCartProps) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 639);
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const productAmount = (productID: number) => {
    return cartProducts.filter((product) => product.id === productID).length;
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCartProducts = cartProducts.filter(
      (product) => product.id !== productId
    );

    const productToAdd = cartProducts.find(
      (product) => product.id === productId
    );
    if (productToAdd) {
      for (let i = 0; i < newQuantity; i++) {
        updatedCartProducts.push(productToAdd);
      }
    }
    const sortedProducts = sortById(updatedCartProducts);

    sessionStorage.setItem("cart", JSON.stringify(sortedProducts));
    setCartProducts(sortedProducts);
    window.dispatchEvent(new Event("storage"));

    accumulatedProdArr(sortedProducts);
  };

  const handleRemoveItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    e.stopPropagation();
    const updatedCartProducts = cartProducts.filter((product: Product) => {
      return product.id !== productId;
    });

    sessionStorage.setItem("cart", JSON.stringify(updatedCartProducts));
    setCartProducts(updatedCartProducts);
    window.dispatchEvent(new Event("storage"));

    accumulatedProdArr(updatedCartProducts);
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
    setUniqueProducts(newArr);
  };

  return (
    <section className="flex flex-col items-center">
      <div
        className="text-stone-900/80 font-black text-xl mb-2"
        role="heading"
        aria-level={2}
      >
        Your cart
      </div>
      {uniqueProducts.length > 0 ? (
        uniqueProducts.map((product: Product, index: number) => (
          <article
            key={`${product.id}-${index}`}
            className="grid grid-cols-[1fr,2fr,1fr] sm:grid-cols-[1fr,1fr,3fr,1fr,1fr] w-full items-center ml-2 xl:ml-0 mr-2 mb-1"
            role="region"
            aria-labelledby={`product-${product.id}`}
          >
            <section className="flex flex-col items-center justify-center text-stone-800 font-semibold text-center mr-4">
              <label
                htmlFor={`quantity-${product.id}`}
                className="text-sm"
                id={`label-quantity-${product.id}`}
              >
                Quantity:
              </label>
              <input
                id={`quantity-${product.id}`}
                type="number"
                min={1}
                value={productAmount(product.id)}
                onChange={(e) =>
                  handleQuantityChange(
                    product.id,
                    parseInt(e.target.value, 10) || 1
                  )
                }
                className="w-16 text-center border rounded-md mt-1"
                aria-labelledby={`label-quantity-${product.id}`}
                aria-describedby={`quantity-${product.id}-description`}
              />
              <p id={`quantity-${product.id}-description`} className="sr-only">
                Enter the number of items you want to purchase.
              </p>
            </section>

            <Link
              className="hidden sm:flex justify-center items-center"
              href={`/products/${product.title
                .toLowerCase()
                .split(" ")
                .join("-")}-${product.id}`}
              aria-label={`View product: ${product.title}`}
            >
              <Image
                src={product.thumbnail}
                alt={`Image of ${product.title}`}
                width={90}
                height={90}
                className="rounded-t-lg hover:scale-105 duration-200 cursor-pointer small-auto-dimensions"
              />
            </Link>

            {isLargeScreen ? (
              <div
                className="flex items-center cursor-pointer hover:bg-slate-300/40 rounded-lg"
                onClick={() => {
                  if (!isLargeScreen) {
                    router.push(
                      `/products/${product.title
                        .toLowerCase()
                        .split(" ")
                        .join("-")}-${product.id}`
                    );
                  }
                }}
              >
                <section className="p-4 flex flex-col justify-center">
                  <h3
                    className="text-base font-bold text-gray-800"
                    id={`product-${product.id}`}
                  >
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
            ) : (
              <Link
                className="flex items-center cursor-pointer hover:bg-slate-300/40 rounded-lg"
                href={`/products/${product.title
                  .toLowerCase()
                  .split(" ")
                  .join("-")}-${product.id}`}
                aria-label={`View product: ${product.title}`}
              >
                <section className="p-4 flex flex-col justify-center">
                  <h3
                    className="text-base font-bold text-gray-800"
                    id={`product-${product.id}`}
                  >
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
              </Link>
            )}

            <div className="flex items-start justify-between mx-2">
              <section className="flex flex-col">
                <span className="text-base font-bold text-red-500">
                  {formatEUR(
                    product.price *
                      (1 - product.discountPercentage / 100) *
                      productAmount(product.id)
                  )}
                </span>
              </section>
            </div>
            <Button
              className="col-start-2 sm:col-auto text-sm h-12 rounded-full m-0"
              onClick={(e) => handleRemoveItem(e, product.id)}
              aria-label={`Remove ${product.title} from cart`}
            >
              Remove
            </Button>
          </article>
        ))
      ) : (
        <h3 className="text-black/70 mb-10 my-6 text-lg" role="status">
          Your cart is currently empty
        </h3>
      )}
    </section>
  );
};

export default DisplayProductsCart;
