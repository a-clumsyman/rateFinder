import { useState } from "react";
import { services } from "../../../constants";
import ServiceCard from "../../../components/ServiceCard";
const Services = () => {
  const [currentService, setCurrentService] = useState(services[0]);
  const changeService = (service) => {
    if (service !== currentService) {
      setCurrentService(service);
    }
  };
  return (
    <section>
      <h1 className="flex flex-col items-center text-4xl font-merriweather font-bold">
        <div className="w-20 h-1 bg-theme-purple mb-6 rounded-sm"></div>
        Our Services
      </h1>
      <div className="mt-20">
        <div className="flex justify-center gap-16 max-sm:flex-col">
          {services.map((service, index) => (
            <div
              key={`service-title-${index}`}
              className="flex flex-col items-center justify-between w-2/5 max-sm:w-full hover:cursor-pointer"
              onClick={() => {
                changeService(service);
              }}
            >
              <p className="text-xl text-gray-8 text-center w-[70%]">
                {service.title}
              </p>
              {service === currentService ? (
                <div className="w-full h-1 bg-theme-purple mt-4 rounded-sm"></div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <ServiceCard {...currentService} />
      </div>
    </section>
  );
};

export default Services;
