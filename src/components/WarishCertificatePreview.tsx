import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/BirthRegistrationApplication.css";

interface Heir {
  id: number;
  nameBn: string;
  nameEn: string;
  relation: string;
  birthDate: string;
  birthId: string;
  status: string;
}

function WarishCertificatePreview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="birth-preview-container">
        <h2>কোন আবেদন ডাটা পাওয়া যায়নি।</h2>

        <button
          type="button"
          className="submit-btn"
          onClick={() => navigate("/warish-certificate")}
        >
          আবেদন ফর্মে ফিরে যান
        </button>
      </div>
    );
  }

  const {
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
    
  } = state;

  const getGenderLabel = (value: string) => {
    if (value === "female") return "নারী";
    if (value === "male") return "পুরুষ";
    if (value === "third") return "তৃতীয় লিঙ্গ";
    return value || "";
  };

  const getRelationLabel = (value: string) => {
    const relations: Record<string, string> = {
      wife: "স্ত্রী",
      husband: "স্বামী",
      son: "ছেলে",
      daughter: "মেয়ে",
      brother: "ভাই",
      sister: "বোন",
      father: "পিতা",
      mother: "মাতা",
      brother_son: "ভাইয়ের ছেলে",
      brother_daughter: "ভাইয়ের মেয়ে",
      sister_son: "বোনের ছেলে",
      sister_daughter: "বোনের মেয়ে",
      other: "অন্যান্য",
    };

    return relations[value] || value || "";
  };

  const getStatusLabel = (value: string) => {
    if (value === "alive") return "জীবিত";
    if (value === "deceased") return "মৃত";
    return value || "";
  };

  return (
    <div className="birth-preview-container">

      <h1>ওয়ারিশ সনদের জন্য আবেদন</h1>

       {/* ==================================
          মৃত ব্যক্তির ব্যক্তিগত তথ্য ও ছবি
          ================================== */}

      <div className="preview-personal-section">

  {/* বাম পাশে মৃত ব্যক্তির তথ্য */}
  <div className="preview-personal-info">
    <h2>মৃত ব্যক্তির ব্যক্তিগত তথ্যঃ</h2>

    <table className="preview-table">
      <tbody>
        <tr>
          <th>নাম (বাংলা)</th>
          <td>{deceasedNameBn}</td>
        </tr>

        <tr>
          <th>নাম (ইংরেজি)</th>
          <td>{deceasedNameEn}</td>
        </tr>

        <tr>
          <th>মৃত্যু নিবন্ধন নম্বর</th>
          <td>{deathRegistrationNo}</td>
        </tr>

        <tr>
          <th>মৃত্যুর তারিখ</th>
          <td>{deathDate}</td>
        </tr>

        <tr>
          <th>লিঙ্গ</th>
          <td>{getGenderLabel(gender)}</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* ডান পাশে আবেদনকারীর ছবি */}
  <div className="preview-personal-photo">
    <h2>আবেদনকারীর ছবি</h2>

    {applicantPreview ? (
      <img
        src={applicantPreview}
        alt="Applicant"
        width="150"
      />
    ) : (
      <p>কোন ছবি আপলোড করা হয়নি।</p>
    )}
  </div>

</div>

      {/* ==================================
          ওয়ারিশদের তালিকা
          ================================== */}

      <div className="preview-personal-info">

        <h2>ওয়ারিশদের তালিকাঃ</h2>

        {heirs && heirs.length > 0 ? (
          <table className="preview-table">

            <thead>
              <tr>
                <th>ক্রমিক নং</th>
                <th>নাম (বাংলা)</th>
                <th>নাম (ইংরেজি)</th>
                <th>সম্পর্ক</th>
                <th>জন্ম তারিখ</th>
                <th>জন্ম নিবন্ধন / আইডি</th>
                <th>অবস্থা</th>
              </tr>
            </thead>
            <tbody>
              {heirs.map(
                (heir: Heir, index: number) => (
                  <tr key={heir.id}>
                    <td>{index + 1}</td>
                    <td>{heir.nameBn}</td>
                    <td>{heir.nameEn}</td>
                    <td>
                      {getRelationLabel(
                        heir.relation
                      )}
                    </td>
                    <td>{heir.birthDate}</td>

                    <td>{heir.birthId}</td>

                    <td>
                      {getStatusLabel(
                        heir.status
                      )}
                    </td>

                  </tr>
                )
              )}
            </tbody>

          </table>
        ) : (
          <p>কোন ওয়ারিশের তথ্য পাওয়া যায়নি।</p>
        )}

      </div>

      {/* ==================================
          মৃত ব্যক্তির পিতা-মাতার তথ্য
          ================================== */}
        {/* ==================================
    মৃত ব্যক্তির পিতা-মাতার তথ্য
    ================================== */}

