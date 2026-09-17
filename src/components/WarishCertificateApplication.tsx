import React, { useState } from "react";
import DeceasedPersonInfo from "./DeceasedPersonInfo";

function WarishCertificateApplication() {
  const [deceasedInfo, setDeceasedInfo] = useState({
    deceasedNameBn: "",
    deceasedNameEn: "",
    deathRegistrationNo: "",
    deathDate: "",
    gender: "",
  });

  const handleDeceasedInfoChange = (
    field: string,
    value: string
  ) => {
    setDeceasedInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <DeceasedPersonInfo
      deceasedNameBn={deceasedInfo.deceasedNameBn}
      deceasedNameEn={deceasedInfo.deceasedNameEn}
      deathRegistrationNo={deceasedInfo.deathRegistrationNo}
      deathDate={deceasedInfo.deathDate}
      gender={deceasedInfo.gender}
      onChange={handleDeceasedInfoChange}
    />
  );
}

export default WarishCertificateApplication;