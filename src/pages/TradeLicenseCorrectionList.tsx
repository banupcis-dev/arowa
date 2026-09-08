import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TradeLicenseCorrectionList.css";

function TradeLicenseCorrectionList() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);

  // =====================================================
  // Correction Applications Load
  // =====================================================
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("tradeLicenseCorrectionApplications") || "[]"
    );

    setApplications(data);
    setFilteredApplications(data);
  }, []);

  // =====================================================
  // LocalStorage Update Helper
  // =====================================================
  const saveApplications = (updated: any[]) => {
    localStorage.setItem(
      "tradeLicenseCorrectionApplications",
      JSON.stringify(updated)
    );

    setApplications(updated);
  };

  // =====================================================
  // বিস্তারিত প্রদর্শণ
  // =====================================================
  const handleView = (item: any) => {
    navigate("/trade-license-correction-view", {
      state: item,
    });
  };

  // =====================================================
  // আবেদন পত্র প্রিন্ট
  // =====================================================
 const handleApplicationPrint = (item: any) => {
  navigate(
    "/trade-license-correction-application-print",
    {
      state: item,
    }
  );
};

  // =====================================================
  // সংশোধন ফি কর্তন
  // =====================================================
 const handleFeeDeduction = (item: any) => {
  navigate("/trade-license-correction-fee", {
    state: item,
  });
};
  // =====================================================
  // রশিদ প্রিন্ট
  // =====================================================
  const handleReceiptPrint = (item: any) => {
    console.log("Correction Fee Receipt:", item);

    const updated = applications.map((app: any) =>
      app.applicationNo === item.applicationNo
        ? {
            ...app,
            receiptPrinted: true,
            receiptPrintDate:
              new Date().toLocaleDateString("en-CA"),
          }
        : app
    );

    saveApplications(updated);

    window.print();
  };

  // =====================================================
  // রিসিভ
  // =====================================================
  const handleReceive = (item: any) => {
    if (
      !window.confirm(
        "আপনি কি এই সংশোধন আবেদনটি রিসিভ করতে চান?"
      )
    ) {
      return;
    }

    const updated = applications.map((app: any) =>
      app.applicationNo === item.applicationNo
        ? {
            ...app,
            received: true,
            receiveDate: new Date().toLocaleDateString("en-CA"),
            status: "Received",
          }
        : app
    );

    saveApplications(updated);

    alert("সংশোধনের আবেদন রিসিভ করা হয়েছে।");
  };

  // =====================================================
  // অনুমোদন
  // =====================================================
 const handleApprove = (item: any) => {
  if (
    !window.confirm(
      "আপনি কি এই সংশোধন আবেদনটি অনুমোদন করতে চান?"
    )
  ) {
    return;
  }

  const registerBooks = JSON.parse(
    localStorage.getItem("tradeLicenseRegisterBook") || "[]"
  );

  const updatedRegisterBooks = registerBooks.map(
    (record: any) => {
      if (
        record.tradeLicenseNo !==
        (item.licenseNo || item.tradeLicenseNo)
      ) {
        return record;
      }

      const updatedRecord = { ...record };

      item.corrections?.forEach(
        (correction: any) => {
          if (
            correction.field &&
            correction.value !== undefined
          ) {
            updatedRecord[correction.field] =
              correction.value;
          }
        }
      );

      return updatedRecord;
    }
  );

  localStorage.setItem(
    "tradeLicenseRegisterBook",
    JSON.stringify(updatedRegisterBooks)
  );

  const updated = applications.map(
    (app: any) =>
      app.applicationNo === item.applicationNo
        ? {
            ...app,
            approved: true,
            approvalDate:
              new Date().toLocaleDateString("en-CA"),
            status: "Approved",
          }
        : app
  );

  saveApplications(updated);

  alert(
    "সংশোধিত তথ্য ট্রেড লাইসেন্স নিবন্ধন বইতে জমা হয়েছে এবং আবেদনটি অনুমোদিত হয়েছে।"
  );
};
  // =====================================================
  // সনদ পত্র প্রিন্ট
  // =====================================================
  const handleCertificatePrint = (item: any) => {
  const registerBooks = JSON.parse(
    localStorage.getItem("tradeLicenseRegisterBook") || "[]"
  );

  const record = registerBooks.find(
    (book: any) =>
      book.tradeLicenseNo ===
      (item.licenseNo || item.tradeLicenseNo)
  );

  if (!record) {
    alert("ট্রেড লাইসেন্স নিবন্ধন বইতে কোনো তথ্য পাওয়া যায়নি।");
    return;
  }

  navigate("/trade-license-certificate", {
    state: record,
  });
};

  // =====================================================
  // Delete
  // =====================================================
  const handleDelete = (index: number) => {
    if (
      !window.confirm(
        "আপনি কি এই সংশোধন আবেদনটি মুছে ফেলতে চান?"
      )
    ) {
      return;
    }

    const updated = [...applications];

    updated.splice(index, 1);

    saveApplications(updated);
    setFilteredApplications(updated);
  };

  // =====================================================
  // Search
  // =====================================================
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredApplications(applications);
      return;
    }

    const keyword = searchText.toLowerCase();

    const result = applications.filter(
      (item: any) =>
        String(item.applicationNo || "")
          .toLowerCase()
          .includes(keyword) ||
        String(item.licenseNo || "")
          .toLowerCase()
          .includes(keyword) ||
        String(item.tradeLicenseNo || "")
          .toLowerCase()
          .includes(keyword) ||
        String(item.businessNameBn || "")
          .toLowerCase()
          .includes(keyword) ||
        String(item.businessName || "")
          .toLowerCase()
          .includes(keyword) ||
        String(item.ownerNameBn || "")
          .toLowerCase()
          .includes(keyword) ||
        String(item.ownerName || "")
          .toLowerCase()
          .includes(keyword)
    );

    setFilteredApplications(result);
  }, [searchText, applications]);

  // =====================================================
  // Status Text
  // =====================================================
  const getStatusText = (item: any) => {
    if (item.approved) {
      return "অনুমোদিত";
    }

    if (item.received) {
      return "রিসিভ হয়েছে";
    }

    if (item.correctionFeeDeducted) {
      return "ফি কর্তন হয়েছে";
    }

    return "Pending";
  };

  return (
    <div className="trade-license-correction-list-container">

      <h2>ট্রেড লাইসেন্স সংশোধনের আবেদনসমূহ</h2>

      {/* Search */}
      <input
        className="search-input"
        placeholder="আবেদন নম্বর / লাইসেন্স নম্বর / ব্যবসার নাম / মালিকের নাম দিয়ে অনুসন্ধান করুন"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* New Application */}
      <button
        className="preview-btn"
        onClick={() =>
          navigate("/trade-license-correction")
        }
      >
        নতুন সংশোধনের আবেদন
      </button>

      {/* Application Table */}
      <table className="trade-license-correction-list-table">

        <thead>
          <tr>
            <th>ক্রমিক</th>
            <th>আবেদন নম্বর</th>
            <th>ট্রেড লাইসেন্স নম্বর</th>
            <th>ব্যবসার নাম</th>
            <th>মালিকের নাম</th>
            <th>অবস্থা</th>
            <th>কার্যক্রম</th>
          </tr>
        </thead>

        <tbody>

          {filteredApplications.length === 0 ? (

            <tr>
              <td colSpan={7}>
                কোনো সংশোধনের আবেদন পাওয়া যায়নি।
              </td>
            </tr>

          ) : (

            filteredApplications.map((item, index) => (

              <tr key={item.applicationNo || index}>

                <td>{index + 1}</td>

                <td>
                  {item.applicationNo || "-"}
                </td>

                <td>
                  {item.licenseNo ||
                    item.tradeLicenseNo ||
                    "-"}
                </td>

                <td>
                  {item.businessNameBn ||
                    item.businessName ||
                    "-"}
                </td>

                <td>
                  {item.ownerNameBn ||
                    item.ownerName ||
                    "-"}
                </td>

                <td>
                  {getStatusText(item)}
                </td>

                <td>

                  {/* =================================
                      ১. বিস্তারিত প্রদর্শণ
                      সবসময় থাকবে
                     ================================= */}
                  <button
                    className="action-btn view-btn"
                    onClick={() => handleView(item)}
                    title="বিস্তারিত প্রদর্শণ"
                  >
                    👁️
                  </button>

                  {/* =================================
                      ২. আবেদন পত্র প্রিন্ট
                      সবসময় থাকবে
                     ================================= */}
                  <button
                    className="action-btn print-btn"
                    onClick={() =>
                      handleApplicationPrint(item)
                    }
                    title="আবেদন পত্র প্রিন্ট"
                  >
                    🖨️
                  </button>

                  {/* =================================
                      ৩. সংশোধন ফি কর্তন
                      ফি কর্তনের পরে হারিয়ে যাবে
                     ================================= */}
                  {!item.correctionFeeDeducted && (
                    <button
                      className="action-btn"
                      onClick={() =>
                        handleFeeDeduction(item)
                      }
                      title="সংশোধন ফি কর্তন"
                    >
                      💰
                    </button>
                  )}

                  {/* =================================
                      ৪. রশিদ প্রিন্ট
                      ফি কর্তনের পরে আসবে
                     ================================= */}
                  {item.correctionFeeDeducted &&
                    !item.receiptPrinted && (
                      <button
                        className="action-btn print-btn"
                        onClick={() =>
                          handleReceiptPrint(item)
                        }
                        title="রশিদ প্রিন্ট করুন"
                      >
                        🧾
                      </button>
                    )}

                  {/* =================================
                      ৫. রিসিভ
                      রশিদ প্রিন্টের পরে আসবে
                     ================================= */}
                  {item.correctionFeeDeducted &&
                    item.receiptPrinted &&
                    !item.received && (
                      <button
                        className="action-btn"
                        onClick={() =>
                          handleReceive(item)
                        }
                        title="রিসিভ করুন"
                      >
                        📥
                      </button>
                    )}

                  {/* =================================
                      ৬. অনুমোদন
                      রিসিভ করার পরে আসবে
                     ================================= */}
                  {item.received &&
                    !item.approved && (
                      <button
                        className="action-btn"
                        onClick={() =>
                          handleApprove(item)
                        }
                        title="অনুমোদন"
                      >
                        ✅
                      </button>
                    )}

                  {/* =================================
                      ৭. সনদ পত্র প্রিন্ট
                      অনুমোদনের পরে আসবে
                     ================================= */}
                  {item.approved && (
                    <button
                      className="action-btn print-btn"
                      onClick={() =>
                        handleCertificatePrint(item)
                      }
                      title="সনদ পত্র প্রিন্ট করুন"
                    >
                      📜
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    className="action-btn"
                    onClick={() =>
                      handleDelete(index)
                    }
                    title="আবেদন মুছে ফেলুন"
                  >
                    🗑️
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default TradeLicenseCorrectionList;