/* "use client";
import Image from "next/image";
import shoppingCartSVG from "../assets/cart-shopping.svg";
import Button from "./Button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCartProducts } from "../utils/getProducts";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const parsedCart = getCartProducts();
    setCartProducts(parsedCart);

    const handleStorageChange = () => getCartProducts();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div
      className={`flex justify-end pr-12 lg:pr-0 lg:justify-center sm:w-full ${
        pathname !== "/cart" ? "hover:animate-pulse" : ""
      }`}
    >
      <Button href={"/cart"} className="h-16 w-12 sm:h-auto sm:w-auto">
        <section className="relative flex flex-col justify-center items-center group">
          <div className="absolute -right-3 -top-2 bg-gray-950 rounded-full flex justify-center items-center text-xs w-6 h-6">
            {cartProducts.length}
          </div>
          <Image
            src={shoppingCartSVG}
            height={35}
            width={35}
            alt={"Cart-Image"}
            className="cart-dimensions"
          />
          <h4 className="text-sm">Cart</h4>
          {pathname === "/cart" ? (
            <span
              className={`absolute left-1/4 -bottom-2 sm:-bottom-1 h-1 w-1/2 bg-white rounded-xl duration-300 ease-out`}
            />
          ) : (
            <span
              className={`absolute left-0 -bottom-2 sm:-bottom-1 h-1 w-0 bg-white rounded-xl transition-all duration-300 ease-out group-hover:w-full`}
            />
          )}
        </section>
      </Button>
    </div>
  );
};

export default Cart; */

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

  return (
    <div
      className={`absolute right-0 sm:relative flex justify-center lg:pr-0 w-fit sm:w-1/2 lg:w-full pr-6 pt-6 sm:pt-0 sm:pr-4 md:pr-12 ${
        pathname !== "/cart" ? "hover:animate-pulse" : ""
      }`}
    >
      <Button href="/cart" className="h-16 w-14 sm:h-auto md:w-auto">
        <section className="relative flex flex-col justify-center items-center group">
          <div className="absolute right-0 md:-right-3 -top-2 bg-gray-950 rounded-full flex justify-center items-center text-xs w-6 h-6">
            {cartProducts.length}
          </div>
          <Image src={shoppingCartSVG} alt="Cart" className="cart-dimensions" />
          <h4 className="text-sm">Cart</h4>
          {pathname === "/cart" ? (
            <span className="absolute left-1/4 -bottom-2 sm:-bottom-1 h-1 w-1/2 bg-white rounded-xl duration-300 ease-out" />
          ) : (
            <span className="absolute left-0 -bottom-2 sm:-bottom-1 h-1 w-0 bg-white rounded-xl transition-all duration-300 ease-out group-hover:w-full" />
          )}
        </section>
      </Button>
    </div>
  );
};

export default Cart;
