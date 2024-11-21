"use client";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import CheckoutFormPayment from "./CheckoutFormPayment";
import DeliveryOptions from "./DeliveryOptions";
import Image from "next/image";
import penForm from "../assets/pen-to-square.svg";
import userSecret from "../assets/user-secret.svg";

type CheckoutFormProps = {
  setDeliveryCost: Dispatch<SetStateAction<number>>;
};

const CheckoutForm = ({ setDeliveryCost }: CheckoutFormProps) => {
  const [activeForm, setActiveForm] = useState<
    "" | "personDetails" | "deliveryOptions" | "paymentDetails"
  >("");
  const [isLoading, setIsloading] = useState(false);

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
      {activeForm === "" && (
        <section className="flex flex-col items-center">
          <h2 className="text-stone-900/80 text-center font-black text-xl mb-6">
            Do you have an account?
          </h2>
          <div className="flex flex-row md:flex-col lg:flex-row">
            <article
              onClick={() => setActiveForm("personDetails")}
              className="text-gray-800/80 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/40 via-white/60 to-white/80 w-40 h-32 rounded-xl shadow-lg cursor-pointer active:scale-95 duration-200 font-semibold p-3 m-2 border-2 border-gray-800/60"
            >
              <Image
                src={penForm}
                alt={"Login/Create"}
                className="cart-dimensions mb-2"
              />
              Login /
              <br />
              Create Account
            </article>
            <article
              onClick={() => setActiveForm("personDetails")}
              className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 w-40 h-32 rounded-xl shadow-lg hover:bg-gradient-to-tr hover:from-slate-700 hover:via-slate-500 hover:to-slate-700 cursor-pointer active:scale-95 duration-200 font-semibold p-3 m-2"
            >
              <Image
                src={userSecret}
                alt={"Guest"}
                className="cart-dimensions mb-2"
              />
              Guest
            </article>
          </div>
        </section>
      )}
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
              onClick={() => setActiveForm("")}
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
