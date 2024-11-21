const DiscountMark = ({ discountPercent }: { discountPercent: number }) => {
  return (
    <div className="flex w-fit absolute top-2 left-1 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 text-white font-bold text-sm sm:text-base px-5 py-1 rounded-tl-3xl rounded-br-3xl drop-shadow-md shadow-md transform -translate-x-2 -translate-y-2 backdrop-blur-md">
      <span className="text-white">{`${discountPercent}%`}</span>
      <h4>&nbsp;Discount</h4>
    </div>
  );
};

export default DiscountMark;
