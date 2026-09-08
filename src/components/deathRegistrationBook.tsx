
import "../css/banupcis.css";

function DeathRegistrationBook() {
  const applications = JSON.parse(
    localStorage.getItem("deathRegistrationApplications") || "[]"
  );

  const registeredApplications = applications.filter(
    (app: any) => app.status === "Registered"
  );

  const bookNo = registeredApplications[0]?.bookNo || 1;
  const pageNo = registeredApplications[0]?.pageNo || 1;

  return (
    <div className="preview-container">

      {/* ==========================================
          HEADER
      ========================================== */}
      <div className="register-book-header">

        <h2>মৃত্যু নিবন্ধন রেজিস্টার বই</h2>

        <div className="register-book-info">
          <span>
            <strong>বই নং : {bookNo}</strong>
          </span>

          <span>
            <strong>পাতা নং : {pageNo}</strong>
          </span>
        </div>

      </div>

      {/* ==========================================
          REGISTER BOOK TABLE
      ========================================== */}
      <div className="table-scroll">

        <table className="register-book-table">

          <thead>
            <tr>
              <th>রেজিস্টার নং</th>
              <th>রেজিস্টারের তারিখ</th>
              <th>মৃত ব্যক্তির নাম</th>
              <th>জন্ম তারিখ</th>
              <th>লিঙ্গ</th>
              <th>পিতার নাম</th>
              <th>মাতার নাম</th>
              <th>মৃত্যুর তারিখ</th>
              <th>মৃত্যুর কারণ</th>
              <th>মৃত্যুর স্থানের ঠিকানা</th>
              <th>মৃত্যুর সময় বসবাসের ঠিকানা</th>
              <th>সনদ ইস্যু</th>
              <th>মন্তব্য</th>
            </tr>
          </thead>

          <tbody>

            {registeredApplications.length > 0 ? (

              registeredApplications.map(
                (app: any, index: number) => (

                  <tr
                    key={app.id || app.registerNo || index}
                  >

                    {/* রেজিস্টার নং */}
                    <td>
                      {app.registerNo || index + 1}
                    </td>

                    {/* রেজিস্টারের তারিখ */}
                    <td>
                      {app.registerDate || "-"}
                    </td>

                    {/* মৃত ব্যক্তির নাম */}
                    <td>
                      {app.deceasedNameBn || "-"}
                    </td>

                    {/* জন্ম তারিখ */}
                    <td>
                      {app.birthDate || "-"}
                    </td>

                    {/* লিঙ্গ */}
                    <td>
                      {app.gender || "-"}
                    </td>

                    {/* পিতার নাম */}
                    <td>
                      {app.fatherName || "-"}
                    </td>

                    {/* মাতার নাম */}
                    <td>
                      {app.motherName || "-"}
                    </td>

                    {/* মৃত্যুর তারিখ */}
                    <td>
                      {app.deathDate || "-"}
                    </td>

                    {/* মৃত্যুর কারণ */}
                    <td>
                      {app.deathCause || "-"}
                    </td>

                    {/* মৃত্যুর স্থানের ঠিকানা */}
                    <td>
                      {app.deathAddress?.villageBn || "-"}
                    </td>

                    {/* মৃত্যুর সময় বসবাসের ঠিকানা */}
                    <td>
                      {app.residenceAddress?.villageBn || "-"}
                    </td>

                    {/* সনদ ইস্যু */}
                    <td>
                      {app.certificateIssued ? "হ্যাঁ" : "না"}
                    </td>

                    {/* মন্তব্য */}
                    <td>
                      {app.remarks || "-"}
                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan={13}
                  className="no-application"
                >
                  এখনো কোনো মৃত্যু নিবন্ধন আবেদন রেজিস্টার করা হয়নি।
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DeathRegistrationBook;

