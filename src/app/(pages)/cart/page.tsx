"use client";
import Button from "@/app/components/Button";
import { getCartProducts } from "@/lib/utils/getProducts";
import { sortById } from "@/lib/utils/sortProducts";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DisplayProductsCart = dynamic(
  () => import("@/app/components/DisplayProductsCart")
);
const CartCalculation = dynamic(
  () => import("@/app/components/CartCalculation")
);

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [uniqueProducts, setUniqueProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const products = getCartProducts();
    setCartProducts(products);
    setUniqueProducts(accumulatedProdArr(products));
  }, []);

  const accumulatedProdArr = (cartProducts: Product[]) => {
    const newArr: Product[] = [];
    const cartIds = new Set();
    cartProducts.forEach((product) => {
      if (!cartIds.has(product.id)) {
        cartIds.add(product.id);
        newArr.push(product);
      }
    });
    return sortById(newArr);
  };

  const isCartEmpty = cartProducts.length === 0;

  return (
    <section className="bg-white min-w-fit w-full sm:w-5/6 h-5/6 rounded-3xl p-6 mt-6 shadow-lg">
      <section className="flex flex-col justify-between">
        <DisplayProductsCart
          cartProducts={cartProducts}
          uniqueProducts={uniqueProducts}
          setCartProducts={setCartProducts}
          setUniqueProducts={setUniqueProducts}
        />
        <section className="flex flex-col items-center">
          <CartCalculation cartProducts={cartProducts} />
          <fieldset className="flex mt-6">
            <Button
              onClick={() => router.push("/products")}
              className="bg-black p-3 rounded w-32 sm:w-40 m-2"
            >
              Back to shop
            </Button>
            <Button
              onClick={() => router.push("/cart/checkout")}
              disabled={isCartEmpty}
              className="bg-black p-3 rounded w-32 sm:w-40 m-2"
            >
              Checkout
            </Button>
          </fieldset>
        </section>
      </section>
    </section>
  );
};

export default CartPage;
