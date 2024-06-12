import { useEffect, useState } from "react";
import { Button } from "../../../components";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";
import React from "react";
import PersonalInformation from "./steps/PersonalInformation";
import BusinessInformation from "./steps/BusinessInformation";
import OtherInformation from "./steps/OtherInformation";
import { uploadFile } from "../../../lib/common";
import { Document, Page, Text, View, pdf } from "@react-pdf/renderer";

const FormBody = () => {
  const steps = [
    {
      title: "Personal Details",
      body: <PersonalInformation />,
    },
    {
      title: "Business Information",
      body: <BusinessInformation />,
    },
    {
      title: "Other Information",
      body: <OtherInformation />,
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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

  const handleReset = () => {
    setActiveStep(0);
  };

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

  const uploadDocument = async () => {
    const pdfBlob = await pdf(FormDocument()).toBlob();
    console.log({ pdfBlob });
    const url = await uploadFile(pdfBlob);
    console.log({ url });
  };

  useEffect(() => {
    // uploadDocument();
  }, []);

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
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button handleClick={handleReset} label={"Reset"} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {steps.map((step, index) => {
              return index === activeStep && step.body;
            })}
            <div className="flex justify-end gap-10">
              <Button
                disabled={activeStep === 0}
                handleClick={handleBack}
                label="Back"
              />

              <Button
                handleClick={handleNext}
                bg={activeStep === steps.length - 1 ? "bg-[#039C00]" : null}
                label={
                  activeStep === steps.length - 1 ? "Send Application" : "Next"
                }
              />
            </div>
          </React.Fragment>
        )}
      </Box>
    </section>
  );
};

export default FormBody;
