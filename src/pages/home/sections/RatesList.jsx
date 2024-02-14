import { rates } from "../../../constants";
import { RateSection } from "../../../components";
const RatesList = () => {
  return (
    <section className="">
      <div className="flex justify-center gap-40 max-sm:gap-5 max-sm:flex-col">
        {rates.map((rate, index) => {
          return <RateSection {...rate} key={`rate-card-${index}`} />;
        })}
      </div>
    </section>
  );
};

export default RatesList;
