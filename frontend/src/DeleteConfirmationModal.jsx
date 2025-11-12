import React from "react";

function DeleteConfirmationModal({ onClose, onConfirm }) {
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
          maxWidth: "400px",
          width: "90%",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #444", paddingBottom: "1rem" }}>
          <h2 style={{ color: "#ff4d4d", margin: 0 }}>Confirm Deletion</h2>
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

        <div style={{ paddingTop: "1.5rem", textAlign: "center" }}>
          <p style={{ marginBottom: "2rem" }}>Are you sure you want to delete this document?</p>
          <div style={{ display: "flex", justifyContent: "space-around", gap: "1rem" }}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "#555",
                color: "#fff",
                padding: "0.6rem 1rem",
                borderRadius: "5px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                backgroundColor: "#ff4d4d",
                color: "#fff",
                padding: "0.6rem 1rem",
                borderRadius: "5px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;