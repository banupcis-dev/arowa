import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/TradeLicenseCorrectionFee.css";

function TradeLicenseCorrectionFee() {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state as any;

  const [receiptNo, setReceiptNo] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [amountInWords, setAmountInWords] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [remarks, setRemarks] = useState("");

  if (!item) {
    return (
      <div className="trade-license-correction-fee-container">
        <h2>আবেদনের তথ্য পাওয়া যায়নি</h2>

        <button
          onClick={() =>
            navigate("/trade-license-correction-list")
          }
        >
          আবেদন তালিকায় ফিরে যান
        </button>
      </div>
    );
  }

  const licenseNo =
    item.licenseNo ||
    item.tradeLicenseNo ||
    "-";

  const businessName =
    item.businessNameBn ||
    item.businessName ||
    "-";

  const ownerName =
    item.ownerNameBn ||
    item.ownerName ||
    "-";

  const fixedFee = Number(
    item.correctionFee ||
      item.applicationFee ||
      item.fee ||
      0
  );

  // =========================================
  // Submit / ফি আদায়
  // =========================================

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!receiptNo.trim()) {
      alert("রশিদ নম্বর লিখুন।");
      return;
    }

    if (!paidAmount.trim()) {
      alert("আদায়কৃত টাকার পরিমাণ লিখুন।");
      return;
    }

    if (Number(paidAmount) <= 0) {
      alert("সঠিক টাকার পরিমাণ লিখুন।");
      return;
    }

    if (!paymentDate) {
      alert("আদায়ের তারিখ নির্বাচন করুন।");
      return;
    }

    const applications = JSON.parse(
      localStorage.getItem(
        "tradeLicenseCorrectionApplications"
      ) || "[]"
    );

    const updated = applications.map((app: any) =>
      app.applicationNo === item.applicationNo
        ? {
            ...app,

            correctionFeeDeducted: true,

            correctionFeeAmount: Number(paidAmount),

            correctionFeeFixedAmount: fixedFee,

            correctionFeeDeductionDate: paymentDate,

            correctionFeeReceiptNo: receiptNo,

            correctionFeeAmountInWords: amountInWords,

            correctionFeeRemarks: remarks,

            status: "Fee Deducted",
          }
        : app
    );

    localStorage.setItem(
      "tradeLicenseCorrectionApplications",
      JSON.stringify(updated)
    );

    alert("সংশোধন ফি আদায় সম্পন্ন হয়েছে।");

    navigate(
      "/trade-license-correction-list"
    );
  };

  return (
    <div className="trade-license-correction-fee-container">

      <h2>ট্রেড লাইসেন্স সংশোধন ফি আদায়</h2>

      {/* =========================================
          আবেদন সংক্রান্ত তথ্য
         ========================================= */}

      <div className="fee-info-box">

        <div>
          <strong>আবেদন নম্বর:</strong>
          <span>{item.applicationNo || "-"}</span>
        </div>

        <div>
          <strong>ট্রেড লাইসেন্স নম্বর:</strong>
          <span>{licenseNo}</span>
        </div>

        <div>
          <strong>ব্যবসার নাম:</strong>
          <span>{businessName}</span>
        </div>

        <div>
          <strong>মালিকের নাম:</strong>
          <span>{ownerName}</span>
        </div>

        <div>
          <strong>নির্ধারিত সংশোধন ফি:</strong>
          <span>{fixedFee} টাকা</span>
        </div>

      </div>

      {/* =========================================
          Fee Form
         ========================================= */}

      <form
        className="trade-license-correction-fee-form"
        onSubmit={handleSubmit}
      >

        <div className="fee-form-group">

          <label>
            রশিদ নম্বর <span>*</span>
          </label>

          <input
            type="text"
            value={receiptNo}
            onChange={(e) =>
              setReceiptNo(e.target.value)
            }
            placeholder="রশিদ নম্বর লিখুন"
          />

        </div>

        <div className="fee-form-group">

          <label>
            আদায়কৃত টাকার পরিমাণ <span>*</span>
          </label>

          <input
            type="number"
            min="0"
            value={paidAmount}
            onChange={(e) =>
              setPaidAmount(e.target.value)
            }
            placeholder="টাকার পরিমাণ লিখুন"
          />

        </div>

        <div className="fee-form-group">

          <label>
            টাকা কথায়
          </label>

          <input
            type="text"
            value={amountInWords}
            onChange={(e) =>
              setAmountInWords(e.target.value)
            }
            placeholder="যেমন: একশত টাকা মাত্র"
          />

        </div>

        <div className="fee-form-group">

          <label>
            ফি আদায়ের তারিখ <span>*</span>
          </label>

          <input
            type="date"
            value={paymentDate}
            onChange={(e) =>
              setPaymentDate(e.target.value)
            }
          />

        </div>

        <div className="fee-form-group">

          <label>
            মন্তব্য
          </label>

          <textarea
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="প্রয়োজনে মন্তব্য লিখুন"
            rows={3}
          />

        </div>

        {/* =========================================
            Buttons
           ========================================= */}

        <div className="fee-form-actions">

          <button
            type="button"
            className="fee-cancel-btn"
            onClick={() =>
              navigate(
                "/trade-license-correction-list"
              )
            }
          >
            বাতিল
          </button>

          <button
            type="submit"
            className="fee-submit-btn"
          >
            ফি আদায় করুন
          </button>

        </div>

      </form>

    </div>
  );
}

export default TradeLicenseCorrectionFee;