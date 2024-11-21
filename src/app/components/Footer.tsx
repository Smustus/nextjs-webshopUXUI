import Button from "./Button";

const Footer = () => {
  return (
    <footer
      className="bg-black/80 text-white p-3 sm:p-8 w-full mt-8"
      role="contentinfo"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <section aria-labelledby="about-us">
          <h3 id="about-us" className="text-lg font-bold mb-4">
            About Us
          </h3>
          <p className="text-base text-gray-300">
            We offer a curated selection of high-quality cosmetics, groceries,
            furniture, and fragrances to elevate your everyday life.
          </p>
        </section>

        <nav aria-labelledby="quick-links">
          <h3 id="quick-links" className="text-lg font-bold mb-4">
            Quick Links
          </h3>
          <ul className="text-base text-gray-300 space-y-2">
            <li>
              <Button
                href="/about"
                className="hover:underline"
                aria-label="About Us"
              >
                About Us
              </Button>
            </li>
            <li>
              <Button
                href="/products"
                className="hover:underline"
                aria-label="Shop"
              >
                Shop
              </Button>
            </li>
            <li>
              <Button href="/" className="hover:underline" aria-label="FAQ">
                FAQ
              </Button>
            </li>
            <li>
              <Button href="/" className="hover:underline" aria-label="Contact">
                Contact
              </Button>
            </li>
          </ul>
        </nav>

        <section aria-labelledby="stay-connected">
          <h3 id="stay-connected" className="text-lg font-bold mb-4">
            Stay Connected
          </h3>
          <p className="text-base text-gray-300 mb-4">
            Subscribe to our newsletter for updates and exclusive deals.
          </p>
          <form
            className="flex w-full items-center flex-wrap"
            aria-labelledby="subscribe-form"
            role="form"
          >
            <label htmlFor="email-input" className="sr-only">
              Email Address
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="Enter your email"
              className="py-2.5 px-4 rounded-full text-black outline-none text-lg my-0.5 mr-2"
              aria-required="true"
            />
            <Button
              className="rounded-full px-4 py-3 ml-0 mr-0 my-0.5"
              type="submit"
              aria-label="Subscribe to Newsletter"
            >
              Subscribe
            </Button>
          </form>
        </section>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Slate Haven. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
