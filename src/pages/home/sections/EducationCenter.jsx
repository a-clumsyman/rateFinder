import { educationCards } from "../../../constants";
import { EducationCard } from "../../../components";
const EducationCenter = () => {
  return (
    <section className="max-container">
      <h1 className="font-merriweather font-bold text-4xl max-sm:text-2xl text-center">
        TheRateFinder Education Center
      </h1>
      <div className="flex gap-8 justify-center flex-wrap mt-20 max-sm:mt-10">
        {educationCards.map((card, index) => (
          <EducationCard {...card} key={`education-card-${index}`} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button className="button w-fit px-4 py-2 text-lg font-serif border-[2px] rounded-lg border-[#320064]">Browse Our Education Center</button>
      </div>
    </section>
  );
};

export default EducationCenter;
