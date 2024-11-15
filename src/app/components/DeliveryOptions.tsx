import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Input from "./Input";
import Button from "./Button";

const DeliveryOptions = ({
  setActiveForm,
  setDeliveryCost,
}: {
  setActiveForm: Dispatch<
    SetStateAction<"personDetails" | "deliveryOptions" | "paymentDetails">
  >;
  setDeliveryCost: Dispatch<SetStateAction<number>>;
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<
    number | null
  >(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (selectedDeliveryOption !== null) {
      setDeliveryCost(selectedDeliveryOption);
    }

    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
    setActiveForm("paymentDetails");
  }

  function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDeliveryOption(Number(e.target.value));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center pt-4 md:pt-0"
    >
      <h4 className="text-stone-900/80 font-black text-xl">Choose delivery</h4>
      <fieldset className="flex flex-col p-2">
        <Input
          type="radio"
          name="deliveryOptions"
          legend="Delivery company 1"
          value={499}
          onChange={handleOptionChange}
        />
      </fieldset>
      <fieldset className="flex p-2">
        <Input
          type="radio"
          name="deliveryOptions"
          legend="Delivery company 2"
          value={499}
          onChange={handleOptionChange}
        />
      </fieldset>
      <fieldset className="flex p-2">
        <Input
          type="radio"
          name="deliveryOptions"
          legend="Delivery company 3"
          value={699}
          onChange={handleOptionChange}
        />
      </fieldset>
      <fieldset className="flex p-2">
        <Input
          type="radio"
          name="deliveryOptions"
          legend="Delivery company 4"
          value={699}
          onChange={handleOptionChange}
        />
      </fieldset>

      <fieldset className="mt-2 sm:m-0 text-center">
        <Button
          className="px-6 py-4 m-1 bg-black w-40"
          onClick={() => setActiveForm("personDetails")}
        >
          Back
        </Button>
        <Button type="submit" className="px-6 py-4 m-1 bg-black w-40">
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </fieldset>
    </form>
  );
};

export default DeliveryOptions;
