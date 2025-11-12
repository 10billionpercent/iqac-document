import React, { useState, useEffect } from "react";

function IframePDFViewerModal({ file, onClose }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // start animation after mount
    const timer = setTimeout(() => setShouldAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Append zoom param for 100% view
  const fileWithZoom = `${file}#zoom=100`;

  const modalContainerStyle = {
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
  };

  const modalContentStyle = {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "90%",
    borderRadius: "10px",
    overflow: "hidden",
    transform: shouldAnimate ? "translateY(0)" : "translateY(100vh)",
    transition: "transform 0.4s ease-in-out",
  };

  const iframeStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    flexGrow: 1,
  };

  return (
    <div style={modalContainerStyle}>
      <div style={modalContentStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderBottom: "1px solid #444",
          }}
        >
          <h2 style={{ color: "#0066cc", margin: 0 }}>View Document</h2>
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

        <iframe
          src={fileWithZoom}
          title="PDF Document"
          style={iframeStyle}
        >
          Your browser does not support iframes. You can{" "}
          <a href={file}>download the PDF here.</a>
        </iframe>
      </div>
    </div>
  );
}

export default IframePDFViewerModal;
