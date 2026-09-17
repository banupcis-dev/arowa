import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/BirthRegistrationApplication.css";


function DeathRegistrationPreview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const application = state || {};

  if (!state) {
    return (
      <div className="preview-container">
        <h2>কোন আবেদন ডাটা পাওয়া যায়নি।</h2>

        <button
          type="button"
          className="submit-btn"
          onClick={() =>
            navigate("/death-registration-applications")
          }
        >
          আবেদনসমূহে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="preview-container">

      <div className="register-book-header">
        <h2>মৃত্যু নিবন্ধনের আবেদনপত্র</h2>

        <div className="register-book-info">
          <span>
            <strong>
              আবেদন আইডি : {application.applicationId || "-"}
            </strong>
          </span>

          <span>
            <strong>
              আবেদনের তারিখ :{" "}
              {application.applicationDate || "-"}
            </strong>
          </span>
        </div>
      </div>

      {/* =====================================
          মৃত ব্যক্তির তথ্য
      ===================================== */}
      <div className="form-section">
        <h3>মৃত ব্যক্তির বিবরণ</h3>

        <div className="form-row">
          <div className="form-group">
            <label>জন্ম নিবন্ধন নম্বর</label>
            <input
              type="text"
              value={application.birthRegistrationNo || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>জন্ম তারিখ</label>
            <input
              type="text"
              value={application.birthDate || ""}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>মৃত ব্যক্তির বাংলা নাম</label>
            <input
              type="text"
              value={application.deceasedNameBn || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>মৃত ব্যক্তির ইংরেজি নাম</label>
            <input
              type="text"
              value={application.deceasedNameEn || ""}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>পিতার নাম</label>
            <input
              type="text"
              value={
                application.fatherNameBeg ||
                application.fatherName ||
                ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>মাতার নাম</label>
            <input
              type="text"
              value={application.motherName || ""}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>লিঙ্গ</label>
            <input
              type="text"
              value={application.gender || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>মৃত্যুর তারিখ</label>
            <input
              type="text"
              value={application.deathDate || ""}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>মৃত্যুর কারণ</label>
            <input
              type="text"
              value={application.deathCause || ""}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* =====================================
          স্বামী/স্ত্রীর তথ্য
      ===================================== */}
      <div className="form-section">
        <h3>মৃত ব্যক্তির স্বামী/স্ত্রীর তথ্যাবলি</h3>

        <div className="form-row">
          <div className="form-group">
            <label>জন্ম নিবন্ধন নম্বর</label>
            <input
              type="text"
              value={
                application.spouseBirthRegistrationNo || ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>জন্ম তারিখ</label>
            <input
              type="text"
              value={application.spouseBirthDate || ""}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>বাংলা নাম</label>
            <input
              type="text"
              value={application.spouseNameBn || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>ইংরেজি নাম</label>
            <input
              type="text"
              value={application.spouseNameEn || ""}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* =====================================
          মৃত্যুর স্থানের ঠিকানা
      ===================================== */}
      <div className="form-section">
        <h3>মৃত্যুর স্থানের ঠিকানা</h3>

        <div className="form-row">
          <div className="form-group">
            <label>দেশ</label>
            <input
              type="text"
              value={
                application.deathAddress?.country?.name_bn || ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>বিভাগ</label>
            <input
              type="text"
              value={
                application.deathAddress?.division?.name_bn || ""
              }
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>জেলা</label>
            <input
              type="text"
              value={
                application.deathAddress?.district?.name_bn || ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>উপজেলা</label>
            <input
              type="text"
              value={
                application.deathAddress?.upazila?.name_bn || ""
              }
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>ইউনিয়ন</label>
            <input
              type="text"
              value={
                application.deathAddress?.union?.name_bn || ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>ওয়ার্ড</label>
            <input
              type="text"
              value={application.deathAddress?.ward || ""}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>গ্রাম</label>
            <input
              type="text"
              value={
                application.deathAddress?.villageBn || ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>ডাকঘর</label>
            <input
              type="text"
              value={
                application.deathAddress?.postOfficeBn || ""
              }
              readOnly
            />
          </div>
        </div>
      </div>

      {/* =====================================
          মৃত্যুর সময় বসবাসের ঠিকানা
      ===================================== */}
      <div className="form-section">
        <h3>মৃত্যুর সময় বসবাসের ঠিকানা</h3>

        <div className="form-row">
          <div className="form-group">
            <label>দেশ</label>
            <input
              type="text"
              value={
                application.residenceAddress?.country?.name_bn ||
                ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>বিভাগ</label>
            <input
              type="text"
              value={
                application.residenceAddress?.division?.name_bn ||
                ""
              }
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>জেলা</label>
            <input
              type="text"
              value={
                application.residenceAddress?.district?.name_bn ||
                ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>উপজেলা</label>
            <input
              type="text"
              value={
                application.residenceAddress?.upazila?.name_bn ||
                ""
              }
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>ইউনিয়ন</label>
            <input
              type="text"
              value={
                application.residenceAddress?.union?.name_bn ||
                ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>ওয়ার্ড</label>
            <input
              type="text"
              value={application.residenceAddress?.ward || ""}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>গ্রাম</label>
            <input
              type="text"
              value={
                application.residenceAddress?.villageBn || ""
              }
              readOnly
            />
          </div>

          <div className="form-group">
            <label>ডাকঘর</label>
            <input
              type="text"
              value={
                application.residenceAddress?.postOfficeBn || ""
              }
              readOnly
            />
          </div>
        </div>
      </div>

      {/* =====================================
          আবেদনকারীর প্রত্যয়ন
      ===================================== */}
      <div className="form-section">
        <h3>আবেদনকারীর প্রত্যয়ন</h3>

        <div className="form-row">
          <div className="form-group">
            <label>নাগরিকের সাথে সম্পর্ক</label>
            <input
              type="text"
              value={application.applicantRelation || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>আবেদনকারীর নাম</label>
            <input
              type="text"
              value={
                application.applicantName ||
                application.applicantNameBn ||
                ""
              }
              readOnly
            />
          </div>
        </div>

        <p>
          আমি ঘোষণা করছি যে, এই আবেদনে প্রদত্ত সকল তথ্য
          আমার জ্ঞান অনুযায়ী সঠিক ও সত্য।
        </p>

        <p>
          কোনো তথ্য ভুল বা মিথ্যা প্রমাণিত হলে কর্তৃপক্ষের
          গৃহীত সিদ্ধান্ত মেনে নিতে বাধ্য থাকব।
        </p>
      </div>

      {/* =====================================
          Documents
      ===================================== */}
      <div className="form-section">
        <h3>সংযুক্ত নথি</h3>

        {application.documents &&
        application.documents.length > 0 ? (
          <ul>
            {application.documents.map(
              (fileName: string, index: number) => (
                <li key={index}>{fileName}</li>
              )
            )}
          </ul>
        ) : (
          <p>কোনো নথি সংযুক্ত করা হয়নি।</p>
        )}
      </div>

      {/* =====================================
          Status
      ===================================== */}
      <div className="form-section">
        <h3>আবেদনের অবস্থা</h3>

        <p>
          <strong>স্ট্যাটাস:</strong>{" "}
          {application.status || "Pending"}
        </p>

        <p>
          <strong>পেমেন্ট:</strong>{" "}
          {application.paymentStatus === "Paid"
            ? "পরিশোধিত"
            : "অপরিশোধিত"}
        </p>
      </div>

      {/* =====================================
          Buttons
      ===================================== */}
      <div
        className="button-group"
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          type="button"
          className="submit-btn"
          onClick={() => window.print()}
        >
          🖨️ প্রিন্ট
        </button>

        <button
          type="button"
          className="submit-btn"
          onClick={() =>
            navigate("/death-registration-applications")
          }
        >
          ফিরে যান
        </button>
      </div>

    </div>
  );
}

export default DeathRegistrationPreview;