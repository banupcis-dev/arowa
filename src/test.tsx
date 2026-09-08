import "../css/applicationList.css";
import {
  FaEye,
  FaMoneyBillWave,
  FaCheckCircle,
    FaPrint,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { showToast } from "../utils/showToast";

function ApplicationList() {
  const navigate = useNavigate();

  const applications = JSON.parse(
  localStorage.getItem("citizenApplications") || "[]"
).sort(
  (a: any, b: any) =>
    Number(b.applicationId) - Number(a.applicationId)
);

  // ===========================
  // Reject Application
  // ===========================
  const handleReject = (applicationId: string) => {
    const reason = prompt("Reject Reason লিখুন:");

    if (!reason) return;

    const updatedApplications = applications.map((app: any) =>
      app.applicationId === applicationId
        ? {
            ...app,
            rejectStatus: true,
            rejectReason: reason,
            rejectDate: new Date().toLocaleDateString("en-GB"),
          }
        : app
    );

    localStorage.setItem(
      "citizenApplications",
      JSON.stringify(updatedApplications)
    );

    showToast("Application Rejected Successfully.").then(() => {
      window.location.reload();
    });
  };

  // ===========================
  // Register Application
  // ===========================
  const handleRegister = (applicationId: string) => {
    const lastRegisterSerial = Number(
      localStorage.getItem("lastRegisterSerial") || "100000"
    );

    const registerSerial = lastRegisterSerial + 1;

    const application = applications.find(
      (app: any) => app.applicationId === applicationId
    );

    if (!application) return;

    const birthYear = new Date(application.birthDate).getFullYear();

    const unionCode = "4195450";

    const registerNo =
      `${birthYear}${unionCode}${String(registerSerial).padStart(6, "0")}`;

    const pageNo = Math.floor((registerSerial - 100001) / 12) + 1;

    const bookNo = Math.floor((pageNo - 1) / 200) + 1;

    const updatedApplications = applications.map((app: any) =>
      app.applicationId === applicationId
        ? {
            ...app,
            registerStatus: true,
            registerDate: new Date().toLocaleDateString("en-GB"),
            registerNo,
            registerSerial,
            pageNo,
            bookNo,
            registeredBy: "",
            certificateIssued: false,
            remarks: "",
          }
        : app
    );

    localStorage.setItem(
      "citizenApplications",
      JSON.stringify(updatedApplications)
    );

    localStorage.setItem(
      "lastRegisterSerial",
      String(registerSerial)
    );

    Swal.fire({
      icon: "success",
      title: "রেজিস্টার সম্পন্ন হয়েছে",
      html: `
        <div style="text-align:left;">
          <p><b>রেজিস্টার নং:</b> ${registerNo}</p>
          <p><b>বই নং:</b> ${bookNo}</p>
          <p><b>পাতা নং:</b> ${pageNo}</p>
        </div>
      `,
      confirmButtonText: "ঠিক আছে",
      confirmButtonColor: "#28a745",
    }).then(() => {
      window.location.reload();
    });
  };

  // ===========================
  // Approve Application
  // ===========================
  const handleApprove = (applicationId: string) => {
    const updatedApplications = applications.map((app: any) =>
      app.applicationId === applicationId
        ? {
            ...app,
            approveStatus: true,
            approveDate: new Date().toLocaleDateString("en-GB"),
          }
        : app
    );

    localStorage.setItem(
      "citizenApplications",
      JSON.stringify(updatedApplications)
    );

    showToast("Application Approved Successfully.").then(() => {
      window.location.reload();
    });
  };

  // ===========================
  // Receive Application
  // ===========================
  const handleReceive = (applicationId: string) => {
    const currentApplication = applications.find(
      (app: any) => app.applicationId === applicationId
    );

    if (!currentApplication) return;

    const duplicate = applications.find(
      (app: any) =>
        app.applicationId !== applicationId &&
        app.birthRegNo === currentApplication.birthRegNo &&
        app.banglaName === currentApplication.banglaName &&
        app.fatherNameBn === currentApplication.fatherNameBn &&
        app.motherNameBn === currentApplication.motherNameBn &&
        app.birthDate === currentApplication.birthDate
    );

    const updatedApplications = applications.map((app: any) => {
      if (app.applicationId !== applicationId) return app;

      if (duplicate) {
        // ===========================
// Print Full Application
// ===========================
const handlePrint = (application: any) => {
  const printWindow = window.open(
  `/preview?applicationId=${application.applicationId}`,
  "_blank"
);

  if (!printWindow) {
    Swal.fire({
      icon: "error",
      title: "প্রিন্ট করা যাচ্ছে না",
      text: "Browser popup block করেছে।",
      confirmButtonText: "ঠিক আছে",
    });
    return;
  }

  // Preview page load হওয়ার পর application data পাঠানো হবে
  const checkPreviewLoaded = setInterval(() => {
    try {
      if (printWindow.closed) {
        clearInterval(checkPreviewLoaded);
        return;
      }

      if (printWindow.document.readyState === "complete") {
        clearInterval(checkPreviewLoaded);

        printWindow.postMessage(
          {
            type: "PRINT_APPLICATION",
            application,
          },
          window.location.origin
        );
      }
    } catch {
      // নতুন window load হওয়ার সময় access error হলে অপেক্ষা করবে
    }
  }, 300);
};
        return {
          ...app,
          duplicateStatus: true,
          duplicateReason: "একই ব্যক্তির পূর্বের আবেদন পাওয়া গেছে।",
        };
      }

      return {
        ...app,
        receiveStatus: true,
        receiveDate: new Date().toLocaleDateString("en-GB"),
      };
    });

    localStorage.setItem(
      "citizenApplications",
      JSON.stringify(updatedApplications)
    );

    if (duplicate) {
      Swal.fire({
        icon: "warning",
        title: "Possible Duplicate",
        html: `
          <div style="text-align:left;">
            <p><b>একই ব্যক্তির পূর্বের আবেদন পাওয়া গেছে।</b></p>
            <p><b>আবেদন নং:</b> ${duplicate.applicationId}</p>
            <p><b>নাম:</b> ${duplicate.banglaName}</p>
            <p style="color:red;">
              এই আবেদনটি <b>Possible Duplicate</b> হিসেবে চিহ্নিত হয়েছে।<br>
              অনুমোদন না হওয়া পর্যন্ত রিসিভ করা যাবে না।
            </p>
          </div>
        `,
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#d33",
      }).then(() => {
        window.location.reload();
      });
    } else {
      showToast("আবেদন সফলভাবে রিসিভ করা হয়েছে।").then(() => {
        window.location.reload();
      });
    }
  };
    return (
    <div className="preview-container">
      <h2>নাগরিক নিবন্ধনের বিবরণ</h2>

      <table className="preview-table">
        <thead>
          <tr>
            <th>আবেদনের তারিখ</th>
            <th>আবেদনকারীর ছবি</th>
            <th>আবেদন পত্রের নং</th>
            <th>আবেদনকারীর নাম</th>
            <th>পিতার নাম</th>
            <th>মাতার নাম</th>
            <th>জন্ম নিবন্ধন নং</th>
            <th>লিঙ্গ</th>
            <th>আবেদনপত্রের অবস্থা</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application: any) => (
            <tr key={application.applicationId}>
              <td>{application.applicationDate}</td>

              <td>
                {application.preview && (
                  <img
                    src={application.preview}
                    alt="Citizen"
                    width="70"
                    height="80"
                  />
                )}
              </td>

              <td>{application.applicationId}</td>
              <td>{application.banglaName}</td>
              <td>{application.fatherNameBn}</td>
              <td>{application.motherNameBn}</td>
              <td>{application.birthRegNo}</td>
              <td>{application.gender?.name_bn}</td>

              <td>
                {application.registerStatus ? (
                  <span style={{ color: "#198754", fontWeight: "bold" }}>
                    Registered
                  </span>
                ) : application.rejectStatus ? (
                  <span style={{ color: "#dc3545", fontWeight: "bold" }}>
                    Rejected
                  </span>
                ) : application.approveStatus ? (
                  <span style={{ color: "#0d6efd", fontWeight: "bold" }}>
                    Approved
                  </span>
                ) : application.duplicateStatus ? (
                  <span style={{ color: "#fd7e14", fontWeight: "bold" }}>
                    Possible Duplicate
                  </span>
                ) : application.receiveStatus ? (
                  <span style={{ color: "#6f42c1", fontWeight: "bold" }}>
                    Received
                  </span>
                ) : (
                  <span style={{ color: "#6c757d", fontWeight: "bold" }}>
                    New
                  </span>
                )}
              </td>

              <td>
                {/* আবেদন দেখুন */}
<button
  className="view-btn"
  title="আবেদন দেখুন"
  onClick={() =>
    navigate("/preview", {
      state: application,
    })
  }
>
  <FaEye />
</button>

<button
  className="view-btn"
  title="আবেদন পত্র প্রিন্ট"
  onClick={() => handlePrint(application)}
>
  <FaPrint />
</button>

{/* আবেদন ফি */}
<button
  className="view-btn"
  title={
    application.paymentStatus
      ? "পেমেন্ট সম্পন্ন"
      : "আবেদন ফি গ্রহণ"
  }
  onClick={() => {
    if (!application.paymentStatus) {
      navigate("/payment-receipt", {
        state: application,
      });
    }
  }}
>
  {application.paymentStatus ? (
    <FaCheckCircle color="green" size={18} />
  ) : (
    <FaMoneyBillWave />
  )}
</button>

{/* আবেদন রিসিভ */}
<button
  className="view-btn"
  title="আবেদন রিসিভ"
  onClick={() => handleReceive(application.applicationId)}
  disabled={
    application.receiveStatus ||
    application.duplicateStatus
  }
>
  {application.receiveStatus ? (
    <FaCheckCircle color="green" size={18} />
  ) : application.duplicateStatus ? (
    "⚠️"
  ) : (
    "রিসিভ"
  )}
</button>

{/* আবেদন অনুমোদন */}
<button
  className="view-btn"
  title="আবেদন অনুমোদন"
  onClick={() => handleApprove(application.applicationId)}
  disabled={
    !application.receiveStatus ||
    application.approveStatus ||
    application.rejectStatus
  }
>
  {application.approveStatus ? (
    <FaCheckCircle color="green" size={18} />
  ) : (
    "✔️"
  )}
</button>
{/* আবেদন বাতিল */}
<button
  className="view-btn"
  title="Reject Application"
  onClick={() => handleReject(application.applicationId)}
  disabled={
    !application.receiveStatus ||
    application.approveStatus ||
    application.rejectStatus
  }
>
  ❌
</button>

{/* রেজিস্টার */}
<button
  className="view-btn"
  title="Register Application"
  onClick={() => handleRegister(application.applicationId)}
  disabled={
    !application.approveStatus ||
    application.registerStatus
  }
>
  📝
</button>

{/* নাগরিক সনদ */}
<button
  className="view-btn"
  title="Citizen Certificate"
  onClick={() =>
    navigate("/citizen-certificate", {
      state: application,
    })
  }
  disabled={!application.registerStatus}
>
  📜
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationList;
              
              