import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CertificateCorrection.css";

import PersonalInform from "../components/PersonalInform";
import AddressForm from "../components/AddressForm";
import DocumentsUpload from "../components/DocumentsUpload";
import ApplicantsDeclaration from "../components/ApplicantsDeclaration";

function CertificateCorrection() {
  const navigate = useNavigate();

  // Search
  const [certificateNo, setCertificateNo] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // Search Result
  const [citizenData, setCitizenData] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  // Personal Information
  const [banglaName, setBanglaName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [birthRegNo, setBirthRegNo] = useState("");
  const [ocupation, setOcupation] = useState("");
  const [qualification, setQualification] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const [gender, setGender] = useState({
    name_bn: "",
    name_en: "",
  });

  // Address
  const emptyAddress = {
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
  };

  const [birthAddress, setBirthAddress] = useState({ ...emptyAddress });
  const [presentAddress, setPresentAddress] = useState({ ...emptyAddress });
  const [permanentAddress, setPermanentAddress] = useState({ ...emptyAddress });

  // Address Correction
  const [birthAddressCorrection, setBirthAddressCorrection] =
    useState(false);
  const [presentAddressCorrection, setPresentAddressCorrection] =
    useState(false);
  const [permanentAddressCorrection, setPermanentAddressCorrection] =
    useState(false);

  // Correction Table
  const [corrections, setCorrections] = useState([
    {
      field: "",
      value: "",
      reason: "",
    },
  ]);

  // Documents
  const [files, setFiles] = useState<any[]>([]);

  // Declaration
  const [applicantRelation, setApplicantRelation] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const handleSearch = () => {
  if (!certificateNo.trim()) {
    alert("১৭ ডিজিটের নাগরিক সনদ নম্বর লিখুন।");
    return;
  }

  if (certificateNo.length !== 17) {
    alert("নাগরিক সনদ নম্বর অবশ্যই ১৭ ডিজিটের হতে হবে।");
    return;
  }

  if (!birthDate) {
    alert("জন্ম তারিখ নির্বাচন করুন।");
    return;
  }

  const applications = JSON.parse(
    localStorage.getItem("citizenApplications") || "[]"
  );

  const record = applications.find(
    (app: any) =>
      app.registerStatus === true &&
      app.registerNo === certificateNo &&
      app.birthDate === birthDate
  );

  if (record) {
    // Search Result
    setCitizenData(record);
    setMessage("");

    // Personal Information
    setBanglaName(record.banglaName || "");
    setEnglishName(record.englishName || "");
    setBirthRegNo(record.birthRegNo || "");
    setBirthDate(record.birthDate || "");
    setOcupation(record.ocupation || "");
    setQualification(record.qualification || "");
    setGender(
      record.gender || {
        name_bn: "",
        name_en: "",
      }
    );
    setBloodGroup(record.bloodGroup || "");

    // Address
    setBirthAddress(record.birthAddress || { ...emptyAddress });
    setPresentAddress(record.presentAddress || { ...emptyAddress });
    setPermanentAddress(record.permanentAddress || { ...emptyAddress });

    // Reset Form
    setIsSelected(false);
    setCorrections([
      {
        field: "",
        value: "",
        reason: "",
      },
    ]);
  } else {
    setCitizenData(null);
    setMessage("কোনো রেকর্ড পাওয়া যায়নি।");
  }
};

const addCorrection = () => {
  const last = corrections[corrections.length - 1];

  if (!last.field || !last.value || !last.reason) {
    alert("আগের সারির তথ্য সম্পূর্ণ করুন।");
    return;
  }

  setCorrections([
    ...corrections,
    {
      field: "",
      value: "",
      reason: "",
    },
  ]);
};

const removeCorrection = (index: number) => {
  setCorrections(corrections.filter((_, i) => i !== index));
};

const handleSubmit = () => {
  if (!citizenData) {
    alert("প্রথমে নাগরিক নির্বাচন করুন।");
    return;
  }

  if (!isAgreed) {
    alert("আবেদন জমা দেওয়ার আগে আবেদনকারীর ঘোষণা গ্রহণ করুন।");
    return;
  }

  const correctionApplications = JSON.parse(
    localStorage.getItem("certificateCorrectionApplications") || "[]"
  );

  const applicationNo = String(
    correctionApplications.length + 1
  ).padStart(3, "0");

  const application = {
    applicationNo,
    applicationDate: new Date().toLocaleDateString("en-CA"),

    certificateNo: citizenData.registerNo,
      originalRegisterNo: citizenData.registerNo,
       paymentStatus: false,
       registerUpdateStatus: false,
      correctedCertificateStatus: false,

    banglaName,
    englishName,
    birthRegNo,
    birthDate,
    ocupation,
    qualification,
    gender,
    bloodGroup,

    birthAddress,
    presentAddress,
    permanentAddress,

    birthAddressCorrection,
    presentAddressCorrection,
    permanentAddressCorrection,

    corrections,

    files,

    applicantRelation,
    applicantName,
    applicationType: "Correction",
    status: "Pending",
  };

  correctionApplications.unshift(application);

  localStorage.setItem(
    "certificateCorrectionApplications",
    JSON.stringify(correctionApplications)
  );

  alert("নাগরিক সনদ সংশোধনের আবেদন সফলভাবে জমা হয়েছে।");

  navigate("/certificate-correction-list");
};

return (
  <div className="correction-container">

    <h2>নাগরিক সনদ সংশোধনের জন্য আবেদন</h2>

{!isSelected &&(
  <>
    <table className="correction-table">
      <tbody>
      
        <tr>
          <td>নাগরিক সনদ নম্বর (১৭ ডিজিট)</td>
          <td>
            <input
              type="text"
              value={certificateNo}
              onChange={(e) => setCertificateNo(e.target.value)}
              maxLength={17}
              placeholder="১৭ ডিজিটের সনদ নম্বর লিখুন"
            />
          </td>
        </tr>

        <tr>
          <td>জন্ম তারিখ</td>
          <td>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
               
            />
          </td>
        </tr>

      </tbody>
    </table>

    {message && (
      <p
        style={{
          color: "red",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        {message}
      </p>
    )}

    <div className="correction-buttons">
      <button
        className="preview-btn"
        onClick={handleSearch}
        
      >
        🔍 অনুসন্ধান করুন
      </button>

      <button
        className="preview-btn"
        onClick={() => navigate("/union-admin-dashboard")}
      >
        ↩ ড্যাশবোর্ডে ফিরে যান
      </button>
     
    </div>
 
    {citizenData && (
      <div className="correction-result">

        <h3>নাগরিকের তথ্য</h3>

        <table className="correction-table">
          <tbody>

            <tr>
              <td>বাংলা নাম</td>
              <td>{citizenData.banglaName}</td>
            </tr>
            <tr>
              <td>পিতার নাম</td>
              <td>{citizenData.fatherNameBeg}</td>
            </tr>

            <tr>
              <td>মাতার নাম</td>
              <td>{citizenData.motherName}</td>
            </tr>

          </tbody>
        </table>

        <div className="correction-buttons">
          <button
            className="preview-btn"
            onClick={() => {
              if (
                window.confirm(
                  "আপনি কি নাগরিক সনদ সংশোধনের জন্য আবেদন করতে চান?"
                )
              ) {
                setIsSelected(true);
              }
            }}
          >
            নির্বাচন করুন
          </button>
        </div>

      </div>
    )}
  </>
)}
    
{isSelected && (
  <div className="correction-container">

    <h3>সংশোধনের বিষয় নির্বাচন করুন</h3>

    <table className="correction-table">
      <thead>
        <tr>
          <th>বিষয়</th>
          <th>নতুন তথ্য</th>
          <th>সংশোধনের কারণ</th>
          <th>ডিলিট</th>
        </tr>
      </thead>

      <tbody>

        {corrections.map((item, index) => (
          <tr key={index}>

            <td>
              <select
                value={item.field}
                onChange={(e) => {
                  const list = [...corrections];
                  list[index].field = e.target.value;
                  setCorrections(list);
                }}
              >
                <option value="">বিষয় নির্বাচন করুন</option>

                <option value="banglaName">বাংলা নাম</option>
                <option value="englishName">ইংরেজি নাম</option>
                <option value="birthRegNo">জন্ম নিবন্ধন নম্বর</option>
                <option value="birthDate">জন্ম তারিখ</option>
                <option value="gender">লিঙ্গ</option>
                <option value="occupation">পেশা</option>
                <option value="qualification">শিক্ষাগত যোগ্যতা</option>
                <option value="bloodGroup">রক্তের গ্রুপ</option>

                <option value="fatherName">পিতার নাম</option>
                <option value="fatherNationality">পিতার জাতীয়তা</option>

                <option value="motherName">মাতার নাম</option>
                <option value="motherNationality">মাতার জাতীয়তা</option>
              </select>
            </td>

            <td>
              <input
                type="text"
                value={item.value}
                disabled={!item.field}
                placeholder={
                  item.field
                    ? "নতুন তথ্য লিখুন"
                    : "আগে বিষয় নির্বাচন করুন"
                }
                onChange={(e) => {
                  const list = [...corrections];
                  list[index].value = e.target.value;
                  setCorrections(list);
                }}
              />
            </td>

            <td>
              <input
                type="text"
                value={item.reason}
                disabled={!item.field}
                placeholder={
                  item.field
                    ? "সংশোধনের কারণ লিখুন"
                    : "আগে বিষয় নির্বাচন করুন"
                }
                onChange={(e) => {
                  const list = [...corrections];
                  list[index].reason = e.target.value;
                  setCorrections(list);
                }}
              />
            </td>

            <td>
              <button
                type="button"
                onClick={() => removeCorrection(index)}
                disabled={corrections.length === 1}
              >
                🗑
              </button>
            </td>

          </tr>
        ))}

      </tbody>
    </table>

    <br />

    <button
      className="preview-btn"
      type="button"
      onClick={addCorrection}
    >
      + আরো তথ্য যোগ করুন
    </button>

    <br />
    <br />
        <h3>ঠিকানা সংশোধন</h3>

    <div className="address-checkbox">

      <label>
        <input
          type="checkbox"
          checked={birthAddressCorrection}
          onChange={(e) =>
            setBirthAddressCorrection(e.target.checked)
          }
        />
        জন্মস্থানের ঠিকানা সংশোধন
      </label>

      {birthAddressCorrection && (
        <AddressForm
          title="জন্মস্থানের ঠিকানা"
          address={birthAddress}
          setAddress={setBirthAddress}
          disabled={false}
          errors={{}}
        />
      )}

      <label>
        <input
          type="checkbox"
          checked={presentAddressCorrection}
          onChange={(e) =>
            setPresentAddressCorrection(e.target.checked)
          }
        />
        বর্তমান ঠিকানা সংশোধন
      </label>

      {presentAddressCorrection && (
        <AddressForm
          title="বর্তমান ঠিকানা"
          address={presentAddress}
          setAddress={setPresentAddress}
          disabled={false}
          errors={{}}
        />
      )}

      <label>
        <input
          type="checkbox"
          checked={permanentAddressCorrection}
          onChange={(e) =>
            setPermanentAddressCorrection(e.target.checked)
          }
        />
        স্থায়ী ঠিকানা সংশোধন
      </label>

      {permanentAddressCorrection && (
        <AddressForm
          title="স্থায়ী ঠিকানা"
          address={permanentAddress}
          setAddress={setPermanentAddress}
          disabled={false}
          errors={{}}
        />
      )}

    </div>

    <h3>প্রয়োজনীয় নথি সংযুক্ত করুন</h3>

    <p>
      সংশোধনের পক্ষে প্রয়োজনীয় প্রমাণপত্র নির্বাচন করে আপলোড করুন।
    </p>

    <DocumentsUpload
      files={files}
      setFiles={setFiles}
      errors={{}}
    />

    <ApplicantsDeclaration
      banglaName={banglaName}
      applicantsDeclaration=""
      setApplicantsDeclaration={() => {}}
      applicantRelation={applicantRelation}
      setApplicantRelation={setApplicantRelation}
      applicantName={applicantName}
      setApplicantName={setApplicantName}
      isAgreed={isAgreed}
      setIsAgreed={setIsAgreed}
      errors={{}}
    />

    <div className="correction-buttons">

      <button
        className="preview-btn"
        disabled={!isAgreed}
        onClick={handleSubmit}
      >
        আবেদন জমা দিন
      </button>

    </div>

  </div>
)}

</div>
);
}

export default CertificateCorrection;
