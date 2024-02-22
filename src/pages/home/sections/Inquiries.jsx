import { Link } from "react-router-dom";
import { arrowRight } from "../../../assets/icons";
import { inquirySections } from "../../../constants";
import { useState } from "react";
import InquiryCard from "../../../components/InquiryCard";
const Inquiries = () => {
  const [currentInquiry, setCurrentInquiry] = useState(inquirySections[0]);
  const changeInquiry = (inquiry) => {
    if (inquiry !== currentInquiry) setCurrentInquiry(inquiry);
  };
  return (
    <section className="mt-[-16rem] max-lg:mt-0 max-container">
      <div className="flex justify-end max-sm:flex-col">
        <Link
          to="/"
          className="flex gap-2 text-theme-purple font-lato font-bold"
        >
          Compare all
          <img src={arrowRight} alt="" width={28} height={"auto"} />
        </Link>
      </div>
      <div className="mt-8 flex justify-center items-center gap-28 max-sm:flex-col">
        {/* <div>
          <ul className="h-full flex flex-col justify-evenly">
            {inquirySections.map((inquiry, index) => (
              <li
                className={`hover:cursor-pointer font-lato
                text-base
                before:text-theme-purple
                before:pr-3
                ${
                  currentInquiry.title === inquiry.title
                    ? "before:content-['•']"
                    : ""
                }`}
                onClick={() => {
                  changeInquiry(inquiry);
                }}
                key={`inquiry-section-${index}`}
              >
                {inquiry.title}
              </li>
            ))}
          </ul>
        </div> */}
        <p className="text-[3rem] font-serif w-[15%] font-[500]">
          All your needs under one roof
        </p>
        <div className="flex justify-center gap-12 max-sm:flex-col">
          {currentInquiry.cards.map((card, index) => (
            <InquiryCard
              {...card}
              key={`inquiry-card-${currentInquiry.title}-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inquiries;
