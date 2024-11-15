import Button from "./Button";

const SignupCard = () => {
  return (
    <article
      className="relative flex flex-col justify-between items-center bg-gradient-to-br from-white/100 to-white/20 rounded-lg text-black/70 p-3 sm:p-6 hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl w-full h-full"
      style={{
        height: "clamp(330px, 40vw, 360px)",
      }}
    >
      <div className="flex flex-col justify-between text-center h-1/2">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide mb-4 xl:h-full">
          Join Us Today!
        </h2>
        <p className="italic text-base md:text-xl opacity-90">
          Sign up now and unlock exclusive benefits tailored just for you.
        </p>
      </div>
      <Button
        href={"/"}
        className="bg-white text-gray-700/90 font-bold px-4 py-3 rounded-lg mt-6 hover:bg-gray-300 hover:text-gray-800 hover:shadow-lg transition-all duration-200 active:scale-95"
      >
        Sign Up
      </Button>
    </article>
  );
};

export default SignupCard;
