"use client";
import Image from "next/image";
import { useState } from "react";

type ImageDisplayProps = {
  product: Product;
  className?: string;
};

const ImageDisplay = ({ product, className }: ImageDisplayProps) => {
  const [currentImage, setCurrentImage] = useState<string>(product.images[0]);

  return (
    <article className={`${className}`}>
      <Image
        src={currentImage}
        alt={`Main image of ${product.title}`}
        width={600}
        height={600}
        className={`big-auto-dimensions`}
        aria-live="polite"
      />
      <div className="flex justify-center lg:grid lg:grid-cols-3 gap-2 mt-2 w-full">
        {product.images.map((img, index) => (
          <button
            key={index}
            aria-label={`Select image ${index + 1} of ${product.images.length}`}
            onClick={() => setCurrentImage(img)}
            className="border-2 border-gray-200 rounded-md hover:border-gray-400 cursor-pointer small-auto-dimensions"
          >
            <Image
              src={img}
              alt={`${product.title} thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </article>
  );
};

export default ImageDisplay;
