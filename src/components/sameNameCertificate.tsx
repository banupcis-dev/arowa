import React, { useState } from "react";
import "../../css/birth-registration/BirthRegistrationApplication.css";
import AddressForm from "../AddressForm";
import ParentInfoForm from "../ParentInfoForm";
import ImageUpload from "../PhotoUpload";
import DocumentsUpload from "../DocumentsUpload";
import ApplicantsDeclaration from "../ApplicantsDeclaration";
import { useNavigate } from "react-router-dom";


const BirthRegistrationApplication: React.FC = () => {
const [deceasedNameBn, setDeceasedNameBn] = useState("");
const [deceasedNameEn, setDeceasedNameEn] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
const [gender, setGender] = useState("");
const [childOrder, setChildOrder] = useState("");
const [birthAddress, setBirthAddress] = useState({
  country: { name_bn: "", name_en: "" },
  division: { name_bn: "", name_en: "" },
  district: { name_bn: "", name_en: "" },
  upazila: { name_bn: "", name_en: "" },
  union: { name_bn: "", name_en: "" },
  ward: "",
  villageBn: "",
  villageEn: "",
  postOfficeBn: "",
  postOfficeEn: "",
  houseHoldingNoBn: "",
  houseHoldingNoEn: "",
});

const [fatherBRN, setFatherBRN] = useState("");
const [fatherBirthDate, setFatherBirthDate] = useState("");
const [fatherNameBeg, setFatherNameBeg] = useState("");
const [fatherNameEn, setFatherNameEn] = useState("");
const [fatherNationality, setFatherNationality] = useState("");

const [motherBRN, setMotherBRN] = useState("");
const [motherBirthDate, setMotherBirthDate] = useState("");
const [motherName, setMotherName] = useState("");
const [motherNameEn, setMotherNameEn] = useState("");
const [motherNationality, setMotherNationality] = useState("");
const [permanentAddress, setPermanentAddress] = useState({
    
  country: { name_bn: "", name_en: "" },
  division: { name_bn: "", name_en: "" },
  district: { name_bn: "", name_en: "" },
  upazila: { name_bn: "", name_en: "" },
  union: { name_bn: "", name_en: "" },
  ward: "",
  villageBn: "",
  villageEn: "",
  postOfficeBn: "",
  postOfficeEn: "",
  houseHoldingNoBn: "",
  houseHoldingNoEn: "",
});
const [birthSameAsPermanent, setBirthSameAsPermanent] = useState(false);
const [permanentSameAsPresent, setPermanentSameAsPresent] = useState(false);

const [presentAddress, setPresentAddress] = useState({
  country: { name_bn: "", name_en: "" },
  division: { name_bn: "", name_en: "" },
  district: { name_bn: "", name_en: "" },
  upazila: { name_bn: "", name_en: "" },
  union: { name_bn: "", name_en: "" },
  ward: "",
  villageBn: "",
  villageEn: "",
  postOfficeBn: "",
  postOfficeEn: "",
  houseHoldingNoBn: "",
  houseHoldingNoEn: "",
});

const [image, setImage] = useState(null);
const [preview, setPreview] = useState("");
const [files, setFiles] = useState([]);
const [applicantRelation, setApplicantRelation] = useState("");
const [applicantName, setApplicantName] = useState("");
const [isAgreed, setIsAgreed] = useState(false);
const [applicantsDeclaration, setApplicantsDeclaration] = useState("");
const handlePreview = () => {
  navigate("/birth-registration-preview", {
    state: {
      deceasedNameBn,
      deceasedNameEn,
      dateOfBirth,
      gender,
      childOrder,

      birthAddress,
      permanentAddress,
      presentAddress,

      fatherBRN,
      fatherBirthDate,
      fatherNameBeg,
      fatherNameEn,
      fatherNationality,

      motherBRN,
      motherBirthDate,
      motherName,
      motherNameEn,
      motherNationality,

      preview,
      files,

      applicantsDeclaration,
      applicantRelation,
      applicantName,
      isAgreed,
    },
  });
};

const navigate = useNavigate();
  return (
    <div className="birth-registration-form">

      <h2>০৩ জুন, ২০০৭ সালের আগে মৃত ব্যক্তির জন্ম নিবন্ধন</h2>

      <h3>মৃত ব্যক্তির তথ্যঃ</h3>

      <div className="form-grid">

        <div className="form-group">
          <label>মৃত ব্যক্তির নাম (বাংলা)</label>
          <input
            type="text"
            value={deceasedNameBn}
            onChange={(e) => setDeceasedNameBn(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>মৃত ব্যক্তির নাম (English)</label>
          <input
            type="text"
            value={deceasedNameEn}
            onChange={(e) => setDeceasedNameEn(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>জন্ম তারিখ (Date of Birth)</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
<div className="form-group">
  <label>লিঙ্গ (Gender)</label>

  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
  >
    <option value="">নির্বাচন করুন</option>
    <option value="পুরুষ">পুরুষ</option>
    <option value="মহিলা">মহিলা</option>
    <option value="তৃতীয় লিঙ্গ">তৃতীয় লিঙ্গ</option>
  </select>
</div>

       <div className="form-group">
  <label>পিতা-মাতার কততম সন্তান (Child Order)</label>

  <select
    value={childOrder}
    onChange={(e) => setChildOrder(e.target.value)}
  >
    <option value="">নির্বাচন করুন</option>
    <option value="1">১</option>
    <option value="2">২</option>
    <option value="3">৩</option>
    <option value="4">৪</option>
    <option value="5">৫</option>
    <option value="6">৬</option>
    <option value="7">৭</option>
    <option value="8">৮</option>
    <option value="9">৯</option>
    <option value="10">১০</option>
    <option value="11">১১</option>
    <option value="12">১২</option>
    <option value="13">১৩</option>
    <option value="14">১৪</option>
    <option value="15">১৫</option>
  </select>
</div>
      </div>

      <AddressForm
  title="মৃত ব্যক্তির জন্মস্থানের ঠিকানাঃ"
  address={birthAddress}
  setAddress={setBirthAddress}
  errors={{}}
/>

<ParentInfoForm
  fatherBRN={fatherBRN}
  setFatherBRN={setFatherBRN}
  fatherBirthDate={fatherBirthDate}
  setFatherBirthDate={setFatherBirthDate}
  fatherNameBeg={fatherNameBeg}
  setFatherNameBeg={setFatherNameBeg}
  fatherNameEn={fatherNameEn}
  setFatherNameEn={setFatherNameEn}
  fatherNationality={fatherNationality}
  setFatherNationality={setFatherNationality}

  motherBRN={motherBRN}
  setMotherBRN={setMotherBRN}
  motherBirthDate={motherBirthDate}
  setMotherBirthDate={setMotherBirthDate}
  motherName={motherName}
  setMotherName={setMotherName}
  motherNameEn={motherNameEn}
  setMotherNameEn={setMotherNameEn}
  motherNationality={motherNationality}
  setMotherNationality={setMotherNationality}
  errors={{}}
/>
<label className="same-address">
  <input
    type="checkbox"
    checked={birthSameAsPermanent}
    onChange={(e) => {
      const checked = e.target.checked;
      setBirthSameAsPermanent(checked);

      if (checked) {
        setPermanentAddress({ ...birthAddress });
      }
    }}
  />

  মৃত ব্যক্তির জন্মস্থানের ঠিকানা ও স্থায়ী ঠিকানা একই হলে টিকচিহ্ন দাওঃ
</label>
<AddressForm
  title="মৃত ব্যক্তির স্থায়ী ঠিকানাঃ"
  address={permanentAddress}
  setAddress={setPermanentAddress}
  disabled={birthSameAsPermanent}
  errors={{}}
/>

<label className="same-address">
  <input
    type="checkbox"
    checked={permanentSameAsPresent}
    onChange={(e) => {
      const checked = e.target.checked;
      setPermanentSameAsPresent(checked);

      if (checked) {
        setPresentAddress({ ...permanentAddress });
      }
    }}
  />
  মৃত ব্যক্তির স্থায়ী ঠিকানা ও বর্তমান ঠিকানা একই হলে টিকচিহ্ন দাওঃ
</label>

<AddressForm
  title="মৃত ব্যক্তির বর্তমান ঠিকানাঃ"
  address={presentAddress}
  setAddress={setPresentAddress}
  disabled={permanentSameAsPresent}
  errors={{}}
/>

<div className="form-row-group">

  <div className="form-row">
    <ImageUpload
      image={image}
      setImage={setImage}
      preview={preview}
      setPreview={setPreview}
      errors={{}}
    />
  </div>

  <div className="form-row">
    <DocumentsUpload
      files={files}
      setFiles={setFiles}
      errors={{}}
    />
  </div>

</div>
<ApplicantsDeclaration
  banglaName={deceasedNameBn}
  applicantsDeclaration={applicantsDeclaration}
  setApplicantsDeclaration={setApplicantsDeclaration}
  applicantRelation={applicantRelation}
  setApplicantRelation={setApplicantRelation}
  applicantName={applicantName}
  setApplicantName={setApplicantName}
  isAgreed={isAgreed}
  setIsAgreed={setIsAgreed}
  errors={{}}
/>
<button
  type="button"
  onClick={handlePreview}
>
  প্রিভিউ দেখুন
</button>
    </div>
  );
};

export default BirthRegistrationApplication;