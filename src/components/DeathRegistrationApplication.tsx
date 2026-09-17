
import { useState } from "react";
import Swal from "sweetalert2";
import "../css/banupcis.css";
import AddressForm from "./AddressForm";
import DocumentsUpload from "./DocumentsUpload";
import ApplicantsDeclaration from "./ApplicantsDeclaration";


interface AddressData {
  country: {
    name_bn: string;
    name_en: string;
  };
  division: {
    name_bn: string;
    name_en: string;
  };
  district: {
    name_bn: string;
    name_en: string;
  };
  upazila: {
    name_bn: string;
    name_en: string;
  };
  union: {
    name_bn: string;
    name_en: string;
  };
  ward: string;
  villageBn: string;
  villageEn: string;
  postOfficeBn: string;
  postOfficeEn: string;
  houseHoldingNoBn: string;
  houseHoldingNoEn: string;
}

const emptyAddress: AddressData = {
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

function DeathRegistrationApplication() {
  // =========================
  // Search
  // =========================
  const [birthRegistrationNo, setBirthRegistrationNo] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchDone, setSearchDone] = useState(false);

  // =========================
  // Selected Person
  // =========================
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);

  // =========================
  // Death Information
  // =========================
  const [deathDate, setDeathDate] = useState("");
  const [deathCause, setDeathCause] = useState("");

  // =========================
  // Spouse Information
  // =========================
  const [spouseBirthRegistrationNo, setSpouseBirthRegistrationNo] =
    useState("");

  const [spouseBirthDate, setSpouseBirthDate] = useState("");
  const [spouseNameBn, setSpouseNameBn] = useState("");
  const [spouseNameEn, setSpouseNameEn] = useState("");

  // =========================
  // Address
  // =========================
  const [deathAddress, setDeathAddress] =
    useState<AddressData>(emptyAddress);

  const [residenceAddress, setResidenceAddress] =
    useState<AddressData>(emptyAddress);

  const [sameAddress, setSameAddress] = useState(false);

  // =========================
  // Documents
  // =========================
  const [documents, setDocuments] = useState<any[]>([]);

  const [applicantRelation, setApplicantRelation] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantsDeclaration, setApplicantsDeclaration] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  // =========================================================
  // Search Birth Registration Book
  // =========================================================
  const handleSearch = () => {
    if (!birthRegistrationNo.trim()) {
      Swal.fire({
        icon: "warning",
        title: "তথ্য দিন",
        text: "১৭ ডিজিটের জন্ম নিবন্ধন নম্বর লিখুন।",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    if (birthRegistrationNo.trim().length !== 17) {
      Swal.fire({
        icon: "warning",
        title: "ভুল নম্বর",
        text: "জন্ম নিবন্ধন নম্বর অবশ্যই ১৭ ডিজিটের হতে হবে।",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    if (!birthDate) {
      Swal.fire({
        icon: "warning",
        title: "জন্ম তারিখ দিন",
        text: "জন্ম তারিখ নির্বাচন করুন।",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    // Birth Registration Book-এর একই localStorage source
    const applications = JSON.parse(
      localStorage.getItem(
        "deceasedBirthRegistrationApplications"
      ) || "[]"
    );

    // শুধু Registered record
    const registeredApplications = applications.filter(
      (app: any) => app.status === "Registered"
    );

    // জন্ম নিবন্ধন নম্বর + জন্ম তারিখ দিয়ে search
    const matched = registeredApplications.filter(
      (app: any) =>
        String(app.registerNo) ===
          String(birthRegistrationNo.trim()) &&
        String(app.dateOfBirth) === String(birthDate)
    );

    setSearchResult(matched);
    setSearchDone(true);
    setSelectedPerson(null);
  };

  // =========================================================
  // Select Person
  // =========================================================
  const handleSelectPerson = (person: any) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "আপনি কি এই ব্যক্তিকে মৃত্যু নিবন্ধনের জন্য নির্বাচন করতে চান?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ",
      cancelButtonText: "না",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedPerson(person);

        Swal.fire({
          icon: "success",
          title: "নির্বাচন সম্পন্ন",
          text: "মৃত ব্যক্তির তথ্য নির্বাচন করা হয়েছে।",
          confirmButtonText: "ঠিক আছে",
        });
      }
    });
  };

  // =========================================================
  // Death Address Change
  // =========================================================
  const handleDeathAddressChange = (
    address: AddressData
  ) => {
    setDeathAddress(address);

    if (sameAddress) {
      setResidenceAddress(address);
    }
  };

  // =========================================================
  // Same Address
  // =========================================================
  const handleSameAddress = (
    checked: boolean
  ) => {
    setSameAddress(checked);

    if (checked) {
      setResidenceAddress(deathAddress);
    } else {
      setResidenceAddress(emptyAddress);
    }
  };

  // =========================================================
  // Residence Address Change
  // =========================================================
  const handleResidenceAddressChange = (
    address: AddressData
  ) => {
    if (!sameAddress) {
      setResidenceAddress(address);
    }
  };

  // =========================================================
  // Documents
  // =========================================================
  const handleDocuments = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  // =========================================================
  // Submit
  // =========================================================
  const handleSubmit = () => {
    if (!selectedPerson) {
      Swal.fire({
        icon: "warning",
        title: "ব্যক্তি নির্বাচন করুন",
        text: "প্রথমে জন্ম নিবন্ধন বই থেকে ব্যক্তিকে নির্বাচন করুন।",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    if (!deathDate) {
      Swal.fire({
        icon: "warning",
        title: "মৃত্যুর তারিখ দিন",
        text: "মৃত্যুর তারিখ নির্বাচন করুন।",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    if (!deathCause) {
      Swal.fire({
        icon: "warning",
        title: "মৃত্যুর কারণ নির্বাচন করুন",
        text: "মৃত্যুর কারণ নির্বাচন করুন।",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    const existingApplications = JSON.parse(
      localStorage.getItem("deathRegistrationApplications") ||
        "[]"
    );

    // =========================
// মৃত্যু নিবন্ধন আবেদন ID
// =========================
const nextApplicationNumber = Number(
  localStorage.getItem("deathRegistrationApplicationSequence") || "200000"
) + 1;

localStorage.setItem(
  "deathRegistrationApplicationSequence",
  String(nextApplicationNumber)
);

const applicationId = `DRA: ${nextApplicationNumber}`;

const newApplication = {
  id: Date.now(),
  applicationId,
  applicantRelation,
applicantName,
applicantsDeclaration,
isAgreed,
  

      // Birth Registration Book থেকে পাওয়া তথ্য
      birthRegistrationNo: selectedPerson.registerNo,
      birthDate: selectedPerson.dateOfBirth,

      deceasedNameBn:
        selectedPerson.deceasedNameBn || "",

      deceasedNameEn:
        selectedPerson.deceasedNameEn || "",
            fatherNameBeg:
  selectedPerson.fatherNameBeg || "",

fatherNameEn:
  selectedPerson.fatherNameEn || "",

motherName:
  selectedPerson.motherName || "",

motherNameEn:
  selectedPerson.motherNameEn || "",

      gender:
        selectedPerson.gender || "",

      birthAddress:
        selectedPerson.birthAddress || emptyAddress,

      presentAddress:
        selectedPerson.presentAddress || emptyAddress,

      permanentAddress:
        selectedPerson.permanentAddress || emptyAddress,

      // Death information
      deathDate,
      deathCause,

      // Spouse
      spouseBirthRegistrationNo,
      spouseBirthDate,
      spouseNameBn,
      spouseNameEn,

      // Address
      deathAddress,
      residenceAddress,
      sameAddress,

      // Documents
      documents: documents.map((file) => file.name),

      status: "Pending",

      applicationDate:
        new Date().toLocaleDateString("bn-BD"),
    };

    existingApplications.push(newApplication);

    localStorage.setItem(
      "deathRegistrationApplications",
      JSON.stringify(existingApplications)
    );

   Swal.fire({
  icon: "success",
  title: "আবেদন সংরক্ষিত হয়েছে",
  html: `
    <div style="font-size:18px;">
      <p>মৃত্যু নিবন্ধনের আবেদন সফলভাবে সংরক্ষণ করা হয়েছে।</p>
      <p>
        <strong>আবেদন আইডি:</strong>
        <span style="color:#0d6efd;">
          ${applicationId}
        </span>
      </p>
    </div>
  `,
  confirmButtonText: "ঠিক আছে",
}).then(() => {
      // Form reset
      setBirthRegistrationNo("");
      setBirthDate("");
      setSearchResult([]);
      setSearchDone(false);
      setSelectedPerson(null);

      setDeathDate("");
      setDeathCause("");

      setSpouseBirthRegistrationNo("");
      setSpouseBirthDate("");
      setSpouseNameBn("");
      setSpouseNameEn("");

      setDeathAddress(emptyAddress);
      setResidenceAddress(emptyAddress);
      setSameAddress(false);

      setApplicantRelation("");
setApplicantName("");
setApplicantsDeclaration("");
setIsAgreed(false);

      setDocuments([]);
    });
  };

  return (
    <div className="preview-container">
      {/* ================================================= */}
      {/* Page Title */}
      {/* ================================================= */}
      <h2>মৃত্যু নিবন্ধনের জন্য আবেদন করুন</h2>

      {/* ================================================= */}
      {/* Search Section */}
      {/* ================================================= */}
      {!selectedPerson && (
        <div className="form-section">
          <h3>
            আপনার জন্ম নিবন্ধন নম্বর ও জন্ম তারিখ লিখুন
          </h3>

          <div className="form-group">
            <label>
              ১৭ ডিজিটের জন্ম নিবন্ধন নম্বর
            </label>

            <input
              type="text"
              value={birthRegistrationNo}
              onChange={(e) =>
                setBirthRegistrationNo(
                  e.target.value.replace(/\D/g, "")
                )
              }
              maxLength={17}
              placeholder="১৭ ডিজিটের জন্ম নিবন্ধন নম্বর"
            />
          </div>

          <div className="form-group">
            <label>জন্ম তারিখ</label>

            <input
              type="date"
              value={birthDate}
              onChange={(e) =>
                setBirthDate(e.target.value)
              }
            />
          </div>

          <button
            type="button"
            className="submit-btn"
            onClick={handleSearch}
          >
            অনুসন্ধান
          </button>
        </div>
      )}

      {/* ================================================= */}
      {/* Search Result Table */}
      {/* ================================================= */}
      {!selectedPerson && searchDone && (
        <div className="table-scroll">
          <table className="register-book-table">
            <thead>
              <tr>
                <th>আইডি</th>
                <th>জন্ম তারিখ</th>
                <th>নিবন্ধিত ব্যক্তির নাম</th>
                <th>পিতার নাম</th>
                <th>মাতার নাম</th>
                <th>একশন</th>
              </tr>
            </thead>

            <tbody>
              {searchResult.length > 0 ? (
                searchResult.map(
                  (app: any, index: number) => (
                    <tr
                      key={
                        app.registerNo || index
                      }
                    >
                      <td>
                        {app.registerNo || index + 1}
                      </td>

                      <td>
                        {app.dateOfBirth || "-"}
                      </td>

                      <td>
                        {app.deceasedNameBn || "-"}
                      </td>

                      <td>
                        {app.fatherNameBeg || "-"}
                      </td>

                      <td>
                        {app.motherName || "-"}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="submit-btn"
                          onClick={() =>
                            handleSelectPerson(app)
                          }
                        >
                          নির্বাচন করুন
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="no-application"
                  >
                    কোনো নিবন্ধিত ব্যক্তির তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================================================= */}
      {/* Selected Person + Death Form */}
      {/* ================================================= */}
      {selectedPerson && (
        <div className="form-section">

          {/* ============================================= */}
          {/* মৃত ব্যক্তির বিবরণ */}
          {/* ============================================= */}
          <h3>মৃত ব্যক্তির বিবরণ</h3>

          <div className="form-row">
            <div className="form-group">
              <label>মৃত্যুর তারিখ খ্রি:</label>

              <input
                type="date"
                value={deathDate}
                onChange={(e) =>
                  setDeathDate(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                মৃত্যুর কারণ নির্বাচন করুন
              </label>

              <select
                value={deathCause}
                onChange={(e) =>
                  setDeathCause(e.target.value)
                }
              >
                <option value="">
                  নির্বাচন করুন
                </option>

                <option value="বার্ধক্যজনিত">
                  বার্ধক্যজনিত
                </option>

                <option value="হৃদরোগ">
                  হৃদরোগ
                </option>

                <option value="স্ট্রোক">
                  স্ট্রোক
                </option>

                <option value="ক্যান্সার">
                  ক্যান্সার
                </option>

                <option value="শ্বাসকষ্টজনিত রোগ">
                  শ্বাসকষ্টজনিত রোগ
                </option>

                <option value="দুর্ঘটনা">
                  দুর্ঘটনা
                </option>

                <option value="অন্যান্য">
                  অন্যান্য
                </option>
              </select>
            </div>
          </div>

          {/* ============================================= */}
          {/* স্বামী/স্ত্রীর তথ্য */}
          {/* ============================================= */}
          <h3>
            মৃত ব্যক্তির স্বামী/স্ত্রীর তথ্যাবলি
          </h3>

          <div className="form-row">

            <div className="form-group">
              <label>
                স্বামী/স্ত্রীর জন্ম নিবন্ধন নম্বর
              </label>

              <input
                type="text"
                value={
                  spouseBirthRegistrationNo
                }
                onChange={(e) =>
                  setSpouseBirthRegistrationNo(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                maxLength={17}
              />
            </div>

            <div className="form-group">
              <label>
                স্বামী/স্ত্রীর জন্ম তারিখ
              </label>

              <input
                type="date"
                value={spouseBirthDate}
                onChange={(e) =>
                  setSpouseBirthDate(
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>
                বাংলা নাম
              </label>

              <input
                type="text"
                value={spouseNameBn}
                onChange={(e) =>
                  setSpouseNameBn(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>
                ইংরেজি নাম
              </label>

              <input
                type="text"
                value={spouseNameEn}
                onChange={(e) =>
                  setSpouseNameEn(
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          {/* ============================================= */}
          {/* মৃত্যুর স্থানের বিবরণ */}
          {/* ============================================= */}
          <h3>মৃত্যুর স্থানের বিবরণ</h3>

          <AddressForm
            address={deathAddress}
            setAddress={handleDeathAddressChange}
          />
{/* ============================================= */}
{/* Same Address */}
{/* ============================================= */}
<div className="same-address-check">
  <label>
    <input
      type="checkbox"
      checked={sameAddress}
      onChange={(e) =>
        handleSameAddress(e.target.checked)
      }
    />
    <span>
      মৃত্যু স্থানের ঠিকানা ও মৃত্যুর সময় বসবাসের ঠিকানা একই
    </span>
  </label>
</div>


          {/* ============================================= */}
          {/* Residence Address */}
          {/* ============================================= */}
          <h3>
            মৃত্যুর সময় বসবাসের ঠিকানা
          </h3>

          <AddressForm
            address={residenceAddress}
            setAddress={
              handleResidenceAddressChange
            }
          />

          {/* ============================================= */}
          {/* Documents */}
          {/* ============================================= */}
          <h3>নথী সংযোগ করুন</h3>

         <DocumentsUpload
         files={documents}
         setFiles={setDocuments}
           errors={{}}
            />
      <h3>আবেদনকারীর প্রত্যয়ন</h3>

<ApplicantsDeclaration
  banglaName={selectedPerson?.deceasedNameBn || ""}
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

          {/* ============================================= */}
          {/* Submit */}
          {/* ============================================= */}
          <div className="button-group">

            <button
              type="button"
              className="submit-btn"
              onClick={handleSubmit}
            >
              আবেদন সংরক্ষণ করুন
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default DeathRegistrationApplication;

