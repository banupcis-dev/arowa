import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CertificateCorrectionList.css";

function CertificateCorrectionList() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("certificateCorrectionApplications") || "[]"
    );

    setApplications(data);
    setFilteredApplications(data);
  }, []);

  // View
  const handleView = (item: any) => {
    navigate("/certificate-correction-view", {
      state: item,
    });
  };

  // আবেদন পত্র প্রিন্ট
  const handlePrint = (item: any) => {
    console.log(item);
    window.print();
  };

  // ফি আদায়
  const handlePayment = (item: any) => {
    const updated = applications.map((app: any) =>
      app.applicationNo === item.applicationNo
        ? {
            ...app,
            paymentStatus: true,
            paymentDate: new Date().toLocaleDateString("en-CA"),
            paymentDate: new Date().toLocaleDateString("en-GB"),
            applicationFee: 0,
            serviceCharge: 0,
            receiptNo: `COR-${item.applicationNo}`,
          }
        : app
    );

    localStorage.setItem(
      "certificateCorrectionApplications",
      JSON.stringify(updated)
    );

    setApplications(updated);
    alert("ফি আদায় সম্পন্ন হয়েছে।");
  };

  // রেজিস্টারে জমা
  const handleRegister = (item: any) => {
    const citizens = JSON.parse(
      localStorage.getItem("citizenApplications") || "[]"
    );

    const updatedCitizens = citizens.map((citizen: any) => {
      if (citizen.registerNo !== item.certificateNo) return citizen;

      const updatedCitizen = { ...citizen };

      item.corrections?.forEach((correction: any) => {
        if (correction.field && correction.value) {
          updatedCitizen[correction.field] = correction.value;
        }
      });

      if (item.birthAddressCorrection) {
        updatedCitizen.birthAddress = item.birthAddress;
      }

      if (item.presentAddressCorrection) {
        updatedCitizen.presentAddress = item.presentAddress;
      }

      if (item.permanentAddressCorrection) {
        updatedCitizen.permanentAddress = item.permanentAddress;
      }

      return updatedCitizen;
    });

    localStorage.setItem(
      "citizenApplications",
      JSON.stringify(updatedCitizens)
    );

    const updatedApplications = applications.map((app: any) =>
      app.applicationNo === item.applicationNo
        ? {
            ...app,
            registerUpdateStatus: true,
            registerUpdateDate: new Date().toLocaleDateString("en-CA"),
            status: "Registered",
          }
        : app
    );

    localStorage.setItem(
      "certificateCorrectionApplications",
      JSON.stringify(updatedApplications)
    );

    setApplications(updatedApplications);

    alert("সংশোধিত তথ্য নাগরিক রেজিস্টারে জমা হয়েছে।");
  };

  // সংশোধিত সনদ তৈরি
  const handleCertificate = (item: any) => {
    const citizens = JSON.parse(
      localStorage.getItem("citizenApplications") || "[]"
    );

    const citizen = citizens.find(
      (app: any) => app.registerNo === item.certificateNo
    );

    if (!citizen) {
      alert("নাগরিক রেজিস্টারে কোনো তথ্য পাওয়া যায়নি।");
      return;
    }

    navigate("/certificate", {
      state: citizen,
    });
  };

  // Delete
  const handleDelete = (index: number) => {
    if (!window.confirm("আপনি কি আবেদনটি মুছে ফেলতে চান?")) return;

    const updated = [...applications];
    updated.splice(index, 1);

    setApplications(updated);
    setFilteredApplications(updated);

    localStorage.setItem(
      "certificateCorrectionApplications",
      JSON.stringify(updated)
    );
  };

  // Search
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredApplications(applications);
      return;
    }

    const keyword = searchText.toLowerCase();

    const result = applications.filter(
      (item: any) =>
        (item.applicationNo || "").toLowerCase().includes(keyword) ||
        (item.certificateNo || "").toLowerCase().includes(keyword) ||
        (item.banglaName || "").toLowerCase().includes(keyword)
    );

    setFilteredApplications(result);
  }, [searchText, applications]);

  return (
    <div className="certificate-list-container">
      <h2>নাগরিক সনদ সংশোধনের আবেদন তালিকা</h2>

      <input
        className="search-input"
        placeholder="আবেদন নম্বর / সনদ নম্বর / নাম দিয়ে অনুসন্ধান করুন"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button
        className="preview-btn"
        onClick={() => navigate("/certificate-correction")}
      >
        নতুন আবেদন
      </button>

      <table className="certificate-list-table">
        <thead>
          <tr>
            <th>ক্রমিক</th>
            <th>আবেদন নম্বর</th>
            <th>সনদ নম্বর</th>
            <th>নাম</th>
            <th>মোবাইল</th>
            <th>অবস্থা</th>
            <th>কার্যক্রম</th>
          </tr>
        </thead>

        <tbody>
          {filteredApplications.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.applicationNo}</td>
              <td>{item.certificateNo}</td>
              <td>{item.banglaName}</td>
              <td>{item.mobile}</td>
              <td>{item.status || "Pending"}</td>

              <td>
                {/* View */}
                <button
                  className="action-btn view-btn"
                  onClick={() => handleView(item)}
                  title="View"
                >
                  👁️
                </button>

                {/* আবেদন পত্র প্রিন্ট */}
                <button
                  className="action-btn print-btn"
                  onClick={() => handlePrint(item)}
                  title="আবেদন পত্র প্রিন্ট"
                >
                  🖨️
                </button>

                {/* ফি আদায় */}
                {!item.paymentStatus && (
                  <button
                    className="action-btn"
                    onClick={() => handlePayment(item)}
                    title="ফি আদায়"
                  >
                    💳
                  </button>
                )}

                {/* রেজিস্টারে জমা */}
                {item.paymentStatus && !item.registerUpdateStatus && (
                  <button
                    className="action-btn"
                    onClick={() => handleRegister(item)}
                    title="রেজিস্টারে জমা"
                  >
                    📥
                  </button>
                )}

                {/* সংশোধিত সনদ তৈরি */}
                {item.registerUpdateStatus && (
                  <button
                    className="action-btn print-btn"
                    onClick={() => handleCertificate(item)}
                    title="সংশোধিত সনদ তৈরি"
                  >
                    📜
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CertificateCorrectionList;