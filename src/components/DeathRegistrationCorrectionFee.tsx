import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function DeathRegistrationCorrectionFee() {
  const location = useLocation();
  const navigate = useNavigate();

  const application = location.state;

  if (!application) {
    return (
      <div className="form-section">
        <h2>আবেদনের তথ্য পাওয়া যায়নি</h2>
      </div>
    );
  }

  const handleFee = () => {
    const applications = JSON.parse(
      localStorage.getItem(
        "deathRegistrationCorrectionApplications"
      ) || "[]"
    );

    const updatedApplications = applications.map(
      (item: any) =>
        item.applicationNo === application.applicationNo
          ? {
              ...item,
              correctionFeeDeducted: true,
              feeDeductionDate:
                new Date().toLocaleDateString("en-GB"),
            }
          : item
    );

    localStorage.setItem(
      "deathRegistrationCorrectionApplications",
      JSON.stringify(updatedApplications)
    );

    Swal.fire({
      icon: "success",
      title: "ফি জমা হয়েছে",
      text: "সংশোধন আবেদনের ফি সফলভাবে জমা হয়েছে।",
      confirmButtonText: "ঠিক আছে",
    }).then(() => {
      navigate("/death-registration-correction-list");
    });
  };

  return (
    <div className="form-section">
      <h2>মৃত্যু নিবন্ধন সংশোধন ফি</h2>

      <div className="form-group">
        <label>আবেদন নম্বর</label>
        <input
          type="text"
          value={application.applicationNo || ""}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>মৃত্যু নিবন্ধন নম্বর</label>
        <input
          type="text"
          value={
            application.deathRegistrationNo ||
            application.birthRegistrationNo ||
            ""
          }
          readOnly
        />
      </div>

      <div className="form-group">
        <label>মৃত ব্যক্তির নাম</label>
        <input
          type="text"
          value={application.deceasedNameBn || ""}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>সংশোধন ফি</label>
        <input
          type="text"
          value="৫০ টাকা"
          readOnly
        />
      </div>

      <div className="button-group">
        <button
          type="button"
          className="submit-btn"
          onClick={handleFee}
        >
          ফি জমা দিন
        </button>

        <button
          type="button"
          className="submit-btn"
          onClick={() =>
            navigate(
              "/death-registration-correction-list"
            )
          }
        >
          ফিরে যান
        </button>
      </div>
    </div>
  );
}

export default DeathRegistrationCorrectionFee;