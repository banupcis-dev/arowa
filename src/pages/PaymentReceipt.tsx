import "../css/banupcis.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { numberToBanglaWords } from "../utils/numberToBanglaWords";


function PaymentReceipt() {
    const navigate = useNavigate();
    const { state } = useLocation();

if (!state) {
  return <h2>কোন আবেদন পাওয়া যায়নি।</h2>;
}

const {
  applicationId,
  banglaName,
  birthRegNo,
} = state;
const isDeceasedBirth = state?.deceasedNameBn;
const printMode = state?.printMode === true;

useEffect(() => {
  if (printMode) {
    setTimeout(() => window.print(), 500);
  }
}, [printMode]);
const [applicationFee, setApplicationFee] = useState("");
const [serviceCharge, setServiceCharge] = useState("");
const totalAmount =
  (Number(applicationFee) || 0) +
  (Number(serviceCharge) || 0);
const handlePayment = () => {
  const applications = JSON.parse(
    localStorage.getItem("citizenApplications") || "[]"
  );

  const updatedApplications = applications.map((app: any) =>
    app.applicationId === applicationId
      ? {
          ...app,
          paymentStatus: true,
          paymentDate: new Date().toLocaleDateString("bn-BD"),
          applicationFee,
          serviceCharge,
          receiptNo:"",
        }
      : app
  );

  localStorage.setItem(
    "citizenApplications",
    JSON.stringify(updatedApplications)
  );

  // সংশোধন আবেদনের জন্য
const correctionApplications = JSON.parse(
  localStorage.getItem("certificateCorrectionApplications") || "[]"
);

const updatedCorrections = correctionApplications.map((app: any) =>
  app.applicationId === applicationId || app.applicationNo === applicationId
    ? {
        ...app,
        paymentStatus: true,
        paymentDate: new Date().toLocaleDateString("bn-BD"),
        applicationFee,
        serviceCharge,
        receiptNo: applicationId,
      }
    : app
);

localStorage.setItem(
  "certificateCorrectionApplications",
  JSON.stringify(updatedCorrections)
);

  alert("পেমেন্ট সফলভাবে গ্রহণ করা হয়েছে।");

  navigate("/deceased-birth-registration-applications");
};
  return (
    <div className="preview-container">

      <h2>নাগরিক সনদ আবেদন ফি গ্রহণ</h2>
    <div className="receipt-copy">

        <h2>অফিস কপি</h2>
      <table className="preview-table">
        <tbody>
          <tr>
            <td>রসিদ নম্বর</td>
              <td>{state.receiptNo || applicationId}</td>         
          </tr>
          <tr>
            <td>আবেদন নম্বর</td>
          <td>{applicationId}</td>
          </tr>
          <tr>
            <td>আবেদনকারীর নাম</td>
            <td>{isDeceasedBirth ? state.deceasedNameBn : banglaName}</td>
          </tr>
          <tr>
            <td>জন্ম নিবন্ধন নম্বর</td>
            <td>{isDeceasedBirth ? state.brn : birthRegNo}</td>
          </tr>
          <tr>
            <td>সেবার নাম</td>
            <td>{isDeceasedBirth ? "মৃত ব্যক্তির জন্ম নিবন্ধন" : "নাগরিক সনদ"}</td>
          </tr>
          <tr>
  <td>আবেদন ফি</td>
  <td>
    <input
      type="number"
      value={applicationFee}
      onChange={(e) => setApplicationFee(e.target.value)}
      className="input-field"
      placeholder="আবেদন ফি"
    />
  </td>
</tr>
          <tr>
  <td>সার্ভিস চার্জ</td>
  <td>
    <input
      type="number"
      value={serviceCharge}
      onChange={(e) => setServiceCharge(e.target.value)}
      className="input-field"
      placeholder="সার্ভিস চার্জ"
    />
  </td>
</tr>
    
          <tr>
  <td><b>মোট টাকা</b></td>
  <td>
    <input
      type="text"
      value={totalAmount}
      readOnly
      className="input-field"
    />
  </td>
</tr>
<tr>
  <td>কথায়</td>
  <td>
    <strong>{numberToBanglaWords(totalAmount)}</strong>
  </td>
</tr>
        </tbody>
      </table>
<hr className="receipt-divider" />

<div className="receipt-copy">

<h2>গ্রাহক কপি</h2>

<table className="preview-table">
  <tbody>

    <tr>
      <td>রসিদ নম্বর</td>
      <td>{state.receiptNo || applicationId}</td>
    </tr>

    <tr>
      <td>আবেদন নম্বর</td>
      <td>{applicationId}</td>
    </tr>

    <tr>
      <td>আবেদনকারীর নাম</td>
      <td>{isDeceasedBirth ? state.deceasedNameBn : banglaName}</td>
    </tr>

    <tr>
      <td>জন্ম নিবন্ধন নম্বর</td>
      <td>{isDeceasedBirth ? state.brn : birthRegNo}</td>
    </tr>

    <tr>
      <td>সেবার নাম</td>
      <td>{isDeceasedBirth ? "মৃত ব্যক্তির জন্ম নিবন্ধন" : "নাগরিক সনদ"}</td>
    </tr>

    <tr>
      <td>আবেদন ফি</td>
      <td>{applicationFee}</td>
    </tr>

    <tr>
      <td>সার্ভিস চার্জ</td>
      <td>{serviceCharge}</td>
    </tr>

    <tr>
      <td><b>মোট টাকা</b></td>
      <td><b>{totalAmount}</b></td>
    </tr>

    <tr>
      <td>কথায়</td>
      <td>{numberToBanglaWords(totalAmount)}</td>
    </tr>

  </tbody>
</table>

</div>
    </div>
    
      <div className="preview-submit">

        <button
  className="submit-btn"
  onClick={handlePayment}
>
  পেমেন্ট গ্রহণ করুন
</button>


        <button className="submit-btn">
          বাতিল
        </button>

      </div>

    </div>
  );
}

export default PaymentReceipt;