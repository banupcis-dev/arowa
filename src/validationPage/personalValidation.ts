export const validatePersonalInformation = (data) => {
  const errors = {};
if (!data.banglaName?.trim()) {
  errors.banglaName = "বাংলা নাম লিখুন";
} else if (!/^[\u0980-\u09FF\s,.:]+$/.test(data.banglaName)) {
  errors.banglaName =
    "শুধুমাত্র বাংলা অক্ষর এবং , . : বিরাম চিহ্ন ব্যবহার করুন";
}
 
if (!data.englishName?.trim()) {
  errors.englishName = "ইংরেজি নাম লিখুন";
} else if (!/^[A-Za-z\s]+$/.test(data.englishName)) {
  errors.englishName = "শুধুমাত্র ইংরেজি অক্ষর ব্যবহার করুন";
}

if (!/^\d{17}$/.test(data.birthRegNo.trim())) {
  errors.birthRegNo = "জন্ম নিবন্ধন নম্বর অবশ্যই ১৭ সংখ্যার হতে হবে।";
}

if (!data.birthDate) {
  errors.birthDate = "জন্ম তারিখ নির্বাচন করুন";
} else {
  const selectedDate = new Date(data.birthDate);
  const today = new Date();

  // আজকের তারিখের পরের তারিখ গ্রহণযোগ্য নয়
  today.setHours(23, 59, 59, 999);

  if (selectedDate > today) {
    errors.birthDate = "ভবিষ্যতের তারিখ গ্রহণযোগ্য নয়";
  }
}
  
if (!data.gender?.name_bn) {
  errors.gender = "লিঙ্গ নির্বাচন করুন";
}

  if (!data.ocupation) {
    errors.ocupation = "পেশা নির্বাচন করুন";
  }

  if (!data.qualification) {
    errors.qualification = "শিক্ষাগত যোগ্যতা নির্বাচন করুন";
  }

  if (!data.bloodGroup) {
    errors.bloodGroup = "ব্লাড গ্রুপ নির্বাচন করুন";
  }

  return errors;
};