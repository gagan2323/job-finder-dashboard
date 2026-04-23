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
      // Fetch multiple related searches at once
      const searches = [
        query,
        `${query} developer`,
        `${query} engineer`,
      ];

      const results = await Promise.all(
        searches.map(q =>
          fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(q)}&limit=50`)
            .then(res => res.json())
        )
      );

      // Combine all results and remove duplicates by id
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