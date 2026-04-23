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
      // Fetch by search AND by different categories
      const urls = [
        `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=100`,
        `https://remotive.com/api/remote-jobs?category=software-dev&limit=100`,
        `https://remotive.com/api/remote-jobs?category=design&limit=100`,
        `https://remotive.com/api/remote-jobs?category=data&limit=100`,
      ];

      const results = await Promise.all(
        urls.map(url => fetch(url).then(res => res.json()))
      );

      // Combine all and filter by query
      const allJobs = results.flatMap(r => r.jobs || []);

      // Remove duplicates
      const unique = Array.from(
        new Map(allJobs.map(j => [j.id, j])).values()
      );

      // Filter by query keyword
      const filtered = unique.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description?.toLowerCase().includes(query.toLowerCase()) ||
        job.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      const finalJobs = filtered.length > 0 ? filtered : unique;

      if (finalJobs.length === 0) {
        setStatus("No jobs found");
        return;
      }

      setJobs(finalJobs);
      setStatus("");
    } catch (err) {
      setStatus("Error loading jobs");
    }
  };

  return { jobs, status, fetchJobs };
}