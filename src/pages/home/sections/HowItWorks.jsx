import { mockupImg } from "../../../assets/images";
import { DescCard } from "../../../components";
import { descSections } from "../../../constants";
const HowItWorks = () => {
  return (
    <section className="flex gap-10 justify-between items-center px-10 max-sm:px-0 max-sm:flex-col">
      <div className="w-[55%] max-sm:w-full">
        <h1 className="flex flex-col text-4xl max-sm:text-2xl font-merriweather font-bold">
          <div className="w-40 h-1 bg-theme-purple mb-6 rounded-sm"></div>
          How it works on RateFinder ?
        </h1>
        {descSections.map((section, index) => (
          <DescCard {...section} key={`desc-section-${index}`} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <img src={mockupImg} alt="" className="w-[90%]" />
      </div>
    </section>
  );
};


export default HowItWorks;
