// src/components/EmailForm.js
import React from "react";
import CandidateEmailField from "./CandidateEmailField";
import MultiSelectTags from "./MultiSelectTags";


export default function EmailForm({
  jobTitles,
  users,
  selectedJob,
  subject,
  body,
  candidateEmails,
  ccUsers,
  attachment,
  loading,
  onJobChange,
  onSubjectChange,
  onBodyChange,
  onCandidateChange,
  onAddCandidate,
  onRemoveCandidate,
  onCcChange,
  onAttachmentChange,
  onSubmit,
  fileInputRef
}) {
  const styles = {
    field: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "10px",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "500",
      color: "#333",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none",
      width: "100%",
    },
    select: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none",
      width: "100%",
    },
    fileInput: {
      padding: "5px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    submitBtn: {
      padding: "12px",
      borderRadius: "6px",
      backgroundColor: "#1E88E5",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
    },
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* Job Title */}
      <div style={styles.field}>
        <label style={styles.label}>Job Title</label>
        <select value={selectedJob} onChange={onJobChange} style={styles.select} required>
          <option value="">Select Job Title</option>
          {jobTitles.map(job => <option key={job.id} value={job.id}>{job.title}</option>)}
        </select>
      </div>

      {/* Subject */}
      <div style={styles.field}>
        <label style={styles.label}>Email Subject</label>
        <input type="text" value={subject} onChange={onSubjectChange} placeholder="Email Subject" style={styles.input} required />
      </div>

      {/* Body */}
      <div style={styles.field}>
        <label style={styles.label}>Email Body</label>
        <textarea value={body} onChange={onBodyChange} placeholder="Write your email here..." style={{ ...styles.input, height: "120px", resize: "vertical" }} required />
      </div>

      {/* Candidate Emails */}
      <div style={styles.field}>
        <label style={styles.label}>Candidate Emails</label>
        <CandidateEmailField
          emails={candidateEmails}
          onChange={onCandidateChange}
          onAdd={onAddCandidate}
          onRemove={onRemoveCandidate}
        />
      </div>

      {/* CC Users */}
      {/* <div style={styles.field}>
        <label style={styles.label}>CC Users</label>
        <select multiple value={ccUsers} onChange={onCcChange} style={{ ...styles.select, height: "100px" }}>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div> */}
      <div style={styles.field}>
  <label style={styles.label}>CC Users</label>
  <MultiSelectTags
    options={users}          // array of {id, name}
    selectedValues={ccUsers} // current selected IDs
    onChange={onCcChange}    // function to update selected IDs
  />
</div>

      {/* Attachment */}
      <div style={styles.field}>
        <label style={styles.label}>Attachment</label>
        <input type="file" ref={fileInputRef} onChange={onAttachmentChange} style={styles.fileInput} />
      </div>

      {/* Submit */}
      <button type="submit" style={styles.submitBtn} disabled={loading}>
        {loading ? "Sending..." : "Send Emails"}
      </button>
    </form>
  );
}