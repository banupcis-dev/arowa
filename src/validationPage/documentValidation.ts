export const validateDocuments = (files) => {
  const errors = {};

  // কমপক্ষে একটি ডকুমেন্ট থাকতে হবে
  if (!files || files.length === 0) {
    errors.files = "কমপক্ষে একটি ডকুমেন্ট আপলোড করুন";
    return errors;
  }

  // অনুমোদিত ফাইল
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ];

  // সর্বোচ্চ 5 MB
  const maxSize = 5 * 1024 * 1024;

  // প্রতিটি ফাইল যাচাই
  for (const item of files) {
    const currentFile = item.file;

    if (!allowedTypes.includes(currentFile.type)) {
      errors.files =
        "শুধুমাত্র PDF, JPG, JPEG অথবা PNG ফাইল আপলোড করা যাবে";
      break;
    }

    if (currentFile.size > maxSize) {
      errors.files =
        "প্রতিটি ফাইলের আকার সর্বোচ্চ ৫ MB হতে পারবে";
      break;
    }
  }

  return errors;
};