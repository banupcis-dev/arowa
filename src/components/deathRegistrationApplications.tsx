
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../css/banupcis.css";

function DeathRegistrationApplications() {
  const [applications, setApplications] = useState<any[]>([]);

  // ==========================================
  // Load Applications
  // ==========================================
  const loadApplications = () => {
    const data = JSON.parse(
      localStorage.getItem("deathRegistrationApplications") || "[]"
    );

    // সর্বশেষ আবেদন আগে দেখাবে
    data.sort(
      (a: any, b: any) =>
        Number(b.id || 0) - Number(a.id || 0)
    );

    setApplications(data);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // ==========================================
  // View Application
  // ==========================================
  const handleView = (application: any) => {
    Swal.fire({
      title: "মৃত্যু নিবন্ধনের আবেদন",
      html: `
        <div style="text-align:left; line-height:1.8;">

          <p>
            <strong>জন্ম নিবন্ধন নম্বর:</strong>
            ${application.birthRegistrationNo || "-"}
          </p>

          <p>
            <strong>জন্ম তারিখ:</strong>
            ${application.birthDate || "-"}
          </p>

          <p>
            <strong>মৃত ব্যক্তির নাম:</strong>
            ${application.deceasedNameBn || "-"}
          </p>

          <p>
            <strong>পিতার নাম:</strong>
            ${application.fatherName || "-"}
          </p>

          <p>
            <strong>মাতার নাম:</strong>
            ${application.motherName || "-"}
          </p>

          <p>
            <strong>মৃত্যুর তারিখ:</strong>
            ${application.deathDate || "-"}
          </p>

          <p>
            <strong>মৃত্যুর কারণ:</strong>
            ${application.deathCause || "-"}
          </p>

          <p>
            <strong>আবেদনকারীর নাম:</strong>
            ${application.applicantNameBn || "-"}
          </p>

          <p>
            <strong>সম্পর্ক:</strong>
            ${application.applicantRelation || "-"}
          </p>

          <p>
            <strong>মোবাইল:</strong>
            ${application.applicantMobile || "-"}
          </p>

          <p>
            <strong>আবেদনের তারিখ:</strong>
            ${application.applicationDate || "-"}
          </p>

          <p>
            <strong>স্ট্যাটাস:</strong>
            ${application.status || "-"}
          </p>

        </div>
      `,
      confirmButtonText: "বন্ধ করুন",
      width: "650px",
    });
  };

  // ==========================================
  // Delete Application
  // ==========================================
  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "আপনি কি নিশ্চিত?",
      text: "এই আবেদনটি মুছে ফেলা হবে।",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
      cancelButtonText: "না",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    const updatedApplications = applications.filter(
      (app: any) => Number(app.id) !== Number(id)
    );

    localStorage.setItem(
      "deathRegistrationApplications",
      JSON.stringify(updatedApplications)
    );

    setApplications(updatedApplications);

    Swal.fire({
      icon: "success",
      title: "মুছে ফেলা হয়েছে",
      text: "আবেদনটি সফলভাবে মুছে ফেলা হয়েছে।",
      confirmButtonText: "ঠিক আছে",
    });
  };

  return (
    <div className="preview-container">

      {/* ==========================================
          HEADER
      ========================================== */}
      <div className="register-book-header">

        <h2>
          মৃত্যু নিবন্ধনের আবেদনসমূহ
        </h2>

        <div className="register-book-info">
          <span>
            <strong>
              মোট আবেদন : {applications.length}
            </strong>
          </span>
        </div>

      </div>

      {/* ==========================================
          APPLICATION TABLE
      ========================================== */}
      <div className="table-scroll">

        <table className="register-book-table">

          <thead>
            <tr>
              <th>ক্রমিক</th>
              <th>জন্ম নিবন্ধন নম্বর</th>
              <th>জন্ম তারিখ</th>
              <th>মৃত ব্যক্তির নাম</th>
              <th>মৃত্যুর তারিখ</th>
              <th>আবেদনকারীর নাম</th>
              <th>সম্পর্ক</th>
              <th>আবেদনের তারিখ</th>
              <th>স্ট্যাটাস</th>
              <th>একশন</th>
            </tr>
          </thead>

          <tbody>

            {applications.length > 0 ? (

              applications.map(
                (application: any, index: number) => (

                  <tr key={application.id || index}>

                    {/* ক্রমিক */}
                    <td>
                      {index + 1}
                    </td>

                    {/* Birth Registration No */}
                    <td>
                      {application.birthRegistrationNo || "-"}
                    </td>

                    {/* Birth Date */}
                    <td>
                      {application.birthDate || "-"}
                    </td>

                    {/* Deceased Name */}
                    <td>
                      {application.deceasedNameBn || "-"}
                    </td>

                    {/* Death Date */}
                    <td>
                      {application.deathDate || "-"}
                    </td>

                    {/* Applicant */}
                    <td>
                      {application.applicantNameBn || "-"}
                    </td>

                    {/* Relation */}
                    <td>
                      {application.applicantRelation || "-"}
                    </td>

                    {/* Application Date */}
                    <td>
                      {application.applicationDate || "-"}
                    </td>

                    {/* Status */}
                    <td>
                      {application.status || "Pending"}
                    </td>

                    {/* Action */}
                    <td>

                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          justifyContent: "center",
                        }}
                      >

                        <button
                          type="button"
                          className="view-btn"
                          title="আবেদন দেখুন"
                          onClick={() =>
                            handleView(application)
                          }
                        >
                          দেখুন
                        </button>

                        <button
                          type="button"
                          className="view-btn"
                          title="আবেদন মুছে ফেলুন"
                          onClick={() =>
                            handleDelete(application.id)
                          }
                        >
                          মুছুন
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan={10}
                  className="no-application"
                >
                  এখনো কোনো মৃত্যু নিবন্ধনের আবেদন জমা হয়নি।
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DeathRegistrationApplications;

