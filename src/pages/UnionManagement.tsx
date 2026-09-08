import { useEffect, useState } from "react";
import "../css/banupcis.css";
import { useNavigate } from "react-router-dom";

function UnionManagement() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [unionCode, setUnionCode] = useState("");
  const [unionNameBn, setUnionNameBn] = useState("");
  const [unionNameEn, setUnionNameEn] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [unions, setUnions] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("unionList") || "[]"
    );
    setUnions(saved);
  }, []);

  const clearForm = () => {
    setUnionCode("");
    setUnionNameBn("");
    setUnionNameEn("");
    setDivision("");
    setDistrict("");
    setUpazila("");
    setEmail("");
    setMobile("");
    setEditIndex(null);
  };

  const handleSave = () => {
    const union = {
      unionCode,
      unionNameBn,
      unionNameEn,
      division,
      district,
      upazila,
      email,
      mobile,
    };

    let updated = [...unions];

    if (editIndex !== null) {
      updated[editIndex] = union;
    } else {
      updated.push(union);
    }

    setUnions(updated);

    localStorage.setItem(
      "unionList",
      JSON.stringify(updated)
    );

    alert("Saved Successfully.");

    clearForm();
  };

  const handleEdit = (index: number) => {
    const item = unions[index];

    setUnionCode(item.unionCode);
    setUnionNameBn(item.unionNameBn);
    setUnionNameEn(item.unionNameEn);
    setDivision(item.division);
    setDistrict(item.district);
    setUpazila(item.upazila);
    setEmail(item.email);
    setMobile(item.mobile);

    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    if (!window.confirm("Delete this Union?")) return;

    const updated = unions.filter(
      (_, i) => i !== index
    );

    setUnions(updated);

    localStorage.setItem(
      "unionList",
      JSON.stringify(updated)
    );
  };

  const filteredUnions = unions.filter((item) => {

  const keyword = search.toLowerCase();

  return (
    item.unionCode.toLowerCase().includes(keyword) ||
    item.unionNameBn.toLowerCase().includes(keyword) ||
    item.unionNameEn.toLowerCase().includes(keyword)
  );

});
  return (
    <div className="union-container">

      <h2>Union Management</h2>

      <input
        placeholder="Union Code"
        value={unionCode}
        onChange={(e) =>
          setUnionCode(e.target.value)
        }
      />

      <input
        placeholder="Union Name (Bangla)"
        value={unionNameBn}
        onChange={(e) =>
          setUnionNameBn(e.target.value)
        }
      />

      <input
        placeholder="Union Name (English)"
        value={unionNameEn}
        onChange={(e) =>
          setUnionNameEn(e.target.value)
        }
      />

      <input
        placeholder="Division"
        value={division}
        onChange={(e) =>
          setDivision(e.target.value)
        }
      />

      <input
        placeholder="District"
        value={district}
        onChange={(e) =>
          setDistrict(e.target.value)
        }
      />

      <input
        placeholder="Upazila"
        value={upazila}
        onChange={(e) =>
          setUpazila(e.target.value)
        }
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) =>
          setMobile(e.target.value)
        }
      />

      <button onClick={handleSave}>
        {editIndex !== null ? "Update" : "Save"}
      </button>

      <br />
      <br />
      <br />
<br />

<input
  type="text"
  placeholder="Search by Union Code or Union Name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<br />
<br />

      <table
        border={1}
        cellPadding={8}
        width="100%"
      >
        <thead>
          <tr>
            <th>Code</th>
            <th>Union</th>
            <th>Upazila</th>
            <th>District</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Enter</th>
          </tr>
        </thead>

        <tbody>

          {filteredUnions.map((item, index) => (
            <tr key={index}>

              <td>{item.unionCode}</td>

              <td>{item.unionNameEn}</td>

              <td>{item.upazila}</td>

              <td>{item.district}</td>

              <td>{item.email}</td>

              <td>{item.mobile}</td>

              <td>
                <button
                  onClick={() =>
                    handleEdit(index)
                  }
                >
                  ✏️
                </button>
              </td>

              <td>
                <button
                  onClick={() =>
                    handleDelete(index)
                  }
                >
                  🗑
                </button>
              </td>
<td>
  <button
    onClick={() => {

      localStorage.setItem(
        "selectedUnion",
        JSON.stringify(item)
      );

      navigate("/union-admin-dashboard");

    }}
  >
    🚪 প্রবেশ
  </button>
</td>
            </tr>
            
          ))}

        </tbody>
      </table>

    </div>
  );
}

export default UnionManagement;