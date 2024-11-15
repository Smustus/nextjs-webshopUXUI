"use client";
import { formatEUR } from "@/lib/formatters";
import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { usePathname } from "next/navigation";

type CartCalculateProps = {
  cartProducts: Product[];
  deliveryCost?: number;
};

const CartCalculation = ({
  cartProducts,
  deliveryCost,
}: CartCalculateProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productsPrice, setProductsPrice] = useState<number>(0);
  const [productsPriceDiscount, setProductsPriceDiscount] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    calcProductsPrice();
  }, [cartProducts]);

  useEffect(() => {
    calcTotalPrice();
  }, [productsPrice, productsPriceDiscount, deliveryCost]);

  const calcProductsPrice = () => {
    let total = 0;
    let totalWithDiscount = 0;
    cartProducts.forEach((product) => {
      const calculatePrice =
        product.price * (1 - product.discountPercentage / 100);
      totalWithDiscount += calculatePrice;
    });
    cartProducts.forEach((product) => {
      total += product.price;
    });
    setProductsPrice(total);
    setProductsPriceDiscount(totalWithDiscount);
  };

  const calcTotalPrice = () => {
    if (deliveryCost) {
      const total = productsPriceDiscount + deliveryCost / 100;
      setTotalPrice(total);
    }
  };

  return (
    <section className="flex flex-col sm:flex-row justify-between items-start text-gray-900/80 font-semibold border-t-2 border-gray-900/20 pt-3 md:pr-4 mt-4 sm:mt-0 w-full">
      {pathname === "/cart/checkout" && (
        <article className="flex">
          <Input legend={"Discount code"} />
          <Button className="translate-y-1 my-2 mx-2 w-36 h-12">Apply</Button>
        </article>
      )}

      {pathname === "/cart/checkout" ? (
        <article className="flex flex-col items-start sm:items-end ml-2 mt-2 sm:m-0 w-full">
          <h4 className="">{`Products: ${formatEUR(
            productsPriceDiscount
          )}`}</h4>

          <h4>{`Delivery: ${
            deliveryCost ? formatEUR(deliveryCost / 100) : formatEUR(0)
          }`}</h4>
          <h4 className="text-gray-900/90 font-black">{`Total: ${
            totalPrice !== 0 ? formatEUR(totalPrice) : formatEUR(productsPrice)
          }`}</h4>
          <h4 className="text-red-800 italic">{`Total saved: ${formatEUR(
            productsPrice - productsPriceDiscount
          )}`}</h4>
        </article>
      ) : (
        <article className="flex flex-col items-center w-full">
          <h4 className="">{`Products: ${formatEUR(productsPrice)}`}</h4>
          <h4 className="text-red-800 italic">{`Total saved: ${formatEUR(
            productsPrice - productsPriceDiscount
          )}`}</h4>
        </article>
      )}
    </section>
  );
};

export default CartCalculation;
