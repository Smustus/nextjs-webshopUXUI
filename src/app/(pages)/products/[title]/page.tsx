import DetailedProductCard from "@/app/components/DetailedProductCard";

const SingleProductPage = async ({ params }: { params: { title: string } }) => {
  const { title } = await params;
  const productId = title.split("-").pop();
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  const product: Product = await response.json();

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg">
        <DetailedProductCard {...product} />
      </div>
    </>
  );
};

export default SingleProductPage;