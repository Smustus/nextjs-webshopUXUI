import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "./Button";
import { formatEUR } from "@/lib/formatters";
import { deliveryOptions } from "@/lib/deliveryOptions";

const DeliveryOptions = ({
  setActiveForm,
  setDeliveryCost,
}: {
  setActiveForm: Dispatch<
    SetStateAction<"" | "personDetails" | "deliveryOptions" | "paymentDetails">
  >;
  setDeliveryCost: Dispatch<SetStateAction<number>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<{
    id: string;
    value: number;
  }>(deliveryOptions[0]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (selectedDeliveryOption !== null) {
      setDeliveryCost(selectedDeliveryOption.value);
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveForm("paymentDetails");
    }, 500);
  }

  function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setSelectedDeliveryOption({
      id,
      value: Number(value),
    });
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.currentTarget;
      const selectedOption = deliveryOptions.find(
        (option) => option.id === target.id
      );
      if (selectedOption) {
        setSelectedDeliveryOption({
          id: selectedOption.id,
          value: selectedOption.value,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center pt-4 md:pt-0 text-black/70 font-semibold"
    >
      <h4 className="text-stone-900/80 font-black text-xl">Choose delivery</h4>

      {deliveryOptions.map(({ value, id, description, price }, index) => (
        <fieldset
          key={index}
          className="grid grid-cols-[1fr] md:grid-cols-1 lg:grid-cols-[1fr,4fr,6fr] gap-2 text-center border-2 border-black/20 m-2 p-1 place-items-center rounded-2xl w-full md:w-auto"
          role="radiogroup"
          aria-labelledby={`delivery-option-${index}`}
        >
          <legend id={`delivery-option-${index}`} className="sr-only">
            {id}
          </legend>
          <input
            type="radio"
            name={`deliveryOptions-${index}`}
            id={id}
            value={value}
            onChange={handleOptionChange}
            onKeyDown={handleKeyPress}
            className="md:row-start-3 lg:row-start-1 flex justify-center items-center w-8 h-8 cursor-pointer"
            checked={selectedDeliveryOption.id === id}
            aria-checked={selectedDeliveryOption.id === id}
          />
          <label htmlFor={id} className="sr-only">
            {id}
          </label>
          <h3 className="font-black">
            {id}
            <br />
            {formatEUR(price)}
          </h3>
          <h4>{description}</h4>
        </fieldset>
      ))}

      <fieldset className="mt-2 sm:m-0 text-center">
        <Button
          className="px-6 py-3 m-1 bg-black w-40"
          onClick={() => setActiveForm("personDetails")}
        >
          Back
        </Button>
        <Button type="submit" className="px-6 py-3 m-1 bg-black w-40">
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </fieldset>
    </form>
  );
};

export default DeliveryOptions;
