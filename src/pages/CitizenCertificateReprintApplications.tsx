import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CitizenCertificateReprintApplications.css";

function CitizenCertificateReprintApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const data = JSON.parse(
      localStorage.getItem("citizenReprintApplications") || "[]"
    );

    setApplications(data);
  };

  const updateStatus = (index: number, status: string) => {
    const data = [...applications];

    data[index].status = status;

    localStorage.setItem(
      "citizenReprintApplications",
      JSON.stringify(data)
    );

    setApplications(data);

    alert("স্ট্যাটাস সফলভাবে পরিবর্তন হয়েছে।");
  };

  const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");

    return (
    <div className="reprint-list-container">

      <h2>নাগরিক নিবন্ধন সনদ পূর্ণমুদ্রণের আবেদনসমূহ</h2>

      <div className="reprint-top-bar">

  <input
    type="text"
    placeholder="আবেদন আইডি দিয়ে সার্চ করুন..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button onClick={() => setFilter("All")}>All</button>

  <button onClick={() => setFilter("Pending")}>
    Pending
  </button>

  <button onClick={() => setFilter("Approved")}>
    Approved
  </button>

  <button onClick={() => setFilter("Rejected")}>
    Rejected
  </button>

  <button onClick={() => setFilter("Printed")}>
    Printed
  </button>

</div>

      <table className="reprint-list-table">

        <thead>
          <tr>
            <th>আবেদনের তারিখ</th>
    <th>আবেদন আইডি</th>
    <th>ছবি</th>
    <th>নাম</th>
    <th>পিতার নাম</th>
    <th>মাতার নাম</th>
    <th>স্ট্যাটাস</th>
    <th>কার্যক্রম</th>
          </tr>
        </thead>
<tbody>
  {applications.length === 0 ? (
    <tr>
      <td colSpan={8} style={{ textAlign: "center" }}>
        কোনো আবেদন পাওয়া যায়নি।
      </td>
    </tr>
  ) : (
            applications
  .filter((item) => {
    const matchSearch =
      item.applicationId.toString().includes(search);

    const matchFilter =
      filter === "All" ||
      item.status === filter;

    return matchSearch && matchFilter;
  })
  .map((item, index) => (
      <tr key={index}>

        <td>{item.applicationDate}</td>

        <td>{item.applicationId}</td>

        <td>
          <img
            src={item.photo}
            alt="Citizen"
            width={55}
            height={65}
          />
        </td>

        <td>{item.banglaName}</td>

        <td>{item.fatherNameBeg}</td>

        <td>{item.motherName}</td>

        <td>
          <span className={`status ${item.status.toLowerCase()}`}>
            {item.status}
          </span>
        </td>

        <td>
          {item.status === "Pending" && (
            <>
              <button onClick={() => updateStatus(index, "Approved")}>
                অনুমোদন
              </button>

              <button onClick={() => updateStatus(index, "Rejected")}>
                বাতিল
              </button>
            </>
          )}

         {item.status === "Approved" && (
  <button
    onClick={() => {
      updateStatus(index, "Printed");

      navigate("/citizen-certificate", {
        state: {
          ...item,
          applicationType: "Reprint",
        },
      });
    }}
  >
    পূর্ণমুদ্রণ
  </button>
)}

          {item.status === "Rejected" && (
            <button disabled>বাতিল</button>
          )}

          {item.status === "Printed" && (
            <button disabled>মুদ্রিত</button>
          )}
        </td>

      </tr>
    ))
  )}
</tbody>

      </table>

      <br />

      <button
        onClick={() =>
          navigate("/union-admin-dashboard")
        }
      >
        ড্যাশবোর্ডে ফিরে যান
      </button>

    </div>
  );
}

export default CitizenCertificateReprintApplications;