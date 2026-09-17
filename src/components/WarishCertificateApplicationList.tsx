import React, { useEffect, useState } from "react";

interface Application {
  applicationNo?: string;
  deceasedNameBn?: string;
  deceasedNameEn?: string;
  deathRegistrationNo?: string;
  deathDate?: string;
  applicantName?: string;
  submittedDate?: string;
  status?: string;
}

function WarishCertificateApplicationList() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const savedApplications = JSON.parse(
      localStorage.getItem("warishCertificateApplications") || "[]"
    );

    setApplications(savedApplications);
  }, []);

  return (
    <div style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        ওয়ারিশ সনদের আবেদনসমূহ
      </h2>

      {applications.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          কোনো আবেদন পাওয়া যায়নি।
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ক্রমিক</th>
                <th style={thStyle}>আবেদন নম্বর</th>
                <th style={thStyle}>মৃত ব্যক্তির নাম</th>
                <th style={thStyle}>মৃত্যু নিবন্ধন নম্বর</th>
                <th style={thStyle}>মৃত্যুর তারিখ</th>
                <th style={thStyle}>আবেদনকারীর নাম</th>
                <th style={thStyle}>জমাদানের তারিখ</th>
                <th style={thStyle}>স্ট্যাটাস</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((item, index) => (
                <tr key={item.applicationNo || index}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>
                    {item.applicationNo || "—"}
                  </td>
                  <td style={tdStyle}>
                    {item.deceasedNameBn || "—"}
                  </td>
                  <td style={tdStyle}>
                    {item.deathRegistrationNo || "—"}
                  </td>
                  <td style={tdStyle}>
                    {item.deathDate || "—"}
                  </td>
                  <td style={tdStyle}>
                    {item.applicantName || "—"}
                  </td>
                  <td style={tdStyle}>
                    {item.submittedDate || "—"}
                  </td>
                  <td style={tdStyle}>
                    {item.status || "Submitted"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#f1f3f5",
  textAlign: "center",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
  whiteSpace: "nowrap",
};

export default WarishCertificateApplicationList;