import DiscountCard from "../components/DiscountCard";
import ProductBenefitCard from "../components/ProductBenefitCard";
import ProductCategoryCard from "../components/ProductCategoryCard";
import SearchField from "../components/SearchField";
import SignupCard from "../components/SignupCard";

export default function Home() {
  return (
    <>
      <div className="hidden sm:block">
        <SearchField />
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 w-full sm:w-5/6 gap-4 xl:gap-5">
        <ProductCategoryCard />
        <DiscountCard />
        <ProductBenefitCard />
        <SignupCard />
      </section>
    </>
  );
}
