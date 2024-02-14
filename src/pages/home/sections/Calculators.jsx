import { calculators } from "../../../constants";
import { CalculatorCard } from "../../../components";
calculators;
const Calculators = () => {
  return (
    <section>
      <div>
        <h1 className="flex flex-col items-center text-center text-4xl max-sm:text-2xl font-merriweather font-bold">
          <div className="w-20 h-1 bg-theme-purple mb-6 rounded-sm"></div>
          Ready to calculate your mortgage?
        </h1>
        <p className="text-center text-3xl mt-3 text-gray-8 max-sm:text-base  ">
          Use our wide-range of calculators to gain insights into your payments.
        </p>
      </div>
      <div className="flex gap-16 max-sm:gap-10 flex-wrap justify-center mt-20 max-sm:mt-10">
        {calculators.map((card, index) => (
          <CalculatorCard {...card} key={`calculator-card-${index}`} />
        ))}
      </div>
    </section>
  );
};

export default Calculators;
