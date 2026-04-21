import { useState } from "react";

export default function JobCard({ job }) {
  const [saved, setSaved] = useState(() => {
    const s = JSON.parse(localStorage.getItem("savedJobs")) || [];
    return s.some(j => j.id === job.id);
  });

  const handleSave = () => {
    let s = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (saved) {
      s = s.filter(j => j.id !== job.id);
    } else {
      s.push(job);
    }
    localStorage.setItem("savedJobs", JSON.stringify(s));
    setSaved(!saved);
  };

  return (
    <div className="card">
      <h3>{job.title}</h3>
      <p><b>{job.company_name}</b></p>
      <p>{job.category}</p>

      <div className="card-footer">
        <a href={job.url} target="_blank">Apply 🚀</a>
        <button onClick={handleSave}>{saved ? "💔 Unsave" : "💖 Save"}</button>
        <button onClick={() =>
          alert(`${job.title}\n\n${job.company_name}\n\n${job.description.substring(0,200)}`)
        }>
          Details
        </button>
      </div>
    </div>
  );
}
