"use client";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "./Button";
import Input from "./Input";

const CheckoutFormPayment = ({
  setActiveForm,
}: {
  setActiveForm: Dispatch<
    SetStateAction<"personDetails" | "deliveryOptions" | "paymentDetails">
  >;
}) => {
  const [isLoading, setIsloading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center pt-4 md:pt-0"
    >
      <h4 className="text-stone-900/80 font-black text-xl">
        Enter payment details
      </h4>
      <fieldset className="flex p-2">
        <Input legend="Card number" />
      </fieldset>

      <fieldset className="flex p-0 w-12">
        <Input type="date" legend="Exp. date" className="px-1" />
        <Input legend="CVV" />
      </fieldset>

      <fieldset className="flex p-2">
        <Input legend="Country" />
      </fieldset>

      <fieldset className="mt-2 sm:m-0 text-center">
        <Button
          className="px-6 py-4 m-1 bg-black w-40"
          onClick={() => setActiveForm("deliveryOptions")}
        >
          Back
        </Button>
        <Button type="submit" className="px-6 py-4 m-1 bg-black w-40">
          {isLoading ? "Processing..." : "Make payment"}
        </Button>
      </fieldset>
    </form>
  );
};

export default CheckoutFormPayment;
