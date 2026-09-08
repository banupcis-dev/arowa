import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../css/BirthRegistrationApplication.css";
import { useNavigate } from "react-router-dom";


function BirthRegistrationPreview() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { state } = useLocation();
  const applicationData = state;
  const printMode = state?.printMode === true;

useEffect(() => {
  if (printMode) {
    setTimeout(() => window.print(), 500);
  }
}, [printMode]);

  const {
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
    applicantRelation,
    applicantName,
    isAgreed,
  } = applicationData;

  return (
    <div className="birth-preview-container">
      <h1>০৩ জুন, ২০০৭ সালের আগে মৃত ব্যক্তির জন্ম নিবন্ধন</h1>

      <div className="preview-personal-section">
        <div className="preview-personal-info">
          <h2>মৃত ব্যক্তির তথ্যঃ</h2>
          <table className="preview-table">
            <tbody>
              <tr>
                <th>মৃত ব্যক্তির নাম (বাংলা)</th>
                <td>{deceasedNameBn}</td>
              </tr>
              <tr>
                <th>মৃত ব্যক্তির নাম (ইংরেজি)</th>
                <td>{deceasedNameEn}</td>
              </tr>
              <tr>
                <th>জন্ম তারিখ</th>
                <td>{dateOfBirth}</td>
              </tr>
              <tr>
                <th>লিঙ্গ</th>
                <td>{gender}</td>
              </tr>
              <tr>
                <th>পিতা-মাতার কততম সন্তান</th>
                <td>{childOrder}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="preview-personal-photo">
          <h2>মৃত ব্যক্তির ছবি</h2>
          {preview ? (
            <img src={preview} alt="Deceased" width="150" />
          ) : (
            <p>কোন ছবি আপলোড করা হয়নি</p>
          )}
        </div>
      </div>

      <div className="parents-preview-section">
        <div className="preview-father-info">
          <h2>পিতার তথ্যঃ</h2>
          <table className="preview-table">
            <tbody>
              <tr>
                <td>জন্ম নিবন্ধন নম্বর</td>
                <td>{fatherBRN}</td>
              </tr>
              <tr>
                <td>জন্ম তারিখ</td>
                <td>{fatherBirthDate}</td>
              </tr>
              <tr>
                <td>নাম (বাংলা)</td>
                <td>{fatherNameBeg}</td>
              </tr>
              <tr>
                <td>নাম (ইংরেজি)</td>
                <td>{fatherNameEn}</td>
              </tr>
              <tr>
                <td>জাতীয়তা</td>
                <td>{fatherNationality}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="preview-mother-info">
          <h2>মাতার তথ্যঃ</h2>
          <table className="preview-table">
            <tbody>
              <tr>
                <td>জন্ম নিবন্ধন নম্বর</td>
                <td>{motherBRN}</td>
              </tr>
              <tr>
                <td>জন্ম তারিখ</td>
                <td>{motherBirthDate}</td>
              </tr>
              <tr>
                <td>নাম (বাংলা)</td>
                <td>{motherName}</td>
              </tr>
              <tr>
                <td>নাম (ইংরেজি)</td>
                <td>{motherNameEn}</td>
              </tr>
              <tr>
                <td>জাতীয়তা</td>
                <td>{motherNationality}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="address-preview-section">
        <h2>ঠিকানার তথ্যঃ</h2>
        <div className="address-preview-grid">
          <div className="address-preview-card">
            <h3>মৃত ব্যক্তির জন্মস্থানের ঠিকানাঃ</h3>
            <AddressTable address={birthAddress} />
          </div>

          <div className="address-preview-card">
            <h3>মৃত ব্যক্তির স্থায়ী ঠিকানাঃ</h3>
            <AddressTable address={permanentAddress} />
          </div>

          <div className="address-preview-card">
            <h3>মৃত ব্যক্তির বর্তমান ঠিকানাঃ</h3>
            <AddressTable address={presentAddress} />
          </div>
        </div>
      </div>

      <div className="documents-preview-section">
        <h2>সংযুক্ত নথিঃ</h2>
        {files && files.length > 0 ? (
          <table className="preview-table">
            <tbody>
              {files.map((file: any, index: number) => (
                <tr key={index}>
                  <td>নথি {index + 1}</td>
                  <td>{file.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>কোন নথি আপলোড করা হয়নি।</p>
        )}
      </div>

      <div className="declaration-preview-section">
        <h2>আবেদনকারীর প্রত্যয়নঃ</h2>
        <table className="preview-table">
          <tbody>
            <tr>
              <td>মৃত ব্যক্তির সাথে সম্পর্ক</td>
              <td>
                {applicantRelation === "self"
                  ? "নিজে"
                  : applicantRelation === "guardian"
                  ? "অভিভাবক"
                  : applicantRelation}
              </td>
            </tr>
            <tr>
              <td>আবেদনকারীর নাম</td>
              <td>{applicantName}</td>
            </tr>
            <tr>
              <td>ঘোষণায় সম্মতি</td>
              <td>{isAgreed ? "হ্যাঁ" : "না"}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
{!printMode && <div className="preview-submit">
  <button
    type="button"
    className="submit-btn"
    disabled={isSubmitted}
    onClick={() => {
      if (isSubmitted) return;

      const brn =
        "20" + Math.floor(1000 + Math.random() * 9000).toString();

      const newApplication = {
        ...applicationData,

        brn,
        applicationDate: new Date().toLocaleDateString("bn-BD"),

        // Application শুরু হবে Pending অবস্থায়
       status: "Pending",
        // শুরুতে Payment হয়নি
        paymentStatus: "Unpaid",
      };

      try {
        const savedApplications = localStorage.getItem(
          "deceasedBirthRegistrationApplications"
        );

        const applications = savedApplications
          ? JSON.parse(savedApplications)
          : [];

        // নতুন আবেদন সবার উপরে
        applications.unshift(newApplication);

        localStorage.setItem(
          "deceasedBirthRegistrationApplications",
          JSON.stringify(applications)
        );

        setIsSubmitted(true);

        alert(
          `আবেদন সফলভাবে জমা হয়েছে।\n\nBRN: ${brn}`
        );

        navigate("/deceased-birth-registration-applications");
      } catch (error) {
        console.error(
          "আবেদন জমা দিতে সমস্যা:",
          error
        );

        alert("আবেদন জমা দেওয়া যায়নি।");
      }
    }}
  >

    {isSubmitted
      ? "আবেদন জমা হয়েছে"
      : "আবেদন জমা দিন"}
  </button>
</div>}
</div>
);
}
function AddressTable({ address }: { address: any }) {
  if (!address) {
    return <p>কোন ঠিকানার তথ্য পাওয়া যায়নি।</p>;
  }

  return (
    <table className="address-single-table">
      <tbody>
        <tr>
          <td>দেশ</td>
          <td>{address.country?.name_bn}</td>
        </tr>
        <tr>
          <td>বিভাগ</td>
          <td>{address.division?.name_bn}</td>
        </tr>
        <tr>
          <td>জেলা</td>
          <td>{address.district?.name_bn}</td>
        </tr>
        <tr>
          <td>উপজেলা</td>
          <td>{address.upazila?.name_bn}</td>
        </tr>
        <tr>
          <td>ইউনিয়ন</td>
          <td>{address.union?.name_bn}</td>
        </tr>
        <tr>
          <td>ওয়ার্ড</td>
          <td>{address.ward}</td>
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

export default BirthRegistrationPreview;