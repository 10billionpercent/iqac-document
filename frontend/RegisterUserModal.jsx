import React, { useState } from "react";
import axios from "axios";

function RegisterUserModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!username || !password) {
      setMessage("Username and password are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
        email,
        role: "user"
      });

      if (res.data.success) {
        setMessage("✅ User registered successfully!");
        setUsername("");
        setPassword("");
        setEmail("");
      }
    } catch (err) {
      setMessage("❌ Failed to register user.");
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)", display: "flex",
      justifyContent: "center", alignItems: "center", zIndex: 999
    }}>
      <div style={{
        backgroundColor: "#1e1e1e", padding: "2rem", borderRadius: "10px",
        width: "350px", color: "#fff"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Register User</h2>

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username" value={username} style={{
              display: "block", width: "100%", padding: "0.5rem",
              marginBottom: "1rem", borderRadius: "5px", border: "1px solid #444",
              backgroundColor: "#2a2a2a", color: "#fff"
            }}
            onChange={(e)=>setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} style={{
              display: "block", width: "100%", padding: "0.5rem",
              marginBottom: "1rem", borderRadius: "5px", border: "1px solid #444",
              backgroundColor: "#2a2a2a", color: "#fff"
            }}
            onChange={(e)=>setPassword(e.target.value)} />
          <input type="email" placeholder="Email" value={email} style={{
              display: "block", width: "100%", padding: "0.5rem",
              marginBottom: "1rem", borderRadius: "5px", border: "1px solid #444",
              backgroundColor: "#2a2a2a", color: "#fff"
            }}
            onChange={(e)=>setEmail(e.target.value)} />

          {message && <p style={{ textAlign:"center", color:"#ffcc00" }}>{message}</p>}

          <button type="submit" style={{ width:"100%", marginTop:"1rem", backgroundColor:"#009933" }}>Register</button>
          <button type="button" onClick={onClose} style={{ width:"100%", marginTop:"0.5rem" }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterUserModal;
