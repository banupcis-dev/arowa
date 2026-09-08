import { useState } from "react";
function ImageUpload({
  image,
  setImage,
  preview,
  setPreview,
  errors,
  title = "নাগরিকের ছবি আপলোড করুন",
}) {
  const [uploaded, setUploaded] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setUploaded(false);
    };

    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleUpload = () => {
    if (!image) return;

    // ভবিষ্যতে এখানে Firebase upload করা যাবে
    console.log("Uploading image:", image);

    setUploaded(true);
  };

  const handleRemove = () => {
    setImage(null);
    setPreview("");
    setUploaded(false);
  };

  return (
    <div>
      <h1>{title}</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {errors?.image && (
        <p className="error">{errors.image}</p>
      )}

      {preview && (
        <>
          <div style={{ marginTop: "10px" }}>
            <img
              src={preview}
              alt="preview"
              width="150"
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              type="button"
              onClick={handleUpload}
            >
              ছবি আপলোড করুন
            </button>

            <button
              type="button"
              onClick={handleRemove}
              style={{ marginLeft: "10px" }}
            >
              ছবি মুছুন
            </button>
          </div>

          {uploaded && (
            <p
              style={{
                marginTop: "10px",
                color: "green",
                fontWeight: "bold",
              }}
            >
              ✓ ছবি আপলোড হয়েছে
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default ImageUpload;