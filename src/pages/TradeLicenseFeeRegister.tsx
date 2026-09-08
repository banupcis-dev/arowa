import React, { useEffect, useState } from "react";
import "../css/BirthRegistrationApplication.css";

interface FeeRecord {
  receiptNo?: string;
  paymentDate?: string;

  businessNameBn?: string;
  businessNameEn?: string;

  banglaName?: string;
  ownerNameBn?: string;
  ownerNameEn?: string;

  licenseFee?: number;
  applicationFee?: number;
  vat?: number;
  businessTax?: number;
  serviceCharge?: number;
  lateFine?: number;
  totalAmount?: number;
}

const TradeLicenseFeeRegister: React.FC = () => {
  const [records, setRecords] = useState<FeeRecord[]>([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const savedRecords = localStorage.getItem(
      "tradeLicenseFeeRegister"
    );

    if (savedRecords) {
      try {
        setRecords(JSON.parse(savedRecords));
      } catch (error) {
        console.error(
          "ফি আদায়ের রেজিস্টার পড়তে সমস্যা হয়েছে:",
          error
        );
        setRecords([]);
      }
    }
  };

  const formatAmount = (amount: number | undefined) => {
    return Number(amount || 0).toLocaleString("bn-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="deceased-applications-container">

      <div className="no-print">
        <h2>ব্যবসা নিবন্ধন ফি আদায় রেজিস্টার</h2>
      </div>

      <div className="applications-table-wrapper">

        <table className="deceased-applications-table">

          <thead>
            <tr>
              <th>ক্রমিক নং</th>
              <th>রশিদ নং</th>
              <th>আদায়ের তারিখ</th>
              <th>ব্যবসার নাম</th>
              <th>মালিকের নাম</th>
              <th>লাইসেন্স ফি</th>
              <th>VAT (১৫%)</th>
              <th>ব্যবসায়িক কর</th>
              <th>সার্ভিস চার্জ</th>
              <th>জরিমানা</th>
              <th>মোট</th>
              <th className="no-print">Action</th>
            </tr>
          </thead>

          <tbody>

            {records.length > 0 ? (

              records.map((record, index) => {

                const licenseFee =
                  Number(
                    record.licenseFee ??
                    record.applicationFee ??
                    0
                  );

                const vat =
                  Number(record.vat ?? licenseFee * 0.15);

                const businessTax =
                  Number(record.businessTax ?? 0);

                const serviceCharge =
                  Number(record.serviceCharge ?? 0);

                const lateFine =
                  Number(record.lateFine ?? 0);

                const totalAmount =
                  Number(
                    record.totalAmount ??
                    (
                      licenseFee +
                      vat +
                      businessTax +
                      serviceCharge +
                      lateFine
                    )
                  );

                const ownerName =
                  record.ownerNameBn ||
                  record.banglaName ||
                  "-";

                return (
                  <tr
                    key={
                      record.receiptNo ||
                      index
                    }
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {record.receiptNo || "-"}
                    </td>

                    <td>
                      {record.paymentDate || "-"}
                    </td>

                    <td>
                      {record.businessNameBn || "-"}
                    </td>

                    <td>
                      {ownerName}
                    </td>

                    <td>
                      {formatAmount(licenseFee)}
                    </td>

                    <td>
                      {formatAmount(vat)}
                    </td>

                    <td>
                      {formatAmount(businessTax)}
                    </td>

                    <td>
                      {formatAmount(serviceCharge)}
                    </td>

                    <td>
                      {formatAmount(lateFine)}
                    </td>

                    <td>
                      <strong>
                        {formatAmount(totalAmount)}
                      </strong>
                    </td>

                    <td className="no-print">

                      <button
                        type="button"
                        className="view-btn"
                        title="রশিদ প্রিন্ট করুন"
                        onClick={handlePrint}
                      >
                        🖨️
                      </button>

                    </td>

                  </tr>
                );
              })

            ) : (

              <tr>

                <td
                  colSpan={12}
                  className="no-application"
                >
                  এখনো কোনো ফি আদায় হয়নি।
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {records.length > 0 && (
        <div
          className="no-print"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >

          <button
            type="button"
            className="submit-btn"
            onClick={handlePrint}
          >
            🖨️ রেজিস্টার প্রিন্ট করুন
          </button>

        </div>
      )}

    </div>
  );
};

export default TradeLicenseFeeRegister;
