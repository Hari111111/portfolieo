"use client";

import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

type AIToolType = "email" | "blog" | "resume" | "settings";

export default function AITools() {
  const [activeTool, setActiveTool] = useState<AIToolType>("email");
  const [apiKey, setApiKey] = useState("");
  const [showKeyNeeded, setShowKeyNeeded] = useState(false);

  // Load API key from local storage
  useEffect(() => {
    const saved = localStorage.getItem("gemini_api_key");
    if (saved) setApiKey(saved);
  }, []);

  const saveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("gemini_api_key", key);
    setShowKeyNeeded(false);
  };

  const getAI = () => {
    if (!apiKey) {
      setShowKeyNeeded(true);
      return null;
    }
    return new GoogleGenerativeAI(apiKey);
  };

  return (
    <div className="ai-root">
      <style>{`
        :root {
          --ai-bg: #050507;
          --ai-surface: #0f1115;
          --ai-card: #161a20;
          --ai-accent: #8b5cf6;
          --ai-accent-hover: #7c3aed;
          --ai-text: #f1f5f9;
          --ai-muted: #94a3b8;
          --ai-border: #1e293b;
          --ai-success: #10b981;
          --ai-premium-gradient: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        }

        .ai-root {
          min-height: 100vh;
          background: var(--ai-bg);
          color: var(--ai-text);
          padding: 4rem 1.5rem;
          font-family: 'Inter', sans-serif;
        }

        .ai-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .ai-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .ai-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 99px;
          color: var(--ai-accent);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .ai-header h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(to bottom, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ai-header p {
          color: var(--ai-muted);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .ai-nav {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          background: var(--ai-surface);
          padding: 0.5rem;
          border-radius: 16px;
          border: 1px solid var(--ai-border);
          overflow-x: auto;
          scrollbar-width: none;
        }

        .ai-nav-item {
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          color: var(--ai-muted);
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ai-nav-item:hover {
          color: var(--ai-text);
          background: rgba(255,255,255,0.03);
        }

        .ai-nav-item.active {
          background: var(--ai-premium-gradient);
          color: white;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }

        .ai-content {
          background: var(--ai-surface);
          border: 1px solid var(--ai-border);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
        }

        .ai-content::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--ai-premium-gradient);
          opacity: 0.5;
        }

        .ai-form-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr;
        }

        @media (min-width: 850px) {
          .ai-form-grid { grid-template-columns: 350px 1fr; }
        }

        .input-stack {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .ai-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--ai-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: block;
        }

        .ai-input, .ai-select, .ai-textarea {
          width: 100%;
          background: var(--ai-bg);
          border: 1px solid var(--ai-border);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          color: var(--ai-text);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s;
        }

        .ai-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .ai-input:focus, .ai-select:focus, .ai-textarea:focus {
          border-color: var(--ai-accent);
          background: rgba(139, 92, 246, 0.02);
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
        }

        .ai-btn {
          width: 100%;
          padding: 1rem;
          background: var(--ai-premium-gradient);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .ai-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .ai-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
        }

        .ai-result-panel {
          background: var(--ai-bg);
          border: 1px solid var(--ai-border);
          border-radius: 16px;
          padding: 1.5rem;
          height: 100%;
          min-height: 450px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .ai-result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--ai-border);
        }

        .ai-result-content {
          flex: 1;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--ai-text);
          white-space: pre-wrap;
          font-family: 'Inter', sans-serif;
          overflow-y: auto;
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: var(--ai-accent);
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 1s infinite;
        }

        @keyframes blink { 50% { opacity: 0; } }

        .ai-empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--ai-muted);
          text-align: center;
          gap: 1rem;
        }

        .ai-empty-icon {
          font-size: 3.5rem;
          opacity: 0.15;
          margin-bottom: 0.5rem;
        }

        .copy-btn {
          background: transparent;
          border: 1px solid var(--ai-border);
          color: var(--ai-muted);
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          border-color: var(--ai-accent);
          color: var(--ai-text);
          background: rgba(139, 92, 246, 0.05);
        }

        .key-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
        }

        .key-modal {
          background: var(--ai-surface);
          border: 1px solid var(--ai-border);
          padding: 2.5rem;
          border-radius: 24px;
          max-width: 450px;
          width: 100%;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        }

        .key-modal h2 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: white;
        }

        .key-modal p {
          font-size: 0.9rem;
          color: var(--ai-muted);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        /* Loading Spinner */
        .spinner {
          width: 24px; height: 24px;
          border: 3px solid rgba(139, 92, 246, 0.2);
          border-top-color: var(--ai-accent);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .api-status {
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.5rem;
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; }
      `}</style>

      <div className="ai-container">
        <header className="ai-header">
          <div className="ai-badge">Google Gemini Powered</div>
          <h1>Generate Content with AI</h1>
          <p>Real AI generation for emails, blogs, and resumes. Faster than humanly possible.</p>
          <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'center'}}>
            <div className="api-status" style={{color: apiKey ? 'var(--ai-success)' : 'var(--ai-muted)'}}>
              <div className="status-dot" style={{background: apiKey ? 'var(--ai-success)' : 'var(--ai-muted)'}} />
              {apiKey ? "API Key Connected" : "API Key Required"}
            </div>
            <button 
              onClick={() => setActiveTool("settings")}
              style={{background: 'none', border: 'none', color: 'var(--ai-accent)', fontSize: '0.7rem', marginLeft: '1rem', cursor: 'pointer', textDecoration: 'underline'}}
            >
              {apiKey ? "Update Key" : "Add Key"}
            </button>
          </div>
        </header>

        <nav className="ai-nav">
          <button className={`ai-nav-item ${activeTool === "email" ? "active" : ""}`} onClick={() => setActiveTool("email")}>📧 Email Writer</button>
          <button className={`ai-nav-item ${activeTool === "blog" ? "active" : ""}`} onClick={() => setActiveTool("blog")}>✍️ Blog Headlines</button>
          <button className={`ai-nav-item ${activeTool === "resume" ? "active" : ""}`} onClick={() => setActiveTool("resume")}>👔 Resume Builder</button>
          <button className={`ai-nav-item ${activeTool === "settings" ? "active" : ""}`} onClick={() => setActiveTool("settings")}>⚙️ Settings</button>
        </nav>

        <main className="ai-content">
          {activeTool === "email" && <EmailWriter getAI={getAI} />}
          {activeTool === "blog" && <BlogTitleGen getAI={getAI} />}
          {activeTool === "resume" && <ResumeGen getAI={getAI} />}
          {activeTool === "settings" && <SettingsTool currentKey={apiKey} onSave={saveKey} />}
        </main>
      </div>

      {showKeyNeeded && (
        <div className="key-modal-overlay">
          <div className="key-modal">
            <h2>API Key Required</h2>
            <p>To use real AI generation, you need a Google Gemini API Key. It's free to get from Google AI Studio.</p>
            <input 
              type="password" 
              className="ai-input" 
              placeholder="Enter Gemini API Key..." 
              value={apiKey} 
              onChange={e => setApiKey(e.target.value)}
              style={{marginBottom: '1rem'}}
            />
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <button className="ai-btn" onClick={() => saveKey(apiKey)}>Update & Continue</button>
              <button className="copy-btn" onClick={() => setShowKeyNeeded(false)} style={{width: 'auto', padding: '0 1.5rem'}}>Cancel</button>
            </div>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer" 
              style={{display: 'block', marginTop: '1.5rem', color: 'var(--ai-accent)', fontSize: '0.8rem'}}
            >
              Get a free API key here →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
//  AI Tool Components
// ─────────────────────────────────────────

interface ToolProps {
  getAI: () => GoogleGenerativeAI | null;
}

function EmailWriter({ getAI }: ToolProps) {
  const [inputs, setInputs] = useState({ recipient: "", context: "", tone: "Professional" });
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async () => {
    const ai = getAI();
    if (!ai) return;

    setIsGenerating(true);
    setResult("");
    
    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Write a ${inputs.tone} email to ${inputs.recipient || "someone"}. Context: ${inputs.context}. Include a clear subject line and a professional closing. Keep it concise but effective.`;
      
      const res = await model.generateContentStream(prompt);
      let text = "";
      for await (const chunk of res.stream) {
        text += chunk.text();
        setResult(text);
      }
    } catch (err) {
      setResult("Error generating email. Please check your API key and network.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-form-grid">
      <div className="input-stack">
        <div>
          <label className="ai-label">Recipient</label>
          <input className="ai-input" placeholder="e.g. Hiring Manager" value={inputs.recipient} onChange={e => setInputs({...inputs, recipient: e.target.value})} />
        </div>
        <div>
          <label className="ai-label">Context / Message</label>
          <textarea className="ai-textarea" placeholder="What is the email about?" value={inputs.context} onChange={e => setInputs({...inputs, context: e.target.value})} />
        </div>
        <div>
          <label className="ai-label">Tone</label>
          <select className="ai-select" value={inputs.tone} onChange={e => setInputs({...inputs, tone: e.target.value})}>
            <option>Professional</option>
            <option>Friendly</option>
            <option>Direct</option>
            <option>Creative</option>
          </select>
        </div>
        <button className="ai-btn" onClick={generate} disabled={isGenerating || !inputs.context}>
          {isGenerating ? <div className="spinner" /> : "Generate Real AI Email"}
        </button>
      </div>

      <div className="ai-result-panel">
        <div className="ai-result-header">
          <span className="ai-label">AI Output</span>
          {result && !isGenerating && <button className="copy-btn" onClick={() => navigator.clipboard.writeText(result)}>Copy</button>}
        </div>
        <div className="ai-result-content">
          {result || (isGenerating ? "" : <DefaultEmpty icon="✉️" text="Your AI email will appear here..." />)}
          {isGenerating && <span className="typing-cursor" />}
        </div>
      </div>
    </div>
  );
}

function BlogTitleGen({ getAI }: ToolProps) {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async () => {
    const ai = getAI();
    if (!ai) return;

    setIsGenerating(true);
    setResult("");
    
    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate 6 catchy, viral-style blog headlines for the topic: "${topic}". Make them engaging and SEO-friendly. List them clearly.`;
      
      const res = await model.generateContentStream(prompt);
      let text = "";
      for await (const chunk of res.stream) {
        text += chunk.text();
        setResult(text);
      }
    } catch (err) {
      setResult("Error generating titles.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-form-grid">
      <div className="input-stack">
        <div>
          <label className="ai-label">Topic / Keywords</label>
          <textarea className="ai-textarea" placeholder="e.g. Next.js 15, Vegan Diet, Space Travel" value={topic} onChange={e => setTopic(e.target.value)} />
        </div>
        <button className="ai-btn" onClick={generate} disabled={isGenerating || !topic}>
          {isGenerating ? <div className="spinner" /> : "Generate Viral Headlines"}
        </button>
      </div>

      <div className="ai-result-panel">
        <div className="ai-result-header">
          <span className="ai-label">AI Headlines</span>
          {result && !isGenerating && <button className="copy-btn" onClick={() => navigator.clipboard.writeText(result)}>Copy List</button>}
        </div>
        <div className="ai-result-content">
          {result || (isGenerating ? "" : <DefaultEmpty icon="✍️" text="Enter a topic to generate catch headlines..." />)}
          {isGenerating && <span className="typing-cursor" />}
        </div>
      </div>
    </div>
  );
}

function ResumeGen({ getAI }: ToolProps) {
  const [inputs, setInputs] = useState({ name: "", job: "", skills: "" });
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async () => {
    const ai = getAI();
    if (!ai) return;

    setIsGenerating(true);
    setResult("");
    
    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Create a professional resume summary and structured sections for ${inputs.name || "a candidate"} applying for the role of ${inputs.job}. Highlight these skills: ${inputs.skills}. Include sections for Summary, Key Skills (expanded), Experience (placeholders), and Education. Use a professional, modern tone.`;
      
      const res = await model.generateContentStream(prompt);
      let text = "";
      for await (const chunk of res.stream) {
        text += chunk.text();
        setResult(text);
      }
    } catch (err) {
      setResult("Error generating resume.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-form-grid">
      <div className="input-stack">
        <div>
          <label className="ai-label">Full Name</label>
          <input className="ai-input" value={inputs.name} onChange={e => setInputs({...inputs, name: e.target.value})} />
        </div>
        <div>
          <label className="ai-label">Target Role</label>
          <input className="ai-input" value={inputs.job} onChange={e => setInputs({...inputs, job: e.target.value})} />
        </div>
        <div>
          <label className="ai-label">Key Skills</label>
          <textarea className="ai-textarea" value={inputs.skills} onChange={e => setInputs({...inputs, skills: e.target.value})} placeholder="React, Python, Management, etc." />
        </div>
        <button className="ai-btn" onClick={generate} disabled={isGenerating || !inputs.job}>
          {isGenerating ? <div className="spinner" /> : "Construct AI Resume"}
        </button>
      </div>

      <div className="ai-result-panel">
        <div className="ai-result-header">
          <span className="ai-label">AI Resume Draft</span>
          {result && !isGenerating && <button className="copy-btn" onClick={() => navigator.clipboard.writeText(result)}>Copy Resume</button>}
        </div>
        <div className="ai-result-content" style={{fontSize: '0.85rem'}}>
          {result || (isGenerating ? "" : <DefaultEmpty icon="👔" text="Fill details to generate a professional resume outline..." />)}
          {isGenerating && <span className="typing-cursor" />}
        </div>
      </div>
    </div>
  );
}

function SettingsTool({ currentKey, onSave }: { currentKey: string; onSave: (k: string) => void }) {
  const [val, setVal] = useState(currentKey);
  const [saved, setSaved] = useState(false);

  return (
    <div style={{maxWidth: '500px', margin: '0 auto', textAlign: 'center'}}>
      <div className="ai-badge" style={{marginBottom: '2rem'}}>Configuration</div>
      <h2 style={{marginBottom: '1rem'}}>AI Settings</h2>
      <p style={{color: 'var(--ai-muted)', marginBottom: '2.5rem', fontSize: '0.9rem'}}>
        This application uses <strong>Google Gemini</strong> to generate content. 
        Your API key is stored locally in your browser and is never sent to any other server.
      </p>

      <div className="input-stack" style={{textAlign: 'left'}}>
        <div>
          <label className="ai-label">Gemini API Key</label>
          <input 
            type="password" 
            className="ai-input" 
            value={val} 
            onChange={e => { setVal(e.target.value); setSaved(false); }} 
            placeholder="AIzaSy..."
          />
        </div>
        <button className="ai-btn" onClick={() => { onSave(val); setSaved(true); }}>
          {saved ? "Key Saved! ✓" : "Save Changes"}
        </button>
        <a 
          href="https://aistudio.google.com/app/apikey" 
          target="_blank" 
          rel="noreferrer" 
          style={{textAlign: 'center', marginTop: '1rem', color: 'var(--ai-accent)', fontSize: '0.8rem'}}
        >
          Get your free API key from Google AI Studio →
        </a>
      </div>
    </div>
  );
}

function DefaultEmpty({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="ai-empty-state">
      <div className="ai-empty-icon">{icon}</div>
      <p>{text}</p>
    </div>
  );
}
