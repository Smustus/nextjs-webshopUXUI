import Button from "./Button";

const SignupCard = () => {
  return (
    <article
      className="relative flex flex-col justify-between items-center bg-gradient-to-br from-white/100 to-white/60 rounded-lg text-black/80 p-3 sm:p-6 hover:scale-105 transition-transform duration-200 shadow-custom-white hover:shadow-custom-white-lg w-full h-full"
      style={{
        height: "clamp(330px, 40vw, 360px)",
      }}
      aria-labelledby="signup-card-heading"
      role="region"
    >
      <div className="flex flex-col justify-between text-center h-2/3 ">
        <h2
          id="signup-card-heading"
          className="text-2xl md:text-3xl font-extrabold tracking-wide mb-4 drop-shadow-md"
        >
          Join Us Today!
        </h2>
        <p
          className="italic font-semibold text-lg md:text-xl drop-shadow-md"
          aria-live="polite"
        >
          <span className="text-red-600/100 font-bold">20% off&nbsp;</span>
          the first purchase
        </p>
        <p
          className="italic text-base lg:text-xl drop-shadow-md"
          aria-live="polite"
        >
          Sign up now and unlock more exclusive benefits
        </p>
      </div>
      <Button
        href={"/"}
        className="bg-white text-gray-800/90 font-bold px-4 py-3 rounded-lg mt-6 hover:bg-gray-300 hover:text-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-100 focus:outline focus:outline-2 focus:outline-blue-600"
        aria-label="Sign up for 20% off your first purchase"
      >
        Sign Up
      </Button>
    </article>
  );
};

export default SignupCard;
