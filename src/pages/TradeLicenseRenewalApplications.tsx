import React, { useEffect, useState } from "react";
import "../css/TradeLicenseRenewalApplications.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { FaPrint } from "react-icons/fa";

interface RenewalApplication {
  applicationNo?: string;
  tradeLicenseNo?: string;
  businessNameBn?: string;
  businessNameEn?: string;
  banglaName?: string;
  englishName?: string;
  ownerNameBn?: string;
  ownerNameEn?: string;
  birthRegNo?: string;
  birthDate?: string;
  gender?: any;
  businessTypeBn?: string;
  businessTypeEn?: string;
  renewalApplicationDate?: string;
  status?: string;
}

const TradeLicenseRenewalApplications: React.FC = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<
    RenewalApplication[]
  >([]);

  useEffect(() => {
    loadApplications();
  }, []);
const handleReceive = (item: RenewalApplication) => {
  const updated = applications.map((app) =>
    app.applicationNo === item.applicationNo
      ? {
          ...app,
          received: true,
          receiveDate: new Date().toLocaleDateString("en-CA"),
          status: "Received",
        }
      : app
  );

  setApplications(updated);

  localStorage.setItem(
    "tradeLicenseRenewalApplications",
    JSON.stringify(updated)
  );

  alert("নবায়নের আবেদন রিসিভ করা হয়েছে।");
};
const handleApprove = (item: RenewalApplication) => {
  const savedApplications = localStorage.getItem(
    "tradeLicenseRenewalApplications"
  );

  if (!savedApplications) return;

  const applications = JSON.parse(savedApplications);

  const updatedApplications = applications.map(
    (app: RenewalApplication) =>
      app.applicationNo === item.applicationNo
        ? {
            ...app,
            approved: true,
            approvalDate: new Date().toLocaleDateString("en-CA"),
            status: "Approved",
          }
        : app
  );

  localStorage.setItem(
    "tradeLicenseRenewalApplications",
    JSON.stringify(updatedApplications)
  );

  setApplications(updatedApplications);
};
  const loadApplications = () => {
    const savedApplications = localStorage.getItem(
      "tradeLicenseRenewalApplications"
    );

    if (savedApplications) {
      try {
        setApplications(JSON.parse(savedApplications));
      } catch (error) {
        console.error(
          "নবায়ন আবেদন পড়তে সমস্যা হয়েছে:",
          error
        );
        setApplications([]);
      }
    }
  };

  
  const getOwnerName = (item: RenewalApplication) => {
    return (
      item.banglaName ||
      item.ownerNameBn ||
      "-"
    );
  };

  const getGender = (item: RenewalApplication) => {
    if (typeof item.gender === "object") {
      return (
        item.gender?.name_bn ||
        item.gender?.name_en ||
        "-"
      );
    }

    return item.gender || "-";
  };

  return (
    <div className="trade-license-renewal-applications-container">

      <div className="renewal-applications-header">
        <h2>
          ট্রেড লাইসেন্স নবায়নের আবেদনসমূহ
        </h2>
      </div>

      <div className="renewal-applications-table-wrapper">

        <table className="renewal-applications-table">

          <thead>
            <tr>
              <th>ক্রমিক নং</th>
              <th>আবেদন নং</th>
              <th>ট্রেড লাইসেন্স নং</th>
              <th>আবেদনের তারিখ</th>
              <th>ব্যবসার নাম</th>
              <th>মালিকের নাম</th>
              <th>জন্ম নিবন্ধন নং</th>
              <th>জন্ম তারিখ</th>
              <th>লিঙ্গ</th>
              <th>ব্যবসার ধরন</th>
              <th>অবস্থা</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {applications.length > 0 ? (

              applications.map((item, index) => (

                <tr
                  key={
                    item.applicationNo ||
                    item.tradeLicenseNo ||
                    index
                  }
                >

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {item.applicationNo || "-"}
                  </td>

                  <td>
                    {item.tradeLicenseNo || "-"}
                  </td>

                  <td>
                    {item.renewalApplicationDate || "-"}
                  </td>

                  <td>
                    {item.businessNameBn || "-"}
                  </td>

                  <td>
                    {getOwnerName(item)}
                  </td>

                  <td>
                    {item.birthRegNo || "-"}
                  </td>

                  <td>
                    {item.birthDate || "-"}
                  </td>

                  <td>
                    {getGender(item)}
                  </td>

                  <td>
                    {item.businessTypeBn || "-"}
                  </td>

                  <td>
                    {item.status || "Pending"}
                  </td>
                      <td>
  <Button title="বিস্তারিত দেখুন">
    👁️
  </Button>

  {item.status !== "Received" &&
    item.status !== "Fee Deducted" &&
    item.status !== "Approved" && (
      <Button
        variant="receive"
        onClick={() => handleReceive(item)}
        title="রিসিভ করুন"
      >
        📥
      </Button>
  )}
{item.status === "Received" && (
  <Button
    variant="fee"
    title="নবায়ন ফি কর্তন"
    onClick={() =>
      navigate("/trade-license-renewal-fee", {
        state: item,
      })
    }
  >
    💰
  </Button>
)}
{item.renewalFeeDeducted && (
  <Button
    variant="print"
    title="রসিদ প্রিন্ট করুন"
    onClick={() =>
      navigate("/trade-license-renewal-fee", {
        state: item,
      })
    }
  >
    🖨️
  </Button>
)}
  {item.status === "Fee Deducted" && (
  <Button
    variant="approve"
    title="অনুমোদন"
    onClick={() => handleApprove(item)}
  >
    ✅
  </Button>
)}
{item.status === "Approved" && (
  <Button
    variant="print"
    title="সনদ প্রিন্ট করুন"
    onClick={() =>
      navigate("/trade-license-certificate", {
        state: item,
      })
    }
  >
    <FaPrint />
  </Button>
)}
</td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan={12}
                  className="no-application"
                >
                  এখনো কোনো নবায়ন আবেদন জমা হয়নি।
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TradeLicenseRenewalApplications;