import { underLinePaint } from "../assets/icons";

const ServiceCard = ({ title, desc, learnMoreLink, img }) => {
  return (
    <div className="flex justify-center items-center gap-16 mt-16 max-sm:flex-col">
      <div className="w-[40%] max-sm:w-full">
        <img src={img} alt={title} className="object-contain rounded-xl" />
      </div>
      <div className="w-[40%] max-sm:w-full">
        <h2 className="text-3xl font-lato font-bold text-gray-8 flex flex-col w-fit">
          {title}
          <img src={underLinePaint} alt="" className="self-end mt-[-1rem]" />
        </h2>
        <p className="mt-5 mb-8 text-lg text-gray-6">{desc}</p>
        <a href={learnMoreLink} className="underline text-theme-purple text-lg font-lato underline-offset-4">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
