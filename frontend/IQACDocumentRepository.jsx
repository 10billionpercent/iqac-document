import React, { useState } from "react";
import "./App.css";
import { useAuth } from "./AuthContext";
import LoginModal from "./LoginModal";
import AddDocumentModal from "./AddDocumentModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import IframePDFViewerModal from "./IframePDFViewerModal"; // Import the new modal
import { FaFileDownload } from "react-icons/fa";
import RegisterUserModal from "./RegisterUserModal";

function IQACDocumentRepository() {
  const [showLogin, setShowLogin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [docToView, setDocToView] = useState(null);
  const [docToDelete, setDocToDelete] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
const { isLoggedIn, role, login, logout } = useAuth();

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "IQAC Annual Report 2023",
      description: "Annual internal quality assurance report",
      date: "2023-12-31",
      fileName: "sample.pdf",
      filePath: '/sample.pdf', 
    },
    {
      id: 2,
      title: "Meeting Minutes - Jan 2024",
       description: "Minutes of the IQAC meeting held on January 10, 2024",
      date: "2024-01-10",
      fileName: "sample.pdf",
      filePath: '/sample.pdf', 
    },
  ]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const handleAddDocument = (newDocData) => {
  if (!newDocData) return; // defensive

  const newDoc = {
    id: Date.now(),
    title: newDocData.title,
    description: newDocData.description,
    date: newDocData.date || new Date().toISOString().split("T")[0],
    fileName: newDocData.fileName,
    filePath: newDocData.filePath,
  };

  setDocuments([...documents, newDoc]);
};



  const handleOpenDeleteModal = (docId) => {
    if (!isLoggedIn) {
      alert("Please sign in to delete documents.");
      return;
    }
    setDocToDelete(docId);
    setShowDeleteModal(true);
  };

  const confirmDeleteDocument = () => {
    setDocuments(documents.filter((doc) => doc.id !== docToDelete));
    setShowDeleteModal(false);
    setDocToDelete(null);
  };

  const cancelDeleteDocument = () => {
    setShowDeleteModal(false);
    setDocToDelete(null);
  };

  const handleDownload = (doc) => {
    alert(`Downloading ${doc.fileName}...`);
  };

  const handleView = (doc) => {
      setDocToView(doc);
      setShowViewModal(true);
  };

  const filteredDocs = documents
    .filter(
      (doc) =>
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  const handleAddButtonClick = () => {
  if (!isLoggedIn) {
    setActionMessage("Please sign in to add a document.");
    return;
  }

  setActionMessage(""); // clear if previously shown
  setShowAddModal(true);
};


  return (
    <>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  }}
>
  <div style={{ padding: "16px", display:"flex", alignItems:"center", width:"100%", justifyContent:"center" }}>
    <div style={{ visibility: 'hidden', width: '99px' }} />
    <h1 style={{ color: "#0066cc", textAlign: "center", margin: 0, flex: 1}}>
      IQAC Document Repository
    </h1>

    {isLoggedIn ? (
      <button
        onClick={logout}
        style={{
          backgroundColor: "#ff4d4d",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Log Out
      </button>
    ) : (
      <button
        onClick={() => setShowLogin(true)}
        style={{
          backgroundColor: "#0066cc",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Log In
      </button>
    )}
  </div>
</div>

{/* ✅ Show message here */}
{actionMessage && (
  <p style={{ 
    textAlign: "center",
    color: "#ff4d4d",
    marginTop: "-1rem",
    marginBottom: "1.5rem",
    fontWeight: "500"
  }}>
    {actionMessage}
  </p>
)}


      {showLogin && <LoginModal onLogin={(role) => { login(role); setShowLogin(false); }} onClose={() => setShowLogin(false)} />}

{showAddModal && isLoggedIn && (
  <AddDocumentModal
    onAdd={handleAddDocument}
    onClose={() => setShowAddModal(false)}
  />
)}

{showDeleteModal && isLoggedIn && (
  <DeleteConfirmationModal
    onClose={cancelDeleteDocument}
    onConfirm={confirmDeleteDocument}
  />
)}

{showViewModal && docToView && (
  <IframePDFViewerModal
    file={docToView.filePath}
    onClose={() => setShowViewModal(false)}
  />
)}

{/* ✅ ADD THIS — YOU FORGOT THIS PART */}
{showRegisterModal && (
  <RegisterUserModal onClose={() => setShowRegisterModal(false)} />
)}

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  }}
>
  {role === "admin" && (
    <button
      onClick={() => setShowRegisterModal(true)}
      style={{
        backgroundColor: "#009933",
        color: "#fff",
        padding: "0.6rem 1rem",
        borderRadius: "5px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Register User
    </button>
  )}

        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "1px solid #444",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            width: "250px",
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #444",
            backgroundColor: "#1e1e1e",
            color: "#fff",
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
        <button
          onClick={handleAddButtonClick}
          style={{
            backgroundColor: "#0066cc",
            color: "#fff",
            padding: "0.6rem 1rem",
            borderRadius: "5px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Document
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, maxWidth: "700px", marginInline: "auto" }}>
        {filteredDocs.map((doc) => (
          <li
            key={doc.id}
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "10px",
              padding: "8px",
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ color: "#0066cc", marginBottom: "0.3rem" }}>{doc.title}</h3>
              <p style={{ margin: "0.2rem 0", color: "#ccc" }}>{doc.description}</p>
              <p style={{ fontSize: "0.9rem", color: "#888" }}>
                {doc.date} | {doc.fileName}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => handleView(doc)}
                style={{
                  backgroundColor: "#0066cc",
                  color: "#fff",
                  padding: "0.4rem 0.8rem",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                View
              </button>
              <button
                onClick={() => handleDownload(doc)}
                style={{
                  backgroundColor: "#0066cc",
                  color: "#fff",
                  padding: "0.4rem 0.8rem",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <FaFileDownload /> Download
              </button>
             {isLoggedIn && role === "admin" && (
  <button
    onClick={() => handleOpenDeleteModal(doc.id)}
    style={{
      backgroundColor: "#ff4d4d",
      color: "#fff",
      padding: "0.4rem 0.8rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
)}

            </div>
          </li>
        ))}
      </ul>

      {filteredDocs.length === 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>No documents found</p>
      )}
    </>
  );
}

export default IQACDocumentRepository;