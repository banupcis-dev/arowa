export const validateAddress = (address: any) => {
  const errors: Record<string, string> = {};

  // দেশ
  if (!address.country?.name_bn) {
    errors.country = "দেশ নির্বাচন করুন";
  }

  // বিভাগ
  if (!address.division?.name_bn) {
    errors.division = "বিভাগ নির্বাচন করুন";
  }

  // জেলা
  if (!address.district?.name_bn) {
    errors.district = "জেলা নির্বাচন করুন";
  }

  // উপজেলা
  if (!address.upazila?.name_bn) {
    errors.upazila = "উপজেলা নির্বাচন করুন";
  }

  // ইউনিয়ন / পৌরসভা
  if (!address.union?.name_bn) {
    errors.union = "ইউনিয়ন / পৌরসভা নির্বাচন করুন";
  }

  // ওয়ার্ড
  if (!address.ward?.trim()) {
    errors.ward = "ওয়ার্ড লিখুন";
  }

  // গ্রাম / মহল্লা (বাংলা)
  if (!address.villageBn?.trim()) {
    errors.villageBn = "গ্রাম / মহল্লার নাম বাংলায় লিখুন";
  } else if (!/^[\u0980-\u09FF\s,.:]+$/.test(address.villageBn)) {
    errors.villageBn =
      "শুধুমাত্র বাংলা অক্ষর এবং , . : বিরাম চিহ্ন ব্যবহার করুন";
  }

  // Village / Area (English)
  if (!address.villageEn?.trim()) {
    errors.villageEn = "Village / Area ইংরেজিতে লিখুন";
  } else if (!/^[A-Za-z\s,.-]+$/.test(address.villageEn)) {
    errors.villageEn =
      "শুধুমাত্র ইংরেজি অক্ষর এবং , . - ব্যবহার করুন";
  }

  // ডাকঘর (বাংলা)
  if (!address.postOfficeBn?.trim()) {
    errors.postOfficeBn = "ডাকঘরের নাম বাংলায় লিখুন";
  } else if (!/^[\u0980-\u09FF\s,.:]+$/.test(address.postOfficeBn)) {
    errors.postOfficeBn =
      "শুধুমাত্র বাংলা অক্ষর এবং , . : বিরাম চিহ্ন ব্যবহার করুন";
  }

  // Post Office (English)
  if (!address.postOfficeEn?.trim()) {
    errors.postOfficeEn = "Post Office ইংরেজিতে লিখুন";
  } else if (!/^[A-Za-z\s,.-]+$/.test(address.postOfficeEn)) {
    errors.postOfficeEn =
      "শুধুমাত্র ইংরেজি অক্ষর এবং , . - ব্যবহার করুন";
  }

  // বাড়ি / হোল্ডিং নং (বাংলা)
if (!address.houseHoldingNoBn?.trim()) {
  errors.houseHoldingNoBn = "বাড়ি / হোল্ডিং নম্বর লিখুন (বাংলা)";
} else if (!/^[\u0980-\u09FF\s,.:]+$/.test(address.houseHoldingNoBn)) {
  errors.houseHoldingNoBn =
    "শুধুমাত্র বাংলা অক্ষর এবং , . : বিরাম চিহ্ন ব্যবহার করুন";
}

// House / Holding No (English)
if (!address.houseHoldingNoEn?.trim()) {
  errors.houseHoldingNoEn = "বাড়ি / হোল্ডিং নম্বর লিখুন (ইংরেজি)";
} else if (!/^[A-Za-z0-9\s,./#-]+$/.test(address.houseHoldingNoEn)) {
  errors.houseHoldingNoEn =
    "শুধুমাত্র ইংরেজি অক্ষর, সংখ্যা এবং , . / # - ব্যবহার করুন";
}

  return errors;
};
