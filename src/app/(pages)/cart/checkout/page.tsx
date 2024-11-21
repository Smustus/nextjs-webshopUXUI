"use client";
import CartCalculation from "@/app/components/CartCalculation";
import CheckoutForm from "@/app/components/CheckoutForm";
import DisplayProductsCart from "@/app/components/DisplayProductsCart";
import { deliveryOptions } from "@/lib/deliveryOptions";
import { getCartProducts } from "@/lib/utils/getProducts";
import { useEffect, useState } from "react";

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

const CheckoutPage = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [uniqueProducts, setUniqueProducts] = useState<Product[]>([]);
  const [deliveryCost, setDeliveryCost] = useState<number>(
    deliveryOptions[0].value
  );

  useEffect(() => {
    const products = getCartProducts();
    setCartProducts(products);
    setUniqueProducts(accumulatedProdArr(products));
  }, []);

  return (
    <>
      <section className="flex flex-col px-4 pt-4 pb-4 mx-auto mt-6 w-full min-w-80 border-slate-800/50 rounded-3xl shadow-lg bg-white">
        <legend className="text-slate-700 font-bold text-center relative flex items-center w-full">
          <div className="border-t-2 border-stone-900/0 w-full" />
          <h3 className="text-xl text-stone-900/90 font-extrabold mt-1 mb-6">
            Checkout
          </h3>
          <div className="border-t-2 border-stone-900/0 w-full" />
        </legend>
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
          <section className="col-span-2 lg:col-span-1 flex flex-col justify-between md:border-r-2 md:border-stone-900/20">
            <DisplayProductsCart
              cartProducts={cartProducts}
              uniqueProducts={uniqueProducts}
              setCartProducts={setCartProducts}
              setUniqueProducts={setUniqueProducts}
            />
            <CartCalculation
              cartProducts={cartProducts}
              deliveryCost={deliveryCost}
            />
          </section>
          <section className="col-span-1">
            <CheckoutForm setDeliveryCost={setDeliveryCost} />
          </section>
        </section>
      </section>
    </>
  );
};

export default CheckoutPage;
