import { useRef, useState } from "react";
import {
  Button,
} from "../../../components";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import React from "react";
import MortagageDetails from "./steps/MortagageDetails";
import PersonalInformation from "./steps/PersonalInformation";
import FinancialInformation from "./steps/FinancialInformation";
import OtherInformation from "./steps/OtherInformation";
import { pdf } from "@react-pdf/renderer";
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { sendMail, uploadFile } from "../../../lib/common";
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
      title: "Mortagage Details",
      body: MortagageDetails,
      ref: useRef("mortagage_details"),
      key: 'mortagage_details'
    },
    {
      title: "Personal Details",
      body: PersonalInformation,
      ref: useRef("personal_details"),
      key: 'personal_details'
    },
    {
      title: "Financial Information",
      body: FinancialInformation,
      ref: useRef("financial_details"),
      key: 'financial_details'
    },
    {
      title: "Other Information",
      body: OtherInformation,
      ref: useRef("other_details"),
      key: 'other_details'
    },
  ];
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
  const FormDocument = (data) => {
    console.log({ data });
    return (
      <Document>
        <Page size="A4">
          <View>
            <Text>Section #1</Text>
          </View>
        </Page>
      </Document>
    );
  };
  const submitForm = async () => {
    let formData = {}
    steps.forEach((step) => {
      // console.log({ ref: step.ref });
      const stepData = step.ref.current.getData()
      formData = {
        ...formData,
        [step.key] : stepData
      } 
    });
    const blob = await pdf(FormDocument(formData)).toBlob()
    const url = await uploadFile(blob);
    try{
      const resp = await sendMail({pdfUrl: url})
      console.log({resp})
    } catch(error){
      console.log({error})
    }
  };

  return (
    <section className="mt-10 px-6 py-10 border border-slate-600 rounded-lg">
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
                  <StepLabel {...labelProps}>
                    {" "}
                    <p className="text-xs">{step.title}</p>{" "}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <>
          {" "}
          {steps.map((step, index) => {
            return (
              <React.Fragment>
                {React.createElement(step.body, {
                  hide: index != activeStep,
                  ref: step.ref,
                })}
              </React.Fragment>
            );
          })}
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

            <Button
              handleClick={() => {
                if (activeStep === steps.length - 1) {
                  submitForm();
                }
                handleNext();
              }}
              bg={activeStep === steps.length - 1 ? "bg-[#039C00]" : null}
              label={
                activeStep === steps.length - 1 ? "Send Application" : "Next"
              }
            />
          </div>
        </>
      </Box>
    </section>
  );
};

export default FormBody;
