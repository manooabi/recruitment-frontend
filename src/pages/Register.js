// src/pages/Register.js
import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
       setError(""); // clear previous error
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      // alert(err.response?.data?.message || "Register failed");
       setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          {error && (
  <div style={styles.errorBox}>
    {error}
  </div>
)}
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, ...(loading ? styles.disabledButton : {}) }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  disabledButton: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
  errorBox: {
  backgroundColor: "#fdecea",
  color: "#d32f2f",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "10px",
  fontSize: "14px",
  border: "1px solid #f5c6cb",
},
};