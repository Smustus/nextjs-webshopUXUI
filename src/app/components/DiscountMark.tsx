const DiscountMark = ({
  discountPercent,
  position,
}: {
  discountPercent: number;
  position: string;
}) => {
  return (
    <div
      className={`flex w-fit absolute bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 text-white font-bold text-sm sm:text-base px-5 py-1 rounded-tl-3xl rounded-br-3xl drop-shadow-md shadow-md transform -translate-x-2 -translate-y-2 backdrop-blur-md ${position}`}
      role="status"
      aria-live="assertive"
      aria-label={`Discount of ${discountPercent}%`}
    >
      <span className="text-white">{`${discountPercent}%`}</span>
      <span aria-hidden="true">&nbsp;</span> <span>Discount</span>
    </div>
  );
};

export default DiscountMark;
