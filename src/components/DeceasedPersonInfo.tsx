
import React, { useState } from "react";
import "../css/DeceasedPersonInfo.css";
import ParentInfoForm from "./ParentInfoForm";
import AddressForm from "./AddressForm";
import ImageUpload from "./PhotoUpload";
import DocumentsUpload from "./DocumentsUpload";
import ApplicantsDeclaration from "./ApplicantsDeclaration";
import { useNavigate } from "react-router-dom";
import WarishCertificatePreview from "./WarishCertificatePreview";

type DeceasedField =
  | "deceasedNameBn"
  | "deceasedNameEn"
  | "deathRegistrationNo"
  | "deathDate"
  | "gender";

interface DeceasedPersonInfoProps {
  deceasedNameBn: string;
  deceasedNameEn: string;
  deathRegistrationNo: string;
  deathDate: string;
  gender: string;
  onChange: (
    field: DeceasedField,
    value: string
  ) => void;
}

interface Heir {
  id: number;
  nameBn: string;
  nameEn: string;
  relation: string;
  birthDate: string;
  birthId: string;
  status: string;
}

const relationOptions = [
  { value: "wife", label: "স্ত্রী" },
  { value: "husband", label: "স্বামী" },
  { value: "son", label: "ছেলে" },
  { value: "daughter", label: "মেয়ে" },
  { value: "brother", label: "ভাই" },
  { value: "sister", label: "বোন" },
  { value: "father", label: "পিতা" },
  { value: "mother", label: "মাতা" },
  { value: "brother_son", label: "ভাইয়ের ছেলে" },
  { value: "brother_daughter", label: "ভাইয়ের মেয়ে" },
  { value: "sister_son", label: "বোনের ছেলে" },
  { value: "sister_daughter", label: "বোনের মেয়ে" },
  { value: "other", label: "অন্যান্য" },
];

const statusOptions = [
  { value: "alive", label: "জীবিত" },
  { value: "deceased", label: "মৃত" },
];

const DeceasedPersonInfo: React.FC<
  DeceasedPersonInfoProps
