import "../css/banupcis.css";
function PersonalInform({
  title = "নাগরিক সনদের জন্য আবেদন",
  subTitle = "নাগরিকের ব্যক্তিগত তথ্যঃ",

  banglaName,
  setBanglaName,
  englishName,
  setEnglishName,
  ocupation,
  setOcupation,
  qualification,
  setQualification,
  birthDate,
  setBirthDate,
  birthRegNo,
  setBirthRegNo,
  gender,
  setGender,
  bloodGroup,
  setBloodGroup,
  errors,
})
{
  

  return (
    <div className="title">
       <h1>{title}</h1>

    <p className="Cetezon-Personal-InFormation">
     {subTitle}
      </p>
        <div className="form-row-group">
        <div className="form-row">
          <label> আপনার নাম লিখুন (বাংলায়)</label>
        <input
          type="text"
          placeholder="আপনার নাম লিখুন বাংলায়"
          value={banglaName}
          onChange={(e) => setBanglaName(e.target.value)}
        />
        {errors?.banglaName && (
        <p className="error">{errors.banglaName}</p>
          )}
      </div>
        <div className="form-row">
          <label> Write your name in (English)</label>
        <input
          type="text"
          placeholder="Write your Name in English"
          value={englishName}
          onChange={(e) => setEnglishName(e.target.value)}/> 
          {errors?.englishName && (
  <p className="error">{errors.englishName}</p>
)}
      </div>
      </div>
      <div className="form-row-group">
        <div className="form-row">
       <label>১৭ ডিজিটের জন্ম নিবন্ধন নম্বর</label>
        <input type="text" 
        placeholder="17 সংখ্যার জন্ম নিবন্ধন নম্বর লিখুন"
        maxLength={17}
        value={birthRegNo}
        onChange={(e)=> setBirthRegNo(e.target.value)}/>
        {errors?.birthRegNo && (
  <p className="error">{errors.birthRegNo}</p>
)}
        </div>
       <div className="form-row">
        <label>জন্ম তারিখ</label>
        <input type="date" 
         placeholder="জন্ম তারিখ"
         value={birthDate}
         onChange={(e)=>setBirthDate(e.target.value)}
        />
        {errors?.birthDate && (
  <p className="error">{errors.birthDate}</p>
)}
      </div>
      </div>
      <div className="form-row-group">
        <div className="form-row">
       <label>লিঙ্গ:</label>
        <select
  value={gender.name_bn}
  onChange={(e) => {
    const value = e.target.value;

    if (value === "পুরুষ") {
      setGender({
        name_bn: "পুরুষ",
        name_en: "Male",
      });
    } else if (value === "নারী") {
      setGender({
        name_bn: "নারী",
        name_en: "Female",
      });
    } else if (value === "তৃতীয় লিঙ্গ") {
      setGender({
        name_bn: "তৃতীয় লিঙ্গ",
        name_en: "Third Gender",
      });
    } else {
      setGender({
        name_bn: "",
        name_en: "",
      });
    }
  }}
>
  <option value="">লিঙ্গ নির্বাচন করুন</option>
  <option value="পুরুষ">পুরুষ</option>
  <option value="নারী">নারী</option>
  <option value="তৃতীয় লিঙ্গ">তৃতীয় লিঙ্গ</option>
</select>
        {errors?.gender && (
  <p className="error">{errors.gender}</p>
)}
        </div>
        <div className="form-row">
          <label>পেশা:</label>
          <select value={ocupation}
        onChange={(e)=>setOcupation(e.target.value)}>
          <option value="">পেশা নির্বাচন করুন</option>
          <option value="কৃষক"> কৃষক</option>
          <option value="শ্রমিক">শ্রমিক</option>
          <option value="চাকুরীজীবি">চাকুরিজীবি</option>
          <option value="অন্যান্য">অন্যান্য</option>
        </select>
        {errors?.ocupation && (
  <p className="error">{errors.ocupation}</p>
)}
        </div>
      </div>
         <div className="form-row-group">
          <div className="form-row">
          <label>শিক্ষাগত যোগ্যতা:</label>
          <select value={qualification}
         onChange={(e)=>setQualification(e.target.value)}
         >
            <option value="">নির্বাচন করুন</option>
            <option value="প্রাথমিক">প্রাথমিক</option>
            <option value="মাধ্যমিক">মাধ্যমিক</option>
            <option value="উচ্চ মাধ্যমিক">উচ্চ মাধ্যমিক</option>
            <option value="বিকম(সম্মান)">বিকম (সম্মান)</option>
          </select>
          {errors?.qualification && (
  <p className="error">{errors.qualification}</p>
)}
          </div>
         <div className="form-row">
          <label> ব্লাড গ্রুপ:</label>
<select
  value={bloodGroup}
  onChange={(e) => setBloodGroup(e.target.value)}>
  <option value="">ব্লাডগ্রুপ নির্বাচন করুন</option>
  <option value="A+">A+</option>
  <option value="A-">A-</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB-</option>
  <option value="B+">B+</option>
  <option value="B-">B-</option>
  <option value="O+">O+</option>
  <option value="O-">O-</option>
</select>
{errors?.bloodGroup && (
  <p className="error">{errors.bloodGroup}</p>
)}
         </div>
         </div>
      </div>

  );
}
export default PersonalInform;

