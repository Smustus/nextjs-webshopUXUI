"use client";
import Image from "next/image";
import { useState } from "react";

const ImageDisplay = (product: Product) => {
  const [currentImage, setCurrentImage] = useState<string>(product.images[0]);
  return (
    <article className="w-1/3">
      <Image
        src={currentImage}
        alt={product.title}
        width={300}
        height={300}
        className="auto-dimensions"
      />

      <div className="grid grid-cols-3 gap-2 mt-2">
        {product.images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={product.title}
            width={80}
            height={80}
            className="border-2 border-gray-200 rounded-md hover:border-gray-400 cursor-pointer small-auto-dimensions"
            onClick={() => setCurrentImage(img)}
          />
        ))}
      </div>
    </article>
  );
};

export default ImageDisplay;
