import React from "react";
import { highlightBanner } from "../../../assets/images";
import { highlightStats, clients } from "../../../constants";
import { HighlightCard, ClientCard } from "../../../components";

const Highlights = () => {
  return (
    <section className="bg-[#F6F0FF]">
      <div className="w-full">
        <img src={highlightBanner} alt="" width={"100%"} />
      </div>
      <div className="w-[80%] m-auto shadow-lg bg-white rounded-lg px-24 max-sm:px-8 pt-14 max-sm:pt-7 pb-24 max-sm:pb-10 mt-[-10%] relative">
        <div className="flex gap-10 items-center max-sm:flex-col max-sm:gap-3">
          <h3 className="text-theme-purple font-lato font-bold text-3xl max-sm:text-xl">
            Close your mortgage with TheRateFinder
          </h3>
          <p className="font-lato text-lg max-sm:text-base text-gray-8">
            RateFinder is more than just a place to research and compare rates.
            You can choose the best mortgage deal that’s right for you, right
            here. Our award-winning mortgage experts will guide you through the
            process and take care of all the details.
          </p>
        </div>
        <div className="flex gap-20 max-sm:gap-10 max-sm:flex-wrap items-center justify-center mt-10">
          {highlightStats.map((stat, index) => (
            <HighlightCard {...stat} key={`higlight-card-${index}`} />
          ))}
        </div>
      </div>
      <div className="padding">
            <h3 className="text-center text-2xl font-lato font-bold">We work with</h3>
            <div className="mt-10 gap-5 flex flex-wrap justify-around w-[95%] m-auto">
              {
                clients.map((client,index)=>(
                  <ClientCard {...client} key={`client-card-${index}`}/>
                ))
              }
            </div>
      </div>
    </section>
  );
};

export default Highlights;
