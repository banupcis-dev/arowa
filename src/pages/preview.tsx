
import { useState, useEffect } from "react";
import "../css/preview.css";
import { useLocation, useNavigate } from "react-router-dom";
import { submitApplication } from "../submitApplication";
import Swal from "sweetalert2";
import { showToast } from "../utils/showToast";

function Preview() {
  const location = useLocation();
const { state } = location;

const searchParams = new URLSearchParams(location.search);
const applicationIdFromUrl = searchParams.get("applicationId");
  const navigate = useNavigate();
let applicationData = state;

const applicationId =
  state?.applicationId || applicationIdFromUrl;

if (applicationId) {
  const applications = JSON.parse(
    localStorage.getItem("citizenApplications") || "[]"
  );

  applicationData = applications.find(
    (item: any) => item.applicationId === applicationId
  );
}
 const isViewMode = !!applicationId;

  if (!applicationData) {
    return <h2>কোন আবেদন ডাটা পাওয়া যায়নি।</h2>;
  }

  const {
    banglaName,
    englishName,
    birthRegNo,
    birthDate,
    gender,
    bloodGroup,
    ocupation,
    qualification,
    birthAddress,
    presentAddress,
    permanentAddress,
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

  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
  const handlePrintMessage = (event: MessageEvent) => {
    if (
      event.origin !== window.location.origin ||
      event.data?.type !== "PRINT_APPLICATION"
    ) {
      return;
    }

    const application = event.data.application;

    if (!application) return;

    // নতুন window-তে আসা application data দিয়ে
    // localStorage update করার দরকার নেই।
    // শুধু বর্তমান Preview form-টাই print হবে।
    setTimeout(() => {
      window.print();
    }, 500);
  };

  window.addEventListener("message", handlePrintMessage);

  return () => {
    window.removeEventListener("message", handlePrintMessage);
  };
}, []);

  const handleSubmit = () => {
    if (isSubmitted) return;

    const applicationId = submitApplication(state);

    setIsSubmitted(true);

    navigate("/success", {
      state: { applicationId },
    });
  };

  const handleReject = async () => {
    const confirm = await Swal.fire({
      title: "আবেদন বাতিল করবেন?",
      text: "আপনি কি নিশ্চিত?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, বাতিল করুন",
      cancelButtonText: "না",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    });

    if (!confirm.isConfirmed) return;

    const { value: reason } = await Swal.fire({
      title: "বাতিলের কারণ লিখুন",
      input: "textarea",
      inputPlaceholder: "বাতিলের কারণ লিখুন...",
      showCancelButton: true,
      confirmButtonText: "সংরক্ষণ করুন",
      cancelButtonText: "বাতিল",
    });

    if (!reason) return;

    const applications = JSON.parse(
      localStorage.getItem("citizenApplications") || "[]"
    );

    const updatedApplications = applications.map((app: any) =>
      app.applicationId === applicationData.applicationId
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

    await showToast("Application Rejected Successfully.");

    navigate(-1);
  };
    return (
    <div className="preview-container" id="printable-application">
      <div className="preview-personal-section">
        <div className="preview-personal-info">
          <h2>নাগরিকের ব্যক্তিগত তথ্যসমূহ</h2>

          <table className="preview-table">
            <tbody>
              <tr>
                <th>আবেদনের তারিখ</th>
                <td>{applicationData.applicationDate}</td>
              </tr>

              <tr>
                <th>আবেদনকারীর নাম (বাংলা)</th>
                <td>{banglaName}</td>
              </tr>

              <tr>
                <td>আবেদনকারীর নাম (ইংরেজি)</td>
                <td>{englishName}</td>
              </tr>

              <tr>
                <td>জন্ম নিবন্ধন নম্বর</td>
                <td>{birthRegNo}</td>
              </tr>

              <tr>
                <td>জন্ম তারিখ</td>
                <td>{birthDate}</td>
              </tr>

              <tr>
                <td>লিঙ্গ</td>
                <td>
                  {gender?.name_bn}
                  <br />
                  {gender?.name_en}
                </td>

                <td>রক্তের গ্রুপ</td>
                <td>{bloodGroup}</td>
              </tr>

              <tr>
                <td>পেশা</td>
                <td>{ocupation}</td>

                <td>শিক্ষাগত যোগ্যতা</td>
                <td>{qualification}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="preview-personal-photo">
          <h2>নাগরিকের ছবি</h2>

          {preview ? (
            <img src={preview} alt="Citizen" width="150" />
          ) : (
            <p>কোন ছবি আপলোড করা হয়নি</p>
          )}
        </div>
      </div>
            <div className="parents-preview-section">
        <div className="preview-father-info">
          <h2>পিতার তথ্য</h2>

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
          <h2>মাতার তথ্য</h2>

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
        <h2>ঠিকানার তথ্য</h2>

        <table className="address-preview-table">
          <thead>
            <tr>
              <th>বিবরণ</th>
              <th>জন্মস্থান</th>
              <th>বর্তমান</th>
              <th>স্থায়ী</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>ইউনিয়ন</td>
              <td>{birthAddress.union.name_bn}</td>
              <td>{presentAddress.union.name_bn}</td>
              <td>{permanentAddress.union.name_bn}</td>
            </tr>

            <tr>
              <td>ওয়ার্ড</td>
              <td>{birthAddress.ward}</td>
              <td>{presentAddress.ward}</td>
              <td>{permanentAddress.ward}</td>
            </tr>

            <tr>
              <td>গ্রাম</td>
              <td>
                {birthAddress.villageBn}
                <br />
                {birthAddress.villageEn}
              </td>

              <td>
                {presentAddress.villageBn}
                <br />
                {presentAddress.villageEn}
              </td>

              <td>
                {permanentAddress.villageBn}
                <br />
                {permanentAddress.villageEn}
              </td>
            </tr>

            <tr>
              <td>ডাকঘর</td>

              <td>
                {birthAddress.postOfficeBn}
                <br />
                {birthAddress.postOfficeEn}
              </td>

              <td>
                {presentAddress.postOfficeBn}
                <br />
                {presentAddress.postOfficeEn}
              </td>

              <td>
                {permanentAddress.postOfficeBn}
                <br />
                {permanentAddress.postOfficeEn}
              </td>
            </tr>

            <tr>
              <td>হোল্ডিং নং</td>

              <td>
                {birthAddress.houseHoldingNoBn}
                <br />
                {birthAddress.houseHoldingNoEn}
              </td>

              <td>
                {presentAddress.houseHoldingNoBn}
                <br />
                {presentAddress.houseHoldingNoEn}
              </td>

              <td>
                {permanentAddress.houseHoldingNoBn}
                <br />
                {permanentAddress.houseHoldingNoEn}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
            <div>
        <h2>সংযুক্ত ডকুমেন্ট</h2>

        {files.length > 0 ? (
          <table className="preview-table">
            <tbody>
              {files.map((f: any, index: number) => (
                <tr key={index}>
                  <td>ডকুমেন্ট {index + 1}</td>
                  <td>{f.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>কোন ডকুমেন্ট আপলোড করা হয়নি।</p>
        )}
      </div>

      <div>
        <h2>আবেদনকারীর প্রত্যয়ন</h2>

        <table className="preview-table">
          <tbody>
            <tr>
              <td>নাগরিকের সাথে সম্পর্ক</td>
              <td>
                {applicantRelation === "self"
                  ? "নিজে"
                  : applicantRelation === "guardian"
                  ? "অভিভাবক"
                  : ""}
              </td>
            </tr>

            <tr>
              <td>আবেদনকারীর নাম</td>
              <td>{applicantName}</td>
            </tr>

            <tr>
              <td>ঘোষণায় সম্মতি</td>
              <td>{isAgreed ? "হ্যাঁ" : "না"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {!isViewMode ? (
        <div className="preview-submit">
          <button
            type="button"
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            {isSubmitted ? "আবেদন জমা হয়েছে" : "আবেদন জমা দিন"}
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <button
            type="button"
            className="reject-btn"
            onClick={handleReject}
          >
            ❌ আবেদন বাতিল
          </button>

          <button
            type="button"
            className="history-btn"
            onClick={() =>
              alert("পূর্বের লগ হিস্টরি পরে যোগ করা হবে")
            }
          >
            📜 পূর্বের লগ হিস্টরি
          </button>
        </div>
      )}
    </div>
  );
}

export default Preview;