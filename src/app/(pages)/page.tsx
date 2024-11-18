import DiscountCard from "../components/DiscountCard";
import ProductBenefitCard from "../components/ProductBenefitCard";
import ProductCategoryCard from "../components/ProductCategoryCard";
import PopularProductsDisplay from "../components/PopularProductsDisplay";
import SearchField from "../components/SearchField";
import SignupCard from "../components/SignupCard";

export default function Home() {
  return (
    <>
      <div className="sm:block">
        <SearchField />
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 w-full sm:w-5/6 2xl:w-full gap-5 md:gap-6 xl:gap-8">
        <ProductCategoryCard />
        <DiscountCard />
        <ProductBenefitCard />
        <SignupCard />
        {/* <div className="relative p-6 rounded-lg bg-white/20">
          <div className="absolute -inset-0.5 bg-white/20 blur-md rounded-lg pointer-events-none"></div>

          <div className="relative z-10 text-white text-center">
            <h2 className="text-xl font-bold">Blurred Border</h2>
            <p className="mt-2">This is an example of a blurred border.</p>
          </div>
        </div> */}
        <section className="col-span-2 md:col-span-3">
          <PopularProductsDisplay />
        </section>
      </section>
    </>
  );
}
