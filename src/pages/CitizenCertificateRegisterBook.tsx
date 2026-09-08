import "../css/banupcis.css";

function CitizenCertificateRegisterBook() {
  const applications = JSON.parse(
    localStorage.getItem("citizenApplications") || "[]"
  );

  const registeredApplications = applications.filter(
    (app: any) => app.registerStatus === true
  );

  // প্রথম রেকর্ড থেকে বই ও পাতা নং
  const bookNo = registeredApplications[0]?.bookNo || 1;
  const pageNo = registeredApplications[0]?.pageNo || 1;

  return (
    <div className="preview-container">

      <div className="register-book-header">
        <h2>নাগরিক সনদ রেজিস্টার বই</h2>

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
              <th>আবেদনকারীর নাম</th>
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
            {registeredApplications.map((app: any) => (
              <tr key={app.applicationId}>

                <td>{app.registerNo}</td>

                <td>{app.registerDate}</td>

                <td>{app.banglaName}</td>

                <td>{app.birthDate}</td>

                <td>{app.gender?.name_bn}</td>

                <td>{app.fatherNameBeg}</td>

                <td>{app.motherName}</td>

                <td>{app.birthAddress?.villageBn}</td>

                <td>{app.presentAddress?.villageBn}</td>

                <td>{app.permanentAddress?.villageBn}</td>

                <td>{app.certificateIssued ? "হ্যাঁ" : "না"}</td>

                <td>{app.remarks || "-"}</td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default CitizenCertificateRegisterBook;