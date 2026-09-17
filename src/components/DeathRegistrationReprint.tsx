
import { useState } from "react";
import Swal from "sweetalert2";
import "../css/banupcis.css";

function DeathRegistrationReprint() {
  const [registerNo, setRegisterNo] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [record, setRecord] = useState<any>(null);

  // =========================
  // Search
  // =========================
  const handleSearch = () => {
    const applications = JSON.parse(
      localStorage.getItem("deathRegistrationApplications") || "[]"
    );

    // শুধু Registered record
    const registeredApplications = applications.filter(
      (app: any) => app.status === "Registered"
    );

    // Book-এর মতোই registerNo + deathDate
    const found = registeredApplications.find(
      (app: any) =>
        String(app.registerNo || "").trim() ===
          String(registerNo).trim() &&
        String(app.deathDate || "").trim() ===
          String(deathDate).trim()
    );

    if (!found) {
      setRecord(null);

      Swal.fire({
        icon: "warning",
        title: "রেকর্ড পাওয়া যায়নি",
        text: "মৃত্যু নিবন্ধন বইয়ে এই তথ্যের কোনো রেকর্ড পাওয়া যায়নি।",
        confirmButtonText: "ঠিক আছে",
      });

      return;
    }

    setRecord(found);
  };

  // =========================
  // Select
  // =========================
  const handleSelect = () => {
    if (!record) return;

    const reprintApplications = JSON.parse(
      localStorage.getItem(
        "deathRegistrationReprintApplications"
      ) || "[]"
    );

    const alreadyExists = reprintApplications.some(
      (item: any) =>
        String(item.deathRegistrationNo) ===
          String(record.registerNo) &&
        String(item.deathDate) ===
          String(record.deathDate)
    );

    if (alreadyExists) {
      Swal.fire({
        icon: "warning",
        title: "আবেদন আছে",
        text: "এই রেকর্ডের জন্য ইতোমধ্যে পুনঃমুদ্রণের আবেদন করা হয়েছে।",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    reprintApplications.push({
      id: Date.now(),
      applicationNo: `DRR-${Date.now()}`,

      deathRegistrationNo: record.registerNo,
      deathDate: record.deathDate,

      deceasedNameBn: record.deceasedNameBn || "",
      originalRecord: record,

      status: "Pending",
      approved: false,

      applicationDate:
        new Date().toLocaleDateString("en-GB"),
    });

    localStorage.setItem(
      "deathRegistrationReprintApplications",
      JSON.stringify(reprintApplications)
    );

    Swal.fire({
      icon: "success",
      title: "আবেদন সংরক্ষণ হয়েছে",
      text: "পুনঃমুদ্রণের আবেদন সফলভাবে সংরক্ষণ করা হয়েছে।",
      confirmButtonText: "ঠিক আছে",
    });
  };

  return (
    <div className="preview-container">

      <h2>
        মৃত্যু নিবন্ধন সনদ পুনঃমুদ্রণের জন্য আবেদন
      </h2>

      {/* =========================
          Search
      ========================= */}
      <div className="form-section">

        <h3>
          মৃত্যু নিবন্ধন বই থেকে রেকর্ড খুঁজুন
        </h3>

        <div className="form-group">
          <label>রেজিস্টার নং</label>

          <input
            type="text"
            value={registerNo}
            onChange={(e) =>
              setRegisterNo(e.target.value)
            }
            placeholder="রেজিস্টার নং লিখুন"
          />
        </div>

        <div className="form-group">
          <label>মৃত্যুর তারিখ</label>

          <input
            type="date"
            value={deathDate}
            onChange={(e) =>
              setDeathDate(e.target.value)
            }
          />
        </div>

        {/* প্রথম বাটন */}
        <button
          type="button"
          className="submit-btn"
          onClick={handleSearch}
        >
          🔍 অনুসন্ধান করুন
        </button>

      </div>

      {/* =========================
          Search Result
      ========================= */}
      {record && (
        <div className="form-section">

          <h3>
            মৃত্যু নিবন্ধন রেকর্ড
          </h3>

          <table className="register-book-table">
            <tbody>

              <tr>
                <td>রেজিস্টার নং</td>
                <td>{record.registerNo}</td>
              </tr>

              <tr>
                <td>মৃত ব্যক্তির নাম</td>
                <td>{record.deceasedNameBn || "-"}</td>
              </tr>

              <tr>
                <td>জন্ম তারিখ</td>
                <td>{record.birthDate || "-"}</td>
              </tr>

              <tr>
                <td>পিতার নাম</td>
                <td>{record.fatherName || "-"}</td>
              </tr>

              <tr>
                <td>মাতার নাম</td>
                <td>{record.motherName || "-"}</td>
              </tr>

              <tr>
                <td>মৃত্যুর তারিখ</td>
                <td>{record.deathDate || "-"}</td>
              </tr>

              <tr>
                <td>মৃত্যুর কারণ</td>
                <td>{record.deathCause || "-"}</td>
              </tr>

            </tbody>
          </table>

          {/* দ্বিতীয় বাটন */}
          <button
            type="button"
            className="submit-btn"
            onClick={handleSelect}
          >
            নির্বাচন করুন
          </button>

        </div>
      )}

    </div>
  );
}

export default DeathRegistrationReprint;

