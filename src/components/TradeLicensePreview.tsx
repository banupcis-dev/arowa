import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/BirthRegistrationApplication.css";

function TradeLicensePreview() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { state } = useLocation();
  const applicationData = state;

  if (!applicationData) {
    return <h2>কোন আবেদন ডাটা পাওয়া যায়নি।</h2>;
  }

  const {
    // ব্যবসার তথ্য
    businessNameBn,
    businessNameEn,
    businessTypeBn,
    businessTypeEn,
    businessStartDate,
    capitalAmount,

    // ব্যবসায়ীর ব্যক্তিগত তথ্য
    ownerNameBn,
    ownerNameEn,
    birthRegNo,
    birthDate,
    gender,
    occupation,

    // পিতার তথ্য
    fatherBRN,
    fatherBirthDate,
    fatherNameBeg,
    fatherNameEn,
    fatherNationality,

    // মাতার তথ্য
    motherBRN,
    motherBirthDate,
    motherName,
    motherNameEn,
    motherNationality,

    // ব্যবসায়িক ঠিকানা
    businessAddress,

    // মালিকের স্থায়ী ঠিকানা
    permanentAddress,

    // মালিকের বর্তমান ঠিকানা
    presentAddress,

    // ছবি
    ownerPreview,

    // ডকুমেন্ট
    documents,
    files,

    // আবেদনকারীর প্রত্যয়ন
    applicantsDeclaration,
    applicantRelation,
    applicantName,
    isAgreed,
  } = applicationData;

  // DocumentsUpload-এ যদি files নামে data পাঠানো হয়
  const uploadedDocuments = documents || files || [];

  return (
    <div className="birth-preview-container">
      <h1>ব্যবসা নিবন্ধনের জন্য আবেদন করুন</h1>

      {/* ================================
          ব্যবসার তথ্য
          ================================ */}
      <div className="preview-personal-section">
        <div className="preview-personal-info">
          <h2>ব্যবসার তথ্যঃ</h2>

          <table className="preview-table">
            <tbody>
              <tr>
                <th>ব্যবসার নাম (বাংলা)</th>
                <td>{businessNameBn}</td>
              </tr>

              <tr>
                <th>ব্যবসার নাম (ইংরেজি)</th>
                <td>{businessNameEn}</td>
              </tr>

              <tr>
                <th>ব্যবসার ধরন (বাংলা)</th>
                <td>{businessTypeBn}</td>
              </tr>

              <tr>
                <th>ব্যবসার ধরন (ইংরেজি)</th>
                <td>{businessTypeEn}</td>
              </tr>

              <tr>
                <th>ব্যবসা শুরুর তারিখ</th>
                <td>{businessStartDate}</td>
              </tr>

              <tr>
                <th>মূলধনের পরিমাণ</th>
                <td>{capitalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* মালিকের ছবি */}
        <div className="preview-personal-photo">
          <h2>মালিকের ছবি</h2>

          {ownerPreview ? (
            <img
              src={ownerPreview}
              alt="Business Owner"
              width="150"
            />
          ) : (
            <p>কোন ছবি আপলোড করা হয়নি</p>
          )}
        </div>
      </div>

      {/* ================================
          ব্যবসায়ীর ব্যক্তিগত তথ্য
          ================================ */}
      <div className="preview-personal-info">
        <h2>ব্যবসায়িকের ব্যক্তিগত তথ্যঃ</h2>

        <table className="preview-table">
          <tbody>
            <tr>
              <th>নাম (বাংলা)</th>
              <td>{ownerNameBn}</td>
            </tr>

            <tr>
              <th>নাম (ইংরেজি)</th>
              <td>{ownerNameEn}</td>
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
              <td>{gender?.name_bn}</td>
            </tr>

            <tr>
              <th>পেশা</th>
              <td>{occupation}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================================
          পিতা ও মাতার তথ্য
          ================================ */}
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

      {/* ================================
          ঠিকানার তথ্য
          ================================ */}
      <div className="address-preview-section">
        <h2>ঠিকানার তথ্যঃ</h2>

        <div className="address-preview-grid">

          {/* ব্যবসায়িক ঠিকানা */}
          <div className="address-preview-card">
            <h3>ব্যবসায়িক ঠিকানাঃ</h3>

            <BusinessAddressTable
              address={businessAddress}
            />
          </div>

          {/* মালিকের স্থায়ী ঠিকানা */}
          <div className="address-preview-card">
            <h3>মালিকের স্থায়ী ঠিকানাঃ</h3>

            <AddressTable
              address={permanentAddress}
            />
          </div>

          {/* মালিকের বর্তমান ঠিকানা */}
          <div className="address-preview-card">
            <h3>মালিকের বর্তমান ঠিকানাঃ</h3>

            <AddressTable
              address={presentAddress}
            />
          </div>

        </div>
      </div>

      {/* ================================
          সংযুক্ত নথি
          ================================ */}
      <div className="documents-preview-section">
        <h2>সংযুক্ত নথিঃ</h2>

        {uploadedDocuments &&
        uploadedDocuments.length > 0 ? (
          <table className="preview-table">
            <tbody>
              {uploadedDocuments.map(
                (file: any, index: number) => (
                  <tr key={index}>
                    <td>নথি {index + 1}</td>
                    <td>{file.name}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <p>কোন নথি আপলোড করা হয়নি।</p>
        )}
      </div>

      {/* ================================
          আবেদনকারীর প্রত্যয়ন
          ================================ */}
      <div className="declaration-preview-section">
        <h2>আবেদনকারীর প্রত্যয়নঃ</h2>

        <table className="preview-table">
          <tbody>

            <tr>
              <td>নাগরিকের সাথে সম্পর্ক</td>

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
              <td>
                {isAgreed ? "হ্যাঁ" : "না"}
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* ================================
          স্বাক্ষর
          ================================ */}
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

      {/* ================================
          আবেদন জমা
          ================================ */}
      <div className="preview-submit">

        <button
          type="button"
          className="submit-btn"
          disabled={isSubmitted}
          onClick={() => {

            if (isSubmitted) return;

            const tradeLicenseNo =
              "TL" +
              Math.floor(
                100000 +
                  Math.random() * 900000
              ).toString();

            const newApplication = {
              ...applicationData,

              tradeLicenseNo,

              applicationDate:
                new Date().toLocaleDateString(
                  "bn-BD"
                ),

              // নতুন আবেদন Pending থাকবে
              status: "Pending",

              // শুরুতে Payment হয়নি
              paymentStatus: "Unpaid",
            };

            try {

              const savedApplications =
                localStorage.getItem(
                  "tradeLicenseApplications"
                );

              const applications =
                savedApplications
                  ? JSON.parse(
                      savedApplications
                    )
                  : [];

              // নতুন আবেদন সবার উপরে
              applications.unshift(
                newApplication
              );

              localStorage.setItem(
                "tradeLicenseApplications",
                JSON.stringify(
                  applications
                )
              );

              setIsSubmitted(true);

              alert(
                `আবেদন সফলভাবে জমা হয়েছে।\n\nTrade License No: ${tradeLicenseNo}`
              );

              navigate(
                "/trade-license-applications"
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

    </div>
  );
}


/* ==================================================
   ব্যবসায়িক ঠিকানার Table
   ================================================== */

function BusinessAddressTable({
  address,
}: {
  address: any;
}) {

  if (!address) {
    return (
      <p>
        কোন ব্যবসায়িক ঠিকানার তথ্য পাওয়া যায়নি।
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
          <td>ইউনিয়ন</td>
          <td>
            {address.union?.name_bn}
          </td>
        </tr>

        <tr>
          <td>ওয়ার্ড</td>
          <td>
            {address.ward}
          </td>
        </tr>

        <tr>
          <td>বাজারের নাম</td>
          <td>
            {address.postOfficeBn}
            <br />
            {address.postOfficeEn}
          </td>
        </tr>

        <tr>
          <td>মার্কেটের নাম</td>
          <td>
            {address.villageBn}
            <br />
            {address.villageEn}
          </td>
        </tr>

        <tr>
          <td>দোকানের নম্বর</td>
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


/* ==================================================
   মালিকের স্থায়ী / বর্তমান ঠিকানার Table
   ================================================== */

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
          <td>ইউনিয়ন</td>
          <td>
            {address.union?.name_bn}
          </td>
        </tr>

        <tr>
          <td>ওয়ার্ড</td>
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

export default TradeLicensePreview;