import React, { useEffect, useState } from "react";
import "../css/BirthRegistrationApplication.css";
import { useNavigate } from "react-router-dom";

const DeceasedBirthRegistrationApplications: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const navigate = useNavigate();

  // =========================================================
  // Load Applications
  // =========================================================
  useEffect(() => {
    const savedApplications = localStorage.getItem(
      "deceasedBirthRegistrationApplications"
    );

    if (savedApplications) {
      try {
        const parsedApplications = JSON.parse(savedApplications);

        if (Array.isArray(parsedApplications)) {
          setApplications(parsedApplications);
        }
      } catch (error) {
        console.error("Application data load error:", error);
        setApplications([]);
      }
    }
  }, []);

  // =========================================================
  // Update Application
  // =========================================================
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
      "deceasedBirthRegistrationApplications",
      JSON.stringify(updatedApplications)
    );
  };

  // =========================================================
  // Receive Application
  // =========================================================
  const handleReceive = (
    application: any,
    index: number
  ) => {
    const isDuplicate = applications.some(
      (item, itemIndex) =>
        itemIndex !== index &&
        item.deceasedNameBn === application.deceasedNameBn &&
        item.fatherNameBeg === application.fatherNameBeg &&
        item.motherName === application.motherName
    );

    if (isDuplicate) {
      updateApplication(index, {
        status: "Possible Duplicate",
        duplicateStatus: true,
      });

      alert("সম্ভাব্য ডুপ্লিকেট আবেদন পাওয়া গেছে।");
      return;
    }

    updateApplication(index, {
      status: "Received",
      receiveStatus: true,
    });

    alert("আবেদন গ্রহণ করা হয়েছে।");
  };

  // =========================================================
  // Payment
  // =========================================================
  const handlePayment = (index: number) => {
    const applicationFee = Number(
      prompt("আবেদন ফি লিখুন:")
    );

    if (isNaN(applicationFee) || applicationFee < 0) {
      alert("সঠিক আবেদন ফি লিখুন।");
      return;
    }

    const serviceCharge = Number(
      prompt("সার্ভিস চার্জ লিখুন:")
    );

    if (isNaN(serviceCharge) || serviceCharge < 0) {
      alert("সঠিক সার্ভিস চার্জ লিখুন।");
      return;
    }

    // =====================================================
    // Receipt Number
    // =====================================================
    const receiptNo =
      "BR-" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    const paymentDate =
      new Date().toLocaleDateString("bn-BD");

    const totalAmount =
      applicationFee + serviceCharge;

    // =====================================================
    // Fee Record
    // =====================================================
    const feeRecord = {
      applicationId: applications[index].brn,
      receiptNo,
      paymentDate,
      deceasedNameBn:
        applications[index].deceasedNameBn,
      applicationFee,
      serviceCharge,
      totalAmount,
    };

    // =====================================================
    // Save Fee Register
    // =====================================================
    const savedFees = JSON.parse(
      localStorage.getItem("birthFeeRegister") || "[]"
    );

    savedFees.unshift(feeRecord);

    localStorage.setItem(
      "birthFeeRegister",
      JSON.stringify(savedFees)
    );

    // =====================================================
    // Update Application
    // =====================================================
    updateApplication(index, {
      paymentStatus: "Paid",
      paymentDate,
      receiptNo,
      applicationFee,
      serviceCharge,
      totalAmount,

      // Payment হওয়ার পরে Receive করা যাবে
      status:
        applications[index].status === "Received" ||
        applications[index].status === "Registered"
          ? applications[index].status
          : "Pending",
    });

    alert("পেমেন্ট সম্পন্ন হয়েছে।");
  };

  // =========================================================
  // Register Application
  // =========================================================
 const handleRegister = (index: number) => {
  const applications = JSON.parse(
    localStorage.getItem("deceasedBirthRegistrationApplications") || "[]"
  );

  // আগের সর্বশেষ সিরিয়াল বের করা
  const lastSerial = applications.reduce(
    (max: number, app: any) => {
      const registerNo = String(app.registerNo || "");

      if (registerNo.length === 17) {
        const serial = Number(registerNo.slice(-6));
        return serial > max ? serial : max;
      }

      return max;
    },
    200000
  );

  const serialNumber = lastSerial + 1;

  // জন্ম সাল বের করা
  const birthYear = String(
    applications[index].dateOfBirth
  ).slice(0, 4);

  // ১৭ সংখ্যার Register Number
  const registerNo =
    birthYear + "4195450" + String(serialNumber).padStart(6, "0");

  updateApplication(index, {
    status: "Registered",
    registerStatus: true,
    registerDate: new Date().toLocaleDateString("bn-BD"),
    registerNo,
  });

  alert(`আবেদন রেজিস্টার করা হয়েছে।\nরেজিস্টার নম্বর: ${registerNo}`);
};
  // =========================================================
  // Print Application Form
  // =========================================================
  const handlePrintApplication = (
    application: any
  ) => {
    navigate("/birth-registration-preview", {
      state: {
        ...application,
        printMode: true,
      },
    });
  };

  // =========================================================
  // Print Receipt
  // =========================================================
  const handlePrintReceipt = (
    application: any
  ) => {
    navigate("/payment-receipt", {
      state: {
        ...application,
        printMode: true,
      },
    });
  };

  // =========================================================
  // Print Certificate
  // =========================================================
 const handlePrintCertificate = (application: any) => {
  navigate("/deceased-birth-certificate", {
    state: {
      registerNo: application.registerNo,
    },
  });
};

  // =========================================================
  // Render
  // =========================================================
  return (
    <div className="deceased-applications-container">

      <h2>
        মৃত ব্যক্তির জন্ম নিবন্ধন সমূহ
      </h2>

      <div className="applications-table-wrapper">

        <table className="deceased-applications-table">

          <thead>
            <tr>
              <th>আবেদনকারীর ছবি</th>
              <th>BRN</th>
              <th>আবেদনের তারিখ</th>
              <th>আবেদনকারীর নাম</th>
              <th>পিতার নাম</th>
              <th>মাতার নাম</th>
              <th>লিঙ্গ</th>
              <th>আবেদনপত্রের অবস্থা</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {applications.length > 0 ? (

              applications.map(
                (application, index) => {

                  // -----------------------------------------
                  // Status
                  // -----------------------------------------
                  const status =
                    application.status || "Pending";

                  const isPaid =
                    application.paymentStatus === "Paid";

                  const isReceived =
                    status === "Received" ||
                    application.receiveStatus === true;

                  const isRegistered =
                    status === "Registered" ||
                    application.registerStatus === true;

                  const isDuplicate =
                    status === "Possible Duplicate" ||
                    application.duplicateStatus === true;

                  // -----------------------------------------
                  // Cancel / Reject
                  // -----------------------------------------
                  const isRejected =
                    application.rejectStatus === true;

                  const isCancelled =
                    application.cancelStatus === true ||
                    status === "Cancelled";

                  return (
                    <tr
                      key={
                        application.brn || index
                      }
                    >

                      {/* ===================================
                          Applicant Photo
                      =================================== */}
                      <td>

                        {application.preview ? (
                          <img
                            src={application.preview}
                            alt="আবেদনকারীর ছবি"
                            className="applicant-photo"
                          />
                        ) : (
                          "ছবি নেই"
                        )}

                      </td>

                      {/* ===================================
                          BRN
                      =================================== */}
                      <td>
                      {application.registerNo || application.brn || "-"}
                        </td>
                      {/* ===================================
                          Application Date
                      =================================== */}
                      <td>
                        {application.applicationDate ||
                          "-"}
                      </td>

                      {/* ===================================
                          Applicant Name
                      =================================== */}
                      <td>
                        {application.applicantName ||
                          application.deceasedNameBn ||
                          "-"}
                      </td>

                      {/* ===================================
                          Father
                      =================================== */}
                      <td>
                        {application.fatherNameBeg ||
                          "-"}
                      </td>

                      {/* ===================================
                          Mother
                      =================================== */}
                      <td>
                        {application.motherName ||
                          "-"}
                      </td>

                      {/* ===================================
                          Gender
                      =================================== */}
                      <td>
                        {application.gender || "-"}
                      </td>

                      {/* ===================================
                          Status
                      =================================== */}
                      <td>

                        <span className="application-status">
                          {isCancelled
                            ? "বাতিল"
                            : isRejected
                            ? "বাতিল করা হয়েছে"
                            : isDuplicate
                            ? "সম্ভাব্য ডুপ্লিকেট"
                            : isRegistered
                            ? "রেজিস্টার সম্পন্ন"
                            : isReceived
                            ? "আবেদন গ্রহণ করা হয়েছে"
                            : isPaid
                            ? "পেমেন্ট সম্পন্ন"
                            : "অপেক্ষমাণ"}
                        </span>

                      </td>

                      {/* ===================================
                          ACTION BUTTONS
                          Maximum 4 buttons
                      =================================== */}
                      <td className="action-buttons">

                        {/* =================================================
                            1. বিস্তারিত প্রদর্শন
                            সবসময় থাকবে
                        ================================================= */}
                        <button
                          type="button"
                          className="view-btn"
                          title="বিস্তারিত প্রদর্শন"
                          onClick={() =>
                            navigate(
                              "/birth-registration-preview",
                              {
                                state: application,
                              }
                            )
                          }
                        >
                          👁
                        </button>

                        {/* =================================================
                            2. আবেদন পত্র প্রিন্ট
                            সবসময় থাকবে
                        ================================================= */}
                        <button
                          type="button"
                          className="view-btn"
                          title="আবেদন পত্র প্রিন্ট করুন"
                          onClick={() =>
                            handlePrintApplication(
                              application
                            )
                          }
                        >
                          🖨️
                        </button>

                        {/* =================================================
                            Cancel / Reject / Duplicate হলে
                            পরবর্তী action বন্ধ থাকবে
                        ================================================= */}
                        {!isCancelled &&
                          !isRejected &&
                          !isDuplicate && (

                            <>

                              {/* ===========================================
                                  3A. Payment
                                  Payment না হলে
                              =========================================== */}
                              {!isPaid && (
                                <button
                                  type="button"
                                  className="payment-btn"
                                  title="আবেদন ফি প্রদান করুন"
                                  onClick={() =>
                                    handlePayment(
                                      index
                                    )
                                  }
                                >
                                  💵
                                </button>
                              )}

                              {/* ===========================================
                                  3B. Receipt Print
                                  Payment হয়ে গেলে
                              =========================================== */}
                              {isPaid && (
                                <button
                                  type="button"
                                  className="receipt-btn"
                                  title="টাকার রশিদ প্রিন্ট করুন"
                                  onClick={() =>
                                    handlePrintReceipt(
                                      application
                                    )
                                  }
                                >
                                  🧾
                                </button>
                              )}

                              {/* ===========================================
                                  4A. Receive
                                  Payment হওয়ার পরে এবং Receive না হলে
                              =========================================== */}
                              {isPaid &&
                                !isReceived &&
                                !isRegistered && (
                                  <button
                                    type="button"
                                    className="receive-btn"
                                    title="আবেদন পত্র গ্রহণ করুন"
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

                              {/* ===========================================
                                  Register
                                  Received হওয়ার পরে
                              =========================================== */}
                              {isReceived &&
                                !isRegistered && (
                                  <button
                                    type="button"
                                    className="register-btn"
                                    title="আবেদন রেজিস্টার করুন"
                                    onClick={() =>
                                      handleRegister(
                                        index
                                      )
                                    }
                                  >
                                    📋
                                  </button>
                                )}

                              {/* ===========================================
                                  Certificate Print
                                  Registered হওয়ার পরে
                              =========================================== */}
                              {isRegistered && (
                                <button
                                  type="button"
                                  className="certificate-print-btn"
                                  title="সনদ পত্র প্রিন্ট করুন"
                                  onClick={() =>
                                    handlePrintCertificate(
                                      application
                                    )
                                  }
                                >
                                  📜
                                </button>
                              )}

                            </>
                          )}

                      </td>

                    </tr>
                  );
                }
              )

            ) : (

              <tr>

                <td
                  colSpan={9}
                  className="no-application"
                >
                  এখনো কোনো আবেদন জমা হয়নি।
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DeceasedBirthRegistrationApplications;