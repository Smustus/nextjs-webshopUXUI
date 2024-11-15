import ProductCard from "@/app/components/ProductCard";
import SearchField from "@/app/components/SearchField";
import React from "react";

type ProductData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const ProductsPage = async () => {
  const productData = await fetch("https://dummyjson.com/products");
  const { products }: ProductData = await productData.json();

  return (
    <>
      <SearchField />
      <ul>
        <section className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </section>
      </ul>
    </>
  );
};

export default ProductsPage;
