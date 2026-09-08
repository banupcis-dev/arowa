import React, { useEffect, useState } from "react";
import "../css/BirthRegistrationApplication.css";
import { useNavigate } from "react-router-dom";

const TradeLicenseApplications: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedApplications = localStorage.getItem(
      "tradeLicenseApplications"
    );

    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  const updateApplication = (
    index: number,
    updates: any
  ) => {
    const updatedApplications = [...applications];

    updatedApplications[index] = {
      ...updatedApplications[index],
      ...updates,
    };

    setApplications(updatedApplications);

    localStorage.setItem(
      "tradeLicenseApplications",
      JSON.stringify(updatedApplications)
    );
  };

  // =========================
  // আবেদন গ্রহণ
  // =========================
  const handleReceive = (
    application: any,
    index: number
  ) => {
    const isDuplicate = applications.some(
      (item, itemIndex) =>
        itemIndex !== index &&
        item.businessNameBn === application.businessNameBn &&
        item.banglaName === application.banglaName &&
        item.birthRegNo === application.birthRegNo
    );

    if (isDuplicate) {
      updateApplication(index, {
        status: "Possible Duplicate",
      });

      alert("সম্ভাব্য ডুপ্লিকেট আবেদন পাওয়া গেছে।");
    } else {
      updateApplication(index, {
        status: "Received",
      });

      alert("আবেদন গ্রহণ করা হয়েছে।");
    }
  };
const handlePayment = (index: number) => {
  const application = applications[index];

  // =========================
  // লাইসেন্স ফি
  // =========================
  const licenseFee = Number(
    prompt("লাইসেন্স ফি লিখুন:")
  );

  if (isNaN(licenseFee) || licenseFee < 0) {
    alert("সঠিক লাইসেন্স ফি লিখুন।");
    return;
  }

  // =========================
  // ব্যবসায়িক কর
  // =========================
  const businessTax = Number(
    prompt("ব্যবসায়িক কর লিখুন:")
  );

  if (isNaN(businessTax) || businessTax < 0) {
    alert("সঠিক ব্যবসায়িক কর লিখুন।");
    return;
  }

  // =========================
  // সার্ভিস চার্জ
  // =========================
  const serviceCharge = Number(
    prompt("সার্ভিস চার্জ লিখুন:")
  );

  if (isNaN(serviceCharge) || serviceCharge < 0) {
    alert("সঠিক সার্ভিস চার্জ লিখুন।");
    return;
  }

  // =========================
  // ১৫% VAT
  // =========================
  const vat = licenseFee * 0.15;

  // =========================
  // ৬% জরিমানা
  // =========================
  const lateFine = Number(
    prompt(
      "সনদ সঠিক সময়ে গ্রহণ না করলে ৬% জরিমানা লিখুন:\nনা থাকলে 0 লিখুন।"
    )
  );

  if (isNaN(lateFine) || lateFine < 0) {
    alert("সঠিক জরিমানার পরিমাণ লিখুন।");
    return;
  }

  // =========================
  // মোট
  // =========================
  const totalAmount =
    licenseFee +
    vat +
    businessTax +
    serviceCharge +
    lateFine;

  // =========================
  // নতুন রশিদ নম্বর
  // =========================
  const receiptNo =
    "TL-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(
      100000 + Math.random() * 900000
    );

  const paymentDate =
    new Date().toLocaleDateString("bn-BD");

  // =========================
  // রশিদের সম্পূর্ণ তথ্য
  // =========================
  const receiptData = {
    ...application,

    receiptNo,

    paymentDate,

    licenseFee,

    applicationFee: licenseFee,

    vat,

    businessTax,

    serviceCharge,

    lateFine,

    totalAmount,

    paymentStatus: "Paid",
  };

  // =========================
  // জমা আদায় রেজিস্টার
  // =========================
  const savedRegister = JSON.parse(
    localStorage.getItem(
      "tradeLicenseFeeRegister"
    ) || "[]"
  );

  savedRegister.unshift(receiptData);

  localStorage.setItem(
    "tradeLicenseFeeRegister",
    JSON.stringify(savedRegister)
  );

  // =========================
  // আবেদন আপডেট
  // =========================
  updateApplication(index, {
    paymentStatus: "Paid",

    paymentDate,

    receiptNo,

    licenseFee,

    applicationFee: licenseFee,

    vat,

    businessTax,

    serviceCharge,

    lateFine,

    totalAmount,
  });

  // =========================
  // রশিদ পেজে পাঠানো
  // =========================
  navigate(
    "/trade-license-receipt",
    {
      state: receiptData,
    }
  );
};

