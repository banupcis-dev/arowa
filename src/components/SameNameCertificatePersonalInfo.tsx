import React from "react";
import "../css/banupcis.css";

interface SameNameCertificatePersonalInfoProps {
  banglaName: string;
  setBanglaName: (value: string) => void;

  englishName: string;
  setEnglishName: (value: string) => void;

  nicknameBn: string;
  setNicknameBn: (value: string) => void;

  nicknameEn: string;
  setNicknameEn: (value: string) => void;

  birthRegNo: string;
  setBirthRegNo: (value: string) => void;

  birthDate: string;
  setBirthDate: (value: string) => void;

  gender: {
    name_bn: string;
    name_en: string;
  };

  handleGenderChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  errors: Record<string, string>;
}

function SameNameCertificatePersonalInfo({
  banglaName,
  setBanglaName,
  englishName,
  setEnglishName,
  nicknameBn,
  setNicknameBn,
  nicknameEn,
  setNicknameEn,
  birthRegNo,
  setBirthRegNo,
  birthDate,
  setBirthDate,
  gender,
  handleGenderChange,
  errors,
}: SameNameCertificatePersonalInfoProps) {
  return (
    <div className="title">

      <p className="Cetezon-Personal-InFormation">
        ব্যক্তিগত তথ্যঃ
      </p>

      {/* নাম */}
      <div className="form-row-group">

        <div className="form-row">
          <label>নাম (বাংলা)</label>

          <input
            type="text"
            value={banglaName}
            onChange={(e) =>
              setBanglaName(e.target.value)
            }
          />

          {errors.banglaName && (
            <p className="error">
              {errors.banglaName}
            </p>
          )}
        </div>

        <div className="form-row">
          <label>Name (English)</label>

          <input
            type="text"
            value={englishName}
            onChange={(e) =>
              setEnglishName(e.target.value)
            }
          />

          {errors.englishName && (
            <p className="error">
              {errors.englishName}
            </p>
          )}
        </div>

      </div>

      {/* ডাক নাম */}
      <div className="form-row-group">

        <div className="form-row">
          <label>ডাক নাম (বাংলা)</label>

          <input
            type="text"
            value={nicknameBn}
            onChange={(e) =>
              setNicknameBn(e.target.value)
            }
          />
        </div>

        <div className="form-row">
          <label>Nickname (English)</label>

          <input
            type="text"
            value={nicknameEn}
            onChange={(e) =>
              setNicknameEn(e.target.value)
            }
          />
        </div>

      </div>

      {/* জন্ম নিবন্ধন নম্বর ও জন্ম তারিখ */}
      <div className="form-row-group">

        <div className="form-row">
          <label>
            ১৭ সংখ্যার জন্ম নিবন্ধন নম্বর
          </label>

          <input
            type="text"
            value={birthRegNo}
            onChange={(e) =>
              setBirthRegNo(e.target.value)
            }
            maxLength={17}
          />

          {errors.birthRegNo && (
            <p className="error">
              {errors.birthRegNo}
            </p>
          )}
        </div>

        <div className="form-row">
          <label>জন্ম তারিখ</label>

          <input
            type="date"
            value={birthDate}
            onChange={(e) =>
              setBirthDate(e.target.value)
            }
          />

          {errors.birthDate && (
            <p className="error">
              {errors.birthDate}
            </p>
          )}
        </div>

      </div>

      {/* লিঙ্গ */}
      <div className="form-row-group">

        <div className="form-row">
          <label>লিঙ্গ</label>

          <select
            value={gender.name_bn}
            onChange={handleGenderChange}
          >
            <option value="">
              লিঙ্গ নির্বাচন করুন
            </option>

            <option value="পুরুষ">
              পুরুষ
            </option>

            <option value="নারী">
              নারী
            </option>

            <option value="তৃতীয় লিঙ্গ">
              তৃতীয় লিঙ্গ
            </option>
          </select>

          {errors.gender && (
            <p className="error">
              {errors.gender}
            </p>
          )}
        </div>

      </div>

    </div>
  );
}

export default SameNameCertificatePersonalInfo;