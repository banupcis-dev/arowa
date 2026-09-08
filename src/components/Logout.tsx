import { useNavigate } from "react-router-dom";

function Logout() {

  const navigate = useNavigate();

  const handleLogout = () => {

    // Remove Super Admin session
    localStorage.removeItem("superAdminLogin");

    // Remove Union Admin session
    localStorage.removeItem("currentAdmin");

    // Go to Login page
    navigate("/login");
  };


  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;