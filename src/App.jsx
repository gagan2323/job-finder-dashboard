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
      <h1>Job Finder 🚀</h1>

      <Link to="/saved">
        <button>Saved Jobs 💖</button>
      </Link>

      <SearchBar query={query} setQuery={setQuery} onSearch={() => fetchJobs(query)} />

      <Filter filter={filter} setFilter={setFilter} />

      <Status text={status} />

      <p>Showing {filteredJobs.length} jobs</p>

      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default App;

