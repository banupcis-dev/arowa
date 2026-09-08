import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { CgEnter } from "react-icons/cg";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    // Super Admin Login
    if (
      username === "superadmin" &&
      password === "12345"
    ) {

      localStorage.setItem(
        "superAdminLogin",
        "true"
      );

      navigate("/super-admin");
      return;
    }

    // Union Admin Login
    const admins = JSON.parse(
      localStorage.getItem("unionAdminList") || "[]"
    );

    const admin = admins.find(
      (item: any) =>
        item.username === username &&
        item.password === password &&
        item.status === "Active"
    );

    if (admin) {

      localStorage.setItem(
        "currentAdmin",
        JSON.stringify(admin)
      );

      navigate("/union-admin-dashboard");
      return;
    }

    alert("Username অথবা Password ভুল।");
  };

  return (
    <div className="login-container">

      <h2 className="login-title">
        BANUPCIS Login
      </h2>

      <div className="login-box">

        {/* Left Panel */}

        <div className="login-left">

          <h2>BANUPCIS</h2>

          <p className="system-name">
            Bangladesh Union Parishad and Pourashava Citizen
            Information and service
          </p>

          <p>
            পৃথিবীর সকল মানুষের তথ্য সংরক্ষণ,
            সনদপত্র প্রদান এবং ইউনিয়ন পরিষদের
            ডিজিটাল সেবা সহজ করার লক্ষ্যে
            BANUPCIS তৈরি করা হয়েছে।
          </p>

          <div className="status-box">

            <p>
              <strong>System Status :</strong>
              Online
            </p>

            <p>
              <strong>Version :</strong>
              2.5.0
            </p>

            <p>
              © 2024 BANUPCIS
            </p>

          </div>

        </div>

        {/* Right Panel */}

        <div className="login-right">

          <h3>User Login</h3>

          <label>
            ব্যবহারকারীর পরিচিতি (User ID)
          </label>

          <input
            type="text"
            placeholder="Enter User ID"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <label>
            ব্যবহারকারীর গোপন সংখ্যা (Password)
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <div className="forgot-password">

            <button
              type="button"
              onClick={() =>
                alert(
                  "পাসওয়ার্ড ভুলে গেলে Super Admin-এর সাথে যোগাযোগ করুন।"
                )
              }
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </button>

          </div>

          <p className="login-note">
            পরিচিতি এবং গোপন সংখ্যা
            সঠিকভাবে লিখুন।
          </p>

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            <CgEnter />
            <span>প্রবেশ করুন</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;