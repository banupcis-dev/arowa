
import React, { useEffect, useState } from "react";
import "../css/BirthRegistrationApplication.css";

interface RegisterRecord {
  tradeLicenseNo?: string;

  registerDate?: string;
  registerStatus?: string;

  businessNameBn?: string;
  businessNameEn?: string;

  ownerNameBn?: string;
  ownerNameEn?: string;

  banglaName?: string;
  englishName?: string;

  birthRegNo?: string;
  birthDate?: string;

  gender?: {
    name_bn?: string;
    name_en?: string;
  };

  businessTypeBn?: string;
  businessTypeEn?: string;

  businessStartDate?: string;
  capitalAmount?: string | number;

  paymentStatus?: string;
  receiptNo?: string;
  totalAmount?: number;
}

const TradeLicenseRegisterBook: React.FC = () => {
  const [records, setRecords] = useState<RegisterRecord[]>([]);

  useEffect(() => {
    loadRegisterBook();
  }, []);

  const loadRegisterBook = () => {
    const savedBooks = localStorage.getItem(
      "tradeLicenseRegisterBook"
    );

    if (savedBooks) {
      try {
        setRecords(JSON.parse(savedBooks));
      } catch (error) {
        console.error(
          "ট্রেড লাইসেন্স নিবন্ধন বই পড়তে সমস্যা হয়েছে:",
          error
        );

        setRecords([]);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getOwnerName = (record: RegisterRecord) => {
    return (
      record.ownerNameBn ||
      record.banglaName ||
      "-"
    );
  };

  const getGender = (record: RegisterRecord) => {
    if (!record.gender) {
      return "-";
    }

    if (typeof record.gender === "string") {
      return record.gender;
    }

    return record.gender.name_bn || "-";
  };

  return (
    <div className="deceased-applications-container">

      <div className="no-print">
        <h2>
          ট্রেড লাইসেন্স নিবন্ধন বই
        </h2>
      </div>

      <div className="applications-table-wrapper">

        <table className="deceased-applications-table">

          <thead>
            <tr>
              <th>ক্রমিক নং</th>
              <th>ট্রেড লাইসেন্স নং</th>
              <th>নিবন্ধনের তারিখ</th>
              <th>ব্যবসার নাম</th>
              <th>মালিকের নাম</th>
              <th>জন্ম নিবন্ধন নং</th>
              <th>জন্ম তারিখ</th>
              <th>লিঙ্গ</th>
              <th>ব্যবসার ধরন</th>
              <th>ব্যবসা শুরুর তারিখ</th>
              <th>মূলধন</th>
              <th>অবস্থা</th>
              <th className="no-print">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {records.length > 0 ? (

              records.map((record, index) => (

                <tr
                  key={
                    record.tradeLicenseNo ||
                    index
                  }
                >

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {record.tradeLicenseNo || "-"}
                  </td>

                  <td>
                    {record.registerDate || "-"}
                  </td>

                  <td>
                    {record.businessNameBn || "-"}
                  </td>

                  <td>
                    {getOwnerName(record)}
                  </td>

                  <td>
                    {record.birthRegNo || "-"}
                  </td>

                  <td>
                    {record.birthDate || "-"}
                  </td>

                  <td>
                    {getGender(record)}
                  </td>

                  <td>
                    {record.businessTypeBn || "-"}
                  </td>

                  <td>
                    {record.businessStartDate || "-"}
                  </td>

                  <td>
                    {record.capitalAmount || "-"}
                  </td>

                  <td>
                    <span className="application-status">
                      {record.registerStatus ||
                        "Registered"}
                    </span>
                  </td>

                  <td className="no-print">

                    <button
                      type="button"
                      className="view-btn"
                      title="রেজিস্টার তথ্য প্রিন্ট করুন"
                      onClick={handlePrint}
                    >
                      🖨️
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={13}
                  className="no-application"
                >
                  এখনো কোনো ট্রেড লাইসেন্স
                  নিবন্ধন বইতে জমা হয়নি।
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
            🖨️ নিবন্ধন বই প্রিন্ট করুন
          </button>

        </div>

      )}

    </div>
  );
};

export default TradeLicenseRegisterBook;
