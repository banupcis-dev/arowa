import { useLocation } from "react-router-dom";
import CertificateHeader from "./CertificateHeader";
import CertificateFooter from "./CertificateFooter";
import "../css/CitizenCertificate.css";

function SameNameCertificate() {
  const { state } = useLocation();

  const registerNo = state?.registerNo;

  const applications = JSON.parse(
    localStorage.getItem("sameNameCertificateApplications") || "[]"
  );

  // Registered record থেকে তথ্য নেওয়া
  const application = applications.find(
    (item: any) =>
      item.status === "Registered" &&
      String(item.registerNo) === String(registerNo)
  );

  if (!application) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>
          একই নামে সনদ পত্র রেজিস্টারে কোনো নিবন্ধিত তথ্য পাওয়া যায়নি।
        </h2>
      </div>
    );
  }

  /* =========================
     জন্মস্থান
  ========================= */

  const birthAddressBn = [
    application.birthAddress?.district?.name_bn,
    application.birthAddress?.country?.name_bn || "বাংলাদেশ",
  ]
    .filter(Boolean)
    .join(", ");

  const birthAddressEn = [
    application.birthAddress?.district?.name_en,
    application.birthAddress?.country?.name_en || "Bangladesh",
  ]
    .filter(Boolean)
    .join(", ");

  /* =========================
     বর্তমান ঠিকানা
  ========================= */

  const presentAddressBn = [
    application.presentAddress?.villageBn,
    application.presentAddress?.postOfficeBn,
    application.presentAddress?.houseHoldingNoBn,
    application.presentAddress?.ward
      ? `ওয়ার্ড নং ${application.presentAddress.ward}`
      : "",
    application.presentAddress?.upazila?.name_bn,
    application.presentAddress?.district?.name_bn,
  ]
    .filter(Boolean)
    .join(", ");

  const presentAddressEn = [
    application.presentAddress?.villageEn,
    application.presentAddress?.postOfficeEn,
    application.presentAddress?.houseHoldingNoEn,
    application.presentAddress?.ward
      ? `Ward No. ${application.presentAddress.ward}`
      : "",
    application.presentAddress?.upazila?.name_en,
    application.presentAddress?.district?.name_en,
  ]
    .filter(Boolean)
    .join(", ");

  /* =========================
     স্থায়ী ঠিকানা
  ========================= */

  const permanentAddressBn = [
    application.permanentAddress?.villageBn,
    application.permanentAddress?.postOfficeBn,
    application.permanentAddress?.houseHoldingNoBn,
    application.permanentAddress?.ward
      ? `ওয়ার্ড নং ${application.permanentAddress.ward}`
      : "",
    application.permanentAddress?.upazila?.name_bn,
    application.permanentAddress?.district?.name_bn,
  ]
    .filter(Boolean)
    .join(", ");

  const permanentAddressEn = [
    application.permanentAddress?.villageEn,
    application.permanentAddress?.postOfficeEn,
    application.permanentAddress?.houseHoldingNoEn,
    application.permanentAddress?.ward
      ? `Ward No. ${application.permanentAddress.ward}`
      : "",
    application.permanentAddress?.upazila?.name_en,
    application.permanentAddress?.district?.name_en,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="certificate-container">

      {/* =========================
          Header
      ========================= */}

      <CertificateHeader
        application={{
          ...application,
          registerNo: application.registerNo,
          registerDate: application.registerDate,
        }}
        titleBn="একই নামে সনদ পত্র"
        titleEn="Same Name Certificate"
      />

      {/* =========================
          Certificate Body
      ========================= */}

      <table>
        <tbody>
          <tr>

            {/* =========================
                বাংলা অংশ
            ========================= */}

            <td style={{ width: "50%", verticalAlign: "top" }}>
              <table className="certificate-info">
                <tbody>

                  <tr>
                    <td className="label">নাম</td>
                    <td className="colon">:</td>
                    <td>
                      {application.banglaName || "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="label">ডাক নাম</td>
                    <td className="colon">:</td>
                    <td>
                      {application.nicknameBn || "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="label">জন্ম নিবন্ধন নম্বর</td>
                    <td className="colon">:</td>
                    <td>
                      {application.birthRegNo || "-"}
                    </td>
                  </tr>

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
                      {application.gender?.name_bn ||
                        application.gender ||
                        "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="label">পিতার নাম</td>
                    <td className="colon">:</td>
                    <td>
                      {application.fatherNameBeg ||
                        application.fatherNameBn ||
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
                    <td className="label">জন্মস্থান</td>
                    <td className="colon">:</td>
                    <td>
                      {birthAddressBn || "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="label">বর্তমান ঠিকানা</td>
                    <td className="colon">:</td>
                    <td>
                      {presentAddressBn || "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="label">স্থায়ী ঠিকানা</td>
                    <td className="colon">:</td>
                    <td>
                      {permanentAddressBn || "-"}
                    </td>
                  </tr>

                </tbody>
              </table>
            </td>

            {/* =========================
                English অংশ
            ========================= */}

            <td style={{ width: "50%", verticalAlign: "top" }}>
              <table className="certificate-info">
                <tbody>

                  <tr>
                    <td className="label">Name</td>
                    <td className="colon">:</td>
                    <td>
                      {application.englishName || "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="label">Nickname</td>
                    <td className="colon">:</td>
                    <td>
                      {application.nicknameEn || "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="label">
                      Birth Registration No.
                    </td>
                    <td className="colon">:</td>
                    <td>
                      {application.birthRegNo || "-"}
                    </td>
                  </tr>

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
                      {application.gender?.name_en ||
                        application.gender ||
                        "-"}
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
                    <td className="label">Place of Birth</td>
                    <td className="colon">:</td>
                    <td>
                      {birthAddressEn || "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="label">Present Address</td>
                    <td className="colon">:</td>
                    <td>
                      {presentAddressEn || "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="label">Permanent Address</td>
                    <td className="colon">:</td>
                    <td>
                      {permanentAddressEn || "-"}
                    </td>
                  </tr>

                </tbody>
              </table>
            </td>

          </tr>
        </tbody>
      </table>

      {/* =========================
          Footer
      ========================= */}

      <CertificateFooter application={application} />

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

export default SameNameCertificate;