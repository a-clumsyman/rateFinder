import React from "react";
import { useState } from "react";
import { TextInput } from "../../../../components";
const FinancialInformation = React.forwardRef((props,ref) => {
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
  const getData = () => {
    return {
      liabilities,
      assets,
    };
  };
  React.useImperativeHandle(ref, () => ({ getData }));

  return (
    <section>
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
    </section>
  );
});

export default FinancialInformation;
