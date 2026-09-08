import React from "react";
import { useLocation } from "react-router-dom";
import "../css/TradeLicenseReceipt.css";

const TradeLicenseReceipt: React.FC = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2>কোন রশিদের তথ্য পাওয়া যায়নি।</h2>
      </div>
    );
  }
const {
  receiptNo,
  businessNameBn,
  banglaName,
  licenseFee = 0,
  serviceCharge = 0,
  businessTax = 0,
  lateFine = 0,
} = state;

  // লাইসেন্স ফি-এর ১৫% VAT
  const vat = licenseFee * 0.15;

  // অন্যান্য ফি
  const businessTaxAmount = Number(businessTax) || 0;
  const serviceChargeAmount = Number(serviceCharge) || 0;
  const lateFineAmount = Number(lateFine) || 0;

  // মোট
  const total =
    licenseFee +
    vat +
    businessTaxAmount +
    serviceChargeAmount +
    lateFineAmount;

  const ReceiptCopy = ({
    copyTitle,
  }: {
    copyTitle: string;
  }) => (
    <div className="trade-receipt-copy">

      <div className="trade-receipt-header">
        <h2>ব্যবসা নিবন্ধন</h2>
        <h3>জমা আদায়ের রশিদ</h3>
        <h4>{copyTitle}</h4>
      </div>

      <div className="trade-receipt-info">

        <div className="receipt-info-row">
          <strong>রশিদ নং:</strong>
          <span>{receiptNo || "-"}</span>
        </div>

        <div className="receipt-info-row">
          <strong>ব্যবসার নাম:</strong>
          <span>{businessNameBn || "-"}</span>
        </div>

        <div className="receipt-info-row">
          <strong>মালিকের নাম:</strong>
          <span>{banglaName || "-"}</span>
        </div>

      </div>

      <table className="trade-receipt-table">
        <thead>
          <tr>
            <th>ক্রমিক</th>
            <th>ফি/কর-এর বিবরণ</th>
            <th>টাকা</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>১</td>
            <td>লাইসেন্স ফি</td>
            <td>{licenseFee.toFixed(2)}</td>
          </tr>

          <tr>
            <td>২</td>
            <td>
              ভ্যাট (লাইসেন্স ফি-এর ১৫%)
            </td>
            <td>{vat.toFixed(2)}</td>
          </tr>

          <tr>
            <td>৩</td>
            <td>ব্যবসায়িক কর</td>
            <td>
              {businessTaxAmount.toFixed(2)}
            </td>
          </tr>

          <tr>
            <td>৪</td>
            <td>সার্ভিস চার্জ</td>
            <td>
              {serviceChargeAmount.toFixed(2)}
            </td>
          </tr>

          <tr>
            <td>৫</td>
            <td>
              সনদ সঠিক সময়ে গ্রহণ না করলে ৬% জরিমানা
            </td>
            <td>
              {lateFineAmount.toFixed(2)}
            </td>
          </tr>

          <tr className="receipt-total-row">
            <th colSpan={2}>মোট</th>
            <th>{total.toFixed(2)}</th>
          </tr>

        </tbody>
      </table>

      <div className="receipt-signature-section">

        <div className="receipt-signature-box">
          <div className="receipt-signature-line"></div>
          <p>আদায়কারীর স্বাক্ষর</p>
        </div>

        <div className="receipt-signature-box">
          <div className="receipt-signature-line"></div>
          <p>যাচাইকারীর স্বাক্ষর</p>
        </div>

      </div>

    </div>
  );

  return (
    <>
      <div className="trade-license-receipt-container">

        {/* অফিস কপি */}
        <ReceiptCopy copyTitle="অফিস কপি" />

        <div className="receipt-copy-divider">
          ✂ ------------------------------------------------ ✂
        </div>

        {/* গ্রাহক কপি */}
        <ReceiptCopy copyTitle="গ্রাহক কপি" />

      </div>

      <div className="trade-receipt-actions no-print">
        <button
          type="button"
          onClick={() => window.print()}
        >
          🖨️ রশিদ প্রিন্ট করুন
        </button>
      </div>
    </>
  );
};

export default TradeLicenseReceipt;