"use client";
import Button from "@/app/components/Button";
import CartCalculation from "@/app/components/CartCalculation";
import DisplayProductsCart from "@/app/components/DisplayProductsCart";
import { getCartProducts } from "@/app/utils/getProducts";
import { sortById } from "@/app/utils/sortProducts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [uniqueProducts, setUniqueProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCartProducts(getCartProducts());
    accumulatedProdArr(getCartProducts());
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
    const sortedProducts = sortById(newArr);
    setUniqueProducts(sortedProducts);
  };

  return (
    <section className="bg-white w-full sm:w-5/6 h-5/6 rounded-3xl p-6 shadow-lg">
      <section className="flex flex-col justify-between">
        <DisplayProductsCart
          cartProducts={cartProducts}
          uniqueProducts={uniqueProducts}
          setCartProducts={setCartProducts}
          setUniqueProducts={setUniqueProducts}
        />
        <section className="flex flex-col items-center">
          <CartCalculation cartProducts={cartProducts} />
          <fieldset className="flex">
            <Button
              onClick={() => router.push("/products")}
              disabled={cartProducts.length <= 0 ? true : false}
              className="bg-black p-3 rounded w-32 sm:w-40 m-2"
            >
              Keep shopping
            </Button>
            <Button
              onClick={() => router.push("/cart/checkout")}
              disabled={cartProducts.length <= 0 ? true : false}
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
