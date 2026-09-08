import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/banupcis.css";
import AddressForm from "./AddressForm";
import "../css/banupcis.css";
import ParentInfoForm from "./ParentInfoForm";
import ImageUpload from "./PhotoUpload";
import DocumentsUpload from "./DocumentsUpload";
import ApplicantsDeclaration from "./ApplicantsDeclaration";


function TradeLicenseApplication() {
  const navigate = useNavigate();
  const handlePreview = () => {
  navigate("/trade-license-preview", {
    state: {
      // ব্যবসার তথ্য
      businessNameBn,
      businessNameEn,
      businessTypeBn,
      businessTypeEn,
      businessStartDate,
      capitalAmount,

      // ব্যবসায়ীর ব্যক্তিগত তথ্য
      banglaName,
      englishName,
      birthRegNo,
      birthDate,
      gender,
      ocupation,

      // পিতা-মাতার তথ্য
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

      // ঠিকানা
      businessAddress,
      permanentAddress,
      presentAddress,

      // ছবি
      ownerImage,
      ownerPreview,

      // ডকুমেন্ট
      documents,

      // আবেদনকারীর প্রত্যয়ন
      applicantsDeclaration,
      applicantRelation,
      applicantName,
      isAgreed,
    },
  });
};
  
  // ব্যবসার নাম
  const [businessNameBn, setBusinessNameBn] = useState("");
  const [businessNameEn, setBusinessNameEn] = useState("");

  // ব্যবসার ধরন
  const [businessTypeBn, setBusinessTypeBn] = useState("");
  const [businessTypeEn, setBusinessTypeEn] = useState("");

  // ব্যবসায়ীর ব্যক্তিগত তথ্য
  const [banglaName, setBanglaName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [birthRegNo, setBirthRegNo] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [gender, setGender] = useState({
    name_bn: "",
    name_en: "",
  });

  const [ocupation, setOcupation] = useState("");

  // ব্যবসার অন্যান্য তথ্য
  const [businessStartDate, setBusinessStartDate] = useState("");
  const [capitalAmount, setCapitalAmount] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!businessNameBn.trim()) {
      newErrors.businessNameBn = "ব্যবসার নাম বাংলায় লিখুন";
    }

    if (!businessNameEn.trim()) {
      newErrors.businessNameEn = "ব্যবসার নাম ইংরেজিতে লিখুন";
    }

    if (!businessTypeBn.trim()) {
      newErrors.businessTypeBn = "ব্যবসার ধরন বাংলায় লিখুন";
    }

    if (!businessTypeEn.trim()) {
      newErrors.businessTypeEn = "ব্যবসার ধরন ইংরেজিতে লিখুন";
    }

    if (!banglaName.trim()) {
      newErrors.banglaName = "ব্যবসায়ীর নাম বাংলায় লিখুন";
    }

    if (!englishName.trim()) {
      newErrors.englishName = "ব্যবসায়ীর নাম ইংরেজিতে লিখুন";
    }

    if (!birthRegNo.trim()) {
      newErrors.birthRegNo =
        "জন্ম নিবন্ধন নম্বর লিখুন";
    } else if (birthRegNo.length !== 17) {
      newErrors.birthRegNo =
        "জন্ম নিবন্ধন নম্বর ১৭ সংখ্যার হতে হবে";
    }

    if (!birthDate) {
      newErrors.birthDate = "জন্ম তারিখ নির্বাচন করুন";
    }

    if (!gender.name_bn) {
      newErrors.gender = "লিঙ্গ নির্বাচন করুন";
    }

    if (!ocupation) {
      newErrors.ocupation = "পেশা নির্বাচন করুন";
    }

    if (!businessStartDate) {
      newErrors.businessStartDate =
        "ব্যবসা শুরুর তারিখ নির্বাচন করুন";
    }

    if (!capitalAmount) {
      newErrors.capitalAmount =
        "মূলধনের পরিমাণ লিখুন";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const applicationData = {
      id: Date.now(),
      businessNameBn,
      businessNameEn,
      businessTypeBn,
      businessTypeEn,
      banglaName,
      englishName,
      birthRegNo,
      birthDate,
      gender,
      ocupation,
      businessStartDate,
      capitalAmount,
      ownerPreview,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const existingApplications = JSON.parse(
      localStorage.getItem(
        "tradeLicenseApplications"
      ) || "[]"
    );
    existingApplications.push(applicationData);
    localStorage.setItem(
      "tradeLicenseApplications",
      JSON.stringify(existingApplications)
    );

    alert("ব্যবসা নিবন্ধনের আবেদন সফলভাবে সংরক্ষণ করা হয়েছে।");

    // Form reset
    setBusinessNameBn("");
    setBusinessNameEn("");
    setBusinessTypeBn("");
    setBusinessTypeEn("");
    setBanglaName("");
    setEnglishName("");
    setBirthRegNo("");
    setBirthDate("");

    setGender({
      name_bn: "",
      name_en: "",
    });

    setOcupation("");
    setBusinessStartDate("");
    setCapitalAmount("");
    setErrors({});
  };
  const [businessAddress, setBusinessAddress] = useState({
  country: {
    name_bn: "",
    name_en: "",
  },
  division: {
    name_bn: "",
    name_en: "",
  },
  district: {
    name_bn: "",
    name_en: "",
  },
  upazila: {
    name_bn: "",
    name_en: "",
  },
  union: {
    name_bn: "",
    name_en: "",
  },
  ward: "",
  postOfficeBn: "",
  postOfficeEn: "",
  villageBn: "",
  villageEn: "",
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
  country: {
    name_bn: "",
    name_en: "",
  },
  division: {
    name_bn: "",
    name_en: "",
  },
  district: {
    name_bn: "",
    name_en: "",
  },
  upazila: {
    name_bn: "",
    name_en: "",
  },
  union: {
    name_bn: "",
    name_en: "",
  },
  ward: "",
  postOfficeBn: "",
  postOfficeEn: "",
  villageBn: "",
  villageEn: "",
  houseHoldingNoBn: "",
  houseHoldingNoEn: "",
});
const [presentAddress, setPresentAddress] = useState({
  country: { name_bn: "", name_en: "" },
  division: { name_bn: "", name_en: "" },
  district: { name_bn: "", name_en: "" },
  upazila: { name_bn: "", name_en: "" },
  union: { name_bn: "", name_en: "" },
  ward: "",
  postOfficeBn: "",
  postOfficeEn: "",
  villageBn: "",
  villageEn: "",
  houseHoldingNoBn: "",
  houseHoldingNoEn: "",
});
const [ownerImage, setOwnerImage] = useState(null);
const [ownerPreview, setOwnerPreview] = useState("");
const [documents, setDocuments] = useState([]);
const [applicantsDeclaration, setApplicantsDeclaration] = useState("");
const [applicantRelation, setApplicantRelation] = useState("");
const [applicantName, setApplicantName] = useState("");
const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div className="title">
      <h1>ব্যবসা নিবন্ধনের জন্য আবেদন করুনঃ</h1>

      <p className="Cetezon-Personal-InFormation">
        ব্যবসার ব্যক্তিগত তথ্যঃ
      </p>

      <form onSubmit={handleSubmit}>

        {/* ব্যবসার নাম */}
        <div className="form-row-group">

          <div className="form-row">
            <label>
              ব্যবসার নাম লিখুন (বাংলায়)
            </label>

            <input
              type="text"
              placeholder="ব্যবসার নাম বাংলায় লিখুন"
              value={businessNameBn}
              onChange={(e) =>
                setBusinessNameBn(e.target.value)
              }
            />

            {errors.businessNameBn && (
              <p className="error">
                {errors.businessNameBn}
              </p>
            )}
          </div>

          <div className="form-row">
            <label>
              Write Business Name in (English)
            </label>

            <input
              type="text"
              placeholder="Write Business Name in English"
              value={businessNameEn}
              onChange={(e) =>
                setBusinessNameEn(e.target.value)
              }
            />

            {errors.businessNameEn && (
              <p className="error">
                {errors.businessNameEn}
              </p>
            )}
          </div>

        </div>

        {/* ব্যবসার ধরন */}
        <div className="form-row-group">

          <div className="form-row">
            <label>
              ব্যবসার ধরন (বাংলায়)
            </label>

            <input
              type="text"
              placeholder="ব্যবসার ধরন বাংলায় লিখুন"
              value={businessTypeBn}
              onChange={(e) =>
                setBusinessTypeBn(e.target.value)
              }
            />

            {errors.businessTypeBn && (
              <p className="error">
                {errors.businessTypeBn}
              </p>
            )}
          </div>

          <div className="form-row">
            <label>
              Business Type (English)
            </label>

            <input
              type="text"
              placeholder="Write Business Type in English"
              value={businessTypeEn}
              onChange={(e) =>
                setBusinessTypeEn(e.target.value)
              }
            />

            {errors.businessTypeEn && (
              <p className="error">
                {errors.businessTypeEn}
              </p>
            )}
          </div>

        </div>

        {/* ব্যবসায়ীর নাম */}
        <div className="form-row-group">

          <div className="form-row">
            <label>
              ব্যবসায়ীর নাম লিখুন (বাংলায়)
            </label>

            <input
              type="text"
              placeholder="ব্যবসায়ীর নাম বাংলায় লিখুন"
              value={banglaName}
              onChange={(e) =>
                setBanglaName(e.target.value)
              }
            />

            {errors.banglaName && (
              <p className="error">
                {errors.banglaName}
              </p>
            )}
          </div>

          <div className="form-row">
            <label>
              Write Businessman's Name in (English)
            </label>

            <input
              type="text"
              placeholder="Write Businessman's Name in English"
              value={englishName}
              onChange={(e) =>
                setEnglishName(e.target.value)
              }
            />

            {errors.englishName && (
              <p className="error">
                {errors.englishName}
              </p>
            )}
          </div>

        </div>

        {/* জন্ম নিবন্ধন + জন্ম তারিখ */}
        <div className="form-row-group">

          <div className="form-row">
            <label>
              ১৭ ডিজিটের জন্ম নিবন্ধন নম্বর
            </label>

            <input
              type="text"
              placeholder="১৭ সংখ্যার জন্ম নিবন্ধন নম্বর লিখুন"
              maxLength={17}
              value={birthRegNo}
              onChange={(e) =>
                setBirthRegNo(e.target.value)
              }
            />

            {errors.birthRegNo && (
              <p className="error">
                {errors.birthRegNo}
              </p>
            )}
          </div>

          <div className="form-row">
            <label>জন্ম তারিখ</label>

            <input
              type="date"
              value={birthDate}
              onChange={(e) =>
                setBirthDate(e.target.value)
              }
            />

            {errors.birthDate && (
              <p className="error">
                {errors.birthDate}
              </p>
            )}
          </div>

        </div>

        {/* লিঙ্গ + পেশা */}
        <div className="form-row-group">

          <div className="form-row">
            <label>লিঙ্গ:</label>

            <select
              value={gender.name_bn}
              onChange={handleGenderChange}
            >
              <option value="">
                লিঙ্গ নির্বাচন করুন
              </option>

              <option value="পুরুষ">
                পুরুষ
              </option>

              <option value="নারী">
                নারী
              </option>

              <option value="তৃতীয় লিঙ্গ">
                তৃতীয় লিঙ্গ
              </option>
            </select>

            {errors.gender && (
              <p className="error">
                {errors.gender}
              </p>
            )}
          </div>

          <div className="form-row">
            <label>পেশা:</label>

            <select
              value={ocupation}
              onChange={(e) =>
                setOcupation(e.target.value)
              }
            >
              <option value="">
                পেশা নির্বাচন করুন
              </option>

              <option value="কৃষক">
                কৃষক
              </option>

              <option value="শ্রমিক">
                শ্রমিক
              </option>

              <option value="চাকুরিজীবী">
                চাকুরিজীবী
              </option>

              <option value="ব্যবসায়ী">
                ব্যবসায়ী
              </option>

              <option value="অন্যান্য">
                অন্যান্য
              </option>
            </select>

            {errors.ocupation && (
              <p className="error">
                {errors.ocupation}
              </p>
            )}
          </div>

        </div>

        {/* ব্যবসা শুরুর তারিখ + মূলধন */}
        <div className="form-row-group">

          <div className="form-row">
            <label>
              ব্যবসা শুরুর তারিখ
            </label>

            <input
              type="date"
              value={businessStartDate}
              onChange={(e) =>
                setBusinessStartDate(e.target.value)
              }
            />

            {errors.businessStartDate && (
              <p className="error">
                {errors.businessStartDate}
              </p>
            )}
          </div>

          <div className="form-row">
            <label>
              মূলধনের পরিমাণ
            </label>

            <input
              type="number"
              min="0"
              placeholder="মূলধনের পরিমাণ লিখুন"
              value={capitalAmount}
              onChange={(e) =>
                setCapitalAmount(e.target.value)
              }
            />

            {errors.capitalAmount && (
              <p className="error">
                {errors.capitalAmount}
              </p>
            )}
          </div>

        </div>
<AddressForm
  title="ব্যবসায়িক ঠিকানাঃ"
  address={businessAddress}
  setAddress={setBusinessAddress}
  businessAddress={true}
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
<AddressForm
  title="ব্যবসায়িক মালিকের স্থায়ী ঠিকানাঃ"
  address={permanentAddress}
  setAddress={setPermanentAddress}
  errors={{}}
/>
<AddressForm
  title="ব্যবসায়িক মালিকের বর্তমান ঠিকানাঃ"
  address={presentAddress}
  setAddress={setPresentAddress}
  errors={{}}
/>
<div className="form-row-group">

  <div className="form-row">
    <ImageUpload
      image={ownerImage}
      setImage={setOwnerImage}
      preview={ownerPreview}
      setPreview={setOwnerPreview}
      title="মালিকের ছবি আপলোড করুন"
      errors={{}}
    />
  </div>

  <div className="form-row">
    <DocumentsUpload
      files={documents}
      setFiles={setDocuments}
      errors={{}}
    />
  </div>
</div>
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
       {/* Preview Button */}
<div className="form-submit">
  <button
    type="button"
    onClick={handlePreview}
  >
    প্রিভিউ দেখুন
  </button>
</div>
      </form>
      
    </div>
  );
}

export default TradeLicenseApplication;