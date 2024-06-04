import React from 'react'
import {
    Button,
    Choose,
    DateInput,
    TextArea,
    TextInput,
  } from "../../../../components";
  import { loanTypes,propertyStatuses,loanPurposes } from '../../../../constants';
const MortagageDetails = () => {
    const [mortgageData, setMortgageData] = React.useState({
        loanType: -1,
        homeValue: 0,
        loanPurpose: -1,
        mortgageAmountRequired: 0,
        approxDateOfRequierment: new Date().toISOString().slice(0, 10),
        purchasePrice: 0,
        currentStatus: -1,
      });
  return (
    <section className='mt-15 mb-10 mx-5'>
        <div className="mt-10">
        {/* <h3 className="form-title">MORTGAGE DETAILS</h3> */}
        <div className="flex flex-col mt-6">
          <div className="flex flex-wrap gap-10 max-sm:gap-5">
            <div className="w-[20%] max-sm:w-full">
              <Choose
                label={"Loan Type *"}
                value={mortgageData.loanType}
                options={loanTypes}
                handleChange={(e) => {
                  setMortgageData({
                    ...mortgageData,
                    loanType: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-[20%] max-sm:w-full">
              <Choose
                label={"Purpose of Loan *"}
                value={mortgageData.loanPurpose}
                options={loanPurposes}
                handleChange={(e) => {
                  setMortgageData({
                    ...mortgageData,
                    loanPurpose: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-[20%] max-sm:w-full">
              <Choose
                label={"Current Status of property*"}
                value={mortgageData.currentStatus}
                options={propertyStatuses}
                handleChange={(e) => {
                  setMortgageData({
                    ...mortgageData,
                    currentStatus: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-5 gap-10 max-sm:gap-5">
            <div className="w-[20%] max-sm:w-full">
              <TextInput
                label="Value of Home"
                required
                value={mortgageData.homeValue}
                handleChange={(e) => {
                  setMortgageData({
                    ...mortgageData,
                    homeValue: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-[20%] max-sm:w-full">
              <TextInput
                label="Purchase Price"
                required
                value={mortgageData.purchasePrice}
                handleChange={(e) => {
                  setMortgageData({
                    ...mortgageData,
                    purchasePrice: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-[20%] max-sm:w-full">
              <TextInput
                label="Mortage amount required"
                value={mortgageData.mortgageAmountRequired}
                handleChange={(e) => {
                  setMortgageData({
                    ...mortgageData,
                    mortgageAmountRequired: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-[20%] max-sm:w-full">
              <DateInput
                label={"Approx date funds required *"}
                value={mortgageData.approxDateOfRequierment}
                handleChange={(e) => {
                  setMortgageData({
                    ...mortgageData,
                    approxDateOfRequierment: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex mt-5"></div>
        </div>
      </div>
    </section>
  )
}

export default MortagageDetails