const handleRegister = (index: number) => {
  const application = applications[index];

  const birthYear = application.birthDate
    ? new Date(application.birthDate).getFullYear().toString()
    : "";

  if (birthYear.length !== 4) {
    alert("মালিকের জন্ম তারিখ সঠিকভাবে পাওয়া যায়নি।");
    return;
  }

  const savedBooks = JSON.parse(
    localStorage.getItem("tradeLicenseRegisterBook") || "[]"
  );

  let serialNumber = 300001;

  if (savedBooks.length > 0) {
    const numbers = savedBooks
      .map((item: any) =>
        Number(item.tradeLicenseNo?.slice(-6)) || 0
      )
      .filter((number: number) => number >= 300001);

    if (numbers.length > 0) {
      serialNumber = Math.max(...numbers) + 1;
    }
  }
const serial = serialNumber
  .toString()
  .padStart(6, "0");

const tradeLicenseNo =
  birthYear + "4195450" + serial;

  const registerRecord = {
    ...application,
    tradeLicenseNo,
    registerDate: new Date().toLocaleDateString("en-GB"),
    registerStatus: "Registered",
  };

  savedBooks.unshift(registerRecord);

  localStorage.setItem(
    "tradeLicenseRegisterBook",
    JSON.stringify(savedBooks)
  );

  updateApplication(index, {
    status: "Registered",
    tradeLicenseNo,
    registerDate: new Date().toLocaleDateString("en-GB"),
  });

  alert(
    `আবেদনটি ট্রেড লাইসেন্স নিবন্ধন বইতে জমা হয়েছে।\n\nট্রেড লাইসেন্স নং: ${tradeLicenseNo}`
  );

  navigate("/trade-license-register-book");
};
  return (
    <div className="deceased-applications-container">

      <h2>ব্যবসা নিবন্ধনের আবেদনসমূহ</h2>

      <div className="applications-table-wrapper">

        <table className="deceased-applications-table">

          <thead>
            <tr>
              <th>মালিকের ছবি</th>
              <th>ট্রেড লাইসেন্স নং</th>
              <th>আবেদনের তারিখ</th>
              <th>ব্যবসার নাম</th>
              <th>মালিকের নাম</th>
              <th>ব্যবসার ধরন</th>
              <th>লিঙ্গ</th>
              <th>আবেদনের অবস্থা</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {applications.length > 0 ? (

              applications.map(
                (application, index) => (

                  <tr
                    key={
                      application.tradeLicenseNo ||
                      index
                    }
                  >

                    {/* ছবি */}
                    <td>
                      {application.ownerPreview ? (

                        <img
                          src={
                            application.ownerPreview
                          }
                          alt="মালিকের ছবি"
                          className="applicant-photo"
                        />

                      ) : (

                        "ছবি নেই"

                      )}
                    </td>

                    {/* Trade License No */}
                    <td>
                      {
                        application.tradeLicenseNo ||
                        "-"
                      }
                    </td>

                    {/* Application Date */}
                    <td>
                      {
                        application.applicationDate ||
                        "-"
                      }
                    </td>

                    {/* Business Name */}
                    <td>
                      {
                        application.businessNameBn ||
                        "-"
                      }
                    </td>

                    {/* Owner Name */}
                    <td>
                      {
                        application.banglaName ||
                        "-"
                      }
                    </td>

                    {/* Business Type */}
                    <td>
                      {
                        application.businessTypeBn ||
                        "-"
                      }
                    </td>

                    {/* Gender */}
                    <td>
                      {
                        application.gender?.name_bn ||
                        "-"
                      }
                    </td>

                    {/* Status */}
                    <td>
                      <span className="application-status">
                        {
                          application.status ||
                          "Pending"
                        }
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="action-buttons">

                      {/* বিস্তারিত */}
                      <button
                        type="button"
                        className="view-btn"
                        title="বিস্তারিত প্রদর্শন"
                        onClick={() =>
                          navigate(
                            "/trade-license-preview",
                            {
                              state: application,
                            }
                          )
                        }
                      >
                        👁
                      </button>

                      {/* Print */}
                      <button
                        type="button"
                        className="no-print"
                        title="আবেদন পত্র প্রিন্ট করুন"
                        onClick={() =>
                          window.print()
                        }
                      >
                        🖨️
                      </button>

                      {/* Payment-এর আগে */}
                      {application.paymentStatus !==
                        "Paid" && (

                        <button
                          type="button"
                          className="payment-btn"
                          title="পেমেন্ট করুন"
                          onClick={() =>
                            handlePayment(index)
                          }
                        >
                          💵
                        </button>

                      )}

                      {/* Payment-এর পরে */}
                      {application.paymentStatus ===
                        "Paid" && (

                        <button
                          type="button"
                          className="receipt-btn"
                          title="টাকার রশিদ প্রিন্ট"
                          onClick={() =>
                            window.print()
                          }
                        >
                          🖨
                        </button>

                      )}

                      {/* Receive */}
                      {application.status ===
                        "Pending" &&
                        application.paymentStatus ===
                          "Paid" && (

                        <button
                          type="button"
                          className="receive-btn"
                          title="আবেদন পত্র গ্রহণ"
                          onClick={() =>
                            handleReceive(
                              application,
                              index
                            )
                          }
                        >
                          ✋
                        </button>

                      )}

                      {/* Register */}
                      {application.status ===
                        "Received" && (

                        <button
                          type="button"
                          className="register-btn"
                          title="নিবন্ধন বইতে জমা করুন"
                          onClick={() =>
                            handleRegister(index)
                          }
                        >
                          📖
                        </button>

                      )}

                      {/* Registered */}
                      {application.status ===
                        "Registered" && (

                        <button
                          type="button"
                          className="certificate-print-btn"
                          title="ট্রেড লাইসেন্স সনদ প্রিন্ট করুন"
                          onClick={() =>
                            navigate(
                              "/trade-license-certificate",
                              {
                                state: application,
                              }
                            )
                          }
                        >
                          📜
                        </button>

                      )}

                    </td>

                  </tr>

                )

              )

            ) : (

              <tr>

                <td
                  colSpan={9}
                  className="no-application"
                >
                  এখনো কোনো ব্যবসা নিবন্ধনের আবেদন
                  জমা হয়নি।
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TradeLicenseApplications;