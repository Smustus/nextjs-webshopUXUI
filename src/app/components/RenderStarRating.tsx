import Image from "next/image";
import fullStar from "../assets/star.svg";
import halfStar from "../assets/star-half-stroke.svg";

const RenderStarRating = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, index) => (
        <Image
          key={`full-${index}`}
          src={fullStar}
          alt="full star"
          width={20}
          height={20}
        />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <Image
          key={`half-${index}`}
          src={halfStar}
          alt="half star"
          width={20}
          height={20}
        />
      ))}
    </div>
  );
};

export default RenderStarRating;
