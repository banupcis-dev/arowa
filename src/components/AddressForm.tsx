import { divisions } from "../data/addressData";
import "../css/banupcis.css";

function AddressForm({
  title,
  address,
  setAddress,
  disabled,
  businessAddress = false,
  errors,
}) {
  const selectedDivision = divisions.find(
    (div) => div.name_en === address.division.name_en
  );

  const selectedDistrict = selectedDivision?.districts.find(
    (dist) => dist.name_en === address.district.name_en
  );

  const selectedUpazila = selectedDistrict?.upazilas.find(
    (upa) => upa.name_en === address.upazila.name_en
  );
  return (
    <div className="address-container">
      <h3 className="address-title">{title}</h3>
<div className="address-row">
  {/* Country */}
  <div className="address-form-group">
    <label>দেশ</label>

    <select
      value={address.country.name_en}
        disabled={disabled}
      onChange={(e) => {
        if (e.target.value === "Bangladesh") {
          setAddress({
            ...address,
            country: {
              name_bn: "বাংলাদেশ",
              name_en: "Bangladesh",
            },
            division: { name_bn: "", name_en: "" },
            district: { name_bn: "", name_en: "" },
            upazila: { name_bn: "", name_en: "" },
            union: { name_bn: "", name_en: "" },
          });
        } else {
          setAddress({
            ...address,
            country: {
              name_bn: "বিদেশ",
              name_en: "Foreign",
            },
            division: { name_bn: "", name_en: "" },
            district: { name_bn: "", name_en: "" },
            upazila: { name_bn: "", name_en: "" },
            union: { name_bn: "", name_en: "" },
          });
        }
      }}
    >
      <option value="">দেশ নির্বাচন করুন</option>
      <option value="Bangladesh">বাংলাদেশ</option>
      <option value="Foreign">বিদেশ</option>
    </select>
    {errors?.country && (
  <p className="error">{errors.country}</p>
)}
  </div>
  {/* Division */}
  <div className="address-form-group">
    <label>বিভাগ</label>

    <select
      value={address.division.name_en}
  disabled={disabled || address.country.name_en !== "Bangladesh"}
      onChange={(e) => {
        const selected = divisions.find(
          (div) => div.name_en === e.target.value
        );

        if (selected) {
          setAddress({
            ...address,
            division: {
              name_bn: selected.name_bn,
              name_en: selected.name_en,
            },
            district: { name_bn: "", name_en: "" },
            upazila: { name_bn: "", name_en: "" },
            union: { name_bn: "", name_en: "" },
          });
        } else {
          setAddress({
            ...address,
            division: { name_bn: "", name_en: "" },
            district: { name_bn: "", name_en: "" },
            upazila: { name_bn: "", name_en: "" },
            union: { name_bn: "", name_en: "" },
          });
        }
      }}
    >
      <option value="">
        {address.country.name_en
          ? "বিভাগ নির্বাচন করুন"
          : "আগে দেশ নির্বাচন করুন"}
      </option>

      {divisions.map((div) => (
        <option key={div.name_en} value={div.name_en}>
          {div.name_bn}
        </option>
      ))}
    </select>
    {errors?.division && (
  <p className="error">{errors.division}</p>
)}
  </div>
</div>

<div className="address-row">
  {/* District */}
  <div className="address-form-group">
    <label>জেলা</label>

    <select
      value={address.district.name_en}
      disabled={disabled || !address.division.name_en}
      onChange={(e) => {
        const selected = selectedDivision?.districts.find(
          (dist) => dist.name_en === e.target.value
        );

        if (selected) {
          setAddress({
            ...address,
            district: {
              name_bn: selected.name_bn,
              name_en: selected.name_en,
            },
            upazila: { name_bn: "", name_en: "" },
            union: { name_bn: "", name_en: "" },
          });
        } else {
          setAddress({
            ...address,
            district: { name_bn: "", name_en: "" },
            upazila: { name_bn: "", name_en: "" },
            union: { name_bn: "", name_en: "" },
          });
        }
      }}
    >
      <option value="">
        {address.division.name_en
          ? "জেলা নির্বাচন করুন"
          : "আগে বিভাগ নির্বাচন করুন"}
      </option>

      {selectedDivision?.districts.map((dist) => (
        <option key={dist.name_en} value={dist.name_en}>
          {dist.name_bn}
        </option>
      ))}
    </select>
    {errors?.district && (
  <p className="error">{errors.district}</p>
)}
  </div>

  {/* Upazila */}
  <div className="address-form-group">
    <label>উপজেলা</label>

    <select
      value={address.upazila.name_en}
      disabled={disabled || !address.district.name_en}
      onChange={(e) => {
        const selected = selectedDistrict?.upazilas.find(
          (upa) => upa.name_en === e.target.value
        );

        if (selected) {
          setAddress({
            ...address,
            upazila: {
              name_bn: selected.name_bn,
              name_en: selected.name_en,
            },
            union: { name_bn: "", name_en: "" },
          });
        } else {
          setAddress({
            ...address,
            upazila: { name_bn: "", name_en: "" },
            union: { name_bn: "", name_en: "" },
          });
        }
      }}
    >
      <option value="">
        {address.district.name_en
          ? "উপজেলা নির্বাচন করুন"
          : "আগে জেলা নির্বাচন করুন"}
      </option>

      {selectedDistrict?.upazilas.map((upa) => (
        <option key={upa.name_en} value={upa.name_en}>
          {upa.name_bn}
        </option>
      ))}
    </select>
    {errors?.upazila && (
  <p className="error">{errors.upazila}</p>
)}
  </div>
</div>
      <div className="address-row">
        {/* Union / Municipality */}
        <div className="address-form-group">
          <label>ইউনিয়ন / পৌরসভা</label>

          <select
            value={address.union.name_en}
            disabled={disabled || !address.upazila.name_en}
            onChange={(e) => {
              const selected = selectedUpazila?.unions.find(
                (uni) => uni.name_en === e.target.value
              );

              if (selected) {
                setAddress({
                  ...address,
                  union: {
                    name_bn: selected.name_bn,
                    name_en: selected.name_en,
                  },
                });
              } else {
                setAddress({
                  ...address,
                  union: {
                    name_bn: "",
                    name_en: "",
                  },
                });
              }
            }}
          >
            <option value="">
              {address.upazila.name_en
                ? "ইউনিয়ন / পৌরসভা নির্বাচন করুন"
                : "আগে উপজেলা নির্বাচন করুন"}
            </option>

            {selectedUpazila?.unions.map((uni) => (
              <option key={uni.name_en} value={uni.name_en}>
                {uni.name_bn}
              </option>
            ))}
          </select>
          {errors?.union && (
  <p className="error">{errors.union}</p>
)}
        </div>

        {/* Ward */}
        <div className="address-form-group">
          <label>ওয়ার্ড</label>

          <input
            type="text"
              disabled={disabled}
            value={address.ward}
            onChange={(e) =>
              setAddress({
                ...address,
                ward: e.target.value,
              })
            }
            placeholder="ওয়ার্ড নম্বর"
          />
          {errors?.ward && (
  <p className="error">{errors.ward}</p>
)}
        </div>
      </div>
<div className="address-row">
  <div className="address-form-group">
    <label>
      {businessAddress ? "বাজারের নাম (বাংলা)" : "ডাকঘর (বাংলা)"}
    </label>

    <input
      type="text"
      disabled={disabled}
      value={address.postOfficeBn}
      onChange={(e) =>
        setAddress({
          ...address,
          postOfficeBn: e.target.value,
        })
      }
      placeholder={
        businessAddress
          ? "বাজারের নাম (বাংলা)"
          : "ডাকঘর (বাংলা)"
      }
    />

    {errors?.postOfficeBn && (
      <p className="error">{errors.postOfficeBn}</p>
    )}
  </div>

  <div className="address-form-group">
    <label>
      {businessAddress ? "Market Name (English)" : "Post Office (English)"}
    </label>

    <input
      type="text"
      disabled={disabled}
      value={address.postOfficeEn}
      onChange={(e) =>
        setAddress({
          ...address,
          postOfficeEn: e.target.value,
        })
      }
      placeholder={
        businessAddress
          ? "Market Name (English)"
          : "Post Office (English)"
      }
    />

    {errors?.postOfficeEn && (
      <p className="error">{errors.postOfficeEn}</p>
    )}
  </div>
</div>
<div className="address-row">
  <div className="address-form-group">
    <label>
      {businessAddress
        ? "মার্কেটের নাম (বাংলা)"
        : "গ্রাম / মহল্লা (বাংলা)"}
    </label>

    <input
      type="text"
      disabled={disabled}
      value={address.villageBn}
      onChange={(e) =>
        setAddress({
          ...address,
          villageBn: e.target.value,
        })
      }
      placeholder={
        businessAddress
          ? "মার্কেটের নাম (বাংলা)"
          : "গ্রাম / মহল্লা (বাংলা)"
      }
    />

    {errors?.villageBn && (
      <p className="error">{errors.villageBn}</p>
    )}
  </div>

  <div className="address-form-group">
    <label>
      {businessAddress
        ? "Market Name (English)"
        : "Village / Area (English)"}
    </label>

    <input
      type="text"
      disabled={disabled}
      value={address.villageEn}
      onChange={(e) =>
        setAddress({
          ...address,
          villageEn: e.target.value,
        })
      }
      placeholder={
        businessAddress
          ? "Market Name (English)"
          : "Village / Area (English)"
      }
    />

    {errors?.villageEn && (
      <p className="error">{errors.villageEn}</p>
    )}
  </div>
</div>
<div className="address-row">
  <div className="address-form-group">
    <label>
      {businessAddress
        ? "দোকানের নম্বর (বাংলা)"
        : "বাড়ি / হোল্ডিং নং (বাংলা)"}
    </label>

    <input
      type="text"
      disabled={disabled}
      value={address.houseHoldingNoBn}
      onChange={(e) =>
        setAddress({
          ...address,
          houseHoldingNoBn: e.target.value,
        })
      }
      placeholder={
        businessAddress
          ? "দোকানের নম্বর"
          : "বাড়ি / হোল্ডিং নং"
      }
    />

    {errors?.houseHoldingNoBn && (
      <p className="error">{errors.houseHoldingNoBn}</p>
    )}
  </div>

  <div className="address-form-group">
    <label>
      {businessAddress
        ? "Shop Number (English)"
        : "House / Holding No (English)"}
    </label>

    <input
      type="text"
      disabled={disabled}
      value={address.houseHoldingNoEn}
      onChange={(e) =>
        setAddress({
          ...address,
          houseHoldingNoEn: e.target.value,
        })
      }
      placeholder={
        businessAddress
          ? "Shop Number"
          : "House / Holding No"
      }
    />

    {errors?.houseHoldingNoEn && (
      <p className="error">{errors.houseHoldingNoEn}</p>
    )}
  </div>
</div>
    </div>
  );
}

export default AddressForm;
