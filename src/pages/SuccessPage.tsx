import "../css/banupcis.css";
import { useNavigate, useLocation } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
const { state } = useLocation();
  return (
    <div className="success-container">

      <h1>✅ আবেদন সফলভাবে জমা হয়েছে</h1>

      <h2>আবেদন নম্বর</h2>

      <h3>{state?.applicationId}</h3>

      <p>
        আপনার আবেদন সফলভাবে গ্রহণ করা হয়েছে।
      </p>

      <button className="submit-btn"
      onClick={() => navigate("/applications")}
      >
        আবেদন তালিকা
      </button>

      <button 
      className="submit-btn"
       onClick={() => navigate("/")}
      >
        নতুন আবেদন
      </button>
<button
 className="submit-btn"
 onClick={() =>
   navigate("/preview", {
     state:{
       applicationId: state?.applicationId
     }
   })
 }
>
 প্রিন্ট করুন
</button>
    </div>
  );
}

export default Success;
