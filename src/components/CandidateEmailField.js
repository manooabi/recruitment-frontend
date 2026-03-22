// src/components/CandidateEmailField.js
import React from "react";

export default function CandidateEmailField({ emails, onChange, onAdd, onRemove }) {
  const styles = {
    candidateRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      flex: 1,
      outline: "none",
    },
    addBtn: {
      padding: "8px 12px",
      borderRadius: "6px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      alignSelf: "flex-start",
    },
    removeBtn: {
      padding: "6px 10px",
      borderRadius: "6px",
      backgroundColor: "#f44336",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div>
      {emails.map((email, i) => (
        <div key={i} style={styles.candidateRow}>
          <input
            type="email"
            placeholder="Candidate Email"
            value={email}
            onChange={(e) => onChange(i, e.target.value)}
            style={styles.input}
            required
          />
          {emails.length > 1 && (
            <button type="button" style={styles.removeBtn} onClick={() => onRemove(i)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" style={styles.addBtn} onClick={onAdd}>
        + Add Candidate
      </button>
    </div>
  );
}