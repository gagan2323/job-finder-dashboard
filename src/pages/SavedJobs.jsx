import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(data);
  }, []);

  const handleRemove = (id) => {
    const updated = savedJobs.filter(j => j.id !== id);
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1>Saved Jobs 💖</h1>
      <Link to="/"><button>← Back to Search</button></Link>

      {savedJobs.length === 0 ? (
        <p>No saved jobs yet! Go search and save some. 🚀</p>
      ) : (
        savedJobs.map(job => (
          <div className="card" key={job.id}>
            <h3>{job.title}</h3>
            <p><b>{job.company_name}</b></p>
            <p>{job.category}</p>
            <div className="card-footer">
              <a href={job.url} target="_blank">Apply 🚀</a>
              <button onClick={() => handleRemove(job.id)}>💔 Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}