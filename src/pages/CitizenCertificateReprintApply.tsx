import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CitizenCertificateReprintApply.css";
import { showToast } from "../utils/showToast";


function CitizenCertificateReprintApply() {
  const navigate = useNavigate();

  const [certificateNo, setCertificateNo] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [citizenData, setCitizenData] = useState<any>(null);
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!certificateNo.trim()) {
      showToast("১৭ ডিজিটের নাগরিক সনদ নম্বর লিখুন।", "warning");
      return;
    }

    if (certificateNo.length !== 17) {
      showToast("নাগরিক সনদ নম্বর অবশ্যই ১৭ ডিজিটের হতে হবে।", "warning");
      return;
    }

    if (!birthDate) {
      showToast("জন্ম তারিখ নির্বাচন করুন।", "warning");
      return;
    }

    const applications = JSON.parse(
      localStorage.getItem("citizenApplications") || "[]"
    );

    const record = applications.find(
      (app: any) =>
        app.registerStatus === true &&
        app.registerNo === certificateNo &&
        app.birthDate === birthDate
    );
if (record) {
  setCitizenData(record);
} else {
  setCitizenData(null);
  showToast("কোনো রেকর্ড পাওয়া যায়নি।", "error");
}
  };

  const handleApply = () => {
    if (!citizenData) return;

    const reprintApplications = JSON.parse(
      localStorage.getItem("citizenReprintApplications") || "[]"
    );

    const newApplication = {
      applicationId: Date.now(),
      applicationDate: new Date().toLocaleString(),

      registerNo: citizenData.registerNo,
      birthDate: citizenData.birthDate,

      banglaName: citizenData.banglaName,
      fatherNameBeg: citizenData.fatherNameBeg,
      motherName: citizenData.motherName,
      photo: citizenData.photo,
      applicationType: "Reprint",
      status: "Pending",
    };

    reprintApplications.push(newApplication);

    localStorage.setItem(
      "citizenReprintApplications",
      JSON.stringify(reprintApplications)
    );
    showToast("পূর্ণমুদ্রণের আবেদন সফলভাবে জমা হয়েছে।");


    navigate("/citizen-certificate-reprint-applications");
  };
    return (
    <div className="reprint-container">

      <h2>নাগরিক নিবন্ধন সনদ পূর্ণমুদ্রণের জন্য আবেদন</h2>

      <form onSubmit={handleSearch}>

        <table className="reprint-table">
          <tbody>

            <tr>
              <td>নাগরিক সনদ নম্বর (১৭ ডিজিট)</td>
              <td>
                <input
                  type="text"
                  value={certificateNo}
                  onChange={(e) =>
                    setCertificateNo(e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={17}
                  placeholder="১৭ ডিজিটের সনদ নম্বর লিখুন"
                />
              </td>
            </tr>

            <tr>
              <td>জন্ম তারিখ</td>
              <td>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </td>
            </tr>

          </tbody>
        </table>

        <div className="reprint-buttons">
          <button type="submit" className="preview-btn">
            তথ্য অনুসন্ধান করুন
          </button>

          <button
            type="button"
            className="preview-btn"
            onClick={() => navigate("/union-admin-dashboard")}
          >
            ড্যাশবোর্ডে ফিরে যান
          </button>
        </div>

      </form>

      {citizenData && (
        <div className="reprint-result">

          <h3>নাগরিকের তথ্য</h3>

          <div className="citizen-photo">
            <img
              src={citizenData.photo}
              alt="Citizen"
              width="140"
              height="160"
            />
          </div>

          <table className="reprint-table">
            <tbody>

              <tr>
                <td>নাম</td>
                <td>{citizenData.banglaName}</td>
              </tr>

              <tr>
                <td>পিতার নাম</td>
                <td>{citizenData.fatherNameBeg}</td>
              </tr>

              <tr>
                <td>মাতার নাম</td>
                <td>{citizenData.motherName}</td>
              </tr>

            </tbody>
          </table>

          <div className="reprint-buttons">

            <button
              className="preview-btn"
              onClick={handleApply}
            >
              পূর্ণমুদ্রণের জন্য আবেদন করুন
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default CitizenCertificateReprintApply;