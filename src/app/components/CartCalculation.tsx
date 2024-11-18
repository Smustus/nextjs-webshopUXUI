"use client";

import { formatEUR } from "@/lib/formatters";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Input = dynamic(() => import("./Input"), { ssr: false });
const Button = dynamic(() => import("./Button"), { ssr: false });

type CartCalculateProps = {
  cartProducts: Product[];
  deliveryCost?: number;
};

const CartCalculation = ({
  cartProducts,
  deliveryCost = 0,
}: CartCalculateProps) => {
  const pathname = usePathname();

  const { productsPrice, productsPriceDiscount, totalDiscount } =
    useMemo(() => {
      let total = 0;
      let totalWithDiscount = 0;

      cartProducts.forEach((product) => {
        const discountedPrice =
          product.price * (1 - product.discountPercentage / 100);
        total += product.price;
        totalWithDiscount += discountedPrice;
      });

      const discount = total - totalWithDiscount;
      return {
        productsPrice: total,
        productsPriceDiscount: totalWithDiscount,
        totalDiscount: formatEUR(discount),
      };
    }, [cartProducts]);

  const totalPrice = useMemo(() => {
    return productsPriceDiscount + deliveryCost / 100;
  }, [productsPriceDiscount, deliveryCost]);

  const renderCheckoutContent = () => (
    <article
      className={`flex flex-col items-start sm:items-end ml-2 mt-2 sm:m-0 w-full`}
    >
      <h4>{`Products: ${formatEUR(productsPriceDiscount)}`}</h4>
      <h4>{`Delivery: ${formatEUR(deliveryCost / 100)}`}</h4>
      <h4 className="text-gray-900/90 font-black">{`Total: ${formatEUR(
        totalPrice
      )}`}</h4>
      <h4 className="text-red-800 italic">{`Total saved: ${totalDiscount}`}</h4>
    </article>
  );

  const renderCartSummary = () => (
    <article className={`flex flex-col items-center w-full mt-2 mb-4`}>
      <h4>{`Products total: ${formatEUR(productsPrice)}`}</h4>
      <h4 className="font-black">{`After discount: ${formatEUR(
        productsPriceDiscount
      )}`}</h4>
      <h4 className="text-red-800 italic">{`Total saved: ${totalDiscount}`}</h4>
    </article>
  );

  return (
    <section
      className={`flex flex-col sm:flex-row justify-between items-start text-gray-900/80 font-semibold border-t-2 border-gray-900/20 pt-3 md:pr-4 mt-4 sm:mt-0 w-full ${
        pathname === "/cart/checkout/confirmation" ? "md:pr-0" : ""
      }`}
    >
      {pathname === "/cart/checkout" && (
        <article className="flex">
          <Input legend="Discount code" />
          <Button className="translate-y-1 my-2 mx-2 w-36 h-12">Apply</Button>
        </article>
      )}
      {pathname === "/cart/checkout" || "/cart/checkout/confirmation"
        ? renderCheckoutContent()
        : renderCartSummary()}
    </section>
  );
};

export default CartCalculation;
