import React from 'react'
import { TextArea,Choose } from '../../../../components';
import { otherInfoTypes } from '../../../../constants';
import { useState } from 'react';
const OtherInformation = () => {
    const [otherInfo, setOtherInfo] = useState({
        type: -1,
        additionalNote: "",
        electronicCommunicationConfirmation: "",
      });
  return (
    <section>
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
        <h3 className="form-title">CANADA&apos;S ANTI-SPAM LEGISLATION</h3>
        <p className="mt-3">
          <a
            href="https://fightspam-combattrelepourriel.ised-isde.canada.ca/site/canada-anti-spam-legislation/en"
            className="text-[#f00] underline underline-offset-2"
            target="_blank"
            rel='noreferrer'
          >
            Canada&apos;s Anti-Spam Legislation
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
    </section>
  )
}

export default OtherInformation