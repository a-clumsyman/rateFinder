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
    </section>
  );
};

export default EducationCenter;
