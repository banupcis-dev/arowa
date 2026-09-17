
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/banupcis.css";

function DeathRegistrationReprintApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] =
    useState<any[]>([]);

  const [searchText, setSearchText] =
    useState("");

  const [filteredApplications, setFilteredApplications] =
    useState<any[]>([]);

  // =========================================================
  // Load Reprint Applications
  // =========================================================
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(
        "deathRegistrationReprintApplications"
      ) || "[]"
    );

    setApplications(data);
    setFilteredApplications(data);
  }, []);

  // =========================================================
  // Save Applications
  // =========================================================
  const saveApplications = (
    updated: any[]
  ) => {
    localStorage.setItem(
      "deathRegistrationReprintApplications",
      JSON.stringify(updated)
    );

    setApplications(updated);
  };

  // =========================================================
  // View
  // =========================================================
  const handleView = (
    item: any
  ) => {
    alert(
      `মৃত ব্যক্তির নাম: ${
        item.deceasedNameBn || "-"
      }\nমৃত্যু নিবন্ধন নম্বর: ${
        item.deathRegistrationNo || "-"
      }\nমৃত্যুর তারিখ: ${
        item.deathDate || "-"
      }`
    );
  };

  // =========================================================
  // Approve
  // =========================================================
  const handleApprove = (
    item: any
  ) => {
    if (
      !window.confirm(
        "আপনি কি এই পুনঃমুদ্রণ আবেদনটি অনুমোদন করতে চান?"
      )
    ) {
      return;
    }

    const updated =
      applications.map(
        (app: any) =>
          app.applicationNo ===
          item.applicationNo ||
          app.id === item.id
            ? {
                ...app,
                approved: true,
                approvalDate:
                  new Date().toLocaleDateString(
                    "en-GB"
                  ),
                status: "Approved",
              }
            : app
      );

    saveApplications(updated);

    alert(
      "পুনঃমুদ্রণের আবেদন অনুমোদন করা হয়েছে।"
    );
  };

  // =========================================================
  // Certificate Reprint
  // =========================================================
  const handleCertificateReprint = (
    item: any
  ) => {
    navigate(
      "/death-registration-certificate",
      {
        state: {
          ...item.originalRecord,
          printMode: true,
        },
      }
    );
  };

  // =========================================================
  // Search
  // =========================================================
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
            item.deceasedNameBn || ""
          )
            .toLowerCase()
            .includes(keyword) ||

          String(
            item.deceasedNameEn || ""
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

  // =========================================================
  // Status
  // =========================================================
  const getStatusText = (
    item: any
  ) => {
    if (item.approved) {
      return "অনুমোদিত";
    }

    return "Pending";
  };

  return (
    <div className="preview-container">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}
      <h2>
        মৃত্যু নিবন্ধন সনদ পুনঃমুদ্রণের আবেদনসমূহ
      </h2>

      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}
      <input
        className="search-input"
        placeholder="আবেদন নম্বর / মৃত্যু নিবন্ধন নম্বর / মৃত ব্যক্তির নাম দিয়ে অনুসন্ধান করুন"
        value={searchText}
        onChange={(e) =>
          setSearchText(
            e.target.value
          )
        }
      />

      <button
        type="button"
        className="preview-btn"
        onClick={() =>
          navigate(
            "/death-registration-reprint"
          )
        }
      >
        নতুন পুনঃমুদ্রণের আবেদন
      </button>

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}
      <div className="table-scroll">

        <table className="register-book-table">

          <thead>
            <tr>
              <th>ক্রমিক</th>
              <th>আবেদন নম্বর</th>
              <th>মৃত্যু নিবন্ধন নম্বর</th>
              <th>মৃত ব্যক্তির নাম</th>
              <th>মৃত্যুর তারিখ</th>
              <th>আবেদনের তারিখ</th>
              <th>অবস্থা</th>
              <th>কার্যক্রম</th>
            </tr>
          </thead>

          <tbody>

            {filteredApplications.length ===
            0 ? (

              <tr>
                <td
                  colSpan={8}
                  className="no-application"
                >
                  কোনো পুনঃমুদ্রণের আবেদন পাওয়া যায়নি।
                </td>
              </tr>

            ) : (

              filteredApplications.map(
                (
                  item: any,
                  index: number
                ) => (

                  <tr
                    key={
                      item.applicationNo ||
                      item.id ||
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
                        item.id ||
                        "-"}
                    </td>

                    {/* মৃত্যু নিবন্ধন নম্বর */}
                    <td>
                      {item.deathRegistrationNo ||
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

                    {/* আবেদনের তারিখ */}
                    <td>
                      {item.applicationDate ||
                        "-"}
                    </td>

                    {/* অবস্থা */}
                    <td>
                      {getStatusText(
                        item
                      )}
                    </td>

                    {/* কার্যক্রম */}
                    <td>

                      {/* View */}
                      <button
                        type="button"
                        className="action-btn view-btn"
                        onClick={() =>
                          handleView(
                            item
                          )
                        }
                        title="বিস্তারিত দেখুন"
                      >
                        👁️
                      </button>

                      {/* Approve */}
                      {!item.approved && (
                        <button
                          type="button"
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

                      {/* Reprint */}
                      {item.approved && (
                        <button
                          type="button"
                          className="action-btn print-btn"
                          onClick={() =>
                            handleCertificateReprint(
                              item
                            )
                          }
                          title="সনদ পুনঃমুদ্রণ"
                        >
                          📜
                        </button>
                      )}

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DeathRegistrationReprintApplications;

