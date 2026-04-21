import { useEffect, useState } from "react";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(data);
  }, []);

  return (
    <div>
      <h1>Saved Jobs 💖</h1>
      <Link to="/"><button>← Back to Search</button></Link> 
      
      {savedJobs.length === 0 ? (
        <p>No saved jobs</p>
      ) : (
        savedJobs.map(job => (
          <div key={job.id}>
            <h3>{job.title}</h3>
          </div>
        ))
      )}
    </div>
  );
}