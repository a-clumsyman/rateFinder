import React from 'react'
import { useState } from 'react';
import { TextInput } from '../../../../components';
const BusinessInformation = () => {
    const [netWorth, setNewtWorth] = useState(0);    
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
  return (
    <section>
        <div className="mt-12">
        <h3 className="form-title">BUSINESS INFORMATION</h3>
      </div>
    </section>
  )
}

export default BusinessInformation