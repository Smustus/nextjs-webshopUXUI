"use client";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useRouter } from "next/navigation";
import CheckoutPaymentOptions from "./CheckoutPaymentOption";
import klarna from "../assets/klarna.png";
import swish from "../assets/swish.png";
import card from "../assets/credit-card.svg";

const CheckoutFormPayment = ({
  setActiveForm,
}: {
  setActiveForm: Dispatch<
    SetStateAction<"" | "personDetails" | "deliveryOptions" | "paymentDetails">
  >;
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [paymentOption, setPaymentOption] = useState<string>("Card");
  const router = useRouter();

  const payments = [
    {
      name: "Klarna",
      image: klarna.src,
    },
    {
      name: "Swish",
      image: swish.src,
    },
    {
      name: "Card",
      image: card.src,
    },
  ];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
    setTimeout(() => {
      router.push("/cart/checkout/confirmation");
    }, 1000);
  }

  return (
    <div className="flex flex-col items-center pt-4 md:pt-0">
      <h4 className="text-stone-900/80 font-black text-xl mb-3">
        Enter payment details
      </h4>
      <ul className="grid grid-cols-3 gap-2 border-b-2 border-black/20 pb-2">
        {payments.map((payment) => (
          <li key={payment.name}>
            <CheckoutPaymentOptions
              name="payment"
              payment={payment.name}
              image={payment.image}
              setPaymentOption={setPaymentOption}
              paymentOption={paymentOption}
            />
          </li>
        ))}
      </ul>
      {paymentOption === "Card" && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center pt-4 md:pt-2"
        >
          <fieldset className="flex p-2 w-72 md:w-60 lg:w-72">
            <Input legend="Card number" />
          </fieldset>

          <fieldset className="flex justify-between flex-wrap p-2 w-72 md:w-60 lg:w-72">
            <Input type="date" legend="Exp. date" />
            <Input legend="CVV" className="w-16" />
          </fieldset>

          <fieldset className="flex p-2 w-72 md:w-60 lg:w-72">
            <Input legend="Country" />
          </fieldset>

          <fieldset className="flex p-3 w-72 md:w-60 lg:w-72 text-stone-900/80 font-semibold">
            <input
              type="checkbox"
              id="tos"
              className="mr-2 cursor-pointer"
              required
            />
            <label htmlFor="tos" className="cursor-pointer">
              I agree to the{" "}
              <span className="text-blue-900/80 hover:text-blue-900/100 cursor-pointer underline">
                Terms of service
              </span>
            </label>
          </fieldset>

          <fieldset className="flex flex-row md:flex-col lg:flex-row mt-2 text-center">
            <Button
              className="px-6 py-3 m-1 bg-black w-40 md:w-44 lg:w-40"
              onClick={() => setActiveForm("deliveryOptions")}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 m-1 bg-black w-40 md:w-44 lg:w-40"
            >
              {isLoading ? "Processing..." : "Confirm payment"}
            </Button>
          </fieldset>
        </form>
      )}
      {paymentOption === "Swish" && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center pt-4 md:pt-2"
        >
          <h2 className="text-black/70">Swish Process</h2>
          <fieldset className="flex flex-row md:flex-col lg:flex-row mt-2 text-center">
            <Button
              className="px-6 py-3 m-1 bg-black w-40 md:w-44 lg:w-40"
              onClick={() => setActiveForm("deliveryOptions")}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 m-1 bg-black w-40 md:w-44 lg:w-40"
            >
              {isLoading ? "Processing..." : "Make payment"}
            </Button>
          </fieldset>
        </form>
      )}
      {paymentOption === "Klarna" && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center pt-4 md:pt-2"
        >
          <h2 className="text-black/70">Klarna Process</h2>
          <fieldset className="flex flex-row md:flex-col lg:flex-row mt-2 text-center">
            <Button
              className="px-6 py-3 m-1 bg-black w-40 md:w-44 lg:w-40"
              onClick={() => setActiveForm("deliveryOptions")}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 m-1 bg-black w-40 md:w-44 lg:w-40"
            >
              {isLoading ? "Processing..." : "Make payment"}
            </Button>
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default CheckoutFormPayment;
