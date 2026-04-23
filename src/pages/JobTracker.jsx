import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const STATUS_COLORS = {
  "Applied": "#7c3aed",
  "Interview": "#f59e0b",
  "Offered": "#10b981",
  "Rejected": "#ef4444",
};

function JobTracker() {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("applications");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    company: "", role: "", date: "", status: "Applied", notes: ""
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const handleAdd = () => {
    if (!form.company || !form.role) return;
    setApplications([...applications, { ...form, id: Date.now() }]);
    setForm({ company: "", role: "", date: "", status: "Applied", notes: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const counts = {
    Applied: applications.filter(a => a.status === "Applied").length,
    Interview: applications.filter(a => a.status === "Interview").length,
    Offered: applications.filter(a => a.status === "Offered").length,
    Rejected: applications.filter(a => a.status === "Rejected").length,
  };

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h1>📋 Job Application Tracker</h1>
        <p>Track all your job applications in one place</p>
        <Link to="/"><button className="back-btn">← Back to Jobs</button></Link>
      </div>

      {/* Stats */}
      <div className="tracker-stats">
        {Object.entries(counts).map(([status, count]) => (
          <div className="stat-card" key={status}
            style={{ borderColor: STATUS_COLORS[status] }}>
            <h3 style={{ color: STATUS_COLORS[status] }}>{count}</h3>
            <p>{status}</p>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button className="add-app-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "✕ Cancel" : "+ Add Application"}
      </button>

      {/* Form */}
      {showForm && (
        <div className="tracker-form">
          <input className="auth-input" placeholder="Company Name *"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })} />
          <input className="auth-input" placeholder="Job Role *"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })} />
          <input className="auth-input" type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })} />
          <select className="auth-input"
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offered</option>
            <option>Rejected</option>
          </select>
          <input className="auth-input" placeholder="Notes (optional)"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })} />
          <button className="auth-btn" onClick={handleAdd}>
            ✅ Save Application
          </button>
        </div>
      )}

      {/* Table */}
      {applications.length === 0 ? (
        <div className="empty-tracker">
          <p>No applications yet. Add your first one! 🚀</p>
        </div>
      ) : (
        <div className="tracker-table-wrapper">
          <table className="tracker-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Date</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td><strong>{app.company}</strong></td>
                  <td>{app.role}</td>
                  <td>{app.date || "—"}</td>
                  <td>
                    <select
                      className="status-select"
                      style={{ color: STATUS_COLORS[app.status], borderColor: STATUS_COLORS[app.status] }}
                      value={app.status}
                      onChange={e => handleStatusChange(app.id, e.target.value)}>
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Offered</option>
                      <option>Rejected</option>
                    </select>
                  </td>
                  <td>{app.notes || "—"}</td>
                  <td>
                    <button className="delete-btn"
                      onClick={() => handleDelete(app.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default JobTracker;