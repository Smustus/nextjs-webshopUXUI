import Button from "./Button";

const Footer = () => {
  return (
    <footer className="bg-black/80 text-white p-3 sm:p-8 w-full mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <p className="text-base text-gray-300">
            We offer a curated selection of high-quality cosmetics, groceries,
            furniture, and fragrances to elevate your everyday life.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="text-base text-gray-300 space-y-2">
            <li>
              <Button href="/about" className="hover:underline">
                About Us
              </Button>
            </li>
            <li>
              <Button href="/products" className="hover:underline">
                Shop
              </Button>
            </li>
            <li>
              <Button href="/" className="hover:underline">
                FAQ
              </Button>
            </li>
            <li>
              <Button href="/" className="hover:underline">
                Contact
              </Button>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
          <p className="text-base text-gray-300 mb-4">
            Subscribe to our newsletter for updates and exclusive deals.
          </p>
          <form className="flex w-full items-center flex-wrap">
            <input
              type="email"
              placeholder="Enter your email"
              className="py-2.5 px-4 rounded-full text-black outline-none text-lg my-0.5 mr-2"
            />
            <Button className="rounded-full px-4 py-3 ml-0 mr-0 my-0.5">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Brand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
