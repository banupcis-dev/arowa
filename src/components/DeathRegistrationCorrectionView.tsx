import { useLocation, useNavigate } from "react-router-dom";
import "../css/CertificateCorrection.css";

function DeathRegistrationCorrectionView() {
  const location = useLocation();
  const navigate = useNavigate();

  const application = location.state;

  if (!application) {
    return (
      <div className="certificate-correction-container">
        <h2>আবেদনের তথ্য পাওয়া যায়নি</h2>
      </div>
    );
  }

  const corrections = application.corrections || {};

  return (
    <div className="certificate-correction-container">
      <h2>মৃত্যু নিবন্ধন সংশোধনের আবেদন</h2>

      {/* সংশোধনের বিষয় */}
      <div className="form-section">
        <h3>সংশোধনের তথ্য</h3>
        {Array.isArray(corrections) &&
  corrections.map((item: any, index: number) => (
    <div className="form-group" key={index}>
      <label>{item.field}</label>

      <input
        type="text"
        value={item.value || ""}
        readOnly
      />
    </div>
  ))}
      </div>

      {/* নথি */}
      <div className="form-section">
        <h3>সংযুক্ত নথি</h3>

        {application.files &&
        application.files.length > 0 ? (
          <div>
            {application.files.map(
              (file: string, index: number) => (
                <p key={index}>
                  {index + 1}. {file}
                </p>
              )
            )}
          </div>
        ) : (
          <p>কোনো নথি সংযুক্ত করা হয়নি।</p>
        )}
      </div>

      {/* ডিক্লারেশন */}
      <div className="form-section">
        <h3>ঘোষণা</h3>

        <p>
          আমি ঘোষণা করছি যে, উপরে প্রদত্ত সংশোধনের তথ্য
          সঠিক এবং সত্য।
        </p>

        <label>
          <input
            type="checkbox"
            checked={application.isAgreed === true}
            readOnly
          />{" "}
          আমি সম্মত
        </label>
      </div>

      {/* ফিরে যান */}
      <div className="button-group">
        <button
          type="button"
          className="submit-btn"
          onClick={() =>
            navigate("/death-registration-correction-list")
          }
        >
          ফিরে যান
        </button>
      </div>
    </div>
  );
}

export default DeathRegistrationCorrectionView;