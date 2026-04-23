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
      const urls = [
        `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=100`,
        `https://remotive.com/api/remote-jobs?limit=100`,
        `https://remotive.com/api/remote-jobs?category=software-dev&limit=100`,
        `https://remotive.com/api/remote-jobs?category=data&limit=100`,
        `https://remotive.com/api/remote-jobs?category=devops-sysadmin&limit=100`,
      ];

      const results = await Promise.all(
        urls.map(url => fetch(url).then(res => res.json()))
      );

      // Combine all jobs
      const allJobs = results.flatMap(r => r.jobs || []);

      // Remove duplicates by id
      const unique = Array.from(
        new Map(allJobs.map(j => [j.id, j])).values()
      );

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