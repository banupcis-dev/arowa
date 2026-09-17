import React, { useState } from "react";
import "../css/banupcis.css";
import AddressForm from "./AddressForm";
import ParentInfoForm from "./ParentInfoForm";
import ImageUpload from "./PhotoUpload";
import DocumentsUpload from "./DocumentsUpload";
import ApplicantsDeclaration from "./ApplicantsDeclaration";
import SameNameCertificatePersonalInfo from "./SameNameCertificatePersonalInfo";
import { useNavigate } from "react-router-dom";
const SameNameCertificate: React.FC = () => {
  const navigate = useNavigate();

  // =========================
  // Personal Information
  // =========================

  const [banglaName, setBanglaName] = useState("");
  const [englishName, setEnglishName] = useState("");

  const [nicknameBn, setNicknameBn] = useState("");
  const [nicknameEn, setNicknameEn] = useState("");

  const [birthRegNo, setBirthRegNo] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [gender, setGender] = useState({
    name_bn: "",
    name_en: "",
  });

  // =========================
  // Birth Address
  // =========================

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

  // =========================
  // Parent Information
  // =========================

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

  // =========================
  // Permanent Address
  // =========================

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

  // =========================
  // Present Address
  // =========================

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

  // =========================
  // Address Same Options
  // =========================

  const [birthSameAsPermanent, setBirthSameAsPermanent] =
    useState(false);

  const [permanentSameAsPresent, setPermanentSameAsPresent] =
    useState(false);

  // =========================
  // Image / Documents
  // =========================

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [files, setFiles] = useState([]);

  // =========================
  // Applicant Information
  // =========================

  const [applicantRelation, setApplicantRelation] = useState("");
  const [applicantName, setApplicantName] = useState("");

  // =========================
  // Declaration
  // =========================

  const [isAgreed, setIsAgreed] = useState(false);
  const [applicantsDeclaration, setApplicantsDeclaration] =
    useState("");

  // =========================
  // Gender Change
  // =========================

  const handleGenderChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    if (value === "পুরুষ") {
      setGender({
        name_bn: "পুরুষ",
        name_en: "Male",
      });
    } else if (value === "নারী") {
      setGender({
        name_bn: "নারী",
        name_en: "Female",
      });
    } else if (value === "তৃতীয় লিঙ্গ") {
      setGender({
        name_bn: "তৃতীয় লিঙ্গ",
        name_en: "Third Gender",
      });
    } else {
      setGender({
        name_bn: "",
        name_en: "",
      });
    }
  };

  // =========================
  // Preview
  // =========================

  const handlePreview = () => {
    const applicationData = {
      // Personal
      banglaName,
      englishName,
      nicknameBn,
      nicknameEn,
      birthRegNo,
      birthDate,
      gender,

      // Address
      birthAddress,
      permanentAddress,
      presentAddress,

      // Parents
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

      // Image / Documents
      image,
      preview,
      files,

      // Applicant
      applicantRelation,
      applicantName,

      // Declaration
      applicantsDeclaration,
      isAgreed,
    };

    navigate("/same-name-certificate-preview", {
      state: applicationData,
    });
  };

  return (
    <div className="birth-registration-form">

      <h2>একই নামে সনদ পত্রের জন্য আবেদন</h2>

      {/* =========================
          Personal Information
      ========================== */}

      <SameNameCertificatePersonalInfo
        banglaName={banglaName}
        setBanglaName={setBanglaName}
        englishName={englishName}
        setEnglishName={setEnglishName}
        nicknameBn={nicknameBn}
        setNicknameBn={setNicknameBn}
        nicknameEn={nicknameEn}
        setNicknameEn={setNicknameEn}
        birthRegNo={birthRegNo}
        setBirthRegNo={setBirthRegNo}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        gender={gender}
        handleGenderChange={handleGenderChange}
        errors={{}}
      />

      {/* =========================
          Birth Address
      ========================== */}

      <AddressForm
        title="জন্মস্থানের ঠিকানাঃ"
        address={birthAddress}
        setAddress={setBirthAddress}
        errors={{}}
      />

      {/* =========================
          Parent Information
      ========================== */}

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

      {/* =========================
          Birth Address = Permanent
      ========================== */}

      <label className="same-address">
        <input
          type="checkbox"
          checked={birthSameAsPermanent}
          onChange={(e) => {
            const checked = e.target.checked;

            setBirthSameAsPermanent(checked);

            if (checked) {
              setPermanentAddress({
                ...birthAddress,
              });
            }
          }}
        />

        জন্মস্থানের ঠিকানা ও স্থায়ী ঠিকানা একই হলে টিকচিহ্ন দাওঃ
      </label>

      {/* =========================
          Permanent Address
      ========================== */}

      <AddressForm
        title="স্থায়ী ঠিকানাঃ"
        address={permanentAddress}
        setAddress={setPermanentAddress}
        disabled={birthSameAsPermanent}
        errors={{}}
      />

      {/* =========================
          Permanent Address = Present
      ========================== */}

      <label className="same-address">
        <input
          type="checkbox"
          checked={permanentSameAsPresent}
          onChange={(e) => {
            const checked = e.target.checked;

            setPermanentSameAsPresent(checked);

            if (checked) {
              setPresentAddress({
                ...permanentAddress,
              });
            }
          }}
        />

        স্থায়ী ঠিকানা ও বর্তমান ঠিকানা একই হলে টিকচিহ্ন দাওঃ
      </label>

      {/* =========================
          Present Address
      ========================== */}

      <AddressForm
        title="বর্তমান ঠিকানাঃ"
        address={presentAddress}
        setAddress={setPresentAddress}
        disabled={permanentSameAsPresent}
        errors={{}}
      />

      {/* =========================
          Image + Documents
      ========================== */}

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

      {/* =========================
          Applicant Declaration
      ========================== */}

      <ApplicantsDeclaration
        banglaName={banglaName}
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

      {/* =========================
          Preview Button
      ========================== */}

      <button
        type="button"
        onClick={handlePreview}
      >
        প্রিভিউ দেখুন
      </button>

    </div>
  );
};

export default SameNameCertificate;