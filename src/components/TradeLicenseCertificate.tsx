import { useLocation } from "react-router-dom";
import { showToast } from "../utils/showToast";
import CertificateHeader from "./CertificateHeader";
import "../css/CitizenCertificate.css";

function TradeLicenseCertificate() {
  const { state } = useLocation();

  const application: any = state;

  if (!application) {
    showToast("কোন তথ্য পাওয়া যায়নি।", "error");
    return <div>কোন তথ্য পাওয়া যায়নি।</div>;
  }

  return (
    <div className="certificate-container">

      {/* ================= Header ================= */}
     <CertificateHeader
  application={{
    ...application,
    registerNo: application.tradeLicenseNo,
    registerDate: application.registerDate,
    preview: application.ownerPreview,
  }}
  titleBn="ট্রেড লাইসেন্স"
  titleEn="Trade License"
/>

      {/* ================= Certificate Body ================= */}

      <table width="100%">
        <tbody>
          <tr>

            {/* ================= বাংলা ================= */}

            <td
              width="50%"
              valign="top"
              style={{
                borderRight: "1px solid #000",
                paddingRight: "20px",
              }}
            >

              <table className="certificate-info">
                <tbody>

                  <tr>
                    <td className="label">ব্যবসার নাম</td>
                    <td className="colon">:</td>
                    <td>{application.businessNameBn}</td>
                  </tr>
                  <tr>
                    <td className="label">মালিকের নাম</td>
                    <td className="colon">:</td>
                    <td>{application.banglaName}</td>
                  </tr>
                            <tr>
                <td className="label">পিতার নাম</td>
                <td className="colon">:</td>
                 <td>{application.fatherNameBeg}</td>
                    </tr>

                <tr>
                 <td className="label">মাতার নাম</td>
                <td className="colon">:</td>
                <td>{application.motherName}</td>
                </tr>
                  <tr>
                    <td className="label">জন্ম নিবন্ধন নম্বর</td>
                    <td className="colon">:</td>
                    <td>{application.birthRegNo}</td>
                  </tr>

                  <tr>
                    <td className="label">জন্ম তারিখ</td>
                    <td className="colon">:</td>
                    <td>{application.birthDate}</td>
                  </tr>

                  <tr>
                    <td className="label">লিঙ্গ</td>
                    <td className="colon">:</td>
                    <td>{application.gender?.name_bn}</td>
                  </tr>

                  <tr>
                    <td className="label">পেশা</td>
                    <td className="colon">:</td>
                    <td>{application.ocupation}</td>
                  </tr>

                  <tr>
                    <td className="label">ব্যবসার ধরন</td>
                    <td className="colon">:</td>
                    <td>{application.businessTypeBn}</td>
                  </tr>

                  <tr>
                    <td className="label">ব্যবসা শুরুর তারিখ</td>
                    <td className="colon">:</td>
                    <td>{application.businessStartDate}</td>
                  </tr>

                  <tr>
                    <td className="label">মূলধন</td>
                    <td className="colon">:</td>
                    <td>{application.capitalAmount}</td>
                  </tr>

                </tbody>
              </table>

              <br />

              <p
                style={{
                  textAlign: "Left",
                  lineHeight: "30px",
                }}
              >
                এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,
                <strong> {application.banglaName}</strong>
                উপরোক্ত ঠিকানা ও বিবরণ অনুযায়ী
                <strong> {application.businessNameBn}</strong>
                নামীয় ব্যবসা পরিচালনার জন্য এই ট্রেড লাইসেন্স প্রদান করা হলো।
                তিনি প্রযোজ্য আইন, বিধি ও স্থানীয় কর্তৃপক্ষের নির্দেশনা
                মেনে ব্যবসা পরিচালনা করবেন।
              </p>

            </td>

            {/* ================= English ================= */}

            <td
              width="50%"
              valign="top"
              style={{
                paddingLeft: "20px",
              }}
            >

              <table className="certificate-info">
                <tbody>

                  <tr>
                    <td className="label">Business Name</td>
                    <td className="colon">:</td>
                    <td>{application.businessNameEn}</td>
                  </tr>
              
                  <tr>
                    <td className="label">Owner's Name</td>
                    <td className="colon">:</td>
                    <td>{application.englishName}</td>
                  </tr>
                    <tr>
                 <td className="label">Father's Name</td>
                 <td className="colon">:</td>
                 <td>{application.fatherNameEn}</td>
                </tr>

                <tr>
                 <td className="label">Mother's Name</td>
                <td className="colon">:</td>
                 <td>{application.motherNameEn}</td>
                </tr>
                  <tr>
                    <td className="label">Birth Registration No.</td>
                    <td className="colon">:</td>
                    <td>{application.birthRegNo}</td>
                  </tr>

                  <tr>
                    <td className="label">Date of Birth</td>
                    <td className="colon">:</td>
                    <td>{application.birthDate}</td>
                  </tr>

                  <tr>
                    <td className="label">Gender</td>
                    <td className="colon">:</td>
                    <td>{application.gender?.name_en}</td>
                  </tr>

                  <tr>
                    <td className="label">Occupation</td>
                    <td className="colon">:</td>
                    <td>{application.ocupation}</td>
                  </tr>

                  <tr>
                    <td className="label">Business Type</td>
                    <td className="colon">:</td>
                    <td>{application.businessTypeEn}</td>
                  </tr>

                  <tr>
                    <td className="label">Business Start Date</td>
                    <td className="colon">:</td>
                    <td>{application.businessStartDate}</td>
                  </tr>

                  <tr>
                    <td className="label">Capital Amount</td>
                    <td className="colon">:</td>
                    <td>{application.capitalAmount}</td>
                  </tr>

                </tbody>
              </table>

              <br />

              <p
                style={{
                  textAlign: "Left",
                  lineHeight: "30px",
                }}
              >
                This is to certify that
                <strong> {application.englishName}</strong>
                is hereby authorized to operate the business named
                <strong> {application.businessNameEn}</strong>
                under this Trade License, subject to the applicable laws,
                rules and instructions of the local authority.
              </p>

            </td>

          </tr>
        </tbody>
      </table>

      <br />
      <br />
      <br />
      <br />
{/*================================== */}
<div className="no-print" style={{ textAlign: "center", marginTop: "20px" }}>
  <button
    type="button"
    onClick={() => window.print()}
  >
    🖨️ সনদ পত্র প্রিন্ট করুন
  </button>
</div>
      {/* ================= Footer ================= */}

      <table width="100%">
        <tbody>
          <tr>

            <td width="33%" align="left">
              ........................................
              <br />
              <strong>প্রশাসনিক কর্মকর্তা</strong>
              <br />
              ইউনিয়ন পরিষদ
            </td>

            <td width="34%" align="center">
              <strong>Office Seal</strong>
              <br />
              {application.issueDate
  ? new Date(application.issueDate).toLocaleDateString("en-GB")
  : "................"}
            </td>

            <td width="33%" align="right">
              ........................................
              <br />
              <strong>চেয়ারম্যান</strong>
              <br />
              ইউনিয়ন পরিষদ
            </td>

          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default TradeLicenseCertificate;

