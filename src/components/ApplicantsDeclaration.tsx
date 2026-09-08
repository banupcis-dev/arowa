

function ApplicantsDeclaration({
  banglaName,
  applicantsDeclaration,
  setApplicantsDeclaration,
  applicantRelation,
  setApplicantRelation,
  applicantName,
  setApplicantName,
  isAgreed,
  setIsAgreed,
   errors,
}) {


    return (
        <div className="title">
            <p>আবেদনকারীর প্রত্যয়ন</p>
            <label> (নাগরিকের বয়ন ১৮ বছর হলে, সে নিজেই স্বাক্ষর করবেন; অন্যথায় তার পিতা/মাতার/ অভিবাবক স্বাক্ষর/টিপসহি দিবেন)</label>
        <div>
            <div className="form-row">
  <label>নাগরিকের সাথে সম্পর্ক</label>

  <div className="radio-group">
    <label>
      <input
        type="radio"
        name="relation"
        value="self"
        checked={applicantRelation === "self"}
        onChange={() => {
          setApplicantRelation("self");
          setApplicantName(banglaName);
        }}
      />
      {errors?.applicantRelation && (
  <p className="error">
    {errors.applicantRelation}
  </p>
)}
      নিজে
    </label>

    <label>
      <input
        type="radio"
        name="relation"
        value="guardian"
        checked={applicantRelation === "guardian"}
        onChange={() => {
          setApplicantRelation("guardian");
          setApplicantName("");
        }}
      />
      অভিভাবক
    </label>
  </div>
</div>

<div className="form-row">
  <label>আবেদনকারীর নাম</label>

  <input
    type="text"
    value={applicantName}
    onChange={(e) => setApplicantName(e.target.value)}
    disabled={applicantRelation === "self"}
    placeholder={
      applicantRelation === "guardian"
        ? "অভিভাবকের নাম লিখুন"
        : ""
    }
  />
  {errors?.applicantName && (
  <p className="error">
    {errors.applicantName}
  </p>
)}
</div>
        </div>
          <div className="form-row declaration-checkbox">
  <label className="declaration-text">
    <input
      type="checkbox"
      checked={isAgreed}
      onChange={(e) => setIsAgreed(e.target.checked)}
    />
    {errors?.isAgreed && (
  <p className="error">
    {errors.isAgreed}
  </p>
)}
  </label>
  <p>
      আমি ঘোষণা করছি যে, এই আবেদনে প্রদত্ত সকল তথ্য আমার জ্ঞান অনুযায়ী সঠিক ও সত্য।
      <br />
      কোনো তথ্য ভুল বা মিথ্যা প্রমাণিত হলে কর্তৃপক্ষের গৃহীত সিদ্ধান্ত মেনে নিতে বাধ্য থাকব।
    </p>
</div>

<div className="signature-section">
  <div className="signature-box">
    <div className="signature-line"></div>
    <p>যাচাইকারীর স্বাক্ষর</p>
  </div>

  <div className="signature-box">
    <div className="signature-line"></div>
    <p>আবেদনকারীর স্বাক্ষর</p>
  </div>
</div>
        </div>
    );
}

export default ApplicantsDeclaration;
