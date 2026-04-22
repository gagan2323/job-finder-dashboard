import { useState } from "react";

export default function ResumeAnalyzer({ job }) {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!resume) return alert("Paste your resume first!");
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a career advisor. Analyze how well this resume matches the job.

JOB TITLE: ${job.title}
COMPANY: ${job.company_name}
JOB DESCRIPTION: ${job.description?.substring(0, 500)}

RESUME:
${resume}

Give:
1. Match Score (out of 10)
2. Top 3 matching skills
3. Top 3 missing skills
4. One tip to improve resume for this job

Keep response short and clear.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      setResult(data.candidates[0].content.parts[0].text);
    } catch (err) {
      setResult("Error analyzing. Check your API key.");
    }
    setLoading(false);
  };

  return (
    <div className="analyzer">
      <h4>🤖 AI Resume Analyzer</h4>
      <textarea
        placeholder="Paste your resume here..."
        value={resume}
        onChange={e => setResume(e.target.value)}
        rows={5}
        style={{
          width: "100%", padding: "8px",
          borderRadius: "8px", border: "1px solid #ccc",
          marginBottom: "8px", fontSize: "13px"
        }}
      />
      <button onClick={analyze} disabled={loading}>
        {loading ? "⏳ Analyzing..." : "🔍 Analyze My Resume"}
      </button>
      {result && (
        <div style={{
          marginTop: "10px", background: "#f0f4ff",
          padding: "12px", borderRadius: "8px",
          whiteSpace: "pre-wrap", fontSize: "14px",
          lineHeight: "1.6"
        }}>
          {result}
        </div>
      )}
    </div>
  );
}