"use client";
import CategoryFilterProducts from "@/app/components/CategoryFilterProducts";
import ProductCard from "@/app/components/ProductCard";
import SearchField from "@/app/components/SearchField";
import React, { useEffect, useState } from "react";

type ProductData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<Product[]>([]);

  const fetchAllProducts = async () => {
    const productData = await fetch("https://dummyjson.com/products");
    const { products }: ProductData = await productData.json();
    setProducts(products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <SearchField />
      <CategoryFilterProducts
        products={products}
        setActiveFilter={setActiveFilter}
      />
      <ul>
        <section className="grid md:grid-cols-3 gap-6">
          {activeFilter.length > 0
            ? activeFilter.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))
            : products.map((product) => (
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
