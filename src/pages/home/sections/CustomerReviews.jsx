import { reviewQuotes } from "../../../assets/icons";
import { reviewBg, reviewCustomer } from "../../../assets/images";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/pagination';

const CustomerReviews = () => {
  const reviews = [
    {
      name: "J.Taylor",
      designation: "Happy Custommer",
      location: "Canada",
      review:
        "The whole team made the process of buying our first home go smoothly! They went above and beyond to help us get to where we are now.",
      image: reviewCustomer,
    },
    {
      name : "R.Taylor",
      designation : 'Happy Custommer',
      location : 'Canada',
      review : 'buying The whole team made the process of our first home go smoothly! They went above and beyond to help us get to where we are now.',
      image : reviewCustomer
    },
    {
      name : "M.Taylor",
      designation : 'Happy Custommer',
      location : 'Canada',
      review : ' home go smoothly! They went above and  The whole team made the process of buying our firstbeyond to help us get to where we are now.',
      image : reviewCustomer
    }
  ];
  return (
    <section className="py-5">
      <Swiper
        slidesPerView={1}
        modules={[Pagination]}
        autoplay
        pagination
      >
        {reviews.map((e, i) => {
          return (
            <SwiperSlide>
              <div className="flex justify-between gap-10 w-[90%] ml-auto">
                <img src={e.image} alt="" />
                <div className="h-fit bg-[url('/src/assets/images/review-bg.png')] bg-no-repeat bg-right-bottom mt-10 pr-[20%]">
                  <img src={reviewQuotes} alt="" width={32} />
                  <p className="text-3xl mt-3 font-semibold">{e.review}</p>
                  <p className="mt-10 font-lato font-[200] italic text-xl">
                    {e.name}
                  </p>
                  <p className="mt-4 font-lato font-[200] italic text-xl">
                    {e.designation},{e.location}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default CustomerReviews;
