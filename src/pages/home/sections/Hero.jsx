import { heroBg } from "../../../assets/images";
import { homeCards } from "../../../constants";
import { HeroCard } from "../../../components";
const Hero = () => {
  return (
    <section
      className="padding h-[90vh] max-md:h-full bg-[length:100%_100%]"
      style={{ backgroundImage: `url('${heroBg}')` }}
    >
      <h1 className="max-sm:text-2xl text-4xl font-merriweather text-center font-bold">
        Rates that are right for you
      </h1>
      <p className="max-sm:text-base text-3xl mt-3 text-center  text-gray-6">
        Compare mortgage rates from various lenders in and around Canada
      </p>
      <div className="grid grid-cols-3 mx-auto w-[90%] justify-center gap-10 mt-14 items-center">
        {homeCards.map((card, index) => (
          <HeroCard {...card} key={`hero-card-${index}`} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
