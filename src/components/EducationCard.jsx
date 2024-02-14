const EducationCard = ({ title, desc, link, bgColor }) => {
  return (
    <div
      className="w-1/4 max-sm:w-full rounded-md py-7 px-8 min-h-[25vh] flex flex-col justify-between cursor-pointer hover:scale-110 ease-in duration-100"
      style={{ backgroundColor: bgColor }}
    >
      <h3 className="font-lato font-bold text-3xl max-sm:text-2xl text-gray-8">{title}</h3>
      <p className="text-xl max-sm:text-base mt-2 text-gray-6">{desc}</p>
      <a
        href={link}
        className="mt-20 max-sm:mt-10 max-sm:text-base text-theme-purple underline underline-offset-2 text-xl"
      >
        Read More
      </a>
    </div>
  );
};

export default EducationCard;
