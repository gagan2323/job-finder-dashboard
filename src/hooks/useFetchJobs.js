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
      const categories = [
        "software-dev",
        "design",
        "data",
        "devops-sysadmin",
        "product",
        "marketing",
        "customer-support",
        "finance-legal",
        "hr",
        "qa",
        "writing",
        "all-others",
      ];

      // Fetch search + ALL categories at same time
      const urls = [
        `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}`,
        ...categories.map(c => `https://remotive.com/api/remote-jobs?category=${c}`)
      ];

      const results = await Promise.allSettled(
        urls.map(url =>
          fetch(url).then(res => res.json())
        )
      );

      const allJobs = results
        .filter(r => r.status === "fulfilled")
        .flatMap(r => r.value.jobs || []);

      // Remove duplicates
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