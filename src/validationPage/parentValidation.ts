export const validateParentInformation = (data) => {
  const errors = {};

  // ===========================
  // Father Information
  // ===========================6063483060319761
  // Father's Birth Registration Number (Optional)
  if (data.fatherBRN?.trim()) {
    if (!/^\d{17}$/.test(data.fatherBRN.trim())) {
      errors.fatherBRN =
        "পিতার জন্ম নিবন্ধন নম্বর অবশ্যই ১৭ সংখ্যার হতে হবে";
    }
  }

  // Father's Birth Date (Optional)
  if (data.fatherBirthDate) {
    const selectedDate = new Date(data.fatherBirthDate);
    const today = new Date();

    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      errors.fatherBirthDate =
        "পিতার ভবিষ্যতের জন্ম তারিখ গ্রহণযোগ্য নয়";
    }
  }

  // Father's Name (Bangla)
  if (!data.fatherNameBeg?.trim()) {
    errors.fatherNameBeg = "পিতার নাম বাংলায় লিখুন";
  } else if (
    !/^[\u0980-\u09FF\s,.:]+$/.test(data.fatherNameBeg)
  ) {
    errors.fatherNameBeg =
      "শুধুমাত্র বাংলা অক্ষর এবং , . : বিরাম চিহ্ন ব্যবহার করুন";
  }

  // Father's Name (English)
  if (!data.fatherNameEn?.trim()) {
    errors.fatherNameEn = "পিতার নাম ইংরেজিতে লিখুন";
  } else if (
    !/^[A-Za-z\s,.-]+$/.test(data.fatherNameEn)
  ) {
    errors.fatherNameEn =
      "শুধুমাত্র ইংরেজি অক্ষর এবং , . - ব্যবহার করুন";
  }

  // Father's Nationality
  if (!data.fatherNationality?.trim()) {
    errors.fatherNationality = "পিতার জাতীয়তা লিখুন";
  }

  // ===========================
  // Mother Information
  // ===========================

  // Mother's Birth Registration Number (Optional)
  if (data.motherBRN?.trim()) {
    if (!/^\d{17}$/.test(data.motherBRN.trim())) {
      errors.motherBRN =
        "মাতার জন্ম নিবন্ধন নম্বর অবশ্যই ১৭ সংখ্যার হতে হবে";
    }
  }

  // Mother's Birth Date (Optional)
  if (data.motherBirthDate) {
    const selectedDate = new Date(data.motherBirthDate);
    const today = new Date();

    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      errors.motherBirthDate =
        "মাতার ভবিষ্যতের জন্ম তারিখ গ্রহণযোগ্য নয়";
    }
  }

  // Mother's Name (Bangla)
  if (!data.motherName?.trim()) {
    errors.motherName = "মাতার নাম বাংলায় লিখুন";
  } else if (
    !/^[\u0980-\u09FF\s,.:]+$/.test(data.motherName)
  ) {
    errors.motherName =
      "শুধুমাত্র বাংলা অক্ষর এবং , . : বিরাম চিহ্ন ব্যবহার করুন";
  }

  // Mother's Name (English)
  if (!data.motherNameEn?.trim()) {
    errors.motherNameEn = "মাতার নাম ইংরেজিতে লিখুন";
  } else if (
    !/^[A-Za-z\s,.-]+$/.test(data.motherNameEn)
  ) {
    errors.motherNameEn =
      "শুধুমাত্র ইংরেজি অক্ষর এবং , . - ব্যবহার করুন";
  }

  // Mother's Nationality
  if (!data.motherNationality?.trim()) {
    errors.motherNationality = "মাতার জাতীয়তা লিখুন";
  }

  return errors;
};