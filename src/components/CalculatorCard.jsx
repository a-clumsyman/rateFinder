const CalculatorCard = ({ name, img, bgColor }) => {
  return (
    <div
      className={`py-8 px-10 max-sm:py-6 max-sm:px-5 w-1/4 max-lg:w-1/3 max-md:w-full rounded-xl`}
      style={{ backgroundColor: bgColor }}
    >
      <h3 className="font-lato text-3xl max-sm:text-xl">{name}</h3>
      <a
        href=""
        className="mt-6 text-theme-purple underline underline-offset-2 max-sm:text-base"
      >
        Calculate Now
      </a>
      <div className="mt-12 max-sm:flex max-sm:justify-center">
        <img src={img} alt={name} className="max-sm:w-[10rem]"/>
      </div>
    </div>
  );
};

export default CalculatorCard;
