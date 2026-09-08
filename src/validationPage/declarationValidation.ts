export const validateDeclaration = (data) => {
  const errors = {};

  // আবেদনকারীর সম্পর্ক
  if (!data.applicantRelation) {
    errors.applicantRelation = "নাগরিকের সাথে সম্পর্ক নির্বাচন করুন";
  }

 // আবেদনকারীর নাম
if (data.applicantRelation === "guardian") {
  if (!data.applicantName?.trim()) {
    errors.applicantName = "আবেদনকারীর নাম লিখুন";
  } else if (!/^[\u0980-\u09FF\s,.:]+$/.test(data.applicantName)) {
    errors.applicantName =
      "শুধুমাত্র বাংলা অক্ষর এবং , . : বিরাম চিহ্ন ব্যবহার করুন";
  }
}

  // ঘোষণা (Checkbox)
  if (!data.isAgreed) {
    errors.isAgreed =
      "আবেদন জমা দেওয়ার আগে ঘোষণায় সম্মতি প্রদান করুন";
  }

  return errors;
};
