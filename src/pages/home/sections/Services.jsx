import { useEffect, useState } from "react";
import { residentialServices,commercialServices } from "../../../constants";
import ServiceCard from "../../../components/ServiceCard";
const Services = () => {
  const [currentService, setCurrentService] = useState(residentialServices[0]);
  const changeService = (service) => {
    if (service !== currentService) {
      setCurrentService(service);
    }
  };
  const [serviceType, setServiceType] = useState("residential");
  const handleTypeChange = (type) => {
    setServiceType(type);
    
  };
  useEffect(()=>{
    setCurrentService(serviceType === 'residential' ? residentialServices[0] : commercialServices[0])
  },[serviceType])
  return (
    <section>
      <h1 className="flex gap-10 items-center justify-center text-4xl font-merriweather font-bold">
        {/* <div className="w-20 h-1 bg-theme-purple mb-6 rounded-sm"></div> */}
        <span
          className="cursor-pointer"
          onClick={() => {
            handleTypeChange("residential");
          }}
        >
          Residentail
          <div
            className={`h-1 ${
              serviceType === "residential" ? "bg-theme-purple" : ""
            } mt-1 mx-[15%] rounded-sm`}
          ></div>
        </span>
        <div className="bg-[#E3D0FF] w-1 h-16 rounded-full"></div>
        <span
          className="cursor-pointer"
          onClick={() => {
            handleTypeChange("commercial");
          }}
        >
          Commercial
          <div
            className={`h-1 ${
              serviceType === "commercial" ? "bg-theme-purple" : ""
            } mt-1 mx-[15%] rounded-sm`}
          ></div>
        </span>
      </h1>
      {serviceType === "residential" && (
        <div className="mt-20">
          <div className="flex justify-center gap-16 max-sm:flex-col">
            {residentialServices.map((service, index) => (
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
          <div>
            <ServiceCard {...currentService} />
          </div>
        </div>
      )}
      {serviceType === "commercial" && (
        <div className="mt-20">
          <div className="flex justify-center gap-16 max-sm:flex-col">
            {commercialServices.map((service, index) => (
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
          <div>
            <ServiceCard {...currentService} />
          </div>
        </div>
      )}

      
    </section>
  );
};

export default Services;
