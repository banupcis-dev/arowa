export const validateImage = (image) => {
  const errors = {};

  // ছবি আপলোড বাধ্যতামূলক
  if (!image) {
    errors.image = "একটি ছবি আপলোড করুন";
    return errors;
  }

  // শুধুমাত্র JPG, JPEG, PNG গ্রহণযোগ্য
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (!allowedTypes.includes(image.type)) {
    errors.image =
      "শুধুমাত্র JPG, JPEG অথবা PNG ছবি আপলোড করা যাবে";
  }

  // সর্বোচ্চ 2 MB
  const maxSize = 2 * 1024 * 1024;

  if (image.size > maxSize) {
    errors.image =
      "ছবির আকার সর্বোচ্চ ২ MB হতে পারবে";
  }

  return errors;
};