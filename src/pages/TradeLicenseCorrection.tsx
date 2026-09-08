import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CertificateCorrection.css";

import AddressForm from "../components/AddressForm";
import DocumentsUpload from "../components/DocumentsUpload";
import ApplicantsDeclaration from "../components/ApplicantsDeclaration";

const TradeLicenseCorrection: React.FC = () => {
  const navigate = useNavigate();

  // ==================================================
  // Trade License অনুসন্ধান
  // ==================================================
  const [tradeLicenseNo, setTradeLicenseNo] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // ==================================================
  // অনুসন্ধানের ফলাফল
  // ==================================================
  const [tradeLicenseData, setTradeLicenseData] =
    useState<any>(null);

  const [message, setMessage] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  // ==================================================
  // ব্যবসার তথ্য
  // ==================================================
  const [businessNameBn, setBusinessNameBn] =
    useState("");

  const [businessNameEn, setBusinessNameEn] =
    useState("");

  const [businessTypeBn, setBusinessTypeBn] =
    useState("");

  const [businessTypeEn, setBusinessTypeEn] =
    useState("");

  const [businessStartDate, setBusinessStartDate] =
    useState("");

  const [capitalAmount, setCapitalAmount] =
    useState("");

  // ==================================================
  // ব্যবসায়ীর ব্যক্তিগত তথ্য
  // ==================================================
  const [banglaName, setBanglaName] =
    useState("");

  const [englishName, setEnglishName] =
    useState("");

  const [birthRegNo, setBirthRegNo] =
    useState("");

  const [ownerBirthDate, setOwnerBirthDate] =
    useState("");

  const [gender, setGender] = useState({
    name_bn: "",
    name_en: "",
  });

  const [ocupation, setOcupation] =
    useState("");

  // ==================================================
  // পিতার তথ্য
  // ==================================================
  const [fatherBRN, setFatherBRN] =
    useState("");

  const [fatherBirthDate, setFatherBirthDate] =
    useState("");

  const [fatherNameBeg, setFatherNameBeg] =
    useState("");

  const [fatherNameEn, setFatherNameEn] =
    useState("");

  const [fatherNationality, setFatherNationality] =
    useState("");

  // ==================================================
  // মাতার তথ্য
  // ==================================================
  const [motherBRN, setMotherBRN] =
    useState("");

  const [motherBirthDate, setMotherBirthDate] =
    useState("");

  const [motherName, setMotherName] =
    useState("");

  const [motherNameEn, setMotherNameEn] =
    useState("");

  const [motherNationality, setMotherNationality] =
    useState("");

  // ==================================================
  // Address
  // ==================================================
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

  const [businessAddress, setBusinessAddress] =
    useState({
      ...emptyAddress,
    });

  const [presentAddress, setPresentAddress] =
    useState({
      ...emptyAddress,
    });

  const [permanentAddress, setPermanentAddress] =
    useState({
      ...emptyAddress,
    });

  // ==================================================
  // Address Correction
  // ==================================================
  const [businessAddressCorrection, setBusinessAddressCorrection] =
    useState(false);

  const [presentAddressCorrection, setPresentAddressCorrection] =
    useState(false);

  const [permanentAddressCorrection, setPermanentAddressCorrection] =
    useState(false);

  // ==================================================
  // Correction Table
  // ==================================================
  const [corrections, setCorrections] = useState([
    {
      field: "",
      value: "",
      reason: "",
    },
  ]);

  // ==================================================
  // Documents
  // ==================================================
  const [files, setFiles] = useState<any[]>([]);

  // ==================================================
  // Declaration
  // ==================================================
  const [applicantRelation, setApplicantRelation] =
    useState("");

  const [applicantName, setApplicantName] =
    useState("");

  const [isAgreed, setIsAgreed] =
    useState(false);

  // ==================================================
  // Trade License অনুসন্ধান
  // ==================================================
  const handleSearch = () => {
    if (!tradeLicenseNo.trim()) {
      alert("ট্রেড লাইসেন্স নম্বর লিখুন।");
      return;
    }

    if (!birthDate) {
      alert("মালিকের জন্ম তারিখ নির্বাচন করুন।");
      return;
    }

    const applications = JSON.parse(
      localStorage.getItem(
        "tradeLicenseApplications"
      ) || "[]"
    );

    const registerBook = JSON.parse(
      localStorage.getItem(
        "tradeLicenseRegisterBook"
      ) || "[]"
    );

    // প্রথমে Register Book থেকে খোঁজা হবে
    let record = registerBook.find(
      (item: any) =>
        item.tradeLicenseNo === tradeLicenseNo &&
        item.birthDate === birthDate
    );

    // Register Book-এ না পাওয়া গেলে Applications থেকে খোঁজা হবে
    if (!record) {
      record = applications.find(
        (item: any) =>
          item.tradeLicenseNo === tradeLicenseNo &&
          item.birthDate === birthDate
      );
    }

    if (record) {
      setTradeLicenseData(record);
      setMessage("");

      // ==================================================
      // ব্যবসার তথ্য
      // ==================================================
      setBusinessNameBn(
        record.businessNameBn || ""
      );

      setBusinessNameEn(
        record.businessNameEn || ""
      );

      setBusinessTypeBn(
        record.businessTypeBn || ""
      );

      setBusinessTypeEn(
        record.businessTypeEn || ""
      );

      setBusinessStartDate(
        record.businessStartDate || ""
      );

      setCapitalAmount(
        record.capitalAmount || ""
      );

      // ==================================================
      // মালিকের ব্যক্তিগত তথ্য
      // ==================================================
      setBanglaName(
        record.banglaName ||
          record.ownerNameBn ||
          ""
      );

      setEnglishName(
        record.englishName ||
          record.ownerNameEn ||
          ""
      );

      setBirthRegNo(
        record.birthRegNo || ""
      );

      setOwnerBirthDate(
        record.birthDate || ""
      );

      setGender(
        record.gender || {
          name_bn: "",
          name_en: "",
        }
      );

      setOcupation(
        record.ocupation ||
          record.occupation ||
          ""
      );

      // ==================================================
      // পিতার তথ্য
      // ==================================================
      setFatherBRN(
        record.fatherBRN || ""
      );

      setFatherBirthDate(
        record.fatherBirthDate || ""
      );

      setFatherNameBeg(
        record.fatherNameBeg || ""
      );

      setFatherNameEn(
        record.fatherNameEn || ""
      );

      setFatherNationality(
        record.fatherNationality || ""
      );

      // ==================================================
      // মাতার তথ্য
      // ==================================================
      setMotherBRN(
        record.motherBRN || ""
      );

      setMotherBirthDate(
        record.motherBirthDate || ""
      );

      setMotherName(
        record.motherName || ""
      );

      setMotherNameEn(
        record.motherNameEn || ""
      );

      setMotherNationality(
        record.motherNationality || ""
      );

      // ==================================================
      // ঠিকানা
      // ==================================================
      setBusinessAddress(
        record.businessAddress || {
          ...emptyAddress,
        }
      );

      setPresentAddress(
        record.presentAddress || {
          ...emptyAddress,
        }
      );

      setPermanentAddress(
        record.permanentAddress || {
          ...emptyAddress,
        }
      );

      // ==================================================
      // Correction Reset
      // ==================================================
      setIsSelected(false);

      setBusinessAddressCorrection(false);
      setPresentAddressCorrection(false);
      setPermanentAddressCorrection(false);

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
      setTradeLicenseData(null);
      setMessage(
        "কোনো ট্রেড লাইসেন্স রেকর্ড পাওয়া যায়নি।"
      );
    }
  };

  // ==================================================
  // নতুন Correction Row
  // ==================================================
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

  // ==================================================
  // Correction Row Delete
  // ==================================================
  const removeCorrection = (
    index: number
  ) => {
    setCorrections(
      corrections.filter(
        (_, i) => i !== index
      )
    );
  };

  // ==================================================
  // Correction Submit
  // ==================================================
  const handleSubmit = () => {
    if (!tradeLicenseData) {
      alert(
        "প্রথমে ট্রেড লাইসেন্স নির্বাচন করুন।"
      );
      return;
    }

    if (!isAgreed) {
      alert(
        "আবেদন জমা দেওয়ার আগে আবেদনকারীর ঘোষণা গ্রহণ করুন।"
      );
      return;
    }

    const correctionApplications =
      JSON.parse(
        localStorage.getItem(
          "tradeLicenseCorrectionApplications"
        ) || "[]"
      );

    const applicationNo = String(
      correctionApplications.length + 1
    ).padStart(3, "0");

    const application = {
      applicationNo,

      applicationDate:
        new Date().toLocaleDateString(
          "en-CA"
        ),

      // ==================================================
      // Original Trade License
      // ==================================================
      tradeLicenseNo:
        tradeLicenseData.tradeLicenseNo,

      originalTradeLicenseNo:
        tradeLicenseData.tradeLicenseNo,

      originalApplication:
        tradeLicenseData,

      // ==================================================
      // ব্যবসার তথ্য
      // ==================================================
      businessNameBn,
      businessNameEn,
      businessTypeBn,
      businessTypeEn,
      businessStartDate,
      capitalAmount,

      // ==================================================
      // মালিকের তথ্য
      // ==================================================
      banglaName,
      englishName,
      birthRegNo,
      birthDate: ownerBirthDate,
      gender,
      ocupation,

      // ==================================================
      // পিতার তথ্য
      // ==================================================
      fatherBRN,
      fatherBirthDate,
      fatherNameBeg,
      fatherNameEn,
      fatherNationality,

      // ==================================================
      // মাতার তথ্য
      // ==================================================
      motherBRN,
      motherBirthDate,
      motherName,
      motherNameEn,
      motherNationality,

      // ==================================================
      // Address
      // ==================================================
      businessAddress,
      presentAddress,
      permanentAddress,

      businessAddressCorrection,
      presentAddressCorrection,
      permanentAddressCorrection,

      // ==================================================
      // Correction
      // ==================================================
      corrections,

      // ==================================================
      // Documents
      // ==================================================
      files,

      // ==================================================
      // Declaration
      // ==================================================
      applicantRelation,
      applicantName,
      isAgreed,

      // ==================================================
      // Status
      // ==================================================
      applicationType: "Correction",
      status: "Pending",
      paymentStatus: "Unpaid",
      registerUpdateStatus: false,
      correctedCertificateStatus: false,
    };

    correctionApplications.unshift(
      application
    );

    localStorage.setItem(
      "tradeLicenseCorrectionApplications",
      JSON.stringify(
        correctionApplications
      )
    );

    alert(
      "ট্রেড লাইসেন্স সংশোধনের আবেদন সফলভাবে জমা হয়েছে।"
    );

    navigate(
      "/trade-license-correction-list"
    );
  };

  return (
    <div className="correction-container">

      <h2>
        ট্রেড লাইসেন্স সংশোধনের জন্য আবেদন
      </h2>

      {/* ==================================================
          Search Section
          ================================================== */}

      {!isSelected && (
        <>
          <table className="correction-table">
            <tbody>

              <tr>
                <td>
                  ট্রেড লাইসেন্স নম্বর
                </td>

                <td>
                  <input
                    type="text"
                    value={tradeLicenseNo}
                    onChange={(e) =>
                      setTradeLicenseNo(
                        e.target.value
                      )
                    }
                    placeholder="ট্রেড লাইসেন্স নম্বর লিখুন"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  মালিকের জন্ম তারিখ
                </td>

                <td>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) =>
                      setBirthDate(
                        e.target.value
                      )
                    }
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
              onClick={() =>
                navigate(
                  "/union-admin-dashboard"
                )
              }
            >
              ↩ ড্যাশবোর্ডে ফিরে যান
            </button>

          </div>

          {/* ==================================================
              Search Result
              ================================================== */}

          {tradeLicenseData && (
            <div className="correction-result">

              <h3>
                ট্রেড লাইসেন্সের তথ্য
              </h3>

              <table className="correction-table">

                <tbody>

                  <tr>
                    <td>
                      ট্রেড লাইসেন্স নম্বর
                    </td>
                    <td>
                      {
                        tradeLicenseData.tradeLicenseNo
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>
                      ব্যবসার নাম
                    </td>
                    <td>
                      {
                        tradeLicenseData.businessNameBn
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>
                      মালিকের নাম
                    </td>
                    <td>
                      {
                        tradeLicenseData.banglaName ||
                        tradeLicenseData.ownerNameBn ||
                        "-"
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>
                      ব্যবসার ধরন
                    </td>
                    <td>
                      {
                        tradeLicenseData.businessTypeBn
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>
                      জন্ম নিবন্ধন নম্বর
                    </td>
                    <td>
                      {
                        tradeLicenseData.birthRegNo
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>
                      জন্ম তারিখ
                    </td>
                    <td>
                      {
                        tradeLicenseData.birthDate
                      }
                    </td>
                  </tr>

                </tbody>

              </table>

              <div className="correction-buttons">

                <button
                  className="preview-btn"
                  onClick={() => {

                    if (
                      window.confirm(
                        "আপনি কি এই ট্রেড লাইসেন্স সংশোধনের জন্য আবেদন করতে চান?"
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

      {/* ==================================================
          Correction Form
          ================================================== */}

      {isSelected && (
        <div className="correction-container">

          <h3>
            সংশোধনের বিষয় নির্বাচন করুন
          </h3>

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

              {corrections.map(
                (item, index) => (

                  <tr key={index}>

                    <td>

                      <select
                        value={item.field}
                        onChange={(e) => {

                          const list =
                            [...corrections];

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

                        {/* ব্যবসার তথ্য */}

                        <option value="businessNameBn">
                          ব্যবসার নাম (বাংলা)
                        </option>

                        <option value="businessNameEn">
                          ব্যবসার নাম (ইংরেজি)
                        </option>

                        <option value="businessTypeBn">
                          ব্যবসার ধরন (বাংলা)
                        </option>

                        <option value="businessTypeEn">
                          ব্যবসার ধরন (ইংরেজি)
                        </option>

                        <option value="businessStartDate">
                          ব্যবসা শুরুর তারিখ
                        </option>

                        <option value="capitalAmount">
                          মূলধনের পরিমাণ
                        </option>

                        {/* মালিকের তথ্য */}

                        <option value="banglaName">
                          মালিকের নাম (বাংলা)
                        </option>

                        <option value="englishName">
                          মালিকের নাম (ইংরেজি)
                        </option>

                        <option value="birthRegNo">
                          জন্ম নিবন্ধন নম্বর
                        </option>

                        <option value="birthDate">
                          জন্ম তারিখ
                        </option>

                        <option value="gender">
                          লিঙ্গ
                        </option>

                        <option value="ocupation">
                          পেশা
                        </option>

                        {/* পিতার তথ্য */}

                        <option value="fatherBRN">
                          পিতার জন্ম নিবন্ধন নম্বর
                        </option>

                        <option value="fatherBirthDate">
                          পিতার জন্ম তারিখ
                        </option>

                        <option value="fatherNameBeg">
                          পিতার নাম (বাংলা)
                        </option>

                        <option value="fatherNameEn">
                          পিতার নাম (ইংরেজি)
                        </option>

                        <option value="fatherNationality">
                          পিতার জাতীয়তা
                        </option>

                        {/* মাতার তথ্য */}

                        <option value="motherBRN">
                          মাতার জন্ম নিবন্ধন নম্বর
                        </option>

                        <option value="motherBirthDate">
                          মাতার জন্ম তারিখ
                        </option>

                        <option value="motherName">
                          মাতার নাম (বাংলা)
                        </option>

                        <option value="motherNameEn">
                          মাতার নাম (ইংরেজি)
                        </option>

                        <option value="motherNationality">
                          মাতার জাতীয়তা
                        </option>

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

                          const list =
                            [...corrections];

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

                          const list =
                            [...corrections];

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

                    <td>

                      <button
                        type="button"
                        onClick={() =>
                          removeCorrection(
                            index
                          )
                        }
                        disabled={
                          corrections.length === 1
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

          <button
            className="preview-btn"
            type="button"
            onClick={addCorrection}
          >
            + আরো তথ্য যোগ করুন
          </button>

          <br />
          <br />

          {/* ==================================================
              Address Correction
              ================================================== */}

          <h3>
            ঠিকানা সংশোধন
          </h3>

          <div className="address-checkbox">

            {/* ব্যবসায়িক ঠিকানা */}

            <label>

              <input
                type="checkbox"
                checked={
                  businessAddressCorrection
                }
                onChange={(e) =>
                  setBusinessAddressCorrection(
                    e.target.checked
                  )
                }
              />

              ব্যবসায়িক ঠিকানা সংশোধন

            </label>

            {businessAddressCorrection && (
              <AddressForm
                title="ব্যবসায়িক ঠিকানা"
                address={businessAddress}
                setAddress={
                  setBusinessAddress
                }
                disabled={false}
                errors={{}}
              />
            )}

            {/* বর্তমান ঠিকানা */}

            <label>

              <input
                type="checkbox"
                checked={
                  presentAddressCorrection
                }
                onChange={(e) =>
                  setPresentAddressCorrection(
                    e.target.checked
                  )
                }
              />

              বর্তমান ঠিকানা সংশোধন

            </label>

            {presentAddressCorrection && (
              <AddressForm
                title="বর্তমান ঠিকানা"
                address={presentAddress}
                setAddress={
                  setPresentAddress
                }
                disabled={false}
                errors={{}}
              />
            )}

            {/* স্থায়ী ঠিকানা */}

            <label>

              <input
                type="checkbox"
                checked={
                  permanentAddressCorrection
                }
                onChange={(e) =>
                  setPermanentAddressCorrection(
                    e.target.checked
                  )
                }
              />

              স্থায়ী ঠিকানা সংশোধন

            </label>

            {permanentAddressCorrection && (
              <AddressForm
                title="স্থায়ী ঠিকানা"
                address={permanentAddress}
                setAddress={
                  setPermanentAddress
                }
                disabled={false}
                errors={{}}
              />
            )}

          </div>

          {/* ==================================================
              Documents
              ================================================== */}

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

          {/* ==================================================
              Declaration
              ================================================== */}

          <ApplicantsDeclaration
            banglaName={banglaName}
            applicantsDeclaration=""
            setApplicantsDeclaration={() => {}}
            applicantRelation={
              applicantRelation
            }
            setApplicantRelation={
              setApplicantRelation
            }
            applicantName={applicantName}
            setApplicantName={
              setApplicantName
            }
            isAgreed={isAgreed}
            setIsAgreed={setIsAgreed}
            errors={{}}
          />

          {/* ==================================================
              Submit
              ================================================== */}

          <div className="correction-buttons">

            <button
              className="preview-btn"
              disabled={!isAgreed}
              onClick={handleSubmit}
            >
              আবেদন জমা দিন
            </button>

            <button
              className="preview-btn"
              onClick={() =>
                setIsSelected(false)
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

export default TradeLicenseCorrection;