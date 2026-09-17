import { useLocation } from "react-router-dom";
import CertificateHeader from "./CertificateHeader";
import CertificateFooter from "./CertificateFooter";
import "../css/CitizenCertificate.css";

function DeathRegistrationCertificate() {
  const { state } = useLocation();

  const registerNo = state?.registerNo;

  const applications = JSON.parse(
    localStorage.getItem("deathRegistrationApplications") || "[]"
  );

  // মৃত্যু নিবন্ধন বইয়ে থাকা Registered record থেকে তথ্য নেওয়া
  const application = applications.find(
    (item: any) =>
      item.status === "Registered" &&
      String(item.registerNo) === String(registerNo)
  );

  const registerDateEn = application?.registerDate || "-";
  const issueDate = new Date().toLocaleDateString("en-GB");

  if (!application) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>
          মৃত্যু নিবন্ধন বইয়ে কোনো নিবন্ধিত তথ্য পাওয়া যায়নি।
        </h2>
      </div>
    );
  }

  /* =========================
     মৃত্যুর স্থানের ঠিকানা
     জেলা, দেশ
  ========================= */

  const deathAddressBn = [
    application.deathAddress?.district?.name_bn,
    application.deathAddress?.country?.name_bn || "বাংলাদেশ",
  ]
    .filter(Boolean)
    .join(", ");

  const deathAddressEn = [
    application.deathAddress?.district?.name_en,
    application.deathAddress?.country?.name_en || "Bangladesh",
  ]
    .filter(Boolean)
    .join(", ");

  /* =========================
     মৃত্যুর সময় বসবাসের ঠিকানা
  ========================= */

  const residenceAddressBn = [
    application.residenceAddress?.villageBn,
    application.residenceAddress?.postOfficeBn,
    application.residenceAddress?.houseHoldingNoBn,
    application.residenceAddress?.ward
      ? `ওয়ার্ড নং ${application.residenceAddress.ward}`
      : "",
    application.residenceAddress?.upazila?.name_bn,
    application.residenceAddress?.district?.name_bn,
  ]
    .filter(Boolean)
    .join(", ");

  const residenceAddressEn = [
    application.residenceAddress?.villageEn,
    application.residenceAddress?.postOfficeEn,
    application.residenceAddress?.houseHoldingNoEn,
    application.residenceAddress?.ward
      ? `Ward No. ${application.residenceAddress.ward}`
      : "",
    application.residenceAddress?.upazila?.name_en,
    application.residenceAddress?.district?.name_en,
  ]
    .filter(Boolean)
    .join(", ");

  const genderEn =
    application.gender === "পুরুষ"
      ? "Male"
      : application.gender === "মহিলা"
      ? "Female"
      : application.gender === "অন্যান্য"
      ? "Other"
      : application.gender || "-";

  const deathCauseEn =
    application.deathCause === "বার্ধক্যজনিত"
      ? "Old age"
      : application.deathCause === "হৃদরোগ"
      ? "Heart disease"
      : application.deathCause === "স্ট্রোক"
      ? "Stroke"
      : application.deathCause === "ক্যান্সার"
      ? "Cancer"
      : application.deathCause === "শ্বাসকষ্টজনিত রোগ"
      ? "Respiratory disease"
      : application.deathCause === "দুর্ঘটনা"
      ? "Accident"
      : application.deathCause === "অন্যান্য"
      ? "Other"
      : application.deathCause || "-";

  return (
    <div className="certificate-container">

      {/* =========================
          Header
      ========================= */}

      <CertificateHeader
        application={{
          ...application,
          registerNo:
            application.registerNo ||
            application.birthRegistrationNo,
          registerDate: registerDateEn,
          issueDate,
        }}
        titleBn="মৃত্যু নিবন্ধন সনদ"
        titleEn="Death Registration Certificate"
      />

      {/* =========================
          Certificate Body
          Watermark শুধু Body-এর ভিতরে
      ========================= */}

      <div className="certificate-body">

        {/* Watermark */}
        <img
          src="/images/seal.png"
          alt=""
          className="certificate-watermark"
        />

        {/* Body Content */}
        <div className="certificate-content">

          <table>
            <tbody>
              <tr>

                {/* =========================
                    বাংলা অংশ
                ========================= */}

                <td
                  style={{
                    width: "50%",
                    verticalAlign: "top",
                  }}
                >
                  <table className="certificate-info">
                    <tbody>

                      <tr>
                        <td className="label">নাম</td>
                        <td className="colon">:</td>
                        <td>
                          {application.deceasedNameBn || "-"}
                        </td>
                      </tr>

                      {/* জন্ম তারিখ */}
                      <tr>
                        <td className="label">জন্ম তারিখ</td>
                        <td className="colon">:</td>
                        <td>
                          {application.birthDate || "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">লিঙ্গ</td>
                        <td className="colon">:</td>
                        <td>
                          {application.gender || "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">পিতার নাম</td>
                        <td className="colon">:</td>
                        <td>
                          {application.fatherNameBeg ||
                            application.fatherNameBn ||
                            application.fatherName ||
                            "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">মাতার নাম</td>
                        <td className="colon">:</td>
                        <td>
                          {application.motherName ||
                            application.motherNameBn ||
                            "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">মৃত্যুর তারিখ</td>
                        <td className="colon">:</td>
                        <td>
                          {application.deathDate || "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">মৃত্যুর কারণ</td>
                        <td className="colon">:</td>
                        <td>
                          {application.deathCause || "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">মৃত্যুস্থান</td>
                        <td className="colon">:</td>
                        <td>
                          {deathAddressBn || "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">
                          মৃত্যুর সময় বসবাসের ঠিকানা
                        </td>
                        <td className="colon">:</td>
                        <td>
                          {residenceAddressBn || "-"}
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </td>

                {/* =========================
                    English অংশ
                ========================= */}

                <td
                  style={{
                    width: "50%",
                    verticalAlign: "top",
                  }}
                >
                  <table className="certificate-info">
                    <tbody>

                      <tr>
                        <td className="label">Name</td>
                        <td className="colon">:</td>
                        <td>
                          {application.deceasedNameEn || "-"}
                        </td>
                      </tr>

                      {/* Date of Birth */}
                      <tr>
                        <td className="label">Date of Birth</td>
                        <td className="colon">:</td>
                        <td>
                          {application.birthDate || "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">Sex</td>
                        <td className="colon">:</td>
                        <td>
                          {genderEn}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">Father's Name</td>
                        <td className="colon">:</td>
                        <td>
                          {application.fatherNameEn ||
                            application.fatherNameEng ||
                            "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">Mother's Name</td>
                        <td className="colon">:</td>
                        <td>
                          {application.motherNameEn ||
                            application.motherNameEng ||
                            "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">Date of Death</td>
                        <td className="colon">:</td>
                        <td>
                          {application.deathDate || "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">Cause of Death</td>
                        <td className="colon">:</td>
                        <td>
                          {deathCauseEn}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">Place of Death</td>
                        <td className="colon">:</td>
                        <td>
                          {deathAddressEn || "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">
                          Residence at Time of Death
                        </td>
                        <td className="colon">:</td>
                        <td>
                          {residenceAddressEn || "-"}
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </td>

              </tr>
            </tbody>
          </table>

        </div>
      </div>

      {/* =========================
          Footer
      ========================= */}

      <CertificateFooter
        application={application}
      />

      {/* =========================
          Print Button
      ========================= */}

      <div
        className="no-print"
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <button
          type="button"
          onClick={() => window.print()}
        >
          🖨️ সনদ পত্র প্রিন্ট করুন
        </button>
      </div>

    </div>
  );
}

export default DeathRegistrationCertificate;