<div className="preview-personal-info">

  <h2>মৃত ব্যক্তির পিতা-মাতার তথ্যঃ</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    }}
  >

    {/* পিতার তথ্য - বাম পাশে */}
    <div>
      <h3>পিতার তথ্য</h3>

      <table className="preview-table">
        <tbody>
          <tr>
            <th>নাম (বাংলা)</th>
            <td>{fatherNameBeg}</td>
          </tr>

          <tr>
            <th>নাম (ইংরেজি)</th>
            <td>{fatherNameEn}</td>
          </tr>

          <tr>
            <th>জন্ম নিবন্ধন নম্বর</th>
            <td>{fatherBRN}</td>
          </tr>

          <tr>
            <th>জন্ম তারিখ</th>
            <td>{fatherBirthDate}</td>
          </tr>

          <tr>
            <th>জাতীয়তা</th>
            <td>{fatherNationality}</td>
          </tr>
        </tbody>
      </table>
    </div>


    {/* মাতার তথ্য - ডান পাশে */}
    <div>
      <h3>মাতার তথ্য</h3>

      <table className="preview-table">
        <tbody>
          <tr>
            <th>নাম (বাংলা)</th>
            <td>{motherName}</td>
          </tr>

          <tr>
            <th>নাম (ইংরেজি)</th>
            <td>{motherNameEn}</td>
          </tr>

          <tr>
            <th>জন্ম নিবন্ধন নম্বর</th>
            <td>{motherBRN}</td>
          </tr>

          <tr>
            <th>জন্ম তারিখ</th>
            <td>{motherBirthDate}</td>
          </tr>

          <tr>
            <th>জাতীয়তা</th>
            <td>{motherNationality}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

</div>
      {/* ==================================
          মৃত ব্যক্তির স্থায়ী ঠিকানা
          ================================== */}
        <div>
  <h2>মৃত ব্যক্তির স্থায়ী ঠিকানাঃ</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px 20px",
    }}
  >
    <div
      style={{
        display: "flex",
        border: "1px solid #ddd",
        padding: "8px 10px",
        background: "#fff",
      }}
    >
      <strong style={{ width: "120px" }}>জেলা</strong>
      <span>{permanentAddress.district?.name_bn}</span>
    </div>

    <div
      style={{
        display: "flex",
        border: "1px solid #ddd",
        padding: "8px 10px",
        background: "#fff",
      }}
    >
      <strong style={{ width: "120px" }}>উপজেলা</strong>
      <span>{permanentAddress.upazila?.name_bn}</span>
    </div>

    <div
      style={{
        display: "flex",
        border: "1px solid #ddd",
        padding: "8px 10px",
        background: "#fff",
      }}
    >
      <strong style={{ width: "120px" }}>ইউনিয়ন</strong>
      <span>{permanentAddress.union?.name_bn}</span>
    </div>

    <div
      style={{
        display: "flex",
        border: "1px solid #ddd",
        padding: "8px 10px",
        background: "#fff",
      }}
    >
      <strong style={{ width: "120px" }}>ওয়ার্ড</strong>
      <span>{permanentAddress.ward}</span>
    </div>

    <div
      style={{
        display: "flex",
        border: "1px solid #ddd",
        padding: "8px 10px",
        background: "#fff",
      }}
    >
      <strong style={{ width: "120px" }}>ডাকঘর</strong>
      <span>{permanentAddress.postOfficeBn}</span>
    </div>

    <div
      style={{
        display: "flex",
        border: "1px solid #ddd",
        padding: "8px 10px",
        background: "#fff",
      }}
    >
      <strong style={{ width: "120px" }}>গ্রাম</strong>
      <span>{permanentAddress.villageBn}</span>
    </div>

    <div
      style={{
        display: "flex",
        border: "1px solid #ddd",
        padding: "8px 10px",
        background: "#fff",
      }}
    >
      <strong style={{ width: "120px" }}>হোল্ডিং নম্বর</strong>
      <span>{permanentAddress.houseHoldingNoBn}</span>
    </div>
  </div>
