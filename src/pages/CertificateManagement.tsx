import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CertificateManagement.css";


function CertificateManagement() {
  const [nameBn, setNameBn] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [status, setStatus] = useState("Active");

  const [certificates, setCertificates] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  /* ================= Load Data ================= */

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("certificateList") || "[]"
    );

    if (saved.length === 0) {
      const defaultData = [
        {
          id: 1,
          nameBn: "নাগরিক নিবন্ধন সনদ",
          nameEn: "Citizen Registration Certificate",
          status: "Active",
        },
      ];

      localStorage.setItem(
        "certificateList",
        JSON.stringify(defaultData)
      );

      setCertificates(defaultData);
    } else {
      setCertificates(saved);
    }
  }, []);

  /* ================= Clear Form ================= */

  const clearForm = () => {
    setNameBn("");
    setNameEn("");
    setStatus("Active");
    setEditIndex(null);
  };

  /* ================= Save ================= */

  const handleSave = () => {
    if (!nameBn || !nameEn) {
      alert("সনদের নাম লিখুন");
      return;
    }

    const certificate = {
      id:
        editIndex !== null
          ? certificates[editIndex].id
          : Date.now(),

      nameBn,
      nameEn,
      status,
    };

    let updated = [...certificates];

    if (editIndex !== null) {
      updated[editIndex] = certificate;
    } else {
      updated.push(certificate);
    }

    setCertificates(updated);

    localStorage.setItem(
      "certificateList",
      JSON.stringify(updated)
    );

    alert("Certificate Saved");

    clearForm();
  };

  /* ================= Edit ================= */

  const handleEdit = (index: number) => {
    const item = certificates[index];

    setNameBn(item.nameBn);
    setNameEn(item.nameEn);
    setStatus(item.status);

    setEditIndex(index);
  };

  /* ================= Delete ================= */

  const handleDelete = (index: number) => {
    if (!window.confirm("Delete Certificate?")) return;

    const updated = certificates.filter(
      (_, i) => i !== index
    );

    setCertificates(updated);

    localStorage.setItem(
      "certificateList",
      JSON.stringify(updated)
    );
  };

  /* ================= UI ================= */

  return (
    <div className="certificate-container">
      <h2>Certificate Management</h2>

      <div className="certificate-form">
        <input
          placeholder="সনদের নাম (বাংলা)"
          value={nameBn}
          onChange={(e) =>
            setNameBn(e.target.value)
          }
        />

        <input
          placeholder="Certificate Name (English)"
          value={nameEn}
          onChange={(e) =>
            setNameEn(e.target.value)
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button onClick={handleSave}>
          {editIndex !== null
            ? "Update"
            : "Save"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ক্রমিক নং</th>
            <th>সনদের নাম (বাংলা)</th>
            <th>সনদের নাম (ইংরেজি)</th>
            <th>বর্তমান অবস্থা</th>
            <th>কার্যক্রম</th>
          </tr>
        </thead>

        <tbody>
          {certificates.map(
            (item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item.nameBn}</td>

                <td>{item.nameEn}</td>

                <td>{item.status}</td>

                <td>

  {item.nameBn === "নাগরিক নিবন্ধন সনদ" && (
    <button
      onClick={() =>
        navigate("/citizen-certificate-dashboard")
      }
      className="enter-btn"
    >
      প্রবেশ
    </button>
  )}

  <button
    onClick={() =>
      handleEdit(index)
    }
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDelete(index)
    }
  >
    Delete
  </button>

</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CertificateManagement;