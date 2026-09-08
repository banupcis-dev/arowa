import { useState } from "react";

function DocumentsUpload({
  files,
  setFiles,
  errors,
}) {
  const handleSelect = (e) => {
    const selected = Array.from(e.target.files);

    const formatted = selected.map((file) => ({
      file,
      name: file.name,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      uploaded: false,
    }));

    setFiles((prev) => [...prev, ...formatted]);
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  // 👉 Future Firebase upload function
  const handleUpload = (index) => {
    console.log("Uploading file:", files[index]);

    // later:
    // uploadBytes()
    // getDownloadURL()

    const updated = [...files];
    updated[index].uploaded = true;
    setFiles(updated);
  };

  return (
    <div>
      <h1>ডকুমেন্ট আপলোড করুন</h1>

      {/* File Select */}
      <input
  id="documentUpload"
  type="file"
  multiple
  onChange={handleSelect}
  style={{ display: "none" }}
/>
  <div style={{ marginTop: "15px", marginBottom: "15px" }}>
  <label htmlFor="documentUpload" className="preview-btn">
    📎 নথি নির্বাচন করুন
  </label>
</div>
      {errors?.files && (
  <p className="error">{errors.files}</p>
)}

      {/* List */}
      {files.map((f, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          {/* Preview */}
          <div style={{ display: "flex", gap: "10px" }}>
            {f.preview ? (
              <img src={f.preview} width="60" />
            ) : (
              <span>📄</span>
            )}

            <div>
              <p>{f.name}</p>
              <small>{f.uploaded ? "Uploaded" : "Not uploaded"}</small>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ marginTop: "10px" }}>
            <button
              type="button"
              onClick={() => removeFile(index)}
            >
              Remove
            </button>

            {/* Upload Button */}
            <button
              type="button"
              onClick={() => handleUpload(index)}
              style={{ marginLeft: "10px" }}
            >
              Upload
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DocumentsUpload;