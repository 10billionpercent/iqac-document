// AddDocumentModal.jsx
import React, { useState } from "react";
import axios from "axios";

function AddDocumentModal({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleAdd = async () => {
    if (!title || !description || !file) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // res.data should contain { success: true, file: { filename, ... } }
      if (res.data.success) {
        const savedFile = res.data.file;

        const filename =
  savedFile?.filename ||
  savedFile?.id ||
  savedFile?._id ||
  file.name;

const newDoc = {
  title,
  description,
  date: new Date().toISOString().split("T")[0],
  fileName: savedFile?.originalname || file.name,
  filePath: `http://localhost:5000/api/documents/${filename}`,
};


        onAdd(newDoc);
        onClose();
      } else {
        alert("Failed to upload file.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: "10px",
          padding: "1.5rem",
          maxWidth: "500px",
          width: "90%",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #444",
            paddingBottom: "1rem",
          }}
        >
          <h2 style={{ color: "#0066cc", margin: 0 }}>Add New Document</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ paddingTop: "1.5rem" }}>
          <input
            type="text"
            placeholder="Document Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              display: "block",
              marginBottom: "1rem",
              padding: "0.5rem",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "#fff",
            }}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              display: "block",
              marginBottom: "1rem",
              padding: "0.5rem",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "#fff",
            }}
          />

          <label
            htmlFor="file-upload"
            style={{
              display: "block",
              backgroundColor: "#2a2a2a",
              color: "#0066cc",
              padding: "0.6rem 1rem",
              borderRadius: "5px",
              border: "1px solid #444",
              cursor: "pointer",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {file ? file.name : "Choose File"}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button
            onClick={handleAdd}
            disabled={loading}
            style={{
              backgroundColor: "#0066cc",
              color: "#fff",
              padding: "0.6rem 1rem",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
            }}
          >
            {loading ? "Uploading..." : "Add Document"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDocumentModal;