> = ({
  deceasedNameBn,
  deceasedNameEn,
  deathRegistrationNo,
  deathDate,
  gender,
  onChange,
}) => {
  const navigate = useNavigate();
  const deathRegistrationError =
    deathRegistrationNo.length > 0 &&
    deathRegistrationNo.length !== 17;

  const [heirs, setHeirs] = useState<Heir[]>([
    {
      id: Date.now(),
      nameBn: "",
      nameEn: "",
      relation: "",
      birthDate: "",
      birthId: "",
      status: "",
    },
  ]);

  const handleHeirChange = (
    id: number,
    field: keyof Heir,
    value: string
  ) => {
    setHeirs((prev) =>
      prev.map((heir) =>
        heir.id === id
          ? {
              ...heir,
              [field]: value,
            }
          : heir
      )
    );
  };

  const handleAddHeir = () => {
    setHeirs((prev) => [
      ...prev,
      {
        id: Date.now() + prev.length,
        nameBn: "",
        nameEn: "",
        relation: "",
        birthDate: "",
        birthId: "",
        status: "",
      },
    ]);
  };
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
const [applicantImage, setApplicantImage] = useState(null);
const [applicantPreview, setApplicantPreview] = useState("");
const [documents, setDocuments] = useState([]);
const [applicantsDeclaration, setApplicantsDeclaration] = useState("");
const [applicantRelation, setApplicantRelation] = useState("");
const [applicantName, setApplicantName] = useState("");
const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div className="deceased-info-container">
      <h1 className="deceased-info-title">
        ওয়ারিশ সনদের জন্য আবেদন করুন
      </h1>

      {/* মৃত ব্যক্তির ব্যক্তিগত তথ্য */}
      <h2 className="deceased-info-subtitle">
        মৃত ব্যক্তির ব্যক্তিগত তথ্যঃ
      </h2>

      <div className="deceased-info-columns">
        <div className="deceased-info-column">
          <div className="deceased-info-row">
            <label>নাম (বাংলা)</label>
            <span>:</span>

            <input
              type="text"
              value={deceasedNameBn}
              onChange={(e) =>
                onChange(
                  "deceasedNameBn",
                  e.target.value
                )
              }
              placeholder="মৃত ব্যক্তির নাম বাংলায় লিখুন"
            />
          </div>

          <div className="deceased-info-row">
            <label>মৃত্যু নিবন্ধন নম্বর</label>
            <span>:</span>

            <div className="deceased-input-group">
              <input
                type="text"
                inputMode="numeric"
                maxLength={17}
                value={deathRegistrationNo}
                onChange={(e) =>
                  onChange(
                    "deathRegistrationNo",
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="১৭ সংখ্যার মৃত্যু নিবন্ধন নম্বর"
              />

              {deathRegistrationError && (
                <small className="deceased-error">
                  মৃত্যু নিবন্ধন নম্বর অবশ্যই ১৭ সংখ্যার
                  হতে হবে।
                </small>
              )}
            </div>
          </div>

          <div className="deceased-info-row">
            <label>লিঙ্গ</label>
            <span>:</span>

            <select
              value={gender}
              onChange={(e) =>
                onChange("gender", e.target.value)
              }
            >
              <option value="">
                লিঙ্গ নির্বাচন করুন
              </option>
              <option value="female">নারী</option>
              <option value="male">পুরুষ</option>
              <option value="third">
                তৃতীয় লিঙ্গ
              </option>
            </select>
          </div>
        </div>

        <div className="deceased-info-column">
          <div className="deceased-info-row">
            <label>নাম (ইংরেজি)</label>
            <span>:</span>

            <input
              type="text"
              value={deceasedNameEn}
              onChange={(e) =>
                onChange(
                  "deceasedNameEn",
                  e.target.value
                )
              }
              placeholder="Deceased person's name"
            />
          </div>

          <div className="deceased-info-row">
            <label>মৃত্যুর তারিখ</label>
            <span>:</span>

            <input
              type="date"
              value={deathDate}
              onChange={(e) =>
                onChange(
                  "deathDate",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>

      {/* ওয়ারিশদের তালিকা */}
      <div className="heir-list-section">
        <h2 className="heir-list-title">
          ওয়ারিশদের তালিকা
        </h2>

        <div className="heir-table-wrapper">
          <table className="heir-table">
            <thead>
              <tr>
                <th>ক্রমিক নং</th>
                <th>ওয়ারিশের নাম (বাংলা)</th>
                <th>ওয়ারিশের নাম (ইংরেজি)</th>
                <th>মৃত ব্যক্তির সাথে সম্পর্ক</th>
                <th>জন্ম তারিখ</th>
                <th>জন্ম নিবন্ধন / আইডি নম্বর</th>
                <th>বর্তমান অবস্থা</th>
              </tr>
            </thead>

            <tbody>
              {heirs.map((heir, index) => (
                <tr key={heir.id}>
                  <td className="heir-serial-number">
                    {index + 1}
                  </td>

                  <td>
                    <input
                      type="text"
                      value={heir.nameBn}
                      onChange={(e) =>
                        handleHeirChange(
                          heir.id,
                          "nameBn",
                          e.target.value
                        )
                      }
                      placeholder="বাংলায় নাম"
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={heir.nameEn}
                      onChange={(e) =>
                        handleHeirChange(
                          heir.id,
                          "nameEn",
                          e.target.value
                        )
                      }
                      placeholder="Name in English"
                    />
                  </td>

                  <td>
                    <select
                      value={heir.relation}
                      onChange={(e) =>
                        handleHeirChange(
                          heir.id,
                          "relation",
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        সম্পর্ক নির্বাচন করুন
                      </option>

                      {relationOptions.map(
                        (relation) => (
                          <option
                            key={relation.value}
                            value={relation.value}
                          >
                            {relation.label}
                          </option>
                        )
                      )}
                    </select>
                  </td>

                  <td>
                    <input
                      type="date"
                      value={heir.birthDate}
                      onChange={(e) =>
                        handleHeirChange(
                          heir.id,
                          "birthDate",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={heir.birthId}
                      onChange={(e) =>
                        handleHeirChange(
                          heir.id,
                          "birthId",
                          e.target.value
                        )
                      }
                      placeholder="নম্বর"
                    />
                  </td>

                  <td>
                    <select
                      value={heir.status}
                      onChange={(e) =>
                        handleHeirChange(
                          heir.id,
                          "status",
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        অবস্থা নির্বাচন করুন
                      </option>

                      {statusOptions.map(
                        (status) => (
                          <option
                            key={status.value}
                            value={status.value}
                          >
                            {status.label}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="heir-add-button-wrapper">
          <button
            type="button"
            className="heir-add-button"
            onClick={handleAddHeir}
          >
            + আরো ওয়ারিশ যোগ করুন
          </button>
        </div>
      </div>
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
  title="মৃত ব্যক্তির স্থায়ী ঠিকানাঃ"
  address={permanentAddress}
  setAddress={setPermanentAddress}
  errors={{}}
/>
    <div className="applicant-upload-row">
  <ImageUpload
    image={applicantImage}
    setImage={setApplicantImage}
    preview={applicantPreview}
    setPreview={setApplicantPreview}
    title="আবেদনকারীর ছবি আপলোড করুন"
    errors={{}}
  />

  <DocumentsUpload
    files={documents}
    setFiles={setDocuments}
    errors={{}}
  />
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
<div className="submit-button-wrapper">
  <button
    type="button"
    className="submit-button"
    onClick={() =>
      navigate("/warish-certificate-preview", {
        state: {
  deceasedNameBn,
  deceasedNameEn,
  deathRegistrationNo,
  deathDate,
  gender,

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

  heirs,
  permanentAddress,
  applicantPreview,
  documents,
  applicantsDeclaration,
  applicantRelation,
  applicantName,
  isAgreed,
},
      })
    }
  >
    প্রিভিউ দেখুন
  </button>
</div>
    </div>
  );
};

export default DeceasedPersonInfo;

