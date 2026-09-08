import { useEffect, useState } from "react";
import "../css/banupcis.css";

function UnionAdminManagement() {
  const [unionName, setUnionName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Active");

  const [unionList, setUnionList] = useState<any[]>([]);
  const [adminList, setAdminList] = useState<any[]>([]);

  useEffect(() => {
    const unions = JSON.parse(
      localStorage.getItem("unionList") || "[]"
    );

    const admins = JSON.parse(
      localStorage.getItem("unionAdminList") || "[]"
    );

    setUnionList(unions);
    setAdminList(admins);
  }, []);

  const handleSave = () => {
    if (
      !unionName ||
      !adminName ||
      !username ||
      !password
    ) {
      alert("সব তথ্য পূরণ করুন");
      return;
    }

    const newAdmin = {
      unionName,
      adminName,
      username,
      password,
      mobile,
      email,
      status,
    };

    const updated = [...adminList, newAdmin];

    setAdminList(updated);

    localStorage.setItem(
      "unionAdminList",
      JSON.stringify(updated)
    );

    alert("Union Admin Saved Successfully.");

    setUnionName("");
    setAdminName("");
    setUsername("");
    setPassword("");
    setMobile("");
    setEmail("");
    setStatus("Active");
  };

  const handleDelete = (index: number) => {
    if (!window.confirm("Delete this Admin?")) return;

    const updated = adminList.filter(
      (_, i) => i !== index
    );

    setAdminList(updated);

    localStorage.setItem(
      "unionAdminList",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="union-container">

      <h2>Union Admin Management</h2>

      <select
        value={unionName}
        onChange={(e) => setUnionName(e.target.value)}
      >
        <option value="">
          Select Union
        </option>

        {unionList.map((item, index) => (
          <option
            key={index}
            value={item.unionNameEn}
          >
            {item.unionNameEn}
          </option>
        ))}
      </select>

      <input
        placeholder="Admin Name"
        value={adminName}
        onChange={(e) =>
          setAdminName(e.target.value)
        }
      />

      <input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) =>
          setMobile(e.target.value)
        }
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
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
        Save Admin
      </button>

      <br />
      <br />

      <table
        border={1}
        cellPadding={8}
        width="100%"
      >
        <thead>
          <tr>
            <th>Union</th>
            <th>Admin</th>
            <th>Username</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {adminList.map((item, index) => (
            <tr key={index}>

              <td>{item.unionName}</td>

              <td>{item.adminName}</td>

              <td>{item.username}</td>

              <td>{item.mobile}</td>

              <td>{item.status}</td>

              <td>
                <button
                  onClick={() =>
                    handleDelete(index)
                  }
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}

export default UnionAdminManagement;