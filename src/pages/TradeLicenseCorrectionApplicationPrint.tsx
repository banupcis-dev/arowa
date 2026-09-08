import { useLocation } from "react-router-dom";
import "../css/TradeLicenseCorrectionApplicationPrint.css";

function TradeLicenseCorrectionApplicationPrint() {
  const location = useLocation();
  const item = location.state as any;

  if (!item) {
    return <h2>আবেদনের তথ্য পাওয়া যায়নি।</h2>;
  }

  const fieldLabels: Record<string, string> = {
    businessNameBn: "ব্যবসার নাম (বাংলা)",
    businessNameEn: "ব্যবসার নাম (ইংরেজি)",
    businessName: "ব্যবসার নাম",
    ownerNameBn: "মালিকের নাম (বাংলা)",
    ownerNameEn: "মালিকের নাম (ইংরেজি)",
    ownerName: "মালিকের নাম",
    birthRegNo: "জন্ম নিবন্ধন নম্বর",
    birthDate: "জন্ম তারিখ",
    gender: "লিঙ্গ",
    occupation: "পেশা",
    businessStartDate: "ব্যবসা শুরুর তারিখ",
    capitalAmount: "মূলধনের পরিমাণ",
    businessTypeBn: "ব্যবসার ধরন (বাংলা)",
    businessTypeEn: "ব্যবসার ধরন (ইংরেজি)",
    businessType: "ব্যবসার ধরন",
  };

  const formatValue = (value: any) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return "-";
    }

    if (typeof value === "object") {
      return (
        value.name_bn ||
        value.name_en ||
        value.nameBn ||
        value.nameEn ||
        JSON.stringify(value)
      );
    }

    return String(value);
  };

  return (
    <div className="correction-print-container">

      <div className="print-header">
        <h2>ট্রেড লাইসেন্স সংশোধনের আবেদনপত্র</h2>

        <p>
          আবেদন নম্বর:{" "}
          <strong>{item.applicationNo || "-"}</strong>
        </p>

        <p>
          ট্রেড লাইসেন্স নম্বর:{" "}
          <strong>
            {item.licenseNo ||
              item.tradeLicenseNo ||
              "-"}
          </strong>
        </p>

        <p>
          আবেদনের তারিখ:{" "}
          <strong>{item.applicationDate || "-"}</strong>
        </p>
      </div>

      <h3>সংশোধনের আবেদন</h3>

      <table className="correction-print-table">
        <thead>
          <tr>
            <th>ক্রমিক</th>
            <th>সংশোধনের বিষয়</th>
            <th>পুরাতন তথ্য</th>
            <th>নতুন তথ্য</th>
            <th>সংশোধনের কারণ</th>
          </tr>
        </thead>

        <tbody>
          {item.corrections?.map(
            (correction: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>
                  {fieldLabels[correction.field] ||
                    correction.field ||
                    "-"}
                </td>

                <td>
                  {formatValue(
                    correction.oldValue
                  )}
                </td>

                <td>
                  {formatValue(
                    correction.value
                  )}
                </td>

                <td>
                  {correction.reason || "-"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="print-applicant-info">
        <p>
          আবেদনকারীর নাম:{" "}
          <strong>
            {item.applicantName || "-"}
          </strong>
        </p>

        <p>
          আবেদনকারীর সম্পর্ক:{" "}
          <strong>
            {item.applicantRelation || "-"}
          </strong>
        </p>
      </div>

      <div className="print-declaration">
        <p>
          আমি উপরোক্ত তথ্য সঠিক এবং সত্য বলে ঘোষণা করছি।
        </p>
      </div>

      <div className="print-signature">
        <div>
          আবেদনকারীর স্বাক্ষর
        </div>

        <div>
          কর্তৃপক্ষের স্বাক্ষর
        </div>
      </div>

      <div className="print-button-area">
        <button
          onClick={() => window.print()}
        >
          🖨️ প্রিন্ট করুন
        </button>
      </div>

    </div>
  );
}

export default TradeLicenseCorrectionApplicationPrint;