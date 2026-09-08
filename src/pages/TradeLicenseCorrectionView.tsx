import { useLocation, useNavigate } from "react-router-dom";
import "../css/TradeLicenseCorrectionList.css";

function TradeLicenseCorrectionView() {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state as any;

  if (!item) {
    return (
      <div className="trade-license-correction-list-container">
        <h2>সংশোধনের আবেদন পাওয়া যায়নি</h2>

        <button
          className="preview-btn"
          onClick={() =>
            navigate("/trade-license-correction-list")
          }
        >
          আবেদন তালিকায় ফিরে যান
        </button>
      </div>
    );
  }

  // -----------------------------------------------------
  // মূল Trade License তথ্য
  // -----------------------------------------------------

  const tradeLicenses = JSON.parse(
    localStorage.getItem("tradeLicenseApplications") || "[]"
  );

  const licenseNo =
    item.licenseNo || item.tradeLicenseNo || "";

  const originalLicense = tradeLicenses.find(
    (license: any) =>
      license.licenseNo === licenseNo ||
      license.tradeLicenseNo === licenseNo
  );

  // -----------------------------------------------------
  // Field Name → বাংলা নাম
  // -----------------------------------------------------

  const fieldLabels: Record<string, string> = {
    businessNameBn: "ব্যবসার নাম (বাংলা)",
    businessNameEn: "ব্যবসার নাম (ইংরেজি)",
    businessName: "ব্যবসার নাম",

    ownerNameBn: "ব্যবসায়ীর নাম (বাংলা)",
    ownerNameEn: "ব্যবসায়ীর নাম (ইংরেজি)",
    ownerName: "ব্যবসায়ীর নাম",

    birthRegNo: "জন্ম নিবন্ধন নম্বর",
    birthDate: "জন্ম তারিখ",

    gender: "লিঙ্গ",
    occupation: "পেশা",

    businessStartDate: "ব্যবসা শুরুর তারিখ",
    capitalAmount: "মূলধনের পরিমাণ",

    businessTypeBn: "ব্যবসার ধরন (বাংলা)",
    businessTypeEn: "ব্যবসার ধরন (ইংরেজি)",
    businessType: "ব্যবসার ধরন",

    mobile: "মোবাইল নম্বর",

    addressBn: "ঠিকানা",
    addressEn: "ঠিকানা (ইংরেজি)",

    ward: "ওয়ার্ড",
    villageBn: "গ্রাম",
    villageEn: "গ্রাম (ইংরেজি)",
    postOfficeBn: "ডাকঘর",
    postOfficeEn: "ডাকঘর (ইংরেজি)",
    houseHoldingNoBn: "হোল্ডিং নম্বর",
    houseHoldingNoEn: "হোল্ডিং নম্বর (ইংরেজি)",
  };

  // -----------------------------------------------------
  // Gender-এর object হলে সুন্দরভাবে দেখানো
  // -----------------------------------------------------

  const formatValue = (value: any) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    if (typeof value === "object") {
      return (
        value.name_bn ||
        value.name_en ||
        value.nameBn ||
        value.nameEn ||
        JSON.stringify(value)
      );
    }

    return String(value);
  };

  // -----------------------------------------------------
  // পুরাতন তথ্য বের করা
  // -----------------------------------------------------

  const getOldValue = (correction: any) => {
    // ভবিষ্যতে যদি correction-এর মধ্যেই oldValue রাখা হয়
    if (
      correction.oldValue !== undefined &&
      correction.oldValue !== null
    ) {
      return correction.oldValue;
    }

    // মূল Trade License থেকে পুরাতন তথ্য নেওয়া
    if (originalLicense && correction.field) {
      return originalLicense[correction.field];
    }

    return "-";
  };

  return (
    <div className="trade-license-correction-list-container">

      <h2>ট্রেড লাইসেন্স সংশোধনের আবেদনের বিস্তারিত</h2>

      {/* =================================================
          আবেদন সংক্রান্ত তথ্য
         ================================================= */}

      <h3>আবেদনের তথ্য</h3>

      <table className="trade-license-correction-list-table">
        <tbody>
          <tr>
            <td><strong>আবেদন নম্বর</strong></td>
            <td>{item.applicationNo || "-"}</td>

            <td><strong>আবেদনের তারিখ</strong></td>
            <td>{item.applicationDate || "-"}</td>
          </tr>

          <tr>
            <td><strong>ট্রেড লাইসেন্স নম্বর</strong></td>
            <td>
              {item.licenseNo ||
                item.tradeLicenseNo ||
                "-"}
            </td>

            <td><strong>আবেদনের অবস্থা</strong></td>
            <td>{item.status || "Pending"}</td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* =================================================
          ব্যবসার মূল তথ্য
         ================================================= */}

      <h3>ট্রেড লাইসেন্সের তথ্য</h3>

      <table className="trade-license-correction-list-table">
        <tbody>
          <tr>
            <td><strong>ব্যবসার নাম</strong></td>
            <td>
              {item.businessNameBn ||
                item.businessName ||
                originalLicense?.businessNameBn ||
                originalLicense?.businessName ||
                "-"}
            </td>
          </tr>

          <tr>
            <td><strong>ব্যবসায়ীর নাম</strong></td>
            <td>
              {item.ownerNameBn ||
                item.ownerName ||
                originalLicense?.ownerNameBn ||
                originalLicense?.ownerName ||
                "-"}
            </td>
          </tr>

          <tr>
            <td><strong>ব্যবসার ধরন</strong></td>
            <td>
              {item.businessTypeBn ||
                item.businessType ||
                originalLicense?.businessTypeBn ||
                originalLicense?.businessType ||
                "-"}
            </td>
          </tr>

          <tr>
            <td><strong>মোবাইল নম্বর</strong></td>
            <td>
              {item.mobile ||
                originalLicense?.mobile ||
                "-"}
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* =================================================
          সংশোধনের বিস্তারিত
         ================================================= */}

      <h3>সংশোধনের বিস্তারিত তথ্য</h3>

      {item.corrections &&
      item.corrections.length > 0 ? (
        <table className="trade-license-correction-list-table">
          <thead>
            <tr>
              <th>ক্রমিক</th>
              <th>সংশোধনের বিষয়</th>
              <th>পুরাতন তথ্য</th>
              <th>নতুন তথ্য</th>
              <th>সংশোধনের কারণ</th>
            </tr>
          </thead>

          <tbody>
            {item.corrections.map(
              (correction: any, index: number) => (
                <tr key={index}>

                  <td>{index + 1}</td>

                  <td>
                    {fieldLabels[correction.field] ||
                      correction.field ||
                      "-"}
                  </td>

                  <td>
                    {formatValue(
                      getOldValue(correction)
                    )}
                  </td>

                  <td>
                    {formatValue(
                      correction.value
                    )}
                  </td>

                  <td>
                    {correction.reason || "-"}
                  </td>

                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center" }}>
          কোনো সংশোধনের তথ্য পাওয়া যায়নি।
        </p>
      )}

      <br />

      {/* =================================================
          ঠিকানা সংশোধন
         ================================================= */}

      {(item.birthAddressCorrection ||
        item.presentAddressCorrection ||
        item.permanentAddressCorrection) && (
        <>
          <h3>ঠিকানা সংশোধনের তথ্য</h3>

          <table className="trade-license-correction-list-table">
            <thead>
              <tr>
                <th>ঠিকানার ধরন</th>
                <th>পুরাতন তথ্য</th>
                <th>নতুন তথ্য</th>
              </tr>
            </thead>

            <tbody>

              {item.birthAddressCorrection && (
                <tr>
                  <td>জন্মস্থানের ঠিকানা</td>
                  <td>
                    {formatValue(
                      originalLicense?.birthAddress
                    )}
                  </td>
                  <td>
                    {formatValue(
                      item.birthAddress
                    )}
                  </td>
                </tr>
              )}

              {item.presentAddressCorrection && (
                <tr>
                  <td>বর্তমান ঠিকানা</td>
                  <td>
                    {formatValue(
                      originalLicense?.presentAddress
                    )}
                  </td>
                  <td>
                    {formatValue(
                      item.presentAddress
                    )}
                  </td>
                </tr>
              )}

              {item.permanentAddressCorrection && (
                <tr>
                  <td>স্থায়ী ঠিকানা</td>
                  <td>
                    {formatValue(
                      originalLicense?.permanentAddress
                    )}
                  </td>
                  <td>
                    {formatValue(
                      item.permanentAddress
                    )}
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </>
      )}

      <br />

      {/* =================================================
          প্রয়োজনীয় নথি
         ================================================= */}

      <h3>সংযুক্ত নথি</h3>

      {item.files && item.files.length > 0 ? (
        <table className="trade-license-correction-list-table">
          <thead>
            <tr>
              <th>ক্রমিক</th>
              <th>নথির নাম</th>
            </tr>
          </thead>

          <tbody>
            {item.files.map(
              (file: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {file.name ||
                      file.fileName ||
                      `সংযুক্ত নথি ${index + 1}`}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>কোনো নথি সংযুক্ত করা হয়নি।</p>
      )}

      <br />

      {/* =================================================
          আবেদনকারীর তথ্য
         ================================================= */}

      <h3>আবেদনকারীর তথ্য</h3>

      <table className="trade-license-correction-list-table">
        <tbody>
          <tr>
            <td><strong>আবেদনকারীর নাম</strong></td>
            <td>{item.applicantName || "-"}</td>
          </tr>

          <tr>
            <td><strong>আবেদনকারীর সম্পর্ক</strong></td>
            <td>{item.applicantRelation || "-"}</td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* =================================================
          Back Button
         ================================================= */}

      <div style={{ textAlign: "center" }}>
        <button
          className="preview-btn"
          onClick={() =>
            navigate(
              "/trade-license-correction-list"
            )
          }
        >
          আবেদন তালিকায় ফিরে যান
        </button>
      </div>

    </div>
  );
}

export default TradeLicenseCorrectionView;