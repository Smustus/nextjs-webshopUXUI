import { formatEUR } from "@/lib/formatters";
import React from "react";
import Button from "./Button";
import ImageDisplay from "./ImageDisplay";

const DetailedProductCard = (product: Product) => {
  return (
    <>
      <section className="flex flex-col lg:flex-row gap-6">
        <ImageDisplay
          product={product}
          className="flex flex-col justify-center items-center lg:justify-start lg:items-start"
        />

        <div className="w-full lg:w-2/3 flex flex-col">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-700">
            {product.title}
          </h1>

          <h4 className="text-sm lg:text-lg mt-2 font-semibold text-gray-600">
            {product.description}
          </h4>
          <h4 className="mt-4 text-xs lg:text-sm text-gray-500">
            {product.brand}
          </h4>

          <div className="flex flex-wrap items-center mt-4 gap-2">
            <span className="text-xl lg:text-2xl font-bold text-gray-900">
              {formatEUR(
                product.price * (1 - product.discountPercentage / 100)
              )}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-red-500 line-through">
                {formatEUR(product.price)}
              </span>
            )}
            <span className="ml-auto bg-yellow-400 text-yellow-900 px-2 py-0.5 text-base rounded-full font-semibold">
              Rating: {product.rating} / 5
            </span>
          </div>

          <h4
            className={`mt-2 text-sm ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.availabilityStatus}
          </h4>

          <h4 className="text-xs text-gray-500 mt-1">
            Weight: {product.weight} g
          </h4>
          <h4 className="text-xs text-gray-500 mt-1">
            Dimensions: {product.dimensions.width} x {product.dimensions.height}{" "}
            x {product.dimensions.depth} cm
          </h4>

          <Button
            className="mt-4 mx-0 w-full sm:w-60"
            disabled={product.stock <= 0}
          >
            Add to Cart
          </Button>

          <h4 className="text-sm text-gray-500 mt-3">
            {product.shippingInformation}
          </h4>
          <h4 className="text-sm text-gray-500 mt-1">
            {product.warrantyInformation}
          </h4>
          <h4 className="text-sm text-gray-500 mt-1">{product.returnPolicy}</h4>
        </div>
      </section>

      <section className="mt-8 text-gray-600">
        <h2 className="text-base lg:text-lg font-semibold">Customer Reviews</h2>
        <div className="space-y-4 mt-4">
          {product.reviews.map((review, index) => (
            <div key={index} className="border-t pt-4">
              <div className="flex">
                <h4 className="font-semibold my-0.5 mr-2">
                  {review.reviewerName}
                </h4>
                <h4 className="flex items-center bg-yellow-400 text-yellow-900 text-base font-semibold px-3 rounded-full">
                  Rating: {review.rating} / 5
                </h4>
              </div>
              <p className="text-sm text-gray-600 my-1">
                {new Date(review.date).toLocaleDateString()}
              </p>

              <p className="text-sm text-gray-700 my-1">{review.comment}</p>
            </div>
          ))}
          {product.reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default DetailedProductCard;
