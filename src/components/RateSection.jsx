const RateSection = ({ title, values }) => {
  return (
    <div>
      <h3 className="text-2xl max-sm:text-xl font-lato font-bold text-theme-purple">
        {title}
      </h3>
      <ul className="mt-4 max-sm:mt-2">
        {values.map((value, index) => (
          <li className=" mb-3 max-sm:mb-1" key={`rate-value-item-${index}`}>
            <a href="" className="font-lato text-xl max-sm:text-base hover:underline">
              {value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RateSection;
