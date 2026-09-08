
function ParentInfoForm({
  fatherBRN,
  setFatherBRN,
  fatherBirthDate,
  setFatherBirthDate,
  fatherNameBeg,
  setFatherNameBeg,
  fatherNameEn,
  setFatherNameEn,
  fatherNationality,
  setFatherNationality,

  motherBRN,
  setMotherBRN,
  motherBirthDate,
  setMotherBirthDate,
  motherName,
  setMotherName,
  motherNameEn,
  setMotherNameEn,
  motherNationality,
  setMotherNationality,
  errors,
})  {
 
  return (
    <div>
      <div className="title">
       <h1>পিতা-মাতার তথ্যঃ</h1>
       <div className="parent-container">
        
      <div className="father-box">
       
       <p>পিতার তথ্য: </p>
       
      <div className="form-row">

      <label>পিতার জন্ম নিবন্ধন নম্বরঃ</label>
      <input 
      type="text" 
      placeholder="১৭ ডিজিটের জন্ম নিবন্ধন নম্বর"
      maxLength={17}
      value={fatherBRN}
      onChange={(e)=>setFatherBRN(e.target.value)}
      />
      {errors?.fatherBRN && (
  <p className="error">{errors.fatherBRN}</p>
)}
  </div>
  <div className="form-row">
  <label>পিতার জন্ম তারিখঃ</label>
  <input 
  type="date"
  placeholder="পিতার জন্ম তারিখ"
  value={fatherBirthDate}
  onChange={(e)=>(setFatherBirthDate(e.target.value))}
   />
   {errors?.fatherBirthDate && (
  <p className="error">{errors.fatherBirthDate}</p>
)}
 </div>  


 <div className="form-row">
  <label>পিতার নাম বাংলায়ঃ</label>
      <input
        type="text"
        placeholder="পিতার নাম বাংলায় লিখুন"
        value={fatherNameBeg}
        onChange={(e) => setFatherNameBeg(e.target.value)}
      />
      {errors?.fatherNameBeg && (
  <p className="error">{errors.fatherNameBeg}</p>
)}
      </div>

      <div className="form-row">
        <label> পিতার নাম ইংরেজিতেঃ</label>
        <input 
      type="text"
      placeholder="Write your father's name in English"
      value={fatherNameEn}
      onChange={(e)=> setFatherNameEn(e.target.value)}
       />
       {errors?.fatherNameEn && (
  <p className="error">{errors.fatherNameEn}</p>
)}
      </div>
 
     <div className="form-row">
      <label>পিতার জাতীয়তা:</label>
     <select value={fatherNationality}
     onChange={(e)=>setFatherNationality (e.target.value)}
     >
      <option value=" জাতীয়তা নির্বাচন করুন">জাতীয়তা নির্বাচন করুন</option>
      <option value="অজানা">অজানা</option>
    <option value="বাংলাদেশ"> বাংলাদেশ</option>
      <option value="পাকিস্তান"> পাকিস্তান</option>
      <option value="সৌদি আরব">সৌদি আরব</option>
      <option value="ভারত">ভারত</option>
      <option value="নেপাল">নেপাল</option>
     </select>
     {errors?.fatherNationality && (
  <p className="error">{errors.fatherNationality}</p>
)}
     </div>
      </div>
      <div className="mother-box">
        <p>মাতার তথ্যঃ </p>
        <div className="form-row">
          <label>মাতার জন্ম নিবন্ধন নম্বরঃ</label>
        <input 
        type="text" 
        placeholder=" মাতার জন্ম নিবন্ধন নম্বর"
        value={motherBRN}
        onChange={(e)=> setMotherBRN(e.target.value)}
        />
        {errors?.motherBRN && (
  <p className="error">{errors.motherBRN}</p>
)}
        </div>
        <div className="form-row">
         <label> মাতার জন্ম তারিখ</label>
        <input type="date"
        placeholder=" মাতার জন্ম তারিখ"
        value={motherBirthDate}
        onChange={(e)=>(setMotherBirthDate(e.target.value))}
        />
        {errors?.motherBirthDate && (
  <p className="error">{errors.motherBirthDate}</p>
)}
        </div>

      <div className="form-row">
        <label>মাতার নাম বাংলায়</label>
      <input
        type="text"
        placeholder="মাতার নাম"
        value={motherName}
        onChange={(e) => setMotherName(e.target.value)}
      />
      {errors?.motherName && (
  <p className="error">{errors.motherName}</p>
)}
      </div>

      <div className="form-row">
        <label> Mother name in English</label>
      <input 
      type="text" 
      placeholder=" Write your Mother Name In English"
      value={motherNameEn}
      onChange={(e)=> setMotherNameEn(e.target.value)}
      />
      {errors?.motherNameEn && (
  <p className="error">{errors.motherNameEn}</p>
)}
      </div>
      <div className="form-row">
        <label>মাতার জাতীয়তা</label>
     <select value={motherNationality}
     onChange={(e)=>setMotherNationality(e.target.value)}
     >
      <option value="">জাতীয়তা নির্বাচন করুন</option>
      <option value="অজানা">অজানা</option>
      <option value="বাংলাদেশ"> বাংলাদেশ</option>
      <option value="পাকিস্তান"> পাকিস্তান</option>
      <option value="সৌদি আরব">সৌদি আরব</option>
      <option value="ভারত">ভারত</option>
      <option value="নেপাল">নেপাল</option>
     </select>
     {errors?.motherNationality && (
  <p className="error">{errors.motherNationality}</p>
)}
      </div>
     </div>
       </div>
    </div>
    </div>
  );
}

export default ParentInfoForm; 