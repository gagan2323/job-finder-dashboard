import { useState } from "react";
import { Link } from "react-router-dom";

function ResumeAnalyzer() {
  const [jobDesc, setJobDesc] = useState("");
  const [resume, setResume] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!jobDesc || !resume) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {  method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a professional HR expert. Analyze this resume against the job description.

Job Description:
${jobDesc}

Resume:
${resume}

Respond ONLY in this JSON format, no extra text, no backticks:
{
  "matchScore": <number 0-100>,
  "matchedSkills": [<list of matching skills>],
  "missingSkills": [<list of missing skills>],
  "suggestion": "<2-3 line improvement tip>"
}`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (err) {
      setResult({ error: "Something went wrong. Please try again." });
    }

    setLoading(false);
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
          {/* Score */}
          <div className="score-circle"
            style={{ borderColor: getScoreColor(result.matchScore) }}>
            <h2 style={{ color: getScoreColor(result.matchScore) }}>
              {result.matchScore}%
            </h2>
            <p>Match Score</p>
          </div>

          <div className="result-grid">
            {/* Matched Skills */}
            <div className="result-section">
              <h3>✅ Matched Skills</h3>
              <div className="skills-list">
                {result.matchedSkills.map((skill, i) => (
                  <span key={i} className="skill-tag matched">{skill}</span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="result-section">
              <h3>❌ Missing Skills</h3>
              <div className="skills-list">
                {result.missingSkills.map((skill, i) => (
                  <span key={i} className="skill-tag missing">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Suggestion */}
          <div className="suggestion-box">
            <h3>💡 AI Suggestion</h3>
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