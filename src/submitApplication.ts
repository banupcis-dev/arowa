export const submitApplication = (applicationData: any) => {

  // আগের আবেদনগুলো বের করা
  const applications = JSON.parse(
    localStorage.getItem("citizenApplications") || "[]"
  );

  // শেষ আবেদন আইডি
  const lastId = Number(
    localStorage.getItem("lastApplicationId") || "0"
  );

  // নতুন আইডি
  const newId = lastId + 1;

  // আবেদন নম্বর
  const applicationId = `NC-${String(newId).padStart(6, "0")}`;

  // বর্তমান তারিখ
  const today = new Date().toLocaleDateString("en-GB");

  // নতুন আবেদন
  const newApplication = {

    // =====================================
    // আবেদন তথ্য
    // =====================================
    applicationId,
    applicationDate: today,
    currentStatus: "Pending",

    // =====================================
    // ফি
    // =====================================
    serviceFee: 100,
    paymentStatus: false,
    paymentDate: "",
    paymentBy: "",
    receiptNo: "",

    // =====================================
    // আবেদন গ্রহণ
    // =====================================
    receiveStatus: false,
    receiveDate: "",
    receiveBy: "",

    // =====================================
    // ডুপ্লিকেট যাচাই
    // =====================================
    duplicateStatus: false,
    duplicateReason: "",

    // =====================================
    // অনুমোদন
    // =====================================
    approveStatus: false,
    approveDate: "",
    approveBy: "",

    // =====================================
    // রেজিস্টার
    // =====================================
    registerStatus: false,
    registerDate: "",
    registeredBy: "",
    registerNo: "",

    // =====================================
    // সনদ প্রিন্ট
    // =====================================
    certificatePrintStatus: false,
    certificatePrintDate: "",
    certificateNo: "",

    // =====================================
    // নাগরিক নিবন্ধন প্রিন্ট
    // =====================================
    citizenRegisterPrintStatus: false,
    citizenRegisterPrintDate: "",

    // =====================================
    // আবেদন বাতিল
    // =====================================
    rejectStatus: false,
    rejectReason: "",
    rejectDate: "",
    rejectBy: "",

    // =====================================
    // আবেদন সংশোধন
    // =====================================
    correctionStatus: false,
    correctionReason: "",
    correctionDate: "",

    // =====================================
    // আবেদন লগ
    // =====================================
    statusHistory: [
      {
        status: "Pending",
        date: today,
        user: "Citizen",
        remarks: "আবেদন জমা হয়েছে"
      }
    ],

    // =====================================
    // নাগরিকের মূল তথ্য
    // =====================================
    ...applicationData,
  };

  // সংরক্ষণ
  applications.push(newApplication);

  localStorage.setItem(
    "citizenApplications",
    JSON.stringify(applications)
  );

  localStorage.setItem(
    "lastApplicationId",
    String(newId)
  );

  alert(
    `আবেদন সফলভাবে সংরক্ষণ হয়েছে।
আবেদন নম্বর: ${applicationId}`
  );

  return applicationId;
};