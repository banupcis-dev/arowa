
import { useLocation } from "react-router-dom";
import "../css/deathFeeVoucher.css";

function DeathFeeVoucher() {
  const { state } = useLocation();

  const application = state || {};

  const applicationId =
    application.id || application.applicationId || "-";

  const deceasedName =
    application.deceasedNameBn || "-";

  const birthRegistrationNo =
    application.birthRegistrationNo ||
    application.registerNo ||
    "-";

  const birthDate =
    application.birthDate ||
    application.dateOfBirth ||
    "-";

  const deathDate =
    application.deathDate || "-";

  const applicantName =
    application.applicantNameBn || "-";

  const applicantMobile =
    application.applicantMobile || "-";

  const fee =
    application.fee || application.registrationFee || 0;

  const voucherDate =
    application.paymentDate ||
    new Date().toLocaleDateString("en-GB");

  // একই ভাউচার দুই কপিতে দেখানো
  const renderVoucher = (copyName: string) => (
    <div className="death-fee-voucher">

      <div className="voucher-copy-title">
        {copyName}
      </div>

      <div className="voucher-header">
        <h3>মৃত্যু নিবন্ধন ফি আদায়ের ভাউচার</h3>

        <p>
          ইউনিয়ন পরিষদ
        </p>
      </div>

      <div className="voucher-info">

        <div className="voucher-row">
          <span>ভাউচার নং</span>
          <strong>{applicationId}</strong>
        </div>

        <div className="voucher-row">
          <span>তারিখ</span>
          <strong>{voucherDate}</strong>
        </div>

      </div>

      <div className="voucher-table">

        <div className="voucher-line">
          <span>মৃত ব্যক্তির নাম</span>
          <strong>{deceasedName}</strong>
        </div>

        <div className="voucher-line">
          <span>জন্ম নিবন্ধন নং</span>
          <strong>{birthRegistrationNo}</strong>
        </div>

        <div className="voucher-line">
          <span>জন্ম তারিখ</span>
          <strong>{birthDate}</strong>
        </div>

        <div className="voucher-line">
          <span>মৃত্যুর তারিখ</span>
          <strong>{deathDate}</strong>
        </div>

        <div className="voucher-line">
          <span>আবেদনকারীর নাম</span>
          <strong>{applicantName}</strong>
        </div>

        <div className="voucher-line">
          <span>মোবাইল</span>
          <strong>{applicantMobile}</strong>
        </div>

      </div>

      <div className="voucher-fee">

        <span>নিবন্ধন ফি</span>

        <strong>
          ৳ {Number(fee).toLocaleString("bn-BD")}
        </strong>

      </div>

      <div className="voucher-footer">

        <div>
          গ্রহণকারীর স্বাক্ষর
        </div>

        <div>
          আবেদনকারীর স্বাক্ষর
        </div>

      </div>

    </div>
  );

  return (
    <>
      <div className="death-fee-voucher-page">

        {/* অফিস কপি */}
        {renderVoucher("অফিস কপি")}

        {/* গ্রাহক কপি */}
        {renderVoucher("গ্রাহক কপি")}

      </div>

      <div className="voucher-print-button">
        <button
          type="button"
          onClick={() => window.print()}
        >
          ভাউচার প্রিন্ট করুন
        </button>
      </div>
    </>
  );
}

export default DeathFeeVoucher;

