import makeupPic2 from "../../assets/makeupPic2.webp";
import groceries2 from "../../assets/groceries.webp";
import furniture2 from "../../assets/furniture2.jpg";
import perfume2 from "../../assets/perfume2.jpg";
import Image from "next/image";

const AboutPage = () => {
  const categories = [
    {
      category: "beauty",
      title: "Beauty Products",
      benefits: [
        "Nourish your skin with all-natural ingredients",
        "No animal-tested products",
      ],
      image: makeupPic2.src,
    },
    {
      category: "furniture",
      title: "Furniture",
      benefits: [
        "Elegant and durable designs for your home",
        "Crafted from ethically produced materials",
      ],
      image: furniture2.src,
    },
    {
      category: "fragrances",
      title: "Fragrances",
      benefits: [
        "Long-lasting and captivating scents",
        "No animal-tested products",
      ],
      image: perfume2.src,
    },
    {
      category: "groceries",
      title: "Groceries",
      benefits: ["Only organic, fresh non-GMO produce delivered to your door"],
      image: groceries2.src,
    },
  ];

  return (
    <div className="text-white">
      <section className="text-white py-10 px-6 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-xl">
          Redefining online shopping with quality, sustainability, and care.
        </p>
      </section>

      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Product Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <article
              key={category.category}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="rounded-t-lg w-full h-40 "
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-700">
                  {category.title}
                </h3>
                <ul className="mt-4 text-gray-700 list-disc list-inside">
                  {category.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Shop With Us?
        </h2>
        <div className="max-w-3xl mx-auto">
          <h4 className="mb-6">
            At <strong>Slate Haven</strong>, we’re more than just a webshop.
            We’re your partner in making thoughtful choices:
          </h4>
          <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>Sustainability Focus:</strong> From ethically sourced
              materials to cruelty-free products, we’re committed to reducing
              our footprint.
            </li>
            <li>
              <strong>Quality Guarantee:</strong> We stand behind every product
              in our store, ensuring you receive only the best.
            </li>
            <li>
              <strong>Convenience and Care:</strong> With seamless online
              shopping and doorstep delivery, we’re here to make your life
              easier.
            </li>
          </ul>
        </div>
      </section>

      <section className="text-white py-8 px-6 text-center">
        <h3 className="text-2xl font-bold">
          Thank you for choosing Slate Haven!
        </h3>
        <p className="mt-4 text-xl">
          We look forward to serving you and helping you live beautifully,
          responsibly, and effortlessly.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
