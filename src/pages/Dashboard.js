import React, { useEffect, useState ,useRef } from "react";
import api from "../api/api";
import EmailForm from "../components/EmailForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Dashboard() {
   const fileInputRef = useRef(null); // <-- add this
   const navigate = useNavigate(); // <-- add this
  const [jobTitles, setJobTitles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [candidateEmails, setCandidateEmails] = useState([""]);
  const [ccUsers, setCcUsers] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const jobs = await api.get("/job-titles");
      setJobTitles(jobs.data);
      const usersRes = await api.get("/users");
      setUsers(usersRes.data);
    };
    fetchData();
  }, []);

    const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login"); // redirect to login page
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("job_title_id", selectedJob);
    formData.append("subject", subject);
    formData.append("body", body);
    candidateEmails.forEach(email => formData.append("candidate_emails[]", email));
    ccUsers.forEach(id => formData.append("cc_users[]", id));
    if (attachment) formData.append("attachment", attachment);

    try {
      const res = await api.post("/email-campaigns", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // inside try
let message = res.data.message;

// if duplicates exist → append message
if (res.data.duplicates_removed) {
  message += "\n\n⚠️ " + res.data.duplicates_removed;
}

Swal.fire({
  icon: "success",
  title: "Emails Sent",
  text: message,
  confirmButtonColor: "#1E88E5",
});
  //     alert(res.data.message);
  //      if (res.data.duplicates_removed) {
  //   alert(res.data.duplicates_removed); // or show a nicer toast
  // }
      // ✅ Reset all form fields
    setSelectedJob("");
    setSubject("");
    setBody("");
    setCandidateEmails([""]);
    setCcUsers([]);
    setAttachment(null);

    // ✅ Reset the file input in the DOM
    if (fileInputRef.current) fileInputRef.current.value = null;
      setSelectedJob(""); setSubject(""); setBody(""); setCandidateEmails([""]); setCcUsers([]); setAttachment(null);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending emails");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", backgroundColor: "#f5f7fa", paddingTop: "40px" }}>
  <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "10px", width: "500px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
    
    {/* Header with Logout */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Send Email Campaign</h2>
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>

    {/* Email Form */}
    <EmailForm
      jobTitles={jobTitles}
      users={users}
      selectedJob={selectedJob}
      subject={subject}
      body={body}
      candidateEmails={candidateEmails}
      ccUsers={ccUsers}
      attachment={attachment}
      loading={loading}
      onJobChange={(e) => { const selected = jobTitles.find(j => j.id == e.target.value); setSelectedJob(e.target.value); if(selected) setSubject(selected.title); }}
      onSubjectChange={(e) => setSubject(e.target.value)}
      onBodyChange={(e) => setBody(e.target.value)}
      onCandidateChange={(i, val) => setCandidateEmails([...candidateEmails.slice(0,i), val, ...candidateEmails.slice(i+1)])}
      onAddCandidate={() => setCandidateEmails([...candidateEmails, ""])}
      onRemoveCandidate={(i) => setCandidateEmails(candidateEmails.filter((_, idx) => idx !== i))}
      onCcChange={(selectedIds) => setCcUsers(selectedIds)}
      onAttachmentChange={(e) => setAttachment(e.target.files[0])}
       fileInputRef={fileInputRef} // <-- pass ref to EmailForm
      onSubmit={handleSubmit}
    />
  </div>
</div>
  );
}