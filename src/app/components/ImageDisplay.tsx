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
        alt={product.title}
        width={300}
        height={300}
        className={`auto-dimensions`}
      />

      <div className="flex justify-center lg:grid lg:grid-cols-3 gap-2 mt-2 w-full">
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
