import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UnionAdminDashboard.css";

function CitizenCertificateDashboard() {

  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("currentAdmin") || "{}"
  );

  const selectedUnion = JSON.parse(
    localStorage.getItem("selectedUnion") || "{}"
  );

  const isSuperAdminMode =
    Object.keys(selectedUnion).length > 0;

  const activeUnion = isSuperAdminMode
    ? selectedUnion
    : {
        ...admin,
        unionNameEn: admin.unionName,
      };

  const officeSettings = JSON.parse(
    localStorage.getItem("officeSettings") || "{}"
  );

  const officeInfo =
    officeSettings[
      activeUnion.unionNameEn ||
      activeUnion.unionName
    ] || {};

  const allProfiles = JSON.parse(
    localStorage.getItem("adminProfiles") || "{}"
  );

  const profile =
    allProfiles[
      activeUnion.unionNameEn ||
      activeUnion.unionName
    ] || {};

  const [citizenMenu, setCitizenMenu] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [profileMenu, setProfileMenu] =
    useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {

    localStorage.removeItem("superAdminLogin");
    navigate("/login");

  };

  return (

    <div>
{/* ================= Header ================= */}

<header className="uad-header">

  {/* Left Section */}
  <div className="uad-header-left">

    <img
      src={officeInfo.officeLogo || "/logo.png"}
      alt="Logo"
      className="uad-logo"
    />

    <button
      className="uad-toggle-btn"
      onClick={handleSidebarToggle}
    >
      ☰
    </button>

  </div>

  {/* Center Section */}
  <div className="uad-header-center">

    <marquee>
      BANUPCIS | নাগরিক নিবন্ধন সনদ ব্যবস্থাপনা
    </marquee>

  </div>

  {/* Right Section */}
  <div className="uad-header-right">

    <button
      className="uad-logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

    {/* Profile */}
    <div className="uad-user-profile">

      <button
        className="uad-profile-btn"
        onClick={() => setProfileMenu(!profileMenu)}
      >

        <img
          src={
            localStorage.getItem("superAdminPhoto") ||
            "/user.png"
          }
          alt="Super Admin"
          className="uad-user-image"
        />

        <div className="uad-user-details">

          <h4>Super Admin</h4>

          <p>Citizen Certificate Module</p>

          <small>BANUPCIS</small>

        </div>

        <span className="uad-arrow">
          {profileMenu ? "▲" : "▼"}
        </span>

      </button>

      {/* Dropdown */}
      {profileMenu && (

        <div className="uad-profile-dropdown">

          <div className="uad-profile-header">

            <img
              src={
                localStorage.getItem("superAdminPhoto") ||
                "/user.png"
              }
              alt="Super Admin"
              className="uad-dropdown-image"
            />

            <h4>Super Admin</h4>

            <p>Citizen Certificate Module</p>

          </div>

          <button
            onClick={() => navigate("/super-admin-profile")}
          >
            👤 Profile
          </button>

          <button
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      )}

    </div>

  </div>

</header>
      {/* ================= Body ================= */}

      <div className="uad-body">

        <aside
          className={
            sidebarOpen
              ? "uad-sidebar"
              : "uad-sidebar hide"
          }
        >

          <ul className="uad-menu">

            <li>

              <button
                className="uad-menu-btn"
                onClick={() =>
                  navigate("/citizen-certificate-dashboard")
                }
              >

                🏠 ড্যাশবোর্ড

              </button>

            </li>

            <li>

              <button
                className="uad-menu-btn"
                onClick={() =>
                  setCitizenMenu(!citizenMenu)
                }
              >

                📄 নাগরিক নিবন্ধন সনদঃ


              </button>

              {citizenMenu && (

                <ul className="uad-sub-menu">

                  <li
                    onClick={() =>
                      navigate("/")
                    }
                  >
                    নাগরিক সনদ নিবন্ধনের জন্য আবেদন করুন
                  </li>

                  <li
                    onClick={() =>
                      navigate("/applications")
                    }
                  >
                    নাগরিক সনদ নিবন্ধনের আবেদনসমূহ
                  </li>

                  <li
                    onClick={() =>
                      navigate("/certificate-correction")
                    }
                  >
                     নাগরিক নিবন্ধন সনদ সংশোধনের জন্য আবেদন করুন 
                  </li>

                  <li
                    onClick={() =>
                      navigate("/certificate-correction-list")
                    }
                  >
                     নাগরিক নিবন্ধন সনদ সংশোধনের আবেদনসমূহ
                  </li>

                  <li
                    onClick={() =>
                      navigate("/citizen-fee-register")
                    }
                  >
                  নাগরিক সনদ নিবন্ধন ফি আদায় রেজিস্টার
                  </li>

                  <li
                    onClick={() =>
                      navigate("/citizen-certificate-register-book")
                    }
                  >
                     নাগরিক নিবন্ধন সনদ রেজিস্টার
                  </li>

                </ul>

              )}

            </li>

          </ul>

        </aside>
                {/* ================= Main ================= */}

        <main className="uad-main">

          <div className="uad-dashboard-header">

            <h2>
              নাগরিক নিবন্ধন সনদ ব্যবস্থাপনা
            </h2>

            <p>
              BANUPCIS Super Admin Citizen Certificate Module
            </p>

          </div>

        </main>

      </div>

      {/* ================= Footer ================= */}

      <footer className="uad-footer">

        <p>
          © 2026 BANUPCIS | Citizen Registration Certificate Management System
        </p>

      </footer>

    </div>

  );

}

export default CitizenCertificateDashboard;