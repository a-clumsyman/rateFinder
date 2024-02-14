import { Button } from "./";
const InquiryCard = ({ logo, intrest, duration, buttonLink }) => {
  return (
    <div className="flex flex-col justify-center items-center px-16 pt-12 pb-6 rounded-md shadow-md bg-white">
      <img src={logo} alt="" width={128} />
      <div className="my-12">
        <h2 className="text-3xl font-lato font-bold text-gray-6 mt-3">
          {intrest}
        </h2>
        <p className="text-sm text-gray-6">{duration}</p>
      </div>
      <div className="">
        <Button label="Inquire" />
      </div>
    </div>
  );
};

export default InquiryCard;
