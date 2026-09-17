import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/BirthRegistrationApplication.css";

function SameNameCertificatePreview() {
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

  if (!applicationData) {
    return <p>কোন আবেদন ডাটা পাওয়া যায়নি।</p>;
  }

  const {
    banglaName,
    englishName,
    nicknameBn,
    nicknameEn,
    birthRegNo,
    birthDate,
    gender,
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

      <h1>একই নামে সনদ পত্রের আবেদন</h1>

      {/* ব্যক্তিগত তথ্য */}
      <div className="preview-personal-section">

        <div className="preview-personal-info">

          <h2>ব্যক্তির তথ্যঃ</h2>

          <table className="preview-table">
            <tbody>

              <tr>
                <th>নাম (বাংলা)</th>
                <td>{banglaName}</td>
              </tr>

              <tr>
                <th>নাম (ইংরেজি)</th>
                <td>{englishName}</td>
              </tr>

              <tr>
                <th>ডাক নাম (বাংলা)</th>
                <td>{nicknameBn}</td>
              </tr>

              <tr>
                <th>ডাক নাম (ইংরেজি)</th>
                <td>{nicknameEn}</td>
              </tr>

              <tr>
                <th>জন্ম নিবন্ধন নম্বর</th>
                <td>{birthRegNo}</td>
              </tr>

              <tr>
                <th>জন্ম তারিখ</th>
                <td>{birthDate}</td>
              </tr>

              <tr>
                <th>লিঙ্গ</th>
                <td>
                  {gender?.name_bn || gender || "-"}
                </td>
              </tr>

            </tbody>
          </table>

        </div>

        <div className="preview-personal-photo">

          <h2>ব্যক্তির ছবি</h2>

          {preview ? (
            <img
              src={preview}
              alt="Applicant"
              width="150"
            />
          ) : (
            <p>কোন ছবি আপলোড করা হয়নি</p>
          )}

        </div>

      </div>

      {/* পিতা-মাতার তথ্য */}
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

      {/* ঠিকানা */}
      <div className="address-preview-section">

        <h2>ঠিকানার তথ্যঃ</h2>

        <div className="address-preview-grid">

          <div className="address-preview-card">
            <h3>জন্মস্থানের ঠিকানাঃ</h3>
            <AddressTable address={birthAddress} />
          </div>

          <div className="address-preview-card">
            <h3>স্থায়ী ঠিকানাঃ</h3>
            <AddressTable address={permanentAddress} />
          </div>

          <div className="address-preview-card">
            <h3>বর্তমান ঠিকানাঃ</h3>
            <AddressTable address={presentAddress} />
          </div>

        </div>

      </div>

      {/* সংযুক্ত নথি */}
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

      {/* আবেদনকারীর প্রত্যয়ন */}
      <div className="declaration-preview-section">

        <h2>আবেদনকারীর প্রত্যয়নঃ</h2>

        <table className="preview-table">

          <tbody>

            <tr>
              <td>আবেদনকারীর সাথে সম্পর্ক</td>

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

      {/* স্বাক্ষর */}
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

      {/* Submit */}
      {!printMode && (

        <div className="preview-submit">

          <button
            type="button"
            className="submit-btn"
            disabled={isSubmitted}
            onClick={() => {

              if (isSubmitted) return;

              const newApplication = {

                ...applicationData,

                applicationDate:
                  new Date().toLocaleDateString("bn-BD"),

                status: "Pending",

                paymentStatus: "Unpaid",

              };

              try {

                const savedApplications =
                  localStorage.getItem(
                    "sameNameCertificateApplications"
                  );

                const applications =
                  savedApplications
                    ? JSON.parse(savedApplications)
                    : [];

                applications.unshift(newApplication);

                localStorage.setItem(
                  "sameNameCertificateApplications",
                  JSON.stringify(applications)
                );

                setIsSubmitted(true);

                alert(
                  "আবেদন সফলভাবে জমা হয়েছে।"
                );

                navigate(
                  "/same-name-certificate-applications"
                );

              } catch (error) {

                console.error(
                  "আবেদন জমা দিতে সমস্যা:",
                  error
                );

                alert(
                  "আবেদন জমা দেওয়া যায়নি।"
                );

              }

            }}
          >
            {isSubmitted
              ? "আবেদন জমা হয়েছে"
              : "আবেদন জমা দিন"}
          </button>

        </div>

      )}

    </div>
  );
}


/* Address Table */

function AddressTable({
  address,
}: {
  address: any;
}) {

  if (!address) {

    return (
      <p>
        কোন ঠিকানার তথ্য পাওয়া যায়নি।
      </p>
    );

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

export default SameNameCertificatePreview;