
import { useLocation } from "react-router-dom";
import CertificateHeader from "./CertificateHeader";
import CertificateFooter from "./CertificateFooter";
import "../css/CitizenCertificate.css";

function DeceasedBirthCertificate() {
  const { state } = useLocation();

  const registerNo = state?.registerNo;

  const applications = JSON.parse(
    localStorage.getItem("deceasedBirthRegistrationApplications") || "[]"
  );

  // জন্ম নিবন্ধন বইয়ে থাকা Registered record থেকে তথ্য নেওয়া
  const application = applications.find(
    (item: any) =>
      item.status === "Registered" &&
      String(item.registerNo) === String(registerNo)
  );

  if (!application) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>জন্ম নিবন্ধন বইয়ে কোনো নিবন্ধিত তথ্য পাওয়া যায়নি।</h2>
      </div>
    );
  }

  /* =========================
     জন্মস্থান
     জেলা, দেশ
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
        titleBn="জন্ম নিবন্ধন সনদ"
        titleEn="Birth Registration Certificate"
      />

      {/* =========================
          Certificate Body
          Watermark শুধু Body-এর ভিতরে
      ========================= */}

      <div className="certificate-body">

        <img
          src="/images/seal.png"
          alt=""
          className="certificate-watermark"
        />

        <div className="certificate-content">

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
                          {application.deceasedNameBn ||
                            application.banglaName ||
                            "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">জন্ম তারিখ</td>
                        <td className="colon">:</td>
                        <td>{application.dateOfBirth || "-"}</td>
                      </tr>

                      <tr>
                        <td className="label">লিঙ্গ</td>
                        <td className="colon">:</td>
                        <td>{application.gender || "-"}</td>
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
                        <td className="label">জন্মস্থান</td>
                        <td className="colon">:</td>
                        <td>{birthAddressBn || "-"}</td>
                      </tr>

                      <tr>
                        <td className="label">বর্তমান ঠিকানা</td>
                        <td className="colon">:</td>
                        <td>{presentAddressBn || "-"}</td>
                      </tr>

                      <tr>
                        <td className="label">স্থায়ী ঠিকানা</td>
                        <td className="colon">:</td>
                        <td>{permanentAddressBn || "-"}</td>
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
                          {application.deceasedNameEn ||
                            application.englishName ||
                            "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">Date of Birth</td>
                        <td className="colon">:</td>
                        <td>{application.dateOfBirth || "-"}</td>
                      </tr>

                      <tr>
                        <td className="label">Sex</td>
                        <td className="colon">:</td>
                        <td>{application.gender || "-"}</td>
                      </tr>

                      <tr>
                        <td className="label">Father's Name</td>
                        <td className="colon">:</td>
                        <td>
                          {application.fatherNameEng ||
                            application.fatherNameEn ||
                            "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">Mother's Name</td>
                        <td className="colon">:</td>
                        <td>
                          {application.motherNameEng ||
                            application.motherNameEn ||
                            "-"}
                        </td>
                      </tr>

                      <tr>
                        <td className="label">Place of Birth</td>
                        <td className="colon">:</td>
                        <td>{birthAddressEn || "-"}</td>
                      </tr>

                      <tr>
                        <td className="label">Present Address</td>
                        <td className="colon">:</td>
                        <td>{presentAddressEn || "-"}</td>
                      </tr>

                      <tr>
                        <td className="label">Permanent Address</td>
                        <td className="colon">:</td>
                        <td>{permanentAddressEn || "-"}</td>
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

export default DeceasedBirthCertificate;

