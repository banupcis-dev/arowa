import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UnionAdminDashboard.css";


function UnionAdminDashboard() {
  const navigate = useNavigate();
  const [showTradeLicenseMenu, setShowTradeLicenseMenu] = useState(false);
  const [birthMenu, setBirthMenu] = useState(false);
  const [showDeathRegistrationMenu, setShowDeathRegistrationMenu] =
  useState(false);
  const [showSameNameCertificateMenu, setShowSameNameCertificateMenu] =
  useState(false);

  /* ================= Current Admin ================= */

  const admin = JSON.parse(
    localStorage.getItem("currentAdmin") || "{}"
  );

  /* ================= Selected Union ================= */

  const selectedUnion = JSON.parse(
    localStorage.getItem("selectedUnion") || "{}"
  );

  /* ================= Active Union ================= */

  const isSuperAdminMode =
    Object.keys(selectedUnion).length > 0;

  const activeUnion = isSuperAdminMode
    ? selectedUnion
    : {
        ...admin,
        unionNameEn: admin.unionName,
      };

  /* ================= Office Settings ================= */

  const officeSettings = JSON.parse(
    localStorage.getItem("officeSettings") || "{}"
  );

  const officeInfo =
    officeSettings[
      activeUnion.unionNameEn || activeUnion.unionName
    ] || {};

  /* ================= Admin Profile ================= */

  const allProfiles = JSON.parse(
    localStorage.getItem("adminProfiles") || "{}"
  );

  const profile =
    allProfiles[
      activeUnion.unionNameEn || activeUnion.unionName
    ] || {};

  /* ================= States ================= */

  const [citizenMenu, setCitizenMenu] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [profileMenu, setProfileMenu] =
    useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  /* ================= Logout ================= */

  const handleLogout = () => {
    localStorage.removeItem("currentAdmin");
    navigate("/login");
  };

  /* ================= Dashboard Data ================= */

  const applications = JSON.parse(
    localStorage.getItem("citizenApplications") || "[]"
  );

  const totalApplications =
    applications.length;

  const approvedApplications =
    applications.filter(
      (item: any) =>
        item.approveStatus === true
    ).length;

  const pendingApplications =
    applications.filter(
      (item: any) =>
        !item.approveStatus &&
        !item.rejectStatus
    ).length;

  const rejectedApplications =
    applications.filter(
      (item: any) =>
        item.rejectStatus === true
    ).length;
    const [showWarishCertificateMenu, setShowWarishCertificateMenu] =
  useState(false);
  return (
        <div className="uad-layout">

      {/* ================= Header ================= */}

      <header className="uad-header">

        <div className="uad-header-left">

          <img
            src={officeInfo.officeLogo || "/logo.png"}
            alt="Union Office Logo"
            className="uad-logo"
          />

          <button
            className="uad-toggle-btn"
            onClick={handleSidebarToggle}
          >
            ☰
          </button>

        </div>

        <div className="uad-header-center">

          <marquee>
            বাংলাদেশের নাগরিকগণ নিজ নিজ ইউনিয়ন পরিষদের
            নাগরিক তালিকায় রেজিস্টারভুক্ত হন।
          </marquee>

        </div>

        <div className="uad-header-right">

          <button
            className="uad-logout-btn"
            onClick={handleLogout}
          >
            লগ আউট
          </button>

          {/* ================= User Profile ================= */}

          <div className="uad-user-profile">

            <button
              className="uad-profile-btn"
              onClick={() =>
                setProfileMenu(!profileMenu)
              }
            >

              <img
                src={profile.photo || "/user.png"}
                alt="Profile"
                className="uad-user-image"
              />

              <div className="uad-user-info">

                <h4>
                  {profile.name || "আপনার নাম"}
                </h4>

                <p>
                  {profile.designation || "পদবী"}
                </p>

              <small>
                {officeInfo.unionNameEn ||
                activeUnion.unionNameEn}
                </small>

              </div>

              <span className="uad-arrow">
                {profileMenu ? "▲" : "▼"}
              </span>

            </button>

            {profileMenu && (

              <div className="uad-profile-dropdown">

                <div className="uad-profile-header">

                  <img
                    src={profile.photo || "/user.png"}
                    alt="Profile"
                    className="uad-dropdown-image"
                  />

                  <h4>
                    {profile.name || "আপনার নাম"}
                  </h4>

                  <p>
                    {profile.designation || "পদবী"}
                  </p>

                 <small>
                    {officeInfo.unionNameEn ||
                     activeUnion.unionNameEn}
                    </small>

                </div>

                <button
                  onClick={() => {
                    setProfileMenu(false);
                    navigate("/profile");
                  }}
                >
                  👤 আমার প্রোফাইল
                </button>

                <button
                  onClick={() => {
                    setProfileMenu(false);
                    navigate("/office-settings");
                  }}
                >
                  ⚙️ অফিস সেটিংস
                </button>

                <button
                  onClick={handleLogout}
                >
                  🚪 লগ আউট
                </button>

              </div>

            )}

          </div>

        </div>

      </header>
            {/* ================= Body ================= */}

      <div className="uad-body">

        {/* ================= Sidebar ================= */}

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
                  navigate("/union-admin-dashboard")
                }
              >
                ড্যাশবোর্ড
              </button>
            </li>

            <li>

              <button
                className="uad-menu-btn"
                onClick={() =>
                  setCitizenMenu(!citizenMenu)
                }
              >
                <span>নাগরিক সনদ</span>
              </button>

              {citizenMenu && (

                <ul className="uad-sub-menu">

                  <li
                    onClick={() => navigate("/")}
                  >
                    নাগরিক সনদের জন্য আবেদন করুন
                  </li>

                  <li
                    onClick={() =>
                      navigate("/applications")
                    }
                  >
                    নাগরিক সনদের আবেদনসমূহ
                  </li>

                  <li
                    onClick={() =>
                      navigate("/certificate-correction")
                    }
                  >
                    নাগরিক সনদ সংশোধনের জন্য আবেদন করুন
                  </li>

                  <li
                    onClick={() =>
                      navigate("/certificate-correction-list")
                    }
                  >
                    নাগরিক সনদ সংশোধনের আবেদনসমূহ
                  </li>
                  <li
  onClick={() =>
    navigate("/citizen-certificate-reprint-apply")
  }
>
  নাগরিক নিবন্ধন সনদ পূর্ণমুদ্রণের জন্য আবেদন করুন
</li>

<li
  onClick={() =>
    navigate("/citizen-certificate-reprint-applications")
  }
>
  নাগরিক নিবন্ধন সনদ পূর্ণমুদ্রণের আবেদনসমূহ
</li>

                  <li
                    onClick={() =>
                      navigate("/citizen-fee-register")
                    }
                  >
                    ফি আদায় রেজিস্টার
                  </li>

                  <li
                    onClick={() =>
                      navigate("/citizen-certificate-register-book")
                    }
                  >
                    নাগরিক সনদের রেজিস্টার বই
                  </li>

                </ul>

              )}

            </li>
        <li>
  <button
    className="uad-menu-btn"
    onClick={() => setBirthMenu(!birthMenu)}
  >
    জন্ম নিবন্ধন
  </button>

  {birthMenu && (
    <ul className="uad-sub-menu">

      <li
        onClick={() =>
          navigate("/birth-registration-application")
        }
      >
        জন্ম নিবন্ধনের জন্য আবেদন করুন
      </li>

      <li
        onClick={() =>
          navigate("/deceased-birth-registration-applications")
        }
      >
         জন্ম  নিবন্ধন আবেদনসমূহ
      </li>

      <li
        onClick={() =>
          navigate("/birth-fee-register")
        }
      >
        জন্ম নিবন্ধন ফি রেজিস্টার
      </li>

      <li
        onClick={() =>
          navigate("/birth-registration-book")
        }
      >
        জন্ম নিবন্ধন রেজিস্টার বই
      </li>

    </ul>
  )}
</li>
<li>
  <button
    className="uad-menu-btn"
    onClick={() =>
      setShowDeathRegistrationMenu(!showDeathRegistrationMenu)
    }
  >
    মৃত্যু নিবন্ধন
  </button>

  {showDeathRegistrationMenu && (
    <ul className="uad-submenu">

      {/* মৃত্যু নিবন্ধনের জন্য আবেদন করুন */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/death-registration-application")
          }
        >
          মৃত্যু নিবন্ধনের জন্য আবেদন করুন
        </button>
      </li>

      {/* মৃত্যু নিবন্ধনের আবেদনসমূহ */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/death-registration-applications")
          }
        >
          মৃত্যু নিবন্ধনের আবেদনসমূহ
        </button>
      </li>
      {/* মৃত্যু নিবন্ধন সংশোধনের জন্য আবেদন করুন */}
<li>
  <button
    className="uad-menu-btn"
    onClick={() =>
      navigate("/death-registration-correction")
    }
  >
    মৃত্যু নিবন্ধন সংশোধনের জন্য আবেদন করুন
  </button>
</li>
<li>
  <button
    className="uad-menu-btn"
    onClick={() =>
      navigate("/death-registration-correction-list")
    }
  >
    মৃত্যু নিবন্ধন সংশোধনের আবেদনসমূহ
  </button>
</li>
{/* নিবন্ধন সনদ পুনঃমুদ্রণ করুন */}
<li>
  <button
    className="uad-menu-btn"
    onClick={() =>
      navigate("/death-registration-reprint")
    }
  >
    মৃত্যু নিবন্ধন সনদ পুনঃমুদ্রণের জন্য আবেদন করুন
  </button>
</li>
{/* নিবন্ধন সনদ পুনঃমুদ্রণের আবেদনসমূহ */}
<li>
  <button
    className="uad-menu-btn"
    onClick={() =>
      navigate("/death-registration-reprint-applications")
    }
  >
    মৃত্যু নিবন্ধন সনদ পুনঃমুদ্রণের আবেদনসমূহ
  </button>
</li>
      {/* মৃত্যু নিবন্ধন বই */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/death-registration-book")
          }
        >
          মৃত্যু নিবন্ধন রেজিস্টার বই
        </button>
      </li>

      {/* ফি আদায় রেজিস্টার */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/death-fee-register")
          }
        >
          ফি আদায় রেজিস্টার
        </button>
      </li>

    </ul>
  )}
</li>
<li>
  <button
    className="uad-menu-btn"
    onClick={() => setShowTradeLicenseMenu(!showTradeLicenseMenu)}
  >
    ব্যবসা নিবন্ধন
  </button>

  {showTradeLicenseMenu && (
    <ul className="uad-submenu">
      <li>
        <button
          className="uad-menu-btn"
          onClick={() => navigate("/trade-license-application")}
        >
          ব্যবসা নিবন্ধনের জন্য আবেদন করুন
        </button>
      </li>

      <li>
        <button
          className="uad-menu-btn"
          onClick={() => navigate("/trade-license-applications")}
        >
          ব্যবসা নিবন্ধনের আবেদনসমূহ
        </button>
      </li>
      <li>
      <button
  onClick={() =>
    navigate("/trade-license-correction")
  }
>
  ট্রেড লাইসেন্স সংশোধনের জন্য আবেদন করুন
</button>
      </li>
      <li>

<button
  onClick={() => navigate("/trade-license-correction-list")}
>
  ব্যবসা নিবন্ধন সংশোধনের আবেদনসমূহ
</button>
      </li>
      <li>
  <button
    onClick={() =>
      navigate("/trade-license-renewal")
    }
  >
    ট্রেড লাইসেন্স নবায়ন করুন
  </button>
</li>
<li>
  <button
    onClick={() =>
      navigate("/trade-license-renewal-applications")
    }
  >
    ট্রেড লাইসেন্স নবায়নের আবেদনসমূহ
  </button>
</li>
<li>
  <button
    className="uad-menu-btn"
    onClick={() => navigate("/trade-license-register-book")}
  >
    ব্যবসা নিবন্ধনের বই
  </button>
</li>

      <li>
        <button
          className="uad-menu-btn"
          onClick={() => navigate("/trade-license-fee-register")}
        >
          ফি আদায় রেজিস্টার
        </button>
      </li>
    </ul>
  )}
</li>
<li>
  <button
    className="uad-menu-btn"
    onClick={() =>
      setShowWarishCertificateMenu(!showWarishCertificateMenu)
    }
  >
    ওয়ারিশ সনদ
  </button>

  {showWarishCertificateMenu && (
    <ul className="uad-submenu">

      {/* ওয়ারিশ সনদের জন্য আবেদন */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() => navigate("/warish-certificate")}
        >
          ওয়ারিশ সনদের জন্য আবেদন করুন
        </button>
      </li>

      {/* আবেদনসমূহ */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() => navigate("/warish-certificate-list")}
        >
          ওয়ারিশ সনদের আবেদনসমূহ
        </button>
      </li>

      {/* ওয়ারিশ সনদ রেজিস্টার */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() => navigate("/warish-certificate-register")}
        >
          ওয়ারিশ সনদ রেজিস্টার
        </button>
      </li>

      {/* ফি রেজিস্টার */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/warish-certificate-fee-register")
          }
        >
          ফি আদায় রেজিস্টার
        </button>
      </li>

    </ul>
  )}
</li>
<li>
  <button
    className="uad-menu-btn"
    onClick={() =>
      setShowSameNameCertificateMenu(
        !showSameNameCertificateMenu
      )
    }
  >
    একই নামে সনদ পত্র
  </button>

  {showSameNameCertificateMenu && (
    <ul className="uad-submenu">

      {/* একই নামে সনদ পত্রের জন্য আবেদন করুন */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/same-name-certificate-application")
          }
        >
          একই নামে সনদ পত্রের জন্য আবেদন করুন
        </button>
      </li>

      {/* একই নামে সনদ পত্রের আবেদনসমূহ */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/same-name-certificate-applications")
          }
        >
          একই নামে সনদ পত্রের আবেদনসমূহ
        </button>
      </li>

      {/* একই নামে সনদ পত্র সংশোধনের জন্য আবেদন করুন */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/same-name-certificate-correction")
          }
        >
          একই নামে সনদ পত্র সংশোধনের জন্য আবেদন করুন
        </button>
      </li>

      {/* একই নামে সনদ পত্র সংশোধনের আবেদনসমূহ */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/same-name-certificate-correction-list")
          }
        >
          একই নামে সনদ পত্র সংশোধনের আবেদনসমূহ
        </button>
      </li>

      {/* একই নামে সনদ পত্র পুনঃমুদ্রণের জন্য আবেদন করুন */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/same-name-certificate-reprint")
          }
        >
          একই নামে সনদ পত্র পুনঃমুদ্রণের জন্য আবেদন করুন
        </button>
      </li>

      {/* একই নামে সনদ পত্র পুনঃমুদ্রণের আবেদনসমূহ */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/same-name-certificate-reprint-applications")
          }
        >
          একই নামে সনদ পত্র পুনঃমুদ্রণের আবেদনসমূহ
        </button>
      </li>

      {/* একই নামে সনদ পত্র রেজিস্টার বই */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/same-name-certificate-book")
          }
        >
          একই নামে সনদ পত্র রেজিস্টার বই
        </button>
      </li>

      {/* ফি আদায় রেজিস্টার */}
      <li>
        <button
          className="uad-menu-btn"
          onClick={() =>
            navigate("/same-name-certificate-fee-register")
          }
        >
          ফি আদায় রেজিস্টার
        </button>
      </li>

    </ul>
  )}
</li>

            <li>

              <button
                className="uad-menu-btn"
              >
                প্রতিবেদন
              </button>

            </li>

            <li>

              <button
                className="uad-menu-btn"
              >
                নোটিফিকেশন
              </button>

            </li>

            <li>

              <button
                className="uad-menu-btn"
                onClick={() =>
                  navigate("/office-settings")
                }
              >
                অফিস ব্যবস্থাপনা
              </button>

            </li>

          </ul>

        </aside>
                {/* ================= Main ================= */}

        <main className="uad-main">

          <h2>ড্যাশবোর্ড</h2>

          <div className="uad-dashboard-header">

            <h2>ইউনিয়ন ড্যাশবোর্ড</h2>

            <p>
              {officeInfo.unionNameEn ||
                admin.unionName} এ স্বাগতম।
            </p>

            <div className="uad-summary">

              <div className="uad-card">
                <h3>মোট আবেদন</h3>
                <span>{totalApplications}</span>
              </div>

              <div className="uad-card">
                <h3>অনুমোদিত</h3>
                <span>{approvedApplications}</span>
              </div>

              <div className="uad-card">
                <h3>অপেক্ষমাণ</h3>
                <span>{pendingApplications}</span>
              </div>

              <div className="uad-card">
                <h3>প্রত্যাখ্যাত</h3>
                <span>{rejectedApplications}</span>
              </div>

            </div>

          </div>

        </main>

      </div>

      {/* ================= Footer ================= */}

      <footer className="uad-footer">

        <p>
          © Banupcis এর মাধ্যমে সংরক্ষিত
        </p>

      </footer>

    </div>
  );
}

export default UnionAdminDashboard;