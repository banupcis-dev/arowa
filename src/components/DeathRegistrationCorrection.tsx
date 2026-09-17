import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CertificateCorrection.css";

import AddressForm from "../components/AddressForm";
import DocumentsUpload from "../components/DocumentsUpload";
import ApplicantsDeclaration from "../components/ApplicantsDeclaration";

const DeathRegistrationCorrection: React.FC = () => {
  const navigate = useNavigate();

  // =========================================================
  // Search
  // =========================================================
  const [deathRegistrationNo, setDeathRegistrationNo] = useState("");
  const [deathDateSearch, setDeathDateSearch] = useState("");

  const [deathRegistrationData, setDeathRegistrationData] =
    useState<any>(null);

  const [message, setMessage] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  // =========================================================
  // Death Information
  // জন্ম নিবন্ধন থেকে আসা তথ্য এখানে পরিবর্তনযোগ্য নয়
  // =========================================================
  const [deathDate, setDeathDate] = useState("");
  const [deathCause, setDeathCause] = useState("");

  // =========================================================
  // Spouse Information
  // =========================================================
  const [spouseBirthRegistrationNo, setSpouseBirthRegistrationNo] =
    useState("");

  const [spouseBirthDate, setSpouseBirthDate] = useState("");
  const [spouseNameBn, setSpouseNameBn] = useState("");
  const [spouseNameEn, setSpouseNameEn] = useState("");

  // =========================================================
  // Address
  // =========================================================
  const emptyAddress = {
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

    villageBn: "",
    villageEn: "",

    postOfficeBn: "",
    postOfficeEn: "",

    houseHoldingNoBn: "",
    houseHoldingNoEn: "",
  };

  const [deathAddress, setDeathAddress] = useState({
    ...emptyAddress,
  });

  const [residenceAddress, setResidenceAddress] = useState({
    ...emptyAddress,
  });

  const [deathAddressCorrection, setDeathAddressCorrection] =
    useState(false);

  const [residenceAddressCorrection, setResidenceAddressCorrection] =
    useState(false);

  // =========================================================
  // Correction List
  // =========================================================
  const [corrections, setCorrections] = useState([
    {
      field: "",
      value: "",
      reason: "",
    },
  ]);

  // =========================================================
  // Documents
  // =========================================================
  const [files, setFiles] = useState<any[]>([]);

  // =========================================================
  // Applicant
  // =========================================================
  const [applicantRelation, setApplicantRelation] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  // =========================================================
  // Search Death Registration
  // মৃত্যু নিবন্ধন নম্বর + মৃত্যুর তারিখ দিয়ে অনুসন্ধান
  // =========================================================
  const handleSearch = () => {
    if (!deathRegistrationNo.trim()) {
      alert("মৃত্যু নিবন্ধন নম্বর / জন্ম নিবন্ধন নম্বর লিখুন।");
      return;
    }

    if (!deathDateSearch) {
      alert("মৃত্যুর তারিখ নির্বাচন করুন।");
      return;
    }

    const applications = JSON.parse(
      localStorage.getItem("deathRegistrationApplications") || "[]"
    );

    // শুধুমাত্র Registered record
    const registeredApplications = applications.filter(
      (item: any) => item.status === "Registered"
    );

    // মৃত্যু নিবন্ধন নম্বর + মৃত্যুর তারিখ দিয়ে খোঁজা
    const record = registeredApplications.find(
      (item: any) =>
        String(
          item.registerNo ||
            item.birthRegistrationNo
        ) === String(deathRegistrationNo.trim()) &&
        String(item.deathDate) ===
          String(deathDateSearch)
    );

    if (record) {
      setDeathRegistrationData(record);
      setMessage("");

      // =====================================================
      // শুধু মৃত্যু নিবন্ধনের নিজস্ব তথ্য
      // =====================================================
      setDeathDate(record.deathDate || "");
      setDeathCause(record.deathCause || "");

      // =====================================================
      // Spouse
      // =====================================================
      setSpouseBirthRegistrationNo(
        record.spouseBirthRegistrationNo || ""
      );

      setSpouseBirthDate(
        record.spouseBirthDate || ""
      );

      setSpouseNameBn(
        record.spouseNameBn || ""
      );

      setSpouseNameEn(
        record.spouseNameEn || ""
      );

      // =====================================================
      // Address
      // =====================================================
      setDeathAddress(
        record.deathAddress || {
          ...emptyAddress,
        }
      );

      setResidenceAddress(
        record.residenceAddress || {
          ...emptyAddress,
        }
      );

      setIsSelected(false);

      setDeathAddressCorrection(false);
      setResidenceAddressCorrection(false);

      // Correction reset
      setCorrections([
        {
          field: "",
          value: "",
          reason: "",
        },
      ]);

      setFiles([]);

      setApplicantRelation("");
      setApplicantName("");
      setIsAgreed(false);
    } else {
      setDeathRegistrationData(null);

      setMessage(
        "কোনো নিবন্ধিত মৃত্যু নিবন্ধনের রেকর্ড পাওয়া যায়নি।"
      );
    }
  };

  // =========================================================
  // Add Correction
  // =========================================================
  const addCorrection = () => {
    const last =
      corrections[corrections.length - 1];

    if (
      !last.field ||
      !last.value ||
      !last.reason
    ) {
      alert(
        "আগের সারির তথ্য সম্পূর্ণ করুন।"
      );
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

  // =========================================================
  // Remove Correction
  // =========================================================
  const removeCorrection = (
    index: number
  ) => {
    setCorrections(
      corrections.filter(
        (_, i) => i !== index
      )
    );
  };

  // =========================================================
  // Submit Correction
  // =========================================================
  const handleSubmit = () => {
    if (!deathRegistrationData) {
      alert(
        "প্রথমে মৃত্যু নিবন্ধন নির্বাচন করুন।"
      );
      return;
    }

    if (!isAgreed) {
      alert(
        "আবেদন জমা দেওয়ার আগে আবেদনকারীর ঘোষণা গ্রহণ করুন।"
      );
      return;
    }

    const validCorrections =
      corrections.filter(
        (item) =>
          item.field &&
          item.value &&
          item.reason
      );

    if (
      validCorrections.length === 0 &&
      !deathAddressCorrection &&
      !residenceAddressCorrection
    ) {
      alert(
        "কমপক্ষে একটি সংশোধনের বিষয় নির্বাচন করুন।"
      );
      return;
    }

    // =====================================================
    // Existing Correction Applications
    // =====================================================
    const correctionApplications =
      JSON.parse(
        localStorage.getItem(
          "deathRegistrationCorrectionApplications"
        ) || "[]"
      );

    const applicationNo = String(
      correctionApplications.length + 1
    ).padStart(3, "0");

    // =====================================================
    // Correction Application
    // =====================================================
    const application = {
      applicationNo,

      applicationDate:
        new Date().toLocaleDateString(
          "en-CA"
        ),

      // ===================================================
      // মৃত্যু নিবন্ধন নম্বর = জন্ম নিবন্ধন নম্বর
      // ===================================================
      deathRegistrationNo:
        deathRegistrationData.registerNo ||
        deathRegistrationData.birthRegistrationNo,

      birthRegistrationNo:
        deathRegistrationData.birthRegistrationNo ||
        deathRegistrationData.registerNo,

      originalDeathRegistrationNo:
        deathRegistrationData.registerNo ||
        deathRegistrationData.birthRegistrationNo,

      // Original registered record
      originalApplication:
        deathRegistrationData,

      // ===================================================
      // গুরুত্বপূর্ণ:
      // জন্ম নিবন্ধনের Master তথ্য এখানে পরিবর্তন হবে না
      // ===================================================
      deceasedNameBn:
        deathRegistrationData.deceasedNameBn ||
        "",

      deceasedNameEn:
        deathRegistrationData.deceasedNameEn ||
        "",

      fatherName:
        deathRegistrationData.fatherName ||
        deathRegistrationData.fatherNameBeg ||
        "",

      motherName:
        deathRegistrationData.motherName ||
        "",

      gender:
        deathRegistrationData.gender ||
        "",

      birthDate:
        deathRegistrationData.birthDate ||
        "",

      // ===================================================
      // Death Information
      // ===================================================
      deathDate,
      deathCause,

      // ===================================================
      // Spouse Information
      // ===================================================
      spouseBirthRegistrationNo,
      spouseBirthDate,
      spouseNameBn,
      spouseNameEn,

      // ===================================================
      // Address
      // ===================================================
      deathAddress,
      residenceAddress,

      deathAddressCorrection,
      residenceAddressCorrection,

      // ===================================================
      // Correction Items
      // ===================================================
      corrections: validCorrections,

      // ===================================================
      // Documents
      // ===================================================
      files,

      // ===================================================
      // Applicant
      // ===================================================
      applicantRelation,
      applicantName,
      isAgreed,

      // ===================================================
      // Status
      // ===================================================
      applicationType: "Correction",
      status: "Pending",

      paymentStatus: "Unpaid",

      registerUpdateStatus: false,

      correctedCertificateStatus: false,
    };

    // নতুন আবেদন শুরুতে
    correctionApplications.unshift(
      application
    );

    localStorage.setItem(
      "deathRegistrationCorrectionApplications",
      JSON.stringify(
        correctionApplications
      )
    );

    alert(
      "মৃত্যু নিবন্ধন সংশোধনের আবেদন সফলভাবে জমা হয়েছে।"
    );

    navigate(
      "/death-registration-correction-list"
    );
  };

  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="correction-container">

      <h2>
        মৃত্যু নিবন্ধন সংশোধনের জন্য আবেদন
      </h2>

      {/* =================================================== */}
      {/* Search Section */}
      {/* =================================================== */}
      {!isSelected && (
        <>
          <table className="correction-table">
            <tbody>

              <tr>
                <td>
                  মৃত্যু নিবন্ধন নম্বর
                </td>

                <td>
                  <input
                    type="text"
                    value={
                      deathRegistrationNo
                    }
                    onChange={(e) =>
                      setDeathRegistrationNo(
                        e.target.value
                      )
                    }
                    placeholder="জন্ম নিবন্ধন নম্বর লিখুন"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  মৃত্যুর তারিখ
                </td>

                <td>
                  <input
                    type="date"
                    value={
                      deathDateSearch
                    }
                    onChange={(e) =>
                      setDeathDateSearch(
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>

            </tbody>
          </table>

          {/* Message */}
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

          {/* Buttons */}
          <div className="correction-buttons">

            <button
              className="preview-btn"
              onClick={handleSearch}
            >
              🔍 অনুসন্ধান করুন
            </button>

            <button
              className="preview-btn"
              onClick={() =>
                navigate(
                  "/union-admin-dashboard"
                )
              }
            >
              ↩ ড্যাশবোর্ডে ফিরে যান
            </button>

          </div>

          {/* ================================================= */}
          {/* Search Result */}
          {/* ================================================= */}
          {deathRegistrationData && (
            <div className="correction-result">

              <h3>
                মৃত্যু নিবন্ধনের তথ্য
              </h3>

              <table className="correction-table">
                <tbody>

                  <tr>
                    <td>
                      নিবন্ধন নম্বর
                    </td>

                    <td>
                      {deathRegistrationData.registerNo ||
                        deathRegistrationData.birthRegistrationNo ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      মৃত ব্যক্তির নাম
                    </td>

                    <td>
                      {deathRegistrationData.deceasedNameBn ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      জন্ম তারিখ
                    </td>

                    <td>
                      {deathRegistrationData.birthDate ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      পিতার নাম
                    </td>

                    <td>
                      {deathRegistrationData.fatherName ||
                        deathRegistrationData.fatherNameBeg ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      মাতার নাম
                    </td>

                    <td>
                      {deathRegistrationData.motherName ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      মৃত্যুর তারিখ
                    </td>

                    <td>
                      {deathRegistrationData.deathDate ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      মৃত্যুর কারণ
                    </td>

                    <td>
                      {deathRegistrationData.deathCause ||
                        "-"}
                    </td>
                  </tr>

                </tbody>
              </table>

              {/* Select */}
              <div className="correction-buttons">

                <button
                  className="preview-btn"
                  onClick={() => {

                    if (
                      window.confirm(
                        "আপনি কি এই মৃত্যু নিবন্ধন সংশোধনের জন্য আবেদন করতে চান?"
                      )
                    ) {
                      setIsSelected(
                        true
                      );
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

      {/* =================================================== */}
      {/* Correction Form */}
      {/* =================================================== */}
      {isSelected && (
        <div className="correction-container">

          <h3>
            সংশোধনের বিষয় নির্বাচন করুন
          </h3>

          {/* ================================================= */}
          {/* Correction Table */}
          {/* ================================================= */}
          <table className="correction-table">

            <thead>
              <tr>

                <th>
                  বিষয়
                </th>

                <th>
                  নতুন তথ্য
                </th>

                <th>
                  সংশোধনের কারণ
                </th>

                <th>
                  ডিলিট
                </th>

              </tr>
            </thead>

            <tbody>

              {corrections.map(
                (item, index) => (
                  <tr key={index}>

                    {/* Subject */}
                    <td>

                      <select
                        value={
                          item.field
                        }
                        onChange={(e) => {

                          const list = [
                            ...corrections,
                          ];

                          list[index] = {
                            ...list[index],
                            field:
                              e.target.value,
                          };

                          setCorrections(
                            list
                          );

                        }}
                      >

                        <option value="">
                          বিষয় নির্বাচন করুন
                        </option>

                        {/* =================================
                            শুধু মৃত্যু নিবন্ধনের নিজস্ব তথ্য
                            ================================= */}

                        <option value="deathDate">
                          মৃত্যুর তারিখ
                        </option>

                        <option value="deathCause">
                          মৃত্যুর কারণ
                        </option>

                        <option value="spouseBirthRegistrationNo">
                          স্বামী/স্ত্রীর জন্ম নিবন্ধন নম্বর
                        </option>

                        <option value="spouseBirthDate">
                          স্বামী/স্ত্রীর জন্ম তারিখ
                        </option>

                        <option value="spouseNameBn">
                          স্বামী/স্ত্রীর নাম (বাংলা)
                        </option>

                        <option value="spouseNameEn">
                          স্বামী/স্ত্রীর নাম (ইংরেজি)
                        </option>

                      </select>

                    </td>

                    {/* New Value */}
                    <td>

                      <input
                        type="text"
                        value={
                          item.value
                        }
                        disabled={
                          !item.field
                        }
                        placeholder={
                          item.field
                            ? "নতুন তথ্য লিখুন"
                            : "আগে বিষয় নির্বাচন করুন"
                        }
                        onChange={(e) => {

                          const list = [
                            ...corrections,
                          ];

                          list[index] = {
                            ...list[index],
                            value:
                              e.target.value,
                          };

                          setCorrections(
                            list
                          );

                        }}
                      />

                    </td>

                    {/* Reason */}
                    <td>

                      <input
                        type="text"
                        value={
                          item.reason
                        }
                        disabled={
                          !item.field
                        }
                        placeholder={
                          item.field
                            ? "সংশোধনের কারণ লিখুন"
                            : "আগে বিষয় নির্বাচন করুন"
                        }
                        onChange={(e) => {

                          const list = [
                            ...corrections,
                          ];

                          list[index] = {
                            ...list[index],
                            reason:
                              e.target.value,
                          };

                          setCorrections(
                            list
                          );

                        }}
                      />

                    </td>

                    {/* Delete */}
                    <td>

                      <button
                        type="button"
                        onClick={() =>
                          removeCorrection(
                            index
                          )
                        }
                        disabled={
                          corrections.length ===
                          1
                        }
                      >
                        🗑
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>
          </table>

          <br />

          {/* Add More */}
          <button
            className="preview-btn"
            type="button"
            onClick={addCorrection}
          >
            + আরো তথ্য যোগ করুন
          </button>

          <br />
          <br />

          {/* ================================================= */}
          {/* Address Correction */}
          {/* ================================================= */}
          <h3>
            ঠিকানা সংশোধন
          </h3>

          <div className="address-checkbox">

            {/* Death Address */}
            <label>

              <input
                type="checkbox"
                checked={
                  deathAddressCorrection
                }
                onChange={(e) =>
                  setDeathAddressCorrection(
                    e.target.checked
                  )
                }
              />

              মৃত্যুর স্থানের ঠিকানা সংশোধন

            </label>

            {deathAddressCorrection && (
              <AddressForm
                title="মৃত্যুর স্থানের ঠিকানা"
                address={
                  deathAddress
                }
                setAddress={
                  setDeathAddress
                }
                disabled={false}
                errors={{}}
              />
            )}

            {/* Residence Address */}
            <label>

              <input
                type="checkbox"
                checked={
                  residenceAddressCorrection
                }
                onChange={(e) =>
                  setResidenceAddressCorrection(
                    e.target.checked
                  )
                }
              />

              মৃত্যুর সময় বসবাসের ঠিকানা সংশোধন

            </label>

            {residenceAddressCorrection && (
              <AddressForm
                title="মৃত্যুর সময় বসবাসের ঠিকানা"
                address={
                  residenceAddress
                }
                setAddress={
                  setResidenceAddress
                }
                disabled={false}
                errors={{}}
              />
            )}

          </div>

          {/* ================================================= */}
          {/* Documents */}
          {/* ================================================= */}
          <h3>
            প্রয়োজনীয় নথি সংযুক্ত করুন
          </h3>

          <p>
            সংশোধনের পক্ষে প্রয়োজনীয়
            প্রমাণপত্র নির্বাচন করে আপলোড করুন।
          </p>

          <DocumentsUpload
            files={files}
            setFiles={setFiles}
            errors={{}}
          />

          {/* ================================================= */}
          {/* Applicant Declaration */}
          {/* ================================================= */}
          <ApplicantsDeclaration
            banglaName={
              deathRegistrationData?.deceasedNameBn ||
              ""
            }
            applicantsDeclaration=""
            setApplicantsDeclaration={() => {}}
            applicantRelation={
              applicantRelation
            }
            setApplicantRelation={
              setApplicantRelation
            }
            applicantName={
              applicantName
            }
            setApplicantName={
              setApplicantName
            }
            isAgreed={
              isAgreed
            }
            setIsAgreed={
              setIsAgreed
            }
            errors={{}}
          />

          {/* ================================================= */}
          {/* Buttons */}
          {/* ================================================= */}
          <div className="correction-buttons">

            <button
              className="preview-btn"
              disabled={!isAgreed}
              onClick={
                handleSubmit
              }
            >
              আবেদন জমা দিন
            </button>

            <button
              className="preview-btn"
              onClick={() =>
                setIsSelected(
                  false
                )
              }
            >
              ↩ ফিরে যান
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default DeathRegistrationCorrection;