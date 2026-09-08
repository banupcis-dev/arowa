
import "../css/certificateCorrection.css";
import { useLocation, useNavigate } from "react-router-dom";

function CorrectionPreview() {
  const location = useLocation();
const navigate = useNavigate();

const data = location.state || {};
// const printRef = useRef<HTMLDivElement>(null);

//const handleApplicationPrint = useReactToPrint({
 //contentRef: printRef,
// documentTitle: "নাগরিক সনদ সংশোধনের আবেদন",
 // });

return (
  <div className="preview-container">
    

      <h2>নাগরিক সনদ সংশোধন আবেদন - প্রিভিউ</h2>
      {/* সংশোধনের তথ্য */}
<table className="preview-table">

  <thead>
    <tr>
      <th>বিষয়</th>
      <th>বর্তমান তথ্য</th>
      <th>সংশোধিত তথ্য</th>
      <th>কারণ</th>
    </tr>
  </thead>

  <tbody>

    {
      data.corrections?.map((item:any, index:number)=>(

        <tr key={index}>

          <td>
            {item.field === "bloodGroup"
              ? "রক্তের গ্রুপ"
              : item.field}
          </td>

          <td>
            {data[item.field] || "-"}
          </td>

          <td>
            {item.value || "-"}
          </td>

          <td>
            {item.reason || "-"}
          </td>

        </tr>

      ))
    }

  </tbody>

</table>

      <br />

      {/* ঠিকানা */}
      <h3>ঠিকানা সংশোধন</h3>

      <br />

      {/* নথি */}
      <h3>সংযুক্ত নথি</h3>

      <br />

      {/* ঘোষণা */}
      <h3>ঘোষণা</h3>

      <p>
        আমি ঘোষণা করছি যে, উপরে প্রদত্ত সকল তথ্য আমার জানা মতে
        সঠিক এবং সত্য।
      </p>

      <div className="preview-button-group">

        <button className="preview-btn">
          পূর্ববর্তী
        </button>
<button
  className="preview-btn"
  onClick={() => window.print()}
>
  আবেদন পত্র প্রিন্ট করুন
</button>

       <button
  className="preview-btn"
  onClick={() =>
    navigate("/payment-receipt", {
      state: data,
    })
  }
>
  ফি গ্রহণ করুন
</button>
        <button className="preview-btn">
           রশিদ প্রিন্ট 
           </button>

           <button
  className="preview-btn"
  onClick={() => {
    const applications = JSON.parse(
      localStorage.getItem("certificateCorrectionApplications") || "[]"
    );

    const updated = applications.map((item: any) =>
      item.applicationNo === data.applicationNo
        ? { ...item, status: "Received" }
        : item
    );

    localStorage.setItem(
      "certificateCorrectionApplications",
      JSON.stringify(updated)
    );

    alert("আবেদন পত্র রিসিভ করা হয়েছে।");
  }}
>
  আবেদন পত্র রিসিব করুন
</button>

<button
  className="preview-btn"
  onClick={() => { 
  }}
>
  অনুমোদন করুন
</button>
      </div>

    </div>
  );
}

export default CorrectionPreview;