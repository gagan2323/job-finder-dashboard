import { useState, useEffect } from "react";
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

  // Load default jobs on startup
  useEffect(() => {
    fetchJobs("developer");
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      (filter === "" ||
        job.category.toLowerCase().includes(filter.toLowerCase())) &&
      job.title.toLowerCase().includes(query.toLowerCase())
  );

  const quickSearches = [
    "React", "Python", "JavaScript", "Node.js",
    "UI/UX", "Data Science", "DevOps", "Flutter"
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>💼 Job Finder 🚀</h1>
        <p className="subtitle">Find your dream remote job in seconds</p>
        <Link to="/saved">
          <button className="saved-btn">💖 Saved Jobs</button>
        </Link>
      </div>

      <div className="search-box">
        <SearchBar query={query} setQuery={setQuery} onSearch={() => fetchJobs(query)} />
        <Filter filter={filter} setFilter={setFilter} />
      </div>

      {/* Quick Search Tags */}
      <div className="quick-searches">
        {quickSearches.map(tag => (
          <button
            key={tag}
            className="tag-btn"
            onClick={() => { setQuery(tag); fetchJobs(tag); }}
          >
            {tag}
          </button>
        ))}
      </div>

      <Status text={status} />

      {jobs.length > 0 && (
        <p className="job-count">✅ Showing {filteredJobs.length} jobs</p>
      )}

      {/* Two column layout */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="sidebar-card">
            <h3>🔥 Trending Roles</h3>
            {["React Developer", "Python Engineer", "Data Scientist",
              "DevOps Engineer", "UI Designer", "Node.js Dev"].map(role => (
              <p key={role}
                className="trending-item"
                onClick={() => { setQuery(role); fetchJobs(role); }}
              >
                → {role}
              </p>
            ))}
          </div>

          <div className="sidebar-card">
            <h3>💡 Tips</h3>
            <p>✅ Search by skill or role</p>
            <p>✅ Save jobs you like</p>
            <p>✅ Use AI Match to check fit</p>
            <p>✅ Click Apply to go live</p>
          </div>
        </div>

        {/* Job List */}
        <div className="jobs-area">
          <JobList jobs={filteredJobs} />
        </div>
      </div>
    </div>
  );
}

export default App;