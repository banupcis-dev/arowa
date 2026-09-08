import { useNavigate } from "react-router-dom";
import "../css/superAdmin.css";


function SuperAdminDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("superAdminLogin");
    navigate("/login");
  };


  return (
    <div className="super-admin-container">

      <div className="super-admin-header">
        <h1>BANUPCIS Super Admin Panel</h1>

        <button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>


      <div className="super-admin-menu">

        <button onClick={() => navigate("/union-management")}>
          🏢 Union Management
        </button>

        <button onClick={() => navigate("/union-admin-management")}>
          👥 Union Admin Management
        </button>



    <button onClick={() => navigate("/certificate-management")}>
  📄 Certificate Management
</button>
        <button onClick={() => navigate("/system-settings")}>
          ⚙ System Settings
        </button>

        <button onClick={() => navigate("/reports")}>
          📊 Reports
        </button>

      </div>

    </div>
  );
}

export default SuperAdminDashboard;