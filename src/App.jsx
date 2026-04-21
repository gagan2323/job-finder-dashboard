import { useState } from "react";
import { Link } from "react-router-dom";

import useFetchJobs from "./hooks/useFetchJobs";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import JobList from "./components/JobList";
import Status from "./components/Status";

function App() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const { jobs, status, fetchJobs } = useFetchJobs();

  const filteredJobs = jobs.filter(
    (job) =>
      (filter === "" ||
        job.category.toLowerCase().includes(filter.toLowerCase())) &&
      job.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1>💼 Job Finder <span>🚀</span></h1>
        <p className="subtitle">Find your dream remote job in seconds</p>
        <Link to="/saved">
          <button className="saved-btn">💖 Saved Jobs</button>
        </Link>
      </div>

      <div className="search-box">
        <SearchBar query={query} setQuery={setQuery} onSearch={() => fetchJobs(query)} />
        <Filter filter={filter} setFilter={setFilter} />
      </div>

      <Status text={status} />

      {jobs.length > 0 && <p className="job-count">Showing {filteredJobs.length} jobs</p>}

      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default App;

