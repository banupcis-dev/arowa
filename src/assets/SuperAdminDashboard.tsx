import { useNavigate } from "react-router-dom";
import "../css/banupcis.css";

function SuperAdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="super-admin-container">

      <h1>Super Admin Panel</h1>

      <div className="super-admin-menu">

        <button onClick={() => navigate("/union-management")}>
          Union Management
        </button>

        <button onClick={() => navigate("/union-admin-management")}>
          Union Admin Management
        </button>

        <button onClick={() => navigate("/license-management")}>
          License Management
        </button>

        <button onClick={() => navigate("/system-settings")}>
          System Settings
        </button>

        <button onClick={() => navigate("/reports")}>
          Reports
        </button>

        <button>
          Logout
        </button>

      </div>

    </div>
  );
}

export default SuperAdminDashboard;