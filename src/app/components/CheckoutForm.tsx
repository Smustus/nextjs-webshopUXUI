"use client";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import CheckoutFormPayment from "./CheckoutFormPayment";
import DeliveryOptions from "./DeliveryOptions";
import { useRouter } from "next/navigation";

type CheckoutFormProps = {
  setDeliveryCost: Dispatch<SetStateAction<number>>;
};

const CheckoutForm = ({ setDeliveryCost }: CheckoutFormProps) => {
  const [activeForm, setActiveForm] = useState<
    "personDetails" | "deliveryOptions" | "paymentDetails"
  >("personDetails");
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
    setActiveForm("deliveryOptions");
  }

  return (
    <>
      {activeForm === "personDetails" && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center pt-4 md:pt-0"
        >
          <h4 className="text-stone-900/80 font-black text-xl">
            Enter delivery information
          </h4>

          <fieldset className="flex p-2">
            <Input legend="First name" />
          </fieldset>
          <fieldset className="flex p-2">
            <Input legend="Last name" />
          </fieldset>

          <fieldset className="flex p-2">
            <Input type="email" legend="E-mail" />
          </fieldset>
          <fieldset className="flex p-2">
            <Input type="tel" legend="Phone" />
          </fieldset>

          <fieldset className="flex p-2">
            <Input legend="Adress" />
          </fieldset>
          <fieldset className="flex p-2">
            <Input legend="Postal code" />
          </fieldset>

          <fieldset className="flex p-2">
            <Input legend="City" />
          </fieldset>

          <fieldset className="text-center mt-2 sm:m-0">
            <Button
              className="px-6 py-3 m-1 bg-black w-40"
              onClick={() => router.push("/cart")}
            >
              Back
            </Button>
            <Button type="submit" className="px-6 py-3 m-1 bg-black w-40">
              {isLoading ? "Processing..." : "Continue"}
            </Button>
          </fieldset>
        </form>
      )}
      {activeForm === "deliveryOptions" && (
        <DeliveryOptions
          setActiveForm={setActiveForm}
          setDeliveryCost={setDeliveryCost}
        />
      )}
      {activeForm === "paymentDetails" && (
        <CheckoutFormPayment setActiveForm={setActiveForm} />
      )}
    </>
  );
};

export default CheckoutForm;
