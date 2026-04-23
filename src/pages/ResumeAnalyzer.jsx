import { useState } from "react";
import { Link } from "react-router-dom";

function ResumeAnalyzer() {
  const [jobDesc, setJobDesc] = useState("");
  const [resume, setResume] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = () => {
    if (!jobDesc || !resume) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const jobWords = jobDesc.toLowerCase().split(/\s+/);
      const resumeText = resume.toLowerCase();

      const commonSkills = [
        "react", "javascript", "python", "node", "html", "css", "java",
        "sql", "mongodb", "express", "typescript", "git", "api", "rest",
        "redux", "bootstrap", "tailwind", "firebase", "aws", "docker",
        "c++", "c#", "flutter", "kotlin", "swift", "php", "mysql",
        "postgresql", "graphql", "next", "vue", "angular", "figma",
        "linux", "agile", "scrum", "machine learning", "data science",
        "excel", "communication", "teamwork", "problem solving"
      ];

      const matched = [];
      const missing = [];

      commonSkills.forEach(skill => {
        const inJob = jobWords.some(w => w.includes(skill) || skill.includes(w));
        const inResume = resumeText.includes(skill);
        if (inJob && inResume) matched.push(skill);
        else if (inJob && !inResume) missing.push(skill);
      });

      jobWords.forEach(word => {
        if (word.length > 4 && !commonSkills.includes(word)) {
          if (resumeText.includes(word)) {
            if (!matched.includes(word)) matched.push(word);
          } else {
            if (!missing.includes(word) && missing.length < 6) missing.push(word);
          }
        }
      });

      const total = matched.length + missing.length;
      const score = total === 0 ? 50 : Math.round((matched.length / total) * 100);

      const suggestions = [
        "Add more relevant keywords from the job description to pass ATS filters.",
        "Quantify your achievements with numbers — e.g. 'Improved performance by 40%'.",
        "Highlight your most relevant projects at the top of your resume.",
        "Tailor your resume summary to match the exact role you are applying for.",
      ];

      setResult({
        matchScore: score,
        matchedSkills: matched.slice(0, 8),
        missingSkills: missing.slice(0, 6),
        suggestion: suggestions[Math.floor(Math.random() * suggestions.length)]
      });

      setLoading(false);
    }, 1500);
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "#10b981";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="analyzer-container">
      <div className="tracker-header">
        <h1>🤖 AI Resume Analyzer</h1>
        <p>Paste your resume and job description to get an AI match score</p>
        <Link to="/"><button className="back-btn">← Back to Jobs</button></Link>
      </div>

      <div className="analyzer-grid">
        <div className="analyzer-box">
          <label>📋 Job Description</label>
          <textarea
            className="analyzer-textarea"
            placeholder="Paste the job description here..."
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
          />
        </div>

        <div className="analyzer-box">
          <label>📄 Your Resume</label>
          <textarea
            className="analyzer-textarea"
            placeholder="Paste your resume text here..."
            value={resume}
            onChange={e => setResume(e.target.value)}
          />
        </div>
      </div>

      <button
        className="analyze-btn"
        onClick={analyzeResume}
        disabled={loading || !jobDesc || !resume}>
        {loading ? "🔄 Analyzing..." : "🚀 Analyze Match"}
      </button>

      {result && !result.error && (
        <div className="result-card">
          <div className="score-circle"
            style={{ borderColor: getScoreColor(result.matchScore) }}>
            <h2 style={{ color: getScoreColor(result.matchScore) }}>
              {result.matchScore}%
            </h2>
            <p>Match Score</p>
          </div>

          <div className="result-grid">
            <div className="result-section">
              <h3>✅ Matched Skills</h3>
              <div className="skills-list">
                {result.matchedSkills.length > 0 ? result.matchedSkills.map((skill, i) => (
                  <span key={i} className="skill-tag matched">{skill}</span>
                )) : <p style={{color:"#888"}}>No matches found</p>}
              </div>
            </div>

            <div className="result-section">
              <h3>❌ Missing Skills</h3>
              <div className="skills-list">
                {result.missingSkills.length > 0 ? result.missingSkills.map((skill, i) => (
                  <span key={i} className="skill-tag missing">{skill}</span>
                )) : <p style={{color:"#888"}}>No missing skills!</p>}
              </div>
            </div>
          </div>

          <div className="suggestion-box">
            <h3>💡 Suggestion</h3>
            <p>{result.suggestion}</p>
          </div>
        </div>
      )}

      {result?.error && (
        <p className="auth-error">{result.error}</p>
      )}
    </div>
  );
}

export default ResumeAnalyzer;