import { useState, useEffect } from "react";
import "./css/banupcis.css";
import ParentInfoForm from "./components/ParentInfoForm";
import ApplicantsDeclaration from "./components/ApplicantsDeclaration";
import ImageUpload from "./components/PhotoUpload";
import DocumentsUpload from "./components/DocumentsUpload";
import PersonalInform from "./components/PersonalInform";
import AddressForm from "./components/AddressForm";
import { validatePersonalInformation, validateAddress, 
      validateParentInformation, validateImage,
      validateDocuments, validateDeclaration,} from "./validationPage";
import { useNavigate } from "react-router-dom";



function App() {
  const [banglaName, setBanglaName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [ocupation, setOcupation] = useState("");
  const [qualification, setQualification] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthRegNo, setBirthRegNo] = useState("");
  const [gender, setGender] = useState({
  name_bn: "",
  name_en: "",
  });
  const [bloodGroup, setBloodGroup] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [applicantRelation, setApplicantRelation] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [fatherBRN, setFatherBRN]= useState("");
  const [fatherBirthDate, setFatherBirthDate]= useState("");
  const [fatherNameBeg, setFatherNameBeg] = useState("");
  const [fatherNameEn, setFatherNameEn] = useState("");
  const [fatherNationality, setFatherNationality]= useState("");
  const [motherBRN, setMotherBRN] = useState("");
  const [motherBirthDate, setMotherBirthDate]= useState("");
  const [motherName, setMotherName] = useState("");
  const [motherNameEn, setMotherNameEn]=useState("");
  const [motherNationality, setMotherNationality]= useState ("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  // Checkbox State
  const [birthSameAsPresent, setBirthSameAsPresent] = useState(false);
  const [presentSameAsPermanent, setPresentSameAsPermanent] =
    useState(false);
const [image, setImage] = useState(null);
const [preview, setPreview] = useState("");
const [files, setFiles] = useState([]);
const [applicantsDeclaration, setApplicantsDeclaration] = useState("");
 // error State
 const [banglaNameError, setBanglaNameError] = useState("");
const [englishNameError, setEnglishNameError] = useState("");
const [birthRegNoError, setBirthRegNoError] = useState("");
const [birthDateError, setBirthDateError] = useState("");
const [genderError, setGenderError] = useState("");
const [ocupationError, setOcupationError] = useState("");
const [qualificationError, setQualificationError] = useState("");
const [bloodGroupError, setBloodGroupError] = useState("");
const [errors, setErrors] = useState<any>({});


const navigate = useNavigate();

  const [birthAddress, setBirthAddress] = useState({
    country: { name_bn: "", name_en: "" },
    division: { name_bn: "", name_en: "" },
    district: { name_bn: "", name_en: "" },
    upazila: { name_bn: "", name_en: "" },
    union: { name_bn: "", name_en: "" },
    ward: "",
    villageBn: "",
    villageEn: "",
    postOfficeBn: "",
    postOfficeEn: "",
    houseHoldingNoBn: "",
    houseHoldingNoEn: "",
  });

  const [presentAddress, setPresentAddress] = useState({
    country: { name_bn: "", name_en: "" },
    division: { name_bn: "", name_en: "" },
    district: { name_bn: "", name_en: "" },
    upazila: { name_bn: "", name_en: "" },
    union: { name_bn: "", name_en: "" },
    ward: "",
    villageBn: "",
    villageEn: "",
    postOfficeBn: "",
    postOfficeEn: "",
    houseHoldingNoBn: "",
    houseHoldingNoEn: "",
  });

  const [permanentAddress, setPermanentAddress] = useState({
    country: { name_bn: "", name_en: "" },
    division: { name_bn: "", name_en: "" },
    district: { name_bn: "", name_en: "" },
    upazila: { name_bn: "", name_en: "" },
    union: { name_bn: "", name_en: "" },
    ward: "",
    villageBn: "",
    villageEn: "",
    postOfficeBn: "",
    postOfficeEn: "",
    houseHoldingNoBn: "",
    houseHoldingNoEn: "",
  });

  // জন্মস্থান → বর্তমান ঠিকানা
  useEffect(() => {
    if (birthSameAsPresent) {
      setPresentAddress({ ...birthAddress });
    }
  }, [birthSameAsPresent, birthAddress]);

  // বর্তমান → স্থায়ী ঠিকানা
  useEffect(() => {
    if (presentSameAsPermanent) {
      setPermanentAddress({ ...presentAddress });
    }
  }, [presentSameAsPermanent, presentAddress]);

const handlePreview = () => {
  // Personal Information Validation
  const personalErrors = validatePersonalInformation({
    banglaName,
    englishName,
    birthRegNo,
    birthDate,
    gender,
    ocupation,
    qualification,
    bloodGroup,
  });

  // Address Validation
  const birthAddressErrors = validateAddress(birthAddress);
  const presentAddressErrors = validateAddress(presentAddress);
  const permanentAddressErrors = validateAddress(permanentAddress);
  
// parentsValidation 
  const parentErrors = validateParentInformation({
  fatherBRN,
  fatherBirthDate,
  fatherNameBeg,
  fatherNameEn,
  fatherNationality,

  motherBRN,
  motherBirthDate,
  motherName,
  motherNameEn,
  motherNationality,
});

const imageErrors = validateImage(image);

const documentErrors = validateDocuments(files);

const declarationErrors = validateDeclaration({
  applicantRelation,
  applicantName,
  isAgreed,
});

  const allErrors = {
    ...personalErrors,
    birthAddress: birthAddressErrors,
    presentAddress: presentAddressErrors,
    permanentAddress: permanentAddressErrors,
    parent: parentErrors,
    image: imageErrors,
  documents: documentErrors,
  declaration: declarationErrors,
  };

  setErrors(allErrors);

  if (
  Object.keys(personalErrors).length > 0 ||
  Object.keys(birthAddressErrors).length > 0 ||
  Object.keys(presentAddressErrors).length > 0 ||
  Object.keys(permanentAddressErrors).length > 0 ||
  Object.keys(parentErrors).length > 0 ||
  Object.keys(imageErrors).length > 0 ||
  Object.keys(documentErrors).length > 0 ||
  Object.keys(declarationErrors).length > 0
) {
  return;
}
console.log("App Gender =", gender);
navigate("/preview", {
  state: {
    // Personal Information
    banglaName,
    englishName,
    birthRegNo,
    birthDate,
    gender,
    bloodGroup,
    ocupation,
    qualification,

    // Address
    birthAddress,
    presentAddress,
    permanentAddress,

    // Father
    fatherBRN,
    fatherBirthDate,
    fatherNameBeg,
    fatherNameEn,
    fatherNationality,

    // Mother
    motherBRN,
    motherBirthDate,
    motherName,
    motherNameEn,
    motherNationality,

    // Photo & Documents
    preview,
    files,

    // Declaration
    applicantRelation,
    applicantName,
    isAgreed,
  },
});

};

// এখানে লিখবেন
const handleSubmit = () => {
  console.log("Form Submitted");
};

    return (
    <div className="title">
      <div>
        <PersonalInform
         title="নাগরিক সনদের জন্য আবেদন"
          subTitle="নাগরিকের ব্যক্তিগত তথ্যঃ"

          banglaName={banglaName}
          setBanglaName={setBanglaName}
          englishName={englishName}
          setEnglishName={setEnglishName}
          birthRegNo={birthRegNo}
          setBirthRegNo={setBirthRegNo}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          gender={gender}
          setGender={setGender}
          ocupation={ocupation}
          setOcupation={setOcupation}
          qualification={qualification}
          setQualification={setQualification}
          bloodGroup={bloodGroup}
          setBloodGroup={setBloodGroup}
          errors={errors}
        />
      </div>
      <div>
        <AddressForm
          title="নাগরিকের জন্মস্থানের ঠিকানাঃ"
          address={birthAddress}
          setAddress={setBirthAddress}
           errors={errors.birthAddress || {}}
        />
      </div>
      <div>
        <div>
        <ParentInfoForm
  fatherBRN={fatherBRN}
  setFatherBRN={setFatherBRN}
  fatherBirthDate={fatherBirthDate}
  setFatherBirthDate={setFatherBirthDate}
  fatherNameBeg={fatherNameBeg}
  setFatherNameBeg={setFatherNameBeg}
  fatherNameEn={fatherNameEn}
  setFatherNameEn={setFatherNameEn}
  fatherNationality={fatherNationality}
  setFatherNationality={setFatherNationality}

  motherBRN={motherBRN}
  setMotherBRN={setMotherBRN}
  motherBirthDate={motherBirthDate}
  setMotherBirthDate={setMotherBirthDate}
  motherName={motherName}
  setMotherName={setMotherName}
  motherNameEn={motherNameEn}
  setMotherNameEn={setMotherNameEn}
  motherNationality={motherNationality}
  setMotherNationality={setMotherNationality}
  errors={errors.parent || {}}
/>
      </div>
      </div>
      <div>
        <label className="same-address">
  <input
    type="checkbox"
    checked={birthSameAsPresent}
    onChange={(e) => {
      const checked = e.target.checked;
      setBirthSameAsPresent(checked);

      if (checked) {
        setPresentAddress({ ...birthAddress });
      }
    }}
  />
  জন্মস্থান ও বর্তমান ঠিকানা একই হলে টিকচিহ্ন দাওঃ
</label>

<AddressForm
  title="বর্তমান ঠিকানাঃ"
  address={presentAddress}
  setAddress={setPresentAddress}
  disabled={birthSameAsPresent}
   errors={errors.presentAddress || {}}
/>
      </div>

      <div>
      <label className="same-address">
  <input
    type="checkbox"
    checked={presentSameAsPermanent}
    onChange={(e) => {
      const checked = e.target.checked;
      setPresentSameAsPermanent(checked);

      if (checked) {
        setPermanentAddress({ ...presentAddress });
      }
    }}
  />
  বর্তমান ঠিকানা ও স্থায়ী ঠিকানা একই হলে টিকচিহ্ন দাওঃ
</label>

<AddressForm
  title="স্থায়ী ঠিকানাঃ"
  address={permanentAddress}
  setAddress={setPermanentAddress}
  disabled={presentSameAsPermanent}
  errors={errors.permanentAddress || {}}
/>
      </div>

      <div className="form-row-group">
        <div className="form-row">
          <ImageUpload
  image={image}
  setImage={setImage}
  preview={preview}
  setPreview={setPreview}
  errors={errors.image || {}}
/>
        </div>

        <div className="form-row">
          <DocumentsUpload
  files={files}
  setFiles={setFiles}
   errors={errors.documents || {}}
/>
        </div>
      </div>

      <div>
       <ApplicantsDeclaration
  banglaName={banglaName}
  applicantsDeclaration={applicantsDeclaration}
  setApplicantsDeclaration={setApplicantsDeclaration}
  applicantRelation={applicantRelation}
  setApplicantRelation={setApplicantRelation}
  applicantName={applicantName}
  setApplicantName={setApplicantName}
  isAgreed={isAgreed}
  setIsAgreed={setIsAgreed}
  errors={errors.declaration || {}}
/>
      </div>

      <button
        type="button"
        onClick={handlePreview}
      >
        প্রিভিউ দেখুন
      </button>
    </div>
  );
}

export default App;
