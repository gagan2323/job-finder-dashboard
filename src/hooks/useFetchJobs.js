import { useState } from "react";

export default function useFetchJobs() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("");

  const fetchJobs = async (query) => {
    if (!query) {
      setStatus("Please enter a job role");
      return;
    }

    setStatus("Loading jobs...");
    setJobs([]);

    try {
      const terms = [query, "developer", "engineer", "designer", "analyst", "remote"];
      
      const results = await Promise.all(
        terms.map(t =>
          fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(t)}`)
            .then(res => res.json())
            .catch(() => ({ jobs: [] }))
        )
      );

      const allJobs = results.flatMap(r => r.jobs || []);
      const unique = Array.from(new Map(allJobs.map(j => [j.id, j])).values());

      if (unique.length === 0) {
        setStatus("No jobs found");
        return;
      }

      setJobs(unique);
      setStatus("");
    } catch (err) {
      setStatus("Error loading jobs");
    }
  };

  return { jobs, status, fetchJobs };
}