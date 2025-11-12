import React, { useState } from "react";
import axios from "axios";

function LoginModal({ onLogin, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        // ✅ pass the role returned from backend
        onLogin(res.data.role);
        onClose();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMessage("Invalid username or password."); // ✅ clean message
      } else {
        setErrorMessage("Login failed. Please try again."); // ✅ fallback
      }
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)", display: "flex",
      justifyContent: "center", alignItems: "center"
    }}>
      <div style={{
        backgroundColor: "#1e1e1e", padding: "2rem", borderRadius: "10px",
        width: "350px", color: "#fff"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Sign In</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              display: "block", width: "100%", padding: "0.5rem",
              marginBottom: "1rem", borderRadius: "5px", border: "1px solid #444",
              backgroundColor: "#2a2a2a", color: "#fff"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block", width: "100%", padding: "0.5rem",
              marginBottom: "1rem", borderRadius: "5px", border: "1px solid #444",
              backgroundColor: "#2a2a2a", color: "#fff"
            }}
          />

          {errorMessage && (
            <p style={{ color: "#ff4d4d", marginBottom: "1rem", textAlign: "center" }}>
              {errorMessage}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#0066cc", color: "#fff", padding: "0.6rem 1rem",
                borderRadius: "5px", border: "none", fontWeight: "bold", cursor: "pointer",
                width: "100%"
              }}
            >
              Log In
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "#555", color: "#fff", padding: "0.6rem 1rem",
                borderRadius: "5px", border: "none", fontWeight: "bold", cursor: "pointer",
                width: "100%"
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
