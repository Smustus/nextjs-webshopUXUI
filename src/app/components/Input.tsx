interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  legend: string;
}

const Input: React.FC<InputProps> = ({
  legend,
  className,
  ...props
}: {
  legend: string;
  className?: string;
}) => {
  return (
    <fieldset
      className={`text-stone-800 font-semibold border-2 border-stone-800 rounded-xl opacity-80 transition-all duration-100 focus-within:opacity-200 ease-in-out focus-within:scale-105 m-0.5 ${
        className ? className : ""
      }`}
    >
      <legend className="text-base font-bold px-2 mx-2">{legend}</legend>
      <input
        className={`text-black pb-2 w-full px-4 py-0 bg-transparent focus:outline-none text-base`}
        {...props}
      />
    </fieldset>
  );
};

export default Input;
