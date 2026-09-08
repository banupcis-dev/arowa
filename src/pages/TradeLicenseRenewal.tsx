
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TradeLicenseRenewal.css";

function TradeLicenseRenewal() {
  const navigate = useNavigate();

  const [tradeLicenseNo, setTradeLicenseNo] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [license, setLicense] = useState<any>(null);
  const [error, setError] = useState("");

  // =========================================
  // ট্রেড লাইসেন্স খুঁজুন
  // =========================================
  const handleSearch = () => {
    setError("");
    setLicense(null);

    const licenseNo = tradeLicenseNo.trim();

    // ১৭ সংখ্যার ট্রেড লাইসেন্স নম্বর
    if (!/^\d{17}$/.test(licenseNo)) {
      setError(
        "ট্রেড লাইসেন্স নম্বর অবশ্যই ১৭ সংখ্যার হতে হবে।"
      );
      return;
    }

    // জন্ম তারিখ
    if (!birthDate) {
      setError("জন্ম তারিখ নির্বাচন করুন।");
      return;
    }

    // =========================================
    // Register Book থেকে তথ্য নেওয়া
    // =========================================
    const registerBooks = JSON.parse(
      localStorage.getItem(
        "tradeLicenseRegisterBook"
      ) || "[]"
    );

    const foundLicense = registerBooks.find(
      (record: any) =>
        String(
          record.tradeLicenseNo || ""
        ).trim() === licenseNo &&
        String(
          record.birthDate || ""
        ).trim() === birthDate
    );

    // লাইসেন্স পাওয়া না গেলে
    if (!foundLicense) {
      setError(
        "এই ট্রেড লাইসেন্স নম্বর ও জন্ম তারিখ অনুযায়ী কোনো তথ্য পাওয়া যায়নি।"
      );
      return;
    }

    // =========================================
    // নবায়ন আবেদনসমূহ থেকে আগের আবেদন পড়া
    // =========================================
    const renewalApplications = JSON.parse(
      localStorage.getItem(
        "tradeLicenseRenewalApplications"
      ) || "[]"
    );

    // =========================================
    // একই লাইসেন্সের Pending আবেদন আছে কি না
    // =========================================
    const alreadyApplied =
      renewalApplications.some(
        (app: any) =>
          String(
            app.tradeLicenseNo || ""
          ).trim() === licenseNo &&
          app.status !== "Approved"
      );

    if (alreadyApplied) {
      alert(
        "এই ট্রেড লাইসেন্সের একটি নবায়ন আবেদন ইতোমধ্যে রয়েছে।"
      );
      return;
    }

      console.log("FOUND LICENSE:", foundLicense);
    // =========================================
    // নতুন নবায়ন আবেদন তৈরি
    // =========================================
    const applicationNo =
  "TLR-" + Math.floor(100000 + Math.random() * 900000);
    const renewalApplication = {
      ...foundLicense,

      applicationType: "Renewal",

      renewal: true,

      renewalApplicationDate:
        new Date().toLocaleDateString("en-CA"),

      paymentStatus: "Unpaid",

      received: false,

      approved: false,

      status: "Pending",
    };

    // =========================================
    // নবায়ন আবেদন তালিকায় জমা
    // =========================================
    renewalApplications.push(
      renewalApplication
    );

    localStorage.setItem(
      "tradeLicenseRenewalApplications",
      JSON.stringify(
        renewalApplications
      )
    );

    alert(
      "নবায়নের আবেদন সফলভাবে জমা হয়েছে।"
    );

    // সরাসরি নবায়ন আবেদনসমূহের তালিকায়
    navigate(
      "/trade-license-renewal-applications"
    );
  };

  // =========================================
  // নতুন করে খোঁজা
  // =========================================
  const handleReset = () => {
    setTradeLicenseNo("");
    setBirthDate("");
    setLicense(null);
    setError("");
  };

  return (
    <div className="trade-license-renewal-container">

      <h2>
        ট্রেড লাইসেন্স নবায়নের আবেদন
      </h2>

      {/* =========================================
          লাইসেন্স খোঁজার অংশ
         ========================================= */}

      {!license && (
        <div className="renewal-search-box">

          <div className="form-group">

            <label>
              ট্রেড লাইসেন্স নম্বর{" "}
              <span>*</span>
            </label>

            <input
              type="text"
              value={tradeLicenseNo}
              maxLength={17}
              onChange={(e) =>
                setTradeLicenseNo(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="১৭ সংখ্যার ট্রেড লাইসেন্স নম্বর লিখুন"
            />

          </div>

          <div className="form-group">

            <label>
              জন্ম তারিখ{" "}
              <span>*</span>
            </label>

            <input
              type="date"
              value={birthDate}
              onChange={(e) =>
                setBirthDate(
                  e.target.value
                )
              }
            />

          </div>

          {error && (
            <div className="renewal-error">
              {error}
            </div>
          )}

          <div className="renewal-actions">

            <button
              type="button"
              className="search-btn"
              onClick={handleSearch}
            >
              🔍 খুঁজুন
            </button>

          </div>

        </div>
      )}

      {/* =========================================
          লাইসেন্স পাওয়া গেলে তথ্য দেখাবে
         ========================================= */}

      {license && (
        <div className="renewal-found-box">

          <h3>
            ট্রেড লাইসেন্সের তথ্য পাওয়া গেছে
          </h3>

          <div className="license-info">

            <p>
              <strong>
                ট্রেড লাইসেন্স নম্বর:
              </strong>{" "}
              {license.tradeLicenseNo ||
                "-"}
            </p>

            <p>
              <strong>
                ব্যবসার নাম:
              </strong>{" "}
              {license.businessNameBn ||
                "-"}
            </p>

            <p>
              <strong>
                মালিকের নাম:
              </strong>{" "}
              {license.banglaName ||
                license.ownerNameBn ||
                "-"}
            </p>

            <p>
              <strong>
                জন্ম নিবন্ধন নম্বর:
              </strong>{" "}
              {license.birthRegNo ||
                "-"}
            </p>

            <p>
              <strong>
                জন্ম তারিখ:
              </strong>{" "}
              {license.birthDate ||
                "-"}
            </p>

            <p>
              <strong>
                ব্যবসার ধরন:
              </strong>{" "}
              {license.businessTypeBn ||
                "-"}
            </p>

          </div>

          <div className="renewal-actions">

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              🔄 আবার খুঁজুন
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default TradeLicenseRenewal;
