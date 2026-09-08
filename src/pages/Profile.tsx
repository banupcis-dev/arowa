import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/banupcis.css";

function Profile() {
  const navigate = useNavigate();

  const currentAdmin = JSON.parse(
    localStorage.getItem("currentAdmin") || "{}"
  );

  const [profile, setProfile] = useState({
    name: "",
    designation: "",
    mobile: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    if (!currentAdmin.unionName) return;

    const allProfiles = JSON.parse(
      localStorage.getItem("adminProfiles") || "{}"
    );

    if (allProfiles[currentAdmin.unionName]) {
      setProfile(
        allProfiles[currentAdmin.unionName]
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        photo: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };
    const handleSave = () => {
    if (!currentAdmin.unionName) {
      alert("Union Admin পাওয়া যায়নি।");
      return;
    }

    const allProfiles = JSON.parse(
      localStorage.getItem("adminProfiles") || "{}"
    );

    allProfiles[currentAdmin.unionName] = profile;

    localStorage.setItem(
      "adminProfiles",
      JSON.stringify(allProfiles)
    );

    alert("প্রোফাইল সফলভাবে সংরক্ষণ করা হয়েছে।");
  };

  return (
    <div className="office-settings-container">

      <h2>আমার প্রোফাইল</h2>

      <input
        type="text"
        name="name"
        placeholder="নাম"
        value={profile.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="designation"
        placeholder="পদবী"
        value={profile.designation}
        onChange={handleChange}
      />

      <input
        type="text"
        name="mobile"
        placeholder="মোবাইল নম্বর"
        value={profile.mobile}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="ই-মেইল"
        value={profile.email}
        onChange={handleChange}
      />

      <div className="office-upload-card">

        <label>Profile Photo</label>

        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />

        {profile.photo && (
          <img
            src={profile.photo}
            alt="Profile"
            className="office-preview"
          />
        )}

      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >

        <button
          className="office-save-btn"
          onClick={handleSave}
        >
          Save Profile
        </button>

        <button
          className="office-save-btn"
          onClick={() =>
            navigate("/union-admin-dashboard")
          }
        >
          Back
        </button>

      </div>

    </div>
  );
}

export default Profile;