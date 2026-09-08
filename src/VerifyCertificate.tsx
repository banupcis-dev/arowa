import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/verify.css";


function VerifyCertificate() {
  const { registerNo } = useParams();
  const [officeInfo, setOfficeInfo] = useState({
  unionNameEn: "",
  upazilaEn: "",
  districtEn: "",
  mobile: "",
  email: "",
  website: "",
  officeLogo: "",
});

  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentAdmin = JSON.parse(
  localStorage.getItem("currentAdmin") || "{}"
);

const allOfficeSettings = JSON.parse(
  localStorage.getItem("officeSettings") || "{}"
);

if (currentAdmin.unionName) {
  setOfficeInfo(
    allOfficeSettings[currentAdmin.unionName]
  );
}
    const applications = JSON.parse(
      localStorage.getItem("citizenApplications") || "[]"
    );

    const foundApplication = applications.find(
      (item: any) => String(item.registerNo) === String(registerNo)
    );

    setApplication(foundApplication || null);
    setLoading(false);
  }, [registerNo]);

  if (loading) {
    return (
      <div className="verify-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="verify-container">
        <h4>
    Local Government of the People's Republic of Bangladesh
  </h4>


        <h2>Citizen Certificate Verification</h2>

        <hr />

        <h2 style={{ color: "red" }}>
          Certificate Not Found
        </h2>

        <p>
          Invalid Citizen Registration Number
        </p>
      </div>
    );
  }

  return (
  <div className="verify-container">

    <div className="verify-header">

      <h4>
        Local Government of the People's Republic of Bangladesh
      </h4>
        <h3>Office of the Registrar/ Citizen Certificate Registration</h3>
      <h2>
        {officeInfo.unionNameEn}
      </h2>

      <p>
        {officeInfo.upazilaEn}, {officeInfo.districtEn}
      </p>

      <h3
        style={{
          color: "green",
          marginTop: "10px",
        }}
      >
        ✅ VERIFIED CERTIFICATE
      </h3>

    </div>

    <hr />

    <div className="verify-card">

    </div>

      <div className="verify-photo">

        <img
          src={application.preview}
          alt="Applicant"
        />

      </div>

      <table className="verify-table">

        <tbody>

          <tr>
            <td>Citizen Registration Number</td>
            <td>{application.registerNo}</td>
          </tr>

          <tr>
            <td>Application ID</td>
            <td>{application.applicationId}</td>
          </tr>

          <tr>
            <td>বাংলা নাম</td>
            <td>{application.banglaName}</td>
          </tr>

          <tr>
            <td>English Name</td>
            <td>{application.englishName}</td>
          </tr>

          <tr>
            <td>পিতার নাম</td>
            <td>{application.fatherNameBeg}</td>
          </tr>

          <tr>
            <td>Father's Name</td>
            <td>{application.fatherNameEn}</td>
          </tr>

          <tr>
            <td>মাতার নাম</td>
            <td>{application.motherName}</td>
          </tr>

          <tr>
            <td>Mother's Name</td>
            <td>{application.motherNameEn}</td>
          </tr>

          <tr>
            <td>Birth Registration Number</td>
            <td>{application.birthRegNo}</td>
          </tr>

          <tr>
            <td>Date of Birth</td>
            <td>{application.birthDate}</td>
          </tr>

          <tr>
            <td>Registration Date</td>
            <td>{application.registerDate}</td>
          </tr>

          <tr>
            <td>Approval Date</td>
            <td>{application.approveDate}</td>
          </tr>

          <tr>
            <td>Status</td>
            <td
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              VERIFIED
            </td>
          </tr>
          <tr>
  <td>Gender</td>
  <td>{application.gender?.name_en || application.gender}</td>
</tr>
<tr>
  <td>Blood Group</td>
  <td>{application.bloodGroup?.name_en || application.bloodGroup}</td>
</tr>
<tr>
  <td>Occupation</td>
  <td>{application.ocupation?.name_en || application.ocupation}</td>
</tr>
<tr>
  <td>Qualification</td>
  <td>{application.qualification?.name_en || application.qualification}</td>
</tr>

<tr>
  <td>জন্ম ঠিকানা</td>
  <td>
    {[
      application.birthAddress?.houseHoldingNoBn,
      application.birthAddress?.villageBn,
      application.birthAddress?.ward,
      application.birthAddress?.union?.name_bn,
      application.birthAddress?.postOfficeBn,
      application.birthAddress?.upazila?.name_bn,
      application.birthAddress?.district?.name_bn,
      application.birthAddress?.division?.name_bn,
      application.birthAddress?.country?.name_bn,
    ]
      .filter(Boolean)
      .join(", ")}
  </td>
</tr>
<tr>
  <td>Birth Address</td>
  <td>
    {[
      application.birthAddress?.houseHoldingNoEn,
      application.birthAddress?.villageEn,
      application.birthAddress?.ward,
      application.birthAddress?.union?.name_en,
      application.birthAddress?.postOfficeEn,
      application.birthAddress?.upazila?.name_en,
      application.birthAddress?.district?.name_en,
      application.birthAddress?.division?.name_en,
      application.birthAddress?.country?.name_en,
    ]
      .filter(Boolean)
      .join(", ")}
  </td>
</tr>


<tr>
  <td>বর্তমান ঠিকানা</td>
  <td>
    {[
      application.presentAddress?.houseHoldingNoBn,
      application.presentAddress?.villageBn,
      application.presentAddress?.ward,
      application.presentAddress?.union?.name_bn,
      application.presentAddress?.postOfficeBn,
      application.presentAddress?.upazila?.name_bn,
      application.presentAddress?.district?.name_bn,
      application.presentAddress?.division?.name_bn,
      application.presentAddress?.country?.name_bn,
    ]
      .filter(Boolean)
      .join(", ")}
  </td>
</tr>

<tr>
  <td>Present Address</td>
  <td>
    {[
      application.presentAddress?.houseHoldingNoEn,
      application.presentAddress?.villageEn,
      application.presentAddress?.ward,
      application.presentAddress?.union?.name_en,
      application.presentAddress?.postOfficeEn,
      application.presentAddress?.upazila?.name_en,
      application.presentAddress?.district?.name_en,
      application.presentAddress?.division?.name_en,
      application.presentAddress?.country?.name_en,
    ]
      .filter(Boolean)
      .join(", ")}
  </td>
</tr>

<tr>
  <td>স্থায়ী ঠিকানা</td>
  <td>
    {[
      application.permanentAddress?.houseHoldingNoBn,
      application.permanentAddress?.villageBn,
      application.permanentAddress?.ward,
      application.permanentAddress?.union?.name_bn,
      application.permanentAddress?.postOfficeBn,
      application.permanentAddress?.upazila?.name_bn,
      application.permanentAddress?.district?.name_bn,
      application.permanentAddress?.division?.name_bn,
      application.permanentAddress?.country?.name_bn,
    ]
      .filter(Boolean)
      .join(", ")}
  </td>
</tr>

<tr>
  <td>Permanent Address</td>
  <td>
    {[
      application.permanentAddress?.houseHoldingNoEn,
      application.permanentAddress?.villageEn,
      application.permanentAddress?.ward,
      application.permanentAddress?.union?.name_en,
      application.permanentAddress?.postOfficeEn,
      application.permanentAddress?.upazila?.name_en,
      application.permanentAddress?.district?.name_en,
      application.permanentAddress?.division?.name_en,
      application.permanentAddress?.country?.name_en,
    ]
      .filter(Boolean)
      .join(", ")}
  </td>
</tr>
        </tbody>

      </table>

    </div>
  );
}

export default VerifyCertificate;