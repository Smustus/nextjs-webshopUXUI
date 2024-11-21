"use client";
import Image from "next/image";
import shoppingCartSVG from "../assets/cart-shopping.svg";
import Button from "./Button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCartProducts } from "../../lib/utils/getProducts";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const updateCartProducts = () => setCartProducts(getCartProducts());
    updateCartProducts();

    window.addEventListener("storage", updateCartProducts);
    return () => window.removeEventListener("storage", updateCartProducts);
  }, []);

  const itemCount = cartProducts.length;
  const cartLabel = `Go to cart, ${itemCount} item${
    itemCount === 1 ? "" : "s"
  }`;

  return (
    <div
      className={`sm:relative col-start-2 flex justify-center lg:pr-0 w-fit sm:pt-0 sm:pr-4 md:pr-12 ${
        pathname !== "/cart" ? "hover:animate-pulse" : ""
      }`}
    >
      <Button
        href="/cart"
        className="h-16 w-14 sm:h-auto md:w-auto"
        aria-label={cartLabel}
      >
        <section
          className="relative flex flex-col justify-center items-center group"
          aria-describedby="cart-description"
        >
          <div
            className="absolute right-0 md:-right-3 -top-2 bg-gray-950 rounded-full flex justify-center items-center text-xs w-6 h-6"
            aria-hidden="true"
          >
            {itemCount}
          </div>

          <Image
            src={shoppingCartSVG}
            alt="Shopping cart icon"
            className="cart-dimensions"
          />
          <h4 className="text-sm" id="cart-description">
            Cart
          </h4>

          {pathname === "/cart" ? (
            <span className="absolute left-1/4 -bottom-2 sm:-bottom-1 h-1 w-1/2 bg-white rounded-xl duration-300 ease-out" />
          ) : (
            <span className="absolute left-0 -bottom-2 sm:-bottom-1 h-1 w-0 bg-white rounded-xl transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full" />
          )}
        </section>
      </Button>
    </div>
  );
};

export default Cart;
