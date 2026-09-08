import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import "./../css/CertificateHeader.css";

type CertificateHeaderProps = {
  application: any;
  titleBn: string;
  titleEn: string;
};

function CertificateHeader({
  application,
  titleBn,
  titleEn,
}: CertificateHeaderProps) {

  const currentAdmin = JSON.parse(
    localStorage.getItem("currentAdmin") || "{}"
  );

  const allOfficeSettings = JSON.parse(
    localStorage.getItem("officeSettings") || "{}"
  );

  const officeInfo =
    allOfficeSettings[currentAdmin.unionName] || {};

  return (
    <div className="certificate-header">

      {/* ================= Top Section ================= */}

      <div className="header-top">

        {/* QR Code */}

       <div className="header-qr">

  <QRCode
    value={`${window.location.origin}/verify/${application.registerNo}`}
    size={110}
  />

  {/* Copy Type */}
  {application.applicationType === "Correction" && (
  <div className="certificate-copy-type">
    সংশোধিত কপি
  </div>
)}

{application.applicationType === "Reprint" && (
  <div className="certificate-copy-type">
    পূর্ণমুদ্রণ
  </div>
)}

</div>

        {/* Office Information */}

        <div className="header-office">

          <h4>
            Local Government of the People's Republic of Bangladesh
          </h4>

          <h3>
            Office of the Registrar / Citizen Certificate Registration
          </h3>

          <h2>
            {officeInfo.unionNameEn}
          </h2>

          <p>
            {officeInfo.upazilaEn && officeInfo.districtEn
              ? `${officeInfo.upazilaEn}, ${officeInfo.districtEn}`
              : ""}
          </p>

          <p>
            Mobile : {officeInfo.mobile}
          </p>

          <p>
            Email : {officeInfo.email}
          </p>

          <p>
            Website : {officeInfo.website}
          </p>

        </div>

        {/* Barcode + Applicant Photo */}

        <div className="header-photo">

          <div className="photo-barcode">

            <Barcode
              value={application.registerNo}
              width={1.3}
              height={30}
              displayValue={false}
              margin={0}
            />

          </div>

          <img
            src={application.preview}
            alt="Applicant"
            className="certificate-photo"
          />

        </div>

      </div>

      {/* Certificate Title */}

      <p className="certificate-title">
        {titleBn} / {titleEn}
      </p>

      {/* Bottom Section */}

      <div className="header-bottom">

        <div className="header-item">
          <strong>Date of Registration</strong>
          <br />
          {application.registerDate}
        </div>

        <div className="header-item">
          <strong>Certificate No.</strong>
          <br />
          {application.registerNo}
        </div>

        <div className="header-item">
          <strong>Certificate Issue Date</strong>
          <br />
          {application.issueDate || "................"}
        </div>

      </div>

    </div>
  );
}

export default CertificateHeader;