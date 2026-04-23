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

  useEffect(() => {
    fetchJobs("developer");
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchFilter = filter === "" ||
      job.category?.toLowerCase().includes(filter.toLowerCase());
    const matchQuery = query === "" ||
      job.title?.toLowerCase().includes(query.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(query.toLowerCase()) ||
      job.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()));
    return matchFilter && matchQuery;
  });

  const quickSearches = ["React", "Python", "JavaScript", "Node.js", "UI/UX", "Data Science", "DevOps", "Flutter", "AI", "Java"];

  const trendingRoles = [
    "React Developer", "Python Engineer", "Data Scientist",
    "DevOps Engineer", "UI Designer", "Node.js Developer",
    "AI Engineer", "Java Developer", "Product Manager", "Flutter Developer"
  ];

  const handleTrendingClick = (role) => {
    setQuery(role);
    fetchJobs(role);
  };

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

      <div className="quick-searches">
        {quickSearches.map(tag => (
          <button key={tag} className="tag-btn"
            onClick={() => { setQuery(tag); fetchJobs(tag); }}>
            {tag}
          </button>
        ))}
      </div>

      <Status text={status} />

      {jobs.length > 0 && (
        <p className="job-count">✅ Showing {filteredJobs.length} of {jobs.length} jobs</p>
      )}

      <div className="main-layout">
        <div className="sidebar">
          <div className="sidebar-card">
            <h3>🔥 Trending Roles</h3>
            {trendingRoles.map(role => (
              <p key={role} className="trending-item"
                onClick={() => handleTrendingClick(role)}>
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

        <div className="jobs-area">
          <JobList jobs={filteredJobs} />
        </div>
      </div>
    </div>
  );
}

export default App;