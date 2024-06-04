import { logoBlack, blankProfile } from "../../../assets/images";
import { mortgageAgent } from "../../../constants";
const Head = () => {
  return (
    <section>
      <div className="flex justify-between items-center max-sm:flex-col-reverse gap-10">
        <div className="flex items-center max-sm:flex-col gap-5">
          <img src={blankProfile} alt="" width={150}/>
          <div className="ml-4">
            <h3 className="text-3xl font-medium text-theme-purple">{mortgageAgent.name}</h3>
            <p className="text-lg font-medium text-gray-600 mb-2">{mortgageAgent.designation}</p>
            <p>Licence : {mortgageAgent.licence}</p>
            <p>{mortgageAgent.companyName}</p>
            <p>Brokerage Licence : {mortgageAgent.brokerageLicence}</p>
            <p>{mortgageAgent.address}</p>
          </div>
        </div>
        <div>
          <img src={logoBlack} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Head;
