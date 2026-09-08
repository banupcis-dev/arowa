import { useEffect, useState } from "react";
import "../css/banupcis.css";

function OfficeSettings() {
  const [officeInfo, setOfficeInfo] = useState({
    unionNameEn: "",
    upazilaEn: "",
    districtEn: "",
    mobile: "",
    email: "",
    website: "",
    officeLogo: "",
    profilePhoto: "",
    adminName: "",
    designation: "",
  });

  useEffect(() => {
    const currentAdmin = JSON.parse(
      localStorage.getItem("currentAdmin") || "{}"
    );

    if (!currentAdmin.unionName) return;

    const allOfficeSettings = JSON.parse(
      localStorage.getItem("officeSettings") || "{}"
    );

    if (allOfficeSettings[currentAdmin.unionName]) {
      setOfficeInfo(
        allOfficeSettings[currentAdmin.unionName]
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setOfficeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // অফিসের লোগো
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setOfficeInfo((prev) => ({
        ...prev,
        officeLogo: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  // অ্যাডমিনের প্রোফাইল ছবি
  const handleProfilePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setOfficeInfo((prev) => ({
        ...prev,
        profilePhoto: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const currentAdmin = JSON.parse(
      localStorage.getItem("currentAdmin") || "{}"
    );

    if (!currentAdmin.unionName) {
      alert("Union Admin পাওয়া যায়নি।");
      return;
    }

    const allOfficeSettings = JSON.parse(
      localStorage.getItem("officeSettings") || "{}"
    );

    allOfficeSettings[currentAdmin.unionName] = officeInfo;

    localStorage.setItem(
      "officeSettings",
      JSON.stringify(allOfficeSettings)
    );

    alert("Office Settings Saved Successfully");
  };
    return (
    <div className="office-settings-container">
      <h2>Office Settings</h2>

      <input
        name="unionNameEn"
        placeholder="Union Parishad Name (English)"
        value={officeInfo.unionNameEn}
        onChange={handleChange}
      />

      <input
        name="upazilaEn"
        placeholder="Upazila (English)"
        value={officeInfo.upazilaEn}
        onChange={handleChange}
      />

      <input
        name="districtEn"
        placeholder="District (English)"
        value={officeInfo.districtEn}
        onChange={handleChange}
      />

      <input
        name="mobile"
        placeholder="Mobile Number"
        value={officeInfo.mobile}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email Address"
        value={officeInfo.email}
        onChange={handleChange}
      />
      

      <input
        name="website"
        placeholder="Website (Optional)"
        value={officeInfo.website}
        onChange={handleChange}
      />
      <input
  type="text"
  name="adminName"
  placeholder="Admin Name"
  value={officeInfo.adminName}
  onChange={handleChange}
/>

<input
  type="text"
  name="designation"
  placeholder="Designation"
  value={officeInfo.designation}
  onChange={handleChange}
/>

      {/* Office Logo */}
      <div className="office-upload-card">
        <label>Office Logo</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {officeInfo.officeLogo && (
          <img
            src={officeInfo.officeLogo}
            alt="Office Logo"
            className="office-preview"
          />
        )}
        
      </div>

      {/* Admin Profile Photo */}
      <div className="office-upload-card">
        <label>Admin Profile Photo</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePhotoChange}
        />

        {officeInfo.profilePhoto && (
          <img
            src={officeInfo.profilePhoto}
            alt="Admin Profile"
            className="office-preview"
          />
        )}
      </div>

      <button
        className="office-save-btn"
        onClick={handleSave}
      >
        Save Office Settings
      </button>
    </div>
  );
}

export default OfficeSettings;