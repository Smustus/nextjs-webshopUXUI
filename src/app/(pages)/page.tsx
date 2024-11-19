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
        <section className="col-span-2 md:col-span-3">
          <PopularProductsDisplay />
        </section>
      </section>
    </>
  );
}
