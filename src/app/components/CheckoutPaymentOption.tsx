/* import Image from "next/image";

const CheckoutPaymentOption = ({
  name,
  payment,
  image,
  setPaymentOption,
  paymentOption,
}: {
  name: string;
  payment: string;
  image: string;
  setPaymentOption: React.Dispatch<React.SetStateAction<string>>;
  paymentOption: string;
}) => {
  const handleClick = () => {
    setPaymentOption(payment);
  };
  return (
    <article
      className={`relative flex flex-col items-center justify-center font-bold rounded-lg px-2 py-3 mx-2 mb-2 cursor-pointer group ${
        paymentOption === payment ? "text-stone-900/80" : "text-stone-700/80"
      }`}
      onClick={handleClick}
    >
      <Image
        width={35}
        height={35}
        src={image}
        alt={payment}
        className="card-dimensions"
      />
      <h3 className="text-lg">{payment}</h3>
      <input
        type="radio"
        name={name}
        className="hidden"
        readOnly
        checked={paymentOption === payment}
      />
      <span
        className={`absolute bottom-2 h-1 w-0 rounded-xl transition-all duration-300 ease-out group-hover:w-1/2 ${
          paymentOption === payment
            ? "w-1/2 bg-stone-900/80"
            : "bg-stone-700/80"
        }`}
      ></span>
    </article>
  );
};

export default CheckoutPaymentOption; */

import Image from "next/image";

const CheckoutPaymentOption = ({
  name,
  payment,
  image,
  setPaymentOption,
  paymentOption,
}: {
  name: string;
  payment: string;
  image: string;
  setPaymentOption: React.Dispatch<React.SetStateAction<string>>;
  paymentOption: string;
}) => {
  const handleClick = () => {
    setPaymentOption(payment);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setPaymentOption(payment);
    }
  };

  return (
    <article
      role="radio"
      aria-checked={paymentOption === payment}
      aria-label={payment}
      tabIndex={0}
      className={`relative flex flex-col items-center justify-center font-bold rounded-lg px-2 py-3 mx-2 mb-2 cursor-pointer group ${
        paymentOption === payment ? "text-stone-900/80" : "text-stone-700/80"
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Image
        width={35}
        height={35}
        src={image}
        alt={`${payment} payment option`}
        className="card-dimensions"
      />
      <h3 className="text-lg">{payment}</h3>
      <input
        type="radio"
        name={name}
        className="hidden"
        readOnly
        checked={paymentOption === payment}
        aria-hidden="true"
      />
      <span
        className={`absolute bottom-2 h-1 w-0 rounded-xl transition-all duration-300 ease-out group-hover:w-1/2 ${
          paymentOption === payment
            ? "w-1/2 bg-stone-900/80"
            : "bg-stone-700/80"
        }`}
      ></span>
    </article>
  );
};

export default CheckoutPaymentOption;
