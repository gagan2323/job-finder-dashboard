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
      // Fetch ALL categories simultaneously
      const urls = [
        `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}`,
        `https://remotive.com/api/remote-jobs?category=software-dev`,
        `https://remotive.com/api/remote-jobs?category=design`,
        `https://remotive.com/api/remote-jobs?category=data`,
        `https://remotive.com/api/remote-jobs?category=devops-sysadmin`,
        `https://remotive.com/api/remote-jobs?category=product`,
        `https://remotive.com/api/remote-jobs?category=marketing`,
        `https://remotive.com/api/remote-jobs?category=customer-support`,
        `https://remotive.com/api/remote-jobs?category=finance-legal`,
        `https://remotive.com/api/remote-jobs?category=hr`,
      ];

      const results = await Promise.all(
        urls.map(url =>
          fetch(url)
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