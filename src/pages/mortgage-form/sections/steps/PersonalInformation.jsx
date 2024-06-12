import React from "react";
import { Choose, DateInput, TextInput, Button } from "../../../../components";
import {
  personTitles,
  streetTypes,
  streetDirections,
  provinces,
  counrties,
  occupationTypes,
  incomeTypes,
} from "../../../../constants";
import { useImperativeHandle } from "react";
const PersonalInformation = React.forwardRef((props,ref) => {
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
  const [applicants, setApplicants] = React.useState([personalInfoTemplate]);
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
  const toggleApplicant = (e) => {
    if (applicants.length === 1) {
      setApplicants((prevData) => [...prevData, personalInfoTemplate]);
    } else {
      setApplicants((prevData) => [prevData[0]]);
    }
  };

  const getData = () => {
    return applicants;
  };

  React.useImperativeHandle(ref, () => ({getData}));

  return (
    <section style={{ display: props.hide === true ? 'none' : 'block' }}>
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
    </section>
  );
});

export default PersonalInformation;
