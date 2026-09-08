import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/TradeLicenseRenewalFee.css";
import { numberToBanglaWords } from "../utils/numberToBanglaWords";

function TradeLicenseRenewalFee() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state as any;

  const [receiptNo, setReceiptNo] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [licenseFee, setLicenseFee] = useState("");
  const [businessTax, setBusinessTax] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const autoReceipt =
      "RN-" + Math.floor(100000 + Math.random() * 900000);

    setReceiptNo(autoReceipt);

    if (item) {
      const fee =
        item.licenseFee ??
        item.applicationFee ??
        item.fee ??
        "";

      setLicenseFee(fee ? String(fee) : "");

      setBusinessTax(
        item.businessTax
          ? String(item.businessTax)
          : ""
      );
    }
  }, [item]);

  if (!item) {
    return (
      <div className="renewal-fee-page">
        <div className="renewal-fee-voucher">
          <h2>আবেদনের তথ্য পাওয়া যায়নি</h2>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/trade-license-renewal-applications"
              )
            }
          >
            আবেদন তালিকায় ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  const licenseNo =
    item.tradeLicenseNo ||
    item.licenseNo ||
    "-";

  const businessName =
    item.businessNameBn ||
    item.businessName ||
    "-";

  const licenseFeeNum =
    Number(licenseFee) || 0;

  const businessTaxNum =
    Number(businessTax) || 0;

  // ভ্যাট = লাইসেন্স ফি-এর ১৫%
  const vatNum =
    licenseFeeNum * 0.15;

  // বিলম্ব জরিমানা = বকেয়া/বিলম্ব ফি-এর ৬%
  const lateFineBase =
    Number(item.arrearsAmount) || 0;

  const lateFineNum =
    lateFineBase * 0.06;

  const totalAmount =
    licenseFeeNum +
    vatNum +
    businessTaxNum +
    lateFineBase +
    lateFineNum;

  const totalInWords =
    numberToBanglaWords(totalAmount);

  const formatAmount = (amount: number) =>
    amount.toLocaleString("bn-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!receiptNo.trim()) {
      alert("রশিদ নম্বর লিখুন।");
      return;
    }

    if (licenseFeeNum <= 0) {
      alert("লাইসেন্স ফি লিখুন।");
      return;
    }

    const applications = JSON.parse(
      localStorage.getItem(
        "tradeLicenseRenewalApplications"
      ) || "[]"
    );

    const updatedApplications =
      applications.map((app: any) =>
        app.applicationNo ===
        item.applicationNo
          ? {
              ...app,

              renewalFeeDeducted: true,

              renewalFeeReceiptNo:
                receiptNo,

              renewalFeePaymentDate:
                paymentDate,

              licenseFee:
                licenseFeeNum,

              vat:
                vatNum,

              businessTax:
                businessTaxNum,

              arrearsAmount:
                lateFineBase,

              lateFine:
                lateFineNum,

              totalAmount:
                totalAmount,

              totalAmountInWords:
                totalInWords,

              renewalFeeRemarks:
                remarks,

              status:
                "Fee Deducted",
            }
          : app
      );

    localStorage.setItem(
      "tradeLicenseRenewalApplications",
      JSON.stringify(
        updatedApplications
      )
    );

    alert(
      "নবায়ন ফি কর্তন সম্পন্ন হয়েছে।"
    );

    navigate(
      "/trade-license-renewal-applications"
    );
  };

  const VoucherCopy = ({
    title,
  }: {
    title: string;
  }) => (
    <div className="renewal-fee-voucher">

      <div className="voucher-header">
        <h3>
          ট্রেড লাইসেন্স নবায়ন ফি আদায়ের ভাউচার
        </h3>

        <strong>{title}</strong>
      </div>

      <div className="voucher-basic-info">

        <div>
          <strong>সনদ নং:</strong>
          <span>{licenseNo}</span>
        </div>

        <div>
          <strong>তারিখ:</strong>

          <input
            type="date"
            value={paymentDate}
            onChange={(e) =>
              setPaymentDate(
                e.target.value
              )
            }
          />
        </div>

      </div>

      <div className="voucher-business-name">
        <strong>ব্যবসার নাম:</strong>
        <span>{businessName}</span>
      </div>

      <table className="voucher-fee-table">

        <thead>
          <tr>
            <th>ক্রমিক</th>
            <th>বিবরণ</th>
            <th>টাকা</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>১</td>
            <td>লাইসেন্স ফি</td>
            <td>
              <input
                type="number"
                value={licenseFee}
                onChange={(e) =>
                  setLicenseFee(
                    e.target.value
                  )
                }
                placeholder="0.00"
              />
            </td>
          </tr>

          <tr>
            <td>২</td>
            <td>ভ্যাট (১৫%)</td>
            <td>
              {formatAmount(vatNum)}
            </td>
          </tr>

          <tr>
            <td>৩</td>
            <td>পেশার উপর কর</td>
            <td>
              <input
                type="number"
                value={businessTax}
                onChange={(e) =>
                  setBusinessTax(
                    e.target.value
                  )
                }
                placeholder="0.00"
              />
            </td>
          </tr>

          <tr>
            <td>৪</td>
            <td>বিলম্ব জরিমানা (৬%)</td>
            <td>
              {formatAmount(lateFineNum)}
            </td>
          </tr>

          <tr className="voucher-total-row">
            <td colSpan={2}>
              মোট টাকা
            </td>

            <td>
              <strong>
                {formatAmount(
                  totalAmount
                )}
              </strong>
            </td>
          </tr>

        </tbody>

      </table>

      <div className="voucher-amount-words">
        <strong>
          মোট টাকা কথায়:
        </strong>

        <span>
          {totalInWords}
        </span>
      </div>

      <div className="voucher-signatures">

        <div>
          <span>
            চেয়ারম্যানের স্বাক্ষর
          </span>
        </div>

        <div>
          <span>
            আদায়কারীর স্বাক্ষর
          </span>
        </div>

      </div>

    </div>
  );

  return (
    <div className="renewal-fee-page">

      <div className="voucher-print-area">

        <VoucherCopy title="অফিস কপি" />

        <div className="copy-separator no-print">
          ✂ ───────── ✂
        </div>

        <VoucherCopy title="গ্রাহক কপি" />

      </div>

      <div className="no-print voucher-actions">

        <button
          type="button"
          className="voucher-cancel-btn"
          onClick={() =>
            navigate(
              "/trade-license-renewal-applications"
            )
          }
        >
          বাতিল
        </button>

        <button
          type="button"
          className="voucher-submit-btn"
          onClick={handleSubmit}
        >
          💰 ফি কর্তন করুন
        </button>

      </div>

    </div>
  );
}

export default TradeLicenseRenewalFee;