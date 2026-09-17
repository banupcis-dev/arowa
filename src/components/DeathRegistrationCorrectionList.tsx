import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/BirthRegistrationApplication.css";

function DeathRegistrationCorrectionList() {
  const navigate = useNavigate();

  // =====================================================
  // Correction Applications
  // =====================================================
  const [applications, setApplications] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredApplications, setFilteredApplications] =
    useState<any[]>([]);

  // =====================================================
  // Load Applications
  // =====================================================
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(
        "deathRegistrationCorrectionApplications"
      ) || "[]"
    );

    setApplications(data);
    setFilteredApplications(data);
  }, []);

  // =====================================================
  // Save Applications
  // =====================================================
  const saveApplications = (updated: any[]) => {
    localStorage.setItem(
      "deathRegistrationCorrectionApplications",
      JSON.stringify(updated)
    );

    setApplications(updated);
  };

  // =====================================================
  // বিস্তারিত
  // =====================================================
  const handleView = (item: any) => {
    navigate("/death-registration-correction-view", {
      state: item,
    });
  };

  // =====================================================
  // আবেদন পত্র প্রিন্ট
  // =====================================================
  const handleApplicationPrint = (item: any) => {
    navigate(
      "/death-registration-correction-application-print",
      {
        state: item,
      }
    );
  };

  // =====================================================
  // সংশোধন ফি কর্তন
  // =====================================================
  const handleFeeDeduction = (item: any) => {
    navigate("/death-registration-correction-fee", {
      state: item,
    });
  };

  // =====================================================
  // রশিদ প্রিন্ট
  // =====================================================
  const handleReceiptPrint = (item: any) => {
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
            receiveDate:
              new Date().toLocaleDateString("en-CA"),
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

    // ===================================================
    // মূল মৃত্যু নিবন্ধন রেকর্ড
    // ===================================================
    const deathApplications = JSON.parse(
      localStorage.getItem(
        "deathRegistrationApplications"
      ) || "[]"
    );

    // ===================================================
    // সংশ্লিষ্ট মৃত্যু নিবন্ধন খুঁজে বের করা
    // মৃত্যু নিবন্ধন নম্বর = জন্ম নিবন্ধন নম্বর
    // ===================================================
    const targetNo =
      item.deathRegistrationNo ||
      item.birthRegistrationNo;

    const updatedDeathApplications =
      deathApplications.map((record: any) => {
        const recordNo =
          record.registerNo ||
          record.birthRegistrationNo;

        if (
          String(recordNo) !==
          String(targetNo)
        ) {
          return record;
        }

        const updatedRecord = {
          ...record,
        };

        // ===============================================
        // শুধু মৃত্যু নিবন্ধনের নিজস্ব তথ্য আপডেট হবে
        // ===============================================
        item.corrections?.forEach(
          (correction: any) => {
            if (
              correction.field &&
              correction.value !== undefined
            ) {
              updatedRecord[
                correction.field
              ] = correction.value;
            }
          }
        );

        // ===============================================
        // মৃত্যু তারিখ
        // ===============================================
        if (
          item.corrections?.some(
            (c: any) =>
              c.field === "deathDate"
          )
        ) {
          const correction =
            item.corrections.find(
              (c: any) =>
                c.field === "deathDate"
            );

          if (correction) {
            updatedRecord.deathDate =
              correction.value;
          }
        }

        // ===============================================
        // মৃত্যুর কারণ
        // ===============================================
        if (
          item.corrections?.some(
            (c: any) =>
              c.field === "deathCause"
          )
        ) {
          const correction =
            item.corrections.find(
              (c: any) =>
                c.field === "deathCause"
            );

          if (correction) {
            updatedRecord.deathCause =
              correction.value;
          }
        }

        // ===============================================
        // স্বামী/স্ত্রীর জন্ম নিবন্ধন নম্বর
        // ===============================================
        if (
          item.corrections?.some(
            (c: any) =>
              c.field ===
              "spouseBirthRegistrationNo"
          )
        ) {
          const correction =
            item.corrections.find(
              (c: any) =>
                c.field ===
                "spouseBirthRegistrationNo"
            );

          if (correction) {
            updatedRecord.spouseBirthRegistrationNo =
              correction.value;
          }
        }

        // ===============================================
        // স্বামী/স্ত্রীর জন্ম তারিখ
        // ===============================================
        if (
          item.corrections?.some(
            (c: any) =>
              c.field ===
              "spouseBirthDate"
          )
        ) {
          const correction =
            item.corrections.find(
              (c: any) =>
                c.field ===
                "spouseBirthDate"
            );

          if (correction) {
            updatedRecord.spouseBirthDate =
              correction.value;
          }
        }

        // ===============================================
        // স্বামী/স্ত্রীর বাংলা নাম
        // ===============================================
        if (
          item.corrections?.some(
            (c: any) =>
              c.field === "spouseNameBn"
          )
        ) {
          const correction =
            item.corrections.find(
              (c: any) =>
                c.field === "spouseNameBn"
            );

          if (correction) {
            updatedRecord.spouseNameBn =
              correction.value;
          }
        }

        // ===============================================
        // স্বামী/স্ত্রীর ইংরেজি নাম
        // ===============================================
        if (
          item.corrections?.some(
            (c: any) =>
              c.field === "spouseNameEn"
          )
        ) {
          const correction =
            item.corrections.find(
              (c: any) =>
                c.field === "spouseNameEn"
            );

          if (correction) {
            updatedRecord.spouseNameEn =
              correction.value;
          }
        }

        // ===============================================
        // মৃত্যুর স্থানের ঠিকানা
        // ===============================================
        if (
          item.deathAddressCorrection
        ) {
          updatedRecord.deathAddress =
            item.deathAddress;
        }

        // ===============================================
        // মৃত্যুর সময় বসবাসের ঠিকানা
        // ===============================================
        if (
          item.residenceAddressCorrection
        ) {
          updatedRecord.residenceAddress =
            item.residenceAddress;
        }

        return updatedRecord;
      });

    // ===================================================
    // মূল মৃত্যু নিবন্ধন আপডেট
    // ===================================================
    localStorage.setItem(
      "deathRegistrationApplications",
      JSON.stringify(
        updatedDeathApplications
      )
    );

    // ===================================================
    // Correction Application Status
    // ===================================================
    const updated = applications.map(
      (app: any) =>
        app.applicationNo ===
        item.applicationNo
          ? {
              ...app,
              approved: true,
              approvalDate:
                new Date().toLocaleDateString(
                  "en-CA"
                ),
              status: "Approved",
            }
          : app
    );

    saveApplications(updated);

    alert(
      "সংশোধিত তথ্য মৃত্যু নিবন্ধনে জমা হয়েছে এবং আবেদনটি অনুমোদিত হয়েছে।"
    );
  };

  // =====================================================
  // সনদ পত্র প্রিন্ট
  // =====================================================
  const handleCertificatePrint = (
    item: any
  ) => {
    const deathApplications =
      JSON.parse(
        localStorage.getItem(
          "deathRegistrationApplications"
        ) || "[]"
      );

    const targetNo =
      item.deathRegistrationNo ||
      item.birthRegistrationNo;

    const record =
      deathApplications.find(
        (application: any) => {
          const registerNo =
            application.registerNo ||
            application.birthRegistrationNo;

          return (
            String(registerNo) ===
            String(targetNo)
          );
        }
      );

    if (!record) {
      alert(
        "মৃত্যু নিবন্ধনে কোনো তথ্য পাওয়া যায়নি।"
      );
      return;
    }

    navigate(
      "/death-registration-certificate",
      {
        state: record,
      }
    );
  };

  // =====================================================
  // Delete
  // =====================================================
  const handleDelete = (
    index: number
  ) => {
    if (
      !window.confirm(
        "আপনি কি এই সংশোধন আবেদনটি মুছে ফেলতে চান?"
      )
    ) {
      return;
    }

    const updated = [
      ...applications,
    ];

    updated.splice(index, 1);

    saveApplications(updated);
    setFilteredApplications(updated);
  };

  // =====================================================
  // Search
  // =====================================================
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredApplications(
        applications
      );
      return;
    }

    const keyword =
      searchText.toLowerCase();

    const result =
      applications.filter(
        (item: any) =>
          String(
            item.applicationNo || ""
          )
            .toLowerCase()
            .includes(keyword) ||

          String(
            item.deathRegistrationNo ||
              ""
          )
            .toLowerCase()
            .includes(keyword) ||

          String(
            item.birthRegistrationNo ||
              ""
          )
            .toLowerCase()
            .includes(keyword) ||

          String(
            item.deceasedNameBn || ""
          )
            .toLowerCase()
            .includes(keyword) ||

          String(
            item.deceasedNameEn || ""
          )
            .toLowerCase()
            .includes(keyword) ||

          String(
            item.applicantName || ""
          )
            .toLowerCase()
            .includes(keyword)
      );

    setFilteredApplications(
      result
    );
  }, [
    searchText,
    applications,
  ]);

  // =====================================================
  // Status Text
  // =====================================================
  const getStatusText = (
    item: any
  ) => {
    if (item.approved) {
      return "অনুমোদিত";
    }

    if (item.received) {
      return "রিসিভ হয়েছে";
    }

    if (
      item.correctionFeeDeducted
    ) {
      return "ফি কর্তন হয়েছে";
    }

    return "Pending";
  };

  // =====================================================
  // Return
  // =====================================================
  return (
    <div className="death-registration-correction-list-container">

      <h2>
        মৃত্যু নিবন্ধন সংশোধনের আবেদনসমূহ
      </h2>

      {/* ================================================= */}
      {/* Search */}
      {/* ================================================= */}
      <input
        className="search-input"
        placeholder="আবেদন নম্বর / মৃত্যু নিবন্ধন নম্বর / মৃত ব্যক্তির নাম / আবেদনকারীর নাম দিয়ে অনুসন্ধান করুন"
        value={searchText}
        onChange={(e) =>
          setSearchText(
            e.target.value
          )
        }
      />

      {/* ================================================= */}
      {/* New Application */}
      {/* ================================================= */}
      <button
        className="preview-btn"
        onClick={() =>
          navigate(
            "/death-registration-correction"
          )
        }
      >
        নতুন সংশোধনের আবেদন
      </button>

      {/* ================================================= */}
      {/* Application Table */}
      {/* ================================================= */}
      <table className="trade-license-correction-list-table">

        <thead>
          <tr>

            <th>
              ক্রমিক
            </th>

            <th>
              আবেদন নম্বর
            </th>

            <th>
              মৃত্যু নিবন্ধন নম্বর
            </th>

            <th>
              মৃত ব্যক্তির নাম
            </th>

            <th>
              মৃত্যুর তারিখ
            </th>

            <th>
              আবেদনকারীর নাম
            </th>

            <th>
              অবস্থা
            </th>

            <th>
              কার্যক্রম
            </th>

          </tr>
        </thead>

        <tbody>

          {filteredApplications.length ===
          0 ? (

            <tr>

              <td colSpan={8}>
                কোনো সংশোধনের আবেদন পাওয়া যায়নি।
              </td>

            </tr>

          ) : (

            filteredApplications.map(
              (
                item,
                index
              ) => (

                <tr
                  key={
                    item.applicationNo ||
                    index
                  }
                >

                  {/* ক্রমিক */}
                  <td>
                    {index + 1}
                  </td>

                  {/* আবেদন নম্বর */}
                  <td>
                    {item.applicationNo ||
                      "-"}
                  </td>

                  {/* মৃত্যু নিবন্ধন নম্বর */}
                  <td>
                    {item.deathRegistrationNo ||
                      item.birthRegistrationNo ||
                      "-"}
                  </td>

                  {/* মৃত ব্যক্তির নাম */}
                  <td>
                    {item.deceasedNameBn ||
                      "-"}
                  </td>

                  {/* মৃত্যুর তারিখ */}
                  <td>
                    {item.deathDate ||
                      "-"}
                  </td>

                  {/* আবেদনকারীর নাম */}
                  <td>
                    {item.applicantName ||
                      "-"}
                  </td>

                  {/* Status */}
                  <td>
                    {getStatusText(
                      item
                    )}
                  </td>

                  {/* =================================================
                      Actions
                     ================================================= */}
                  <td>

                    {/* ১. বিস্তারিত */}
                    <button
                      className="action-btn view-btn"
                      onClick={() =>
                        handleView(
                          item
                        )
                      }
                      title="বিস্তারিত প্রদর্শণ"
                    >
                      👁️
                    </button>

                    {/* ২. আবেদন পত্র প্রিন্ট */}
                    <button
                      className="action-btn print-btn"
                      onClick={() =>
                        handleApplicationPrint(
                          item
                        )
                      }
                      title="আবেদন পত্র প্রিন্ট"
                    >
                      🖨️
                    </button>

                    {/* ৩. সংশোধন ফি */}
                    {!item.correctionFeeDeducted && (
                      <button
                        className="action-btn"
                        onClick={() =>
                          handleFeeDeduction(
                            item
                          )
                        }
                        title="সংশোধন ফি কর্তন"
                      >
                        💰
                      </button>
                    )}

                    {/* ৪. রশিদ */}
                    {item.correctionFeeDeducted &&
                      !item.receiptPrinted && (
                        <button
                          className="action-btn print-btn"
                          onClick={() =>
                            handleReceiptPrint(
                              item
                            )
                          }
                          title="রশিদ প্রিন্ট করুন"
                        >
                          🧾
                        </button>
                      )}

                    {/* ৫. রিসিভ */}
                    {item.correctionFeeDeducted &&
                      item.receiptPrinted &&
                      !item.received && (
                        <button
                          className="action-btn"
                          onClick={() =>
                            handleReceive(
                              item
                            )
                          }
                          title="রিসিভ করুন"
                        >
                          📥
                        </button>
                      )}

                    {/* ৬. অনুমোদন */}
                    {item.received &&
                      !item.approved && (
                        <button
                          className="action-btn"
                          onClick={() =>
                            handleApprove(
                              item
                            )
                          }
                          title="অনুমোদন"
                        >
                          ✅
                        </button>
                      )}

                    {/* ৭. সনদ */}
                    {item.approved && (
                      <button
                        className="action-btn print-btn"
                        onClick={() =>
                          handleCertificatePrint(
                            item
                          )
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
                        handleDelete(
                          index
                        )
                      }
                      title="আবেদন মুছে ফেলুন"
                    >
                      🗑️
                    </button>

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>

    </div>
  );
}

export default DeathRegistrationCorrectionList;