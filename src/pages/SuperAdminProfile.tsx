import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SuperAdminProfile.css";

function SuperAdminProfile() {

  const navigate = useNavigate();

  const [photo, setPhoto] = useState(
    localStorage.getItem("superAdminPhoto") || "/user.png"
  );

  const [name, setName] = useState(
    localStorage.getItem("superAdminName") || "Super Admin"
  );

  const [mobile, setMobile] = useState(
    localStorage.getItem("superAdminMobile") || ""
  );

  const [email, setEmail] = useState(
    localStorage.getItem("superAdminEmail") || ""
  );

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      const image = reader.result as string;

      localStorage.setItem(
        "superAdminPhoto",
        image
      );

      setPhoto(image);

    };

    reader.readAsDataURL(file);

  };

  const handleSave = () => {

    localStorage.setItem(
      "superAdminName",
      name
    );

    localStorage.setItem(
      "superAdminMobile",
      mobile
    );

    localStorage.setItem(
      "superAdminEmail",
      email
    );

    alert("Profile Saved Successfully.");

  };

  return (

    <div className="profile-container">

      <div className="profile-card">

        <h2>
          Super Admin Profile
        </h2>

        <img
          src={photo}
          alt="Super Admin"
          className="profile-image"
        />

        <div className="profile-upload">

          <label>
            ছবি নির্বাচন করুন
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />

        </div>

        <label>
          নাম
        </label>

        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <label>
          মোবাইল
        </label>

        <input
          type="text"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
        />

        <label>
          ই-মেইল
        </label>

        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button
          onClick={handleSave}
        >
          Save Profile
        </button>

        <button
          onClick={()=>navigate(-1)}
        >
          Back
        </button>

      </div>

    </div>

  );

}

export default SuperAdminProfile;