</div>
      {/* ==================================
          সংযুক্ত নথি
          ================================== */}

      <div className="documents-preview-section">

        <h2>সংযুক্ত নথিঃ</h2>

        {documents &&
        documents.length > 0 ? (
          <table className="preview-table">

            <tbody>
              {documents.map(
                (file: any, index: number) => (
                  <tr key={index}>

                    <td>
                      নথি {index + 1}
                    </td>

                    <td>
                      {file.name}
                    </td>

                  </tr>
                )
              )}
            </tbody>

          </table>
        ) : (
          <p>
            কোন নথি আপলোড করা হয়নি।
          </p>
        )}

      </div>

      {/* ==================================
          আবেদনকারীর প্রত্যয়ন
          ================================== */}

      <div className="declaration-preview-section">

        <h2>আবেদনকারীর প্রত্যয়নঃ</h2>

        <table className="preview-table">

          <tbody>

            <tr>
              <td>নাগরিকের সাথে সম্পর্ক</td>

              <td>
                {applicantRelation === "self"
                  ? "নিজে"
                  : applicantRelation ===
                    "guardian"
                  ? "অভিভাবক"
                  : applicantRelation}
              </td>
            </tr>

            <tr>
              <td>আবেদনকারীর নাম</td>

              <td>
                {applicantName}
              </td>
            </tr>

            <tr>
              <td>ঘোষণা</td>

              <td>
                {applicantsDeclaration}
              </td>
            </tr>

            <tr>
              <td>ঘোষণায় সম্মতি</td>

              <td>
                {isAgreed ? "হ্যাঁ" : "না"}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* ==================================
          স্বাক্ষর
          ================================== */}

      <div className="signature-section">

        <div className="signature-box">
          <div className="signature-line"></div>
          <p>যাচাইকারীর স্বাক্ষর</p>
        </div>

        <div className="signature-box">
          <div className="signature-line"></div>
          <p>আবেদনকারীর স্বাক্ষর</p>
        </div>

      </div>

      {/* ==================================
          ফর্মে ফিরে যাওয়া
          ================================== */}

      <div className="preview-submit"
      style={{
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  }}
      >

        <button
          type="button"
          className="submit-btn"
          onClick={() =>
            navigate(
              "/warish-certificate"
            )
          }
        >
          আবেদন ফর্মে ফিরে যান
        </button>
          <button
    type="button"
    onClick={() => {
  const application = {
    applicationNo: `WAR-${Date.now()}`,

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

    status: "Submitted",
    submittedDate: new Date().toLocaleDateString("en-CA"),
  };

  const existingApplications = JSON.parse(
    localStorage.getItem("warishCertificateApplications") || "[]"
  );

  existingApplications.push(application);

  localStorage.setItem(
    "warishCertificateApplications",
    JSON.stringify(existingApplications)
  );

  alert("আবেদন পত্র সফলভাবে জমা হয়েছে।");
  navigate("/warish-certificate-list");
}}
  >
    আবেদন পত্র জমা দিন
  </button>

      </div>

    </div>
  );
}


/* ==========================================
   ঠিকানা প্রদর্শন
   ========================================== */

function AddressTable({
  address,
}: {
  address: any;
}) {

  if (!address) {
    return (
      <p>
        কোন ঠিকানার তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <table className="address-single-table">

      <tbody>

        <tr>
          <td>দেশ</td>
          <td>
            {address.country?.name_bn}
          </td>
        </tr>

        <tr>
          <td>বিভাগ</td>
          <td>
            {address.division?.name_bn}
          </td>
        </tr>

        <tr>
          <td>জেলা</td>
          <td>
            {address.district?.name_bn}
          </td>
        </tr>

        <tr>
          <td>উপজেলা</td>
          <td>
            {address.upazila?.name_bn}
          </td>
        </tr>

        <tr>
          <td>ইউনিয়ন</td>
          <td>
            {address.union?.name_bn}
          </td>
        </tr>

        <tr>
          <td>ওয়ার্ড</td>
          <td>
            {address.ward}
          </td>
        </tr>

        <tr>
          <td>গ্রাম</td>
          <td>
            {address.villageBn}
            <br />
            {address.villageEn}
          </td>
        </tr>

        <tr>
          <td>ডাকঘর</td>
          <td>
            {address.postOfficeBn}
            <br />
            {address.postOfficeEn}
          </td>
        </tr>

        <tr>
          <td>হোল্ডিং নং</td>
          <td>
            {address.houseHoldingNoBn}
            <br />
            {address.houseHoldingNoEn}
          </td>
        </tr>

      </tbody>

    </table>
  );
}

export default WarishCertificatePreview;