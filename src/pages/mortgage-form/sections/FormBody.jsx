import { useState } from "react";
import {
  loanTypes,
  loanPurposes,
  personTitles,
  streetTypes,
  streetDirections,
  provinces,
  counrties,
  occupationTypes,
  incomeTypes,
  otherInfoTypes,
  propertyStatuses,
} from "../../../constants";
import {
  Button,
  Choose,
  DateInput,
  TextArea,
  TextInput,
} from "../../../components";
import { plusIcon, renew } from "../../../assets/icons";
import { Stepper, Step, StepLabel,Box,Typography } from "@mui/material";
import React from 'react'
import MortagageDetails from "./steps/MortagageDetails";
import PersonalInformation from "./steps/PersonalInformation";
import FinancialInformation from "./steps/FinancialInformation";
import OtherInformation from "./steps/OtherInformation";
const FormBody = () => {
  const [mortgageData, setMortgageData] = useState({
    loanType: -1,
    homeValue: 0,
    loanPurpose: -1,
    mortgageAmountRequired: 0,
    approxDateOfRequierment: new Date().toISOString().slice(0, 10),
    purchasePrice: 0,
    currentStatus: -1,
  });
  const personalInfoTemplate = {
    title: -1,
    firstName: " ",
    lastName: " ",
    dateOfBirth: new Date().toISOString().slice(0, 10),
    SIN: " ",
    eMail: " ",
    phoneNumber: " ",
    streetName: " ",
    streetType: -1,
    streetDirection: -1,
    unit: " ",
    city: " ",
    province: -1,
    zipCode: " ",
    counrty: -1,
    homePhone: " ",
    cellPhone: " ",
    timeAtThisAdress:
      " " /**total time applicant spent in the current address */,
    occupationType: -1,
    nameOfTheEmployer: " ",
    jobTitle: " ",
    workPhone: " ",
    employmentType: " ",
    employmentDuration: " ",
    annualIncome: 0,
    incomeType: -1,
  };

  const [applicants, setApplicants] = useState([personalInfoTemplate]);
    const toggleApplicant = (e) => {
      if (applicants.length === 1) {
        setApplicants((prevData) => [...prevData, personalInfoTemplate]);
      } else {
        setApplicants((prevData) => [prevData[0]]);
      }
    };
  const handleApplicantDataChange = (value, name, applicantNo) => {
    console.log({ value, name, applicantNo });
    setApplicants((prevData) =>
      prevData.map((data, i) => {
        if (i === applicantNo) {
          return {
            ...data,
            [name]: value,
          };
        }
        return data;
      })
    );
  };
  const [assets, setAssets] = useState({
    cashSavings: {
      type: "Cash Savings",
      financialInstitution: " ",
      amount: 0,
    },
    RSVP: {
      type: "RSVP",
      financialInstitution: " ",
      amount: 0,
    },
    stocksBondsMutual: {
      type: "Stocks / Bonds / Mutual",
      financialInstitution: " ",
      amount: 0,
    },
    automobile: {
      type: "Automobile: present value",
      amount: 0,
    },
    totalAmount: {
      type: "Total",
      amount: 0,
    },
  });

  const [liabilities, setLiabilities] = useState({
    debt: {
      type: "Debts/Loans",
      financialInstitution: " ",
      balance: 0,
      monthlyPayment: 0,
    },
    creditCard: {
      type: "Credit Cards",
      financialInstitution: " ",
      balance: 0,
      monthlyPayment: 0,
    },
    currentMortgages: {
      type: "Amount owing on current mortgage(s)	",
      financialInstitution: " ",
      balance: 0,
      monthlyPayment: 0,
    },
    financeCompany: {
      type: "Finance company loans and other debts",
      financialInstitution: " ",
      balance: 0,
      monthlyPayment: 0,
    },
    total: {
      type: "Total",
      balance: 0,
      monthlyPayment: 0,
    },
  });

  const [netWorth, setNewtWorth] = useState(0);
  const calculateNetWorth = () => {
    var liabilitiesSum = 0;
    liabilities.forEach((item) => {
      liabilitiesSum += item.balance;
    });

    var assetSum = 0;
    assetSum.forEach((item) => {
      assetSum += item.amount;
    });

    setNewtWorth(assetSum - liabilitiesSum);
  };

  const [otherInfo, setOtherInfo] = useState({
    type: -1,
    additionalNote: "",
    electronicCommunicationConfirmation: "",
  });

  const steps = [
    {
      title : 'Mortagage Details',
      body : <MortagageDetails/>
    },
    {
      title : 'Personal Details',
      body : <PersonalInformation/>
    },
    {
      title : 'Financial Information',
      body : <FinancialInformation/>
    },
    {
      title : 'Other Information',
      body : <OtherInformation/>
    }
  ]
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.");
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const validateForm = () => {};
  return (
    <section className="mt-10 px-6 py-10 border border-slate-600 rounded-lg">
      {/* <div>
        <p>
          Please complete the following mortgage application in as much detail
          as you can (required information has been highlighted), then click
          submit. I will review the information, then contact you to discuss
          your application, answer any questions you might have, and explain
          next steps.
        </p>
        <p className="mt-2">*Mandatory field.</p>
      </div>
      <div className="mt-10">
        <h3 className="form-title">MORTGAGE DETAILS</h3>
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
      <div className="mt-12">
        {applicants.map((applicant, i) => (
          <div key={`applicant-${i}`} className="mb-10">
            <h3 className="form-title">
              PERSONAL INFORMATION APPLICANT - {i + 1}
            </h3>
            <div className="flex flex-col mt-8">
              <h4 className="text-lg font-medium">Identification</h4>
              <div className="mt-5">
                <div className="flex flex-wrap gap-10 max-sm:gap-5">
                  <div className="w-[10%] max-sm:w-full">
                    <Choose
                      label={"Title*"}
                      options={personTitles}
                      value={applicant.title}
                      handleChange={(e) => {
                        handleApplicantDataChange(e.target.value, "title", i);
                      }}
                    />
                  </div>
                  <div className="w-[25%] max-sm:w-full">
                    <TextInput
                      label="First Name"
                      required
                      value={applicant.firstName}
                      handleChange={(e) => {
                        handleApplicantDataChange(
                          e.target.value,
                          "firstName",
                          i
                        );
                      }}
                    />
                  </div>
                  <div className="w-[25%] max-sm:w-full">
                    <TextInput
                      label="Last Name"
                      required
                      value={applicant.lastName}
                      handleChange={(e) => {
                        handleApplicantDataChange(
                          e.target.value,
                          "lastName",
                          i
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex mt-5 flex-wrap gap-10 max-sm:gap-5">
                  <div className="w-[20%] max-sm:w-full">
                    <DateInput
                      label={"Date of Birth"}
                      value={applicant.dateOfBirth}
                      handleChange={(e) => {
                        handleApplicantDataChange(
                          e.target.value,
                          "dateOfBirth",
                          i
                        );
                      }}
                    />
                  </div>
                  <div className="w-[25%] max-sm:w-full">
                    <TextInput
                      label="SIN"
                      value={applicant.SIN}
                      handleChange={(e) => {
                        handleApplicantDataChange(e.target.value, "SIN", i);
                      }}
                    />
                  </div>
                  <div className="w-[25%] max-sm:w-full">
                    <TextInput
                      label="E-mail"
                      required
                      type="e-mail"
                      value={applicant.eMail}
                      handleChange={(e) => {
                        handleApplicantDataChange(e.target.value, "eMail", i);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-medium">Spouse Details</h4>
              <div className="mt-5">
                <div className="flex flex-wrap gap-10 max-sm:gap-5">
                  <div className="w-[10%] max-sm:w-full">
                    <Choose
                      label={"Title*"}
                      options={personTitles}
                      value={applicant.title}
                      handleChange={(e) => {
                        handleApplicantDataChange(e.target.value, "title", i);
                      }}
                    />
                  </div>
                  <div className="w-[25%] max-sm:w-full">
                    <TextInput
                      label="First Name"
                      required
                      value={applicant.firstName}
                      handleChange={(e) => {
                        handleApplicantDataChange(
                          e.target.value,
                          "firstName",
                          i
                        );
                      }}
                    />
                  </div>
                  <div className="w-[25%] max-sm:w-full">
                    <TextInput
                      label="Last Name"
                      required
                      value={applicant.lastName}
                      handleChange={(e) => {
                        handleApplicantDataChange(
                          e.target.value,
                          "lastName",
                          i
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex mt-5 flex-wrap gap-10 max-sm:gap-5">
                  <div className="w-[20%] max-sm:w-full">
                    <DateInput
                      label={"Date of Birth"}
                      value={applicant.dateOfBirth}
                      handleChange={(e) => {
                        handleApplicantDataChange(
                          e.target.value,
                          "dateOfBirth",
                          i
                        );
                      }}
                    />
                  </div>
                  <div className="w-[25%] max-sm:w-full">
                    <TextInput
                      label="SIN"
                      value={applicant.SIN}
                      handleChange={(e) => {
                        handleApplicantDataChange(e.target.value, "SIN", i);
                      }}
                    />
                  </div>
                  <div className="w-[25%] max-sm:w-full">
                    <TextInput
                      label="E-mail"
                      required
                      type="e-mail"
                      value={applicant.eMail}
                      handleChange={(e) => {
                        handleApplicantDataChange(e.target.value, "eMail", i);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <h4 className="text-lg font-medium">Current living address</h4>
              <div className="mt-5 flex gap-10 flex-wrap max-sm:gap-5">
                <div className="w-[20%] max-sm:w-full">
                  <TextInput
                    label="Number"
                    required
                    value={applicant.phoneNumber}
                    handleChange={(e) => {
                      handleApplicantDataChange(
                        e.target.value,
                        "phoneNumber",
                        i
                      );
                    }}
                  />
                </div>
                <div className="w-[30%] max-sm:w-full">
                  <TextInput
                    label="Street name"
                    required
                    value={applicant.streetName}
                    handleChange={(e) => {
                      handleApplicantDataChange(
                        e.target.value,
                        "streetName",
                        i
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex mt-5 gap-10 flex-wrap max-sm:gap-5">
                <div className="w-[20%] max-sm:w-full">
                  <Choose
                    label={"Street type *"}
                    options={streetTypes}
                    value={applicant.streetType}
                    handleChange={(e) => {
                      handleApplicantDataChange(
                        e.target.value,
                        "streetType",
                        i
                      );
                    }}
                  />
                </div>
                <div className="w-[20%] max-sm:w-full">
                  <Choose
                    label={"Street direction *"}
                    options={streetDirections}
                    value={applicant.streetDirection}
                    handleChange={(e) => {
                      handleApplicantDataChange(
                        e.target.value,
                        "streetDirection",
                        i
                      );
                    }}
                  />
                </div>
                <div className="w-[20%] max-sm:w-full">
                  <TextInput
                    label="Unit #"
                    value={applicant.unit}
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "unit", i);
                    }}
                  />
                </div>
              </div>
              <div className="flex mt-5 gap-10 flex-wrap max-sm:gap-5">
                <div className="w-[20%] max-sm:w-full">
                  <TextInput
                    label="City/Town"
                    required
                    value={applicant.city}
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "city", i);
                    }}
                  />
                </div>
                <div className="w-[20%] max-sm:w-full">
                  <Choose
                    label={"Province *"}
                    options={provinces}
                    value={applicant.province}
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "province", i);
                    }}
                  />
                </div>
                <div className="w-[20%] max-sm:w-full">
                  <TextInput
                    label={"Postal/Zip Code:"}
                    required
                    value={applicant.zipCode}
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "zipCode", i);
                    }}
                  />
                </div>
                <div className="w-[20%] max-sm:w-full">
                  <Choose
                    label={"Country"}
                    required
                    value={applicant.counrty}
                    options={counrties}
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "counrty", i);
                    }}
                  />
                </div>
              </div>
              <div className="flex mt-5 gap-10 flex-wrap max-sm:gap-5">
                <div className="w-[25%] max-sm:w-full">
                  <TextInput
                    label={"Home Ph.#:*(incl. area code; 1112223333)"}
                    value={applicant.homePhone}
                    required
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "homePhone", i);
                    }}
                  />
                </div>
                <div className="w-[25%] max-sm:w-full">
                  <TextInput
                    label={"Cell Ph.#: (incl. area code; 1112223333)"}
                    value={applicant.cellPhone}
                    required
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "cellPhone", i);
                    }}
                  />
                </div>
                <div className="w-[25%] max-sm:w-full">
                  <TextInput
                    label={
                      "Time at this address: (YYMM)*(eg. 4 years & 2 months = 0402)"
                    }
                    value={applicant.cellPhone}
                    required
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "cellPhone", i);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <h4 className="text-lg font-medium">Present employer</h4>
              <div className="flex mt-5 gap-10 flex-wrap max-sm:gap-5">
                <div className="w-[20%] max-sm:w-full">
                  <Choose
                    label={"Occupation type*"}
                    options={occupationTypes}
                    value={applicant.occupationType}
                    handleChange={(e) => {
                      handleApplicantDataChange(
                        e.target.value,
                        "occupationType",
                        i
                      );
                    }}
                  />
                </div>
                <div className="w-[20%] max-sm:w-full">
                  <TextInput
                    label={"Name of Employer"}
                    required
                    value={applicant.nameOfTheEmployer}
                    handleChange={(e) => {
                      handleApplicantDataChange(
                        e.target.value,
                        "nameOfTheEmployer",
                        i
                      );
                    }}
                  />
                </div>
                <div className="w-[20%] max-sm:w-full">
                  <TextInput
                    label={"Job title"}
                    required
                    value={applicant.jobTitle}
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "jobTitle", i);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mt-5 gap-10 max-sm:gap-5">
                <div className="w-[40%] max-sm:w-full">
                  <TextInput
                    label={"Work Ph.#: (incl. area code, no ext; 1112223333)"}
                    value={applicant.workPhone}
                    handleChange={(e) => {
                      handleApplicantDataChange(e.target.value, "workPhone", i);
                    }}
                  />
                </div>
                <div className="w-[20%] max-sm:w-full">
                  <Choose
                    label={"Income type*"}
                    options={incomeTypes}
                    value={applicant.incomeType}
                    handleChange={(e) => {
                      handleApplicantDataChange(
                        e.target.value,
                        "incomeType",
                        i
                      );
                    }}
                  />
                </div>
                <div className="w-[30%] max-sm:w-full">
                  <TextInput
                    label={"Annula Income"}
                    required
                    value={applicant.annualIncome}
                    handleChange={(e) => {
                      handleApplicantDataChange(
                        e.target.value,
                        "annualIncome",
                        i
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-5">
        <Button
          label={`${
            applicants.length === 1 ? "Enable" : "Disable"
          } applicant 2`}
          handleClick={toggleApplicant}
        />
      </div>
      
      <div className="mt-12">
        <h3 className="form-title">FINANCIAL INFORMATION</h3>
        <div className="mt-8 overflow-auto">
          <h3 className="mb-4 text-2xl font-medium">Assets</h3>
          <div className="w-[90%] max-sm:overflow-x-auto max-sm:w-[250%]">
            <div className="flex gap-10 justify-between mb-5">
              <p className="w-[20%] max-sm:w-full text-lg font-medium">Type</p>
              <p className="w-[30%] max-sm:w-full text-lg font-medium">
                Where/Financial Institution(s)
              </p>
              <p className="w-[30%] max-sm:w-full text-lg font-medium">
                Amount/ Value ($)
              </p>
            </div>
            {Object.keys(assets).map((key, i) => {
              return (
                <div className="flex gap-10 justify-between" key={`asset-${i}`}>
                  <p className="py-2 w-[20%] max-sm:w-full">
                    {assets[key].type}
                  </p>
                  <div className="py-2 w-[30%] max-sm:w-full">
                    {Object.keys(assets[key]).includes(
                      "financialInstitution"
                    ) ? (
                      <TextInput
                        value={assets[key].financialInstitution}
                        handleChange={(e) => {
                          setAssets({
                            ...assets,
                            [key]: {
                              ...assets[key],
                              financialInstitution: e.target.value,
                            },
                          });
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="py-2 w-[30%] max-sm:w-full">
                    <TextInput
                      value={assets[key].amount}
                      handleChange={(e) => {
                        setAssets({
                          ...assets,
                          [key]: {
                            ...assets[key],
                            amount: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-8 overflow-auto">
          <h3 className="mb-4 text-2xl font-medium">Liabilities</h3>
          <div className="w-[90%] max-sm:overflow-x-auto max-sm:w-[350%]">
            <div className="flex gap-10 justify-between mb-5">
              <p className="w-[20%] max-sm:w-full text-lg font-medium">Type</p>
              <p className="w-[20%] max-sm:w-full text-lg font-medium">
                Where/Financial Institution(s)
              </p>
              <p className="w-[20%] max-sm:w-full text-lg font-medium">
                Balance Owing ($)
              </p>
              <p className="w-[20%] max-sm:w-full text-lg font-medium">
                Monthly Payment ($)
              </p>
            </div>
            {Object.keys(liabilities).map((key, i) => {
              return (
                <div
                  className="flex gap-10 justify-between"
                  key={`liability-${i}`}
                >
                  <p className="py-2 w-[20%] max-sm:w-full">
                    {liabilities[key].type}
                  </p>
                  <div className="py-2 w-[20%] max-sm:w-full">
                    {Object.keys(liabilities[key]).includes(
                      "financialInstitution"
                    ) ? (
                      <TextInput
                        value={liabilities[key].financialInstitution}
                        handleChange={(e) => {
                          setLiabilities({
                            ...liabilities,
                            [key]: {
                              ...liabilities[key],
                              financialInstitution: e.target.value,
                            },
                          });
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="py-2 w-[20%] max-sm:w-full">
                    <TextInput
                      value={liabilities[key].balance}
                      handleChange={(e) => {
                        setLiabilities({
                          ...liabilities,
                          [key]: {
                            ...liabilities[key],
                            balance: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="py-2 w-[20%] max-sm:w-full">
                    <TextInput
                      value={liabilities[key].monthlyPayment}
                      handleChange={(e) => {
                        setLiabilities({
                          ...liabilities,
                          [key]: {
                            ...liabilities[key],
                            monthlyPayment: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-8">
          <div className="flex gap-5 items-center flex-wrap">
            <h3 className="text-xl font-medium">
              Net Worth (Total Assets - Total Liabilities):{" "}
            </h3>
            <div>
              <TextInput value={netWorth} disabled />
            </div>
          </div>
        </div>
      </div>


      <div className="mt-12">
        <h3 className="form-title">OTHER INFORMATION</h3>
        <div className="mt-5 w-[25%]">
          <Choose
            options={otherInfoTypes}
            label={"Category*"}
            value={otherInfo.type}
            handleChange={(e) => {
              setOtherInfo({
                ...otherInfo,
                type: e.target.value,
              });
            }}
          />
        </div>
        <div className="mt-5">
          <TextArea
            label={
              "Additional Note for Financial Information: (Max. 500 Characters)"
            }
            value={otherInfo.additionalNote}
            handleChange={(e) => {
              setOtherInfo({
                ...otherInfo,
                additionalNote: e.target.value,
              });
            }}
          />
        </div>
        <div className="mt-5">
          <p className="text-justify">
            I/we warrant and confirm that the information given in the mortgage
            application form is true and correct and I/we understand that it is
            being used to determine my/our credit responsibility. You are
            authorized to obtain any information you may require for these
            purposes from other sources (including, for example, credit bureau)
            and each such source is hereby authorized to provide you with such
            information. I/we also understand that the information given in the
            mortgage application form as well as other information you obtain in
            relation to my credit history may be disclosed to potential mortgage
            lenders, financial intermediary and mortgage insurers, organizations
            providing technological or other support services required in
            relation to this application and any other parties with whom I/we
            propose to have a financial relationship.
          </p>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="form-title">ONLINE APPLICATIONS</h3>
        <p className="mt-3">
          Please read the paragraph above prior to sending completed
          application. By transmitting the online mortgage application you are
          accepting the terms of the paragraph noted above.
        </p>
      </div>
      <div className="mt-12">
        <h3 className="form-title">CANADA'S ANTI-SPAM LEGISLATION</h3>
        <p className="mt-3">
          <a
            href="https://fightspam-combattrelepourriel.ised-isde.canada.ca/site/canada-anti-spam-legislation/en"
            className="text-[#f00] underline underline-offset-2"
            target="_blank"
          >
            Canada's Anti-Spam Legislation
          </a>{" "}
          was effective as of July 1, 2014. Under this legislation, I am
          required to obtain your consent in order to continue sending you email
          communications about the latest mortgage news, events, products, and
          services.
        </p>
        <div className="flex max-sm:flex-col mt-3 gap-10 max-sm:gap-5">
          <p>
            Please confirm your consent to receiving electronic communications.
          </p>
          <div className="flex gap-5">
            <div className="flex gap-2">
              <label htmlFor="comms-yes">Yes</label>
              <input
                type="radio"
                name="communication-consent"
                id="comms-yes"
                onChange={(e) => {}}
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="comms-no">No</label>
              <input
                type="radio"
                name="communication-consent"
                id="comms-no"
                onChange={(e) => {}}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex flex-wrap gap-10 max-sm:gap-5">
          <Button label={"Send Application"} bg={"bg-[#039C00]"} />
          <Button
            iconURL={renew}
            bg={"bg-[#fff]"}
            label={"Reset"}
            labelColor={"text-theme-purple"}
            borderColor={"border-theme-purple"}
          />
        </div>
      </div> */}
       <div>
        <p>
          Please complete the following mortgage application in as much detail
          as you can (required information has been highlighted), then click
          submit. I will review the information, then contact you to discuss
          your application, answer any questions you might have, and explain
          next steps.
        </p>
        <p className="mt-2">*Mandatory field.</p>
      </div>
      <Box sx={{ width: "100%" }} className="mt-8">
        <div className="w-[60%] mx-auto">
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={step.title} {...stepProps}>
                <StepLabel {...labelProps}> <p className="text-xs">{step.title}</p> </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        </div>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button handleClick={handleReset} label={'Reset'}/>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {
              steps.map((step,index)=>{
                return index === activeStep && (step.body)
              })
            }
            <div className="flex justify-end gap-10">
              <Button
                disabled={activeStep === 0}
                handleClick={handleBack}
                label="Back"
              />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              <Button handleClick={handleNext} bg={activeStep === steps.length - 1 ? 'bg-[#039C00]' : null} label={activeStep === steps.length - 1 ? "Send Application" : "Next"}/>
            </div>
          </React.Fragment>
        )}
      </Box>
    </section>
  );
};

export default FormBody;
