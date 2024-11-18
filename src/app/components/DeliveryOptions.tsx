import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
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
      className="flex flex-col items-center pt-4 md:pt-0 text-black/70 font-semibold"
    >
      <h4 className="text-stone-900/80 font-black text-xl">Choose delivery</h4>
      <fieldset className="grid grid-cols-[1fr,2fr,2fr] md:grid-cols-1 lg:grid-cols-[1fr,4fr,4fr] gap-2 text-center border-2 border-black/20 m-2 p-1 place-items-center rounded-2xl">
        <input
          type="radio"
          name="deliveryOptions"
          value={499}
          onChange={handleOptionChange}
          className="md:row-start-3 lg:row-start-1 flex justify-center items-center w-8 h-8"
        />
        <h3 className="font-black">Express Delivery (Delivery company 1)</h3>
        <h4>Fastest option, arrives in 1-2 business days.</h4>
      </fieldset>
      <fieldset className="grid grid-cols-[1fr,2fr,2fr] md:grid-cols-1 lg:grid-cols-[1fr,4fr,4fr] gap-2 text-center border-2 border-black/20 m-2 p-1 place-items-center rounded-2xl">
        <input
          type="radio"
          name="deliveryOptions"
          value={499}
          onChange={handleOptionChange}
          className="md:row-start-3 lg:row-start-1 flex justify-center items-center w-8 h-8"
        />
        <h3 className="font-black">Standard Delivery (Delivery company 2)</h3>
        <h4>Reliable and cost-effective, arrives in 3-5 business days.</h4>
      </fieldset>
      <fieldset className="grid grid-cols-[1fr,2fr,2fr] md:grid-cols-1 lg:grid-cols-[1fr,4fr,4fr] gap-2 text-center border-2 border-black/20 m-2 p-1 place-items-center rounded-2xl">
        <input
          type="radio"
          name="deliveryOptions"
          value={699}
          onChange={handleOptionChange}
          className="md:row-start-3 lg:row-start-1 flex justify-center items-center w-8 h-8"
        />
        <h3 className="font-black">Next-Day Delivery (Delivery company 3)</h3>
        <h4>Guaranteed next-day arrival for orders placed before 5 PM.</h4>
      </fieldset>
      <fieldset className="grid grid-cols-[1fr,2fr,2fr] md:grid-cols-1 lg:grid-cols-[1fr,4fr,4fr] gap-2 text-center border-2 border-black/20 m-2 p-1 place-items-center rounded-2xl">
        <input
          type="radio"
          name="deliveryOptions"
          value={699}
          onChange={handleOptionChange}
          className="md:row-start-3 lg:row-start-1 flex justify-center items-center w-8 h-8"
        />
        <h3 className="font-black">
          Eco-Friendly Delivery (Delivery company 4)
        </h3>
        <h4>
          Slower delivery (5-7 business days), but environmentally friendly!
        </h4>
      </fieldset>

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
