import "../css/banupcis.css";

function BirthRegistrationBook() {
  const applications = JSON.parse(
    localStorage.getItem("deceasedBirthRegistrationApplications") || "[]"
  );

  // শুধু Registered আবেদনগুলো
  const registeredApplications = applications.filter(
    (app: any) => app.status === "Registered"
  );

  // প্রথম Registered রেকর্ড থেকে বই ও পাতা নং
  const bookNo = registeredApplications[0]?.bookNo || 1;
  const pageNo = registeredApplications[0]?.pageNo || 1;

  return (
    <div className="preview-container">
      <div className="register-book-header">
        <h2>জন্ম নিবন্ধন রেজিস্টার বই</h2>

        <div className="register-book-info">
          <span>
            <strong>বই নং : {bookNo}</strong>
          </span>

          <span>
            <strong>পাতা নং : {pageNo}</strong>
          </span>
        </div>
      </div>

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
              <th>জন্মস্থানের ঠিকানা</th>
              <th>বর্তমান ঠিকানা</th>
              <th>স্থায়ী ঠিকানা</th>
              <th>সনদ ইস্যু</th>
              <th>মন্তব্য</th>
            </tr>
          </thead>
          <tbody>
            {registeredApplications.length > 0 ? (
              registeredApplications.map((app: any, index: number) => (
                <tr key={app.brn || index}>
                  <td>{app.registerNo || index + 1}</td>

                  <td>{app.registerDate || "-"}</td>

                  <td>{app.deceasedNameBn || "-"}</td>

                  <td>{app.dateOfBirth || "-"}</td>

                  <td>{app.gender || "-"}</td>

                  <td>{app.fatherNameBeg || "-"}</td>

                  <td>{app.motherName || "-"}</td>

                  <td>{app.birthAddress?.villageBn || "-"}</td>

                  <td>{app.presentAddress?.villageBn || "-"}</td>

                  <td>{app.permanentAddress?.villageBn || "-"}</td>

                  <td>{app.certificateIssued ? "হ্যাঁ" : "না"}</td>

                  <td>{app.remarks || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className="no-application">
                  এখনো কোনো আবেদন রেজিস্টার করা হয়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BirthRegistrationBook;