import { useLocation } from "react-router-dom";
import { showToast } from "../utils/showToast";
import CertificateHeader from "../components/CertificateHeader";
import "../css/CitizenCertificate.css";

function CitizenCertificate() {
  const { state } = useLocation();

  const application: any = state;
if (!application) {
  showToast("কোন তথ্য পাওয়া যায়নি।", "error");
  return <div>কোন তথ্য পাওয়া যায়নি।</div>;
}
  return (
    <div className="certificate-container">
      <CertificateHeader
  application={application}
  titleBn="নাগরিক সনদ"
  titleEn="Citizen Certificate"
/>

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
                    <td className="label">নাম</td>
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
                    <td className="label">গ্রাম</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.villageBn}</td>
                  </tr>

                  <tr>
                    <td className="label">ডাকঘর</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.postOfficeBn}</td>
                  </tr>

                  <tr>
                    <td className="label">ইউনিয়ন</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.union?.name_bn}</td>
                  </tr>

                  <tr>
                    <td className="label">উপজেলা</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.upazila?.name_bn}</td>
                  </tr>

                  <tr>
                    <td className="label">জেলা</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.district?.name_bn}</td>
                  </tr>

                </tbody>
              </table>

              <br />

              <p style={{ textAlign: "justify", lineHeight: "30px" }}>
                এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, উপরোক্ত বিবরণ অনুযায়ী
                <strong> {application.banglaName}</strong> আমার জানামতে একজন
                বাংলাদেশী নাগরিক এবং বানুপুর ইউনিয়নের একজন স্থায়ী বাসিন্দা।
                আমি তাহার সর্বাঙ্গীন মঙ্গল ও উন্নতি কামনা করি।
              </p>

            </td>

            {/* ================= English ================= */}

            <td
              width="50%"
              valign="top"
              style={{ paddingLeft: "20px" }}
            >

              <table className="certificate-info">
                <tbody>

                  <tr>
                    <td className="label">Name</td>
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
                    <td className="label">Village</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.villageEn}</td>
                  </tr>

                  <tr>
                    <td className="label">Post Office</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.postOfficeEn}</td>
                  </tr>

                  <tr>
                    <td className="label">Union</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.union?.name_en}</td>
                  </tr>

                  <tr>
                    <td className="label">Upazila</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.upazila?.name_en}</td>
                  </tr>

                  <tr>
                    <td className="label">District</td>
                    <td className="colon">:</td>
                    <td>{application.permanentAddress?.district?.name_en}</td>
                  </tr>

                </tbody>
              </table>

              <br />

              <p style={{ textAlign: "justify", lineHeight: "30px" }}>
                This is to certify that the above-mentioned
                <strong> {application.englishName}</strong> is personally known
                to me and, to the best of my knowledge and belief, is a citizen
                of Bangladesh and a permanent resident of Banupur Union. I wish
                him/her every success and prosperity in life.
              </p>

            </td>

          </tr>
        </tbody>
      </table>
            <br />
      <br />
      <br />
      <br />
      <br />

      {/* ================= Footer ================= */}

      <table width="100%">
        <tbody>
          <tr>

            <td width="33%" align="left">
              ........................................<br />
              <strong>প্রশাসনিক কর্মাকর্তা</strong><br />
              ঘারমোড়া ইউনিয়ন পরিষদ
            </td>

            <td width="34%" align="center">
              <strong>ইস্যুর তারিখ</strong><br />
              {application.issueDate || "........................"}
            </td>

            <td width="33%" align="right">
              ........................................<br />
              <strong>চেয়ারম্যান</strong><br />
              ঘারমোড়া ইউনিয়ন পরিষদ
            </td>

          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default CitizenCertificate;