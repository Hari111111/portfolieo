"use client";

import React, { useState, useRef } from "react";
import imageCompression from 'browser-image-compression';

type ToolType = "json" | "base64" | "password" | "regex" | "compressor" | "bg-remover";

export default function CodeTools() {
  const [activeTool, setActiveTool] = useState<ToolType>("json");

  return (
    <div className="tools-root">
      <style>{`
        :root {
          --tools-bg: #0b0e14;
          --tools-surface: #151921;
          --tools-card: #1c232d;
          --tools-accent: #3b82f6;
          --tools-accent-hover: #2563eb;
          --tools-text: #e2e8f0;
          --tools-muted: #94a3b8;
          --tools-border: #2d3748;
          --tools-success: #10b981;
          --tools-error: #ef4444;
        }

        .tools-root {
          min-height: 100vh;
          background: var(--tools-bg);
          color: var(--tools-text);
          padding: 4rem 1.5rem;
          font-family: 'Inter', sans-serif;
        }

        .tools-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .tools-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .tools-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tools-header p {
          color: var(--tools-muted);
          font-size: 1.1rem;
        }

        .tools-nav {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          background: var(--tools-surface);
          padding: 0.5rem;
          border-radius: 12px;
          border: 1px solid var(--tools-border);
          overflow-x: auto;
          scrollbar-width: thin;
        }

        .tool-nav-item {
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          white-space: nowrap;
          color: var(--tools-muted);
          border: none;
          background: transparent;
        }

        .tool-nav-item:hover {
          color: var(--tools-text);
          background: rgba(255,255,255,0.05);
        }

        .tool-nav-item.active {
          background: var(--tools-accent);
          color: white;
        }

        .tool-content {
          background: var(--tools-surface);
          border: 1px solid var(--tools-border);
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .tools-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr;
        }

        @media (min-width: 768px) {
          .tools-grid { grid-template-columns: 1fr 1fr; }
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .input-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--tools-muted);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tools-textarea {
          width: 100%;
          min-height: 300px;
          background: var(--tools-bg);
          border: 1px solid var(--tools-border);
          border-radius: 8px;
          padding: 1rem;
          color: #10b981; /* Default code green */
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          resize: vertical;
          outline: none;
          transition: border-color 0.2s;
        }

        .tools-textarea:focus {
          border-color: var(--tools-accent);
        }

        .tools-btn {
          padding: 0.75rem 1.5rem;
          background: var(--tools-accent);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .tools-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tools-btn:hover:not(:disabled) {
          background: var(--tools-accent-hover);
        }

        .tools-btn-secondary {
          background: var(--tools-border);
          color: var(--tools-text);
        }

        .tools-btn-secondary:hover {
          background: #3d495d;
        }

        .action-bar {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        /* Image Tools Styles */
        .image-dropzone {
          border: 2px dashed var(--tools-border);
          border-radius: 12px;
          padding: 3rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255,255,255,0.02);
        }

        .image-dropzone:hover {
          border-color: var(--tools-accent);
          background: rgba(59, 130, 246, 0.05);
        }

        .image-preview-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        @media (min-width: 768px) {
          .image-preview-container { grid-template-columns: 1fr 1fr; }
        }

        .image-preview-box {
          background: var(--tools-bg);
          border-radius: 12px;
          padding: 1rem;
          border: 1px solid var(--tools-border);
          text-align: center;
        }

        .image-preview-box img {
          max-width: 100%;
          max-height: 300px;
          border-radius: 8px;
          margin-bottom: 1rem;
          object-fit: contain;
        }

        .image-stats {
          font-size: 0.85rem;
          color: var(--tools-muted);
          margin-top: 0.5rem;
        }

        /* Password Gen Styles */
        .pass-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          cursor: pointer;
        }

        .pass-result {
          background: var(--tools-bg);
          padding: 1.5rem;
          border-radius: 8px;
          font-size: 1.5rem;
          font-family: monospace;
          text-align: center;
          word-break: break-all;
          border: 1px dashed var(--tools-border);
          margin-bottom: 1.5rem;
          color: var(--tools-accent);
        }

        /* Regex Styles */
        .regex-match {
          background: rgba(16, 185, 129, 0.2);
          border-bottom: 2px solid #10b981;
        }

        /* Loading Spinner */
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="tools-container">
        <header className="tools-header">
          <h1>Online Code & Image Tools</h1>
          <p>Essential utilities for developers and designers in one place.</p>
        </header>

        <nav className="tools-nav">
          <button className={`tool-nav-item ${activeTool === "json" ? "active" : ""}`} onClick={() => setActiveTool("json")}>JSON Formatter</button>
          <button className={`tool-nav-item ${activeTool === "compressor" ? "active" : ""}`} onClick={() => setActiveTool("compressor")}>Image Compressor</button>
          <button className={`tool-nav-item ${activeTool === "bg-remover" ? "active" : ""}`} onClick={() => setActiveTool("bg-remover")}>BG Remover</button>
          <button className={`tool-nav-item ${activeTool === "base64" ? "active" : ""}`} onClick={() => setActiveTool("base64")}>Base64 Tool</button>
          <button className={`tool-nav-item ${activeTool === "password" ? "active" : ""}`} onClick={() => setActiveTool("password")}>Password Gen</button>
          <button className={`tool-nav-item ${activeTool === "regex" ? "active" : ""}`} onClick={() => setActiveTool("regex")}>Regex Tester</button>
        </nav>

        <main className="tool-content">
          {activeTool === "json" && <JsonFormatter />}
          {activeTool === "compressor" && <ImageCompressor />}
          {activeTool === "bg-remover" && <BgRemover />}
          {activeTool === "base64" && <Base64Tool />}
          {activeTool === "password" && <PasswordGenerator />}
          {activeTool === "regex" && <RegexTester />}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  Image Tool Components
// ─────────────────────────────────────────

function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setCompressedFile(null);
    setCompressedPreview("");
  };

  const compress = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: maxWidth,
        useWebWorker: true,
        initialQuality: quality,
      };
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
      setCompressedPreview(URL.createObjectURL(compressed));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!compressedFile) return;
    const link = document.createElement('a');
    link.href = compressedPreview;
    link.download = `compressed_${file?.name}`;
    link.click();
  };

  return (
    <div className="input-group">
      <div className="input-label">Image Compressor & Resizer</div>
      {!preview ? (
        <label className="image-dropzone">
          <input type="file" accept="image/*" hidden onChange={handleFile} />
          <div>📁 Click to upload or drag image</div>
        </label>
      ) : (
        <>
          <div className="tools-grid">
            <div className="input-group">
              <div className="input-label">Quality ({Math.round(quality * 100)}%)</div>
              <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} />
            </div>
            <div className="input-group">
              <div className="input-label">Max Width (px)</div>
              <input 
                className="tools-textarea" 
                style={{minHeight: 'auto', padding: '0.5rem'}} 
                type="number" 
                value={maxWidth} 
                onChange={(e) => setMaxWidth(parseInt(e.target.value))} 
              />
            </div>
          </div>

          <div className="image-preview-container">
            <div className="image-preview-box">
              <div className="input-label">Original</div>
              <img src={preview} alt="Original" />
              <div className="image-stats">
                Size: {(file!.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
            {compressedPreview && (
              <div className="image-preview-box">
                <div className="input-label">Compressed</div>
                <img src={compressedPreview} alt="Compressed" />
                <div className="image-stats">
                  Size: {(compressedFile!.size / 1024 / 1024).toFixed(2)} MB
                  <span style={{color: 'var(--tools-success)', marginLeft: '0.5rem'}}>
                    (-{Math.round((1 - compressedFile!.size / file!.size) * 100)}%)
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="action-bar" style={{justifyContent: 'center'}}>
            <button className="tools-btn" onClick={compress} disabled={loading}>
              {loading ? <div className="spinner" /> : "Compress Image"}
            </button>
            {compressedPreview && (
              <button className="tools-btn tools-btn-secondary" onClick={download}>Download</button>
            )}
            <button className="tools-btn tools-btn-secondary" onClick={() => { setFile(null); setPreview(""); setCompressedPreview(""); }}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
}

function BgRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult("");
  };

  const removeBg = async () => {
    if (!file) return;
    setLoading(true);
    try {
      // Import dynamically to avoid SSR issues and heavy bundle on main page
      const { removeBackground } = await import('@imgly/background-removal');
      const blob = await removeBackground(file);
      setResult(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("Error removing background. Please try a different image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-group">
      <div className="input-label">Background Remover (AI Powered)</div>
      {!preview ? (
        <label className="image-dropzone">
          <input type="file" accept="image/*" hidden onChange={handleFile} />
          <div>👤 Upload Portrait or Object</div>
        </label>
      ) : (
        <>
          <div className="image-preview-container">
            <div className="image-preview-box">
              <div className="input-label">Original</div>
              <img src={preview} alt="Original" />
            </div>
            {result && (
              <div className="image-preview-box">
                <div className="input-label">Result</div>
                <img src={result} alt="Result" style={{background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3MIP4BMAZ4AAMOCjOP8PAn688v8PaMBY6BgEAn78YMBY6BkAAD6UBy7UA27+AAAAAElFTkSuQmCC")'}} />
              </div>
            )}
          </div>

          <div className="action-bar" style={{justifyContent: 'center'}}>
            {!result ? (
              <button className="tools-btn" onClick={removeBg} disabled={loading}>
                {loading ? <div className="spinner" /> : "Remove Background"}
              </button>
            ) : (
              <button className="tools-btn" onClick={() => {
                const link = document.createElement('a');
                link.href = result;
                link.download = `no-bg_${file?.name}`;
                link.click();
              }}>Download PNG</button>
            )}
            <button className="tools-btn tools-btn-secondary" onClick={() => { setFile(null); setPreview(""); setResult(""); }}>Reset</button>
          </div>
          {loading && <p style={{textAlign: 'center', color: 'var(--tools-muted)', fontSize: '0.8rem', marginTop: '1rem'}}>Processing... This may take a few seconds as the AI model loads.</p>}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
//  Code Tool Components
// ─────────────────────────────────────────

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const minify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="input-group">
      <div className="input-label">
        Input JSON {error && <span style={{ color: "var(--tools-error)" }}>Invalid JSON</span>}
      </div>
      <textarea
        className="tools-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Paste your JSON here...'
      />
      <div className="action-bar">
        <button className="tools-btn" onClick={format}>Format JSON</button>
        <button className="tools-btn tools-btn-secondary" onClick={minify}>Minify JSON</button>
        <button className="tools-btn tools-btn-secondary" onClick={() => { navigator.clipboard.writeText(input); }}>Copy</button>
        <button className="tools-btn tools-btn-secondary" onClick={() => setInput("")}>Clear</button>
      </div>
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = () => {
    try {
      if (mode === "encode") {
        setInput(btoa(input));
      } else {
        setInput(atob(input));
      }
    } catch (e) {
      alert("Invalid input for " + mode);
    }
  };

  return (
    <div className="input-group">
      <div className="input-label">Text to {mode === "encode" ? "Encode" : "Decode"}</div>
      <textarea
        className="tools-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text here..."
      />
      <div className="action-bar">
        <button className={`tools-btn ${mode === "encode" ? "" : "tools-btn-secondary"}`} onClick={() => setMode("encode")}>Encode Mode</button>
        <button className={`tools-btn ${mode === "decode" ? "" : "tools-btn-secondary"}`} onClick={() => setMode("decode")}>Decode Mode</button>
        <button className="tools-btn" onClick={process}>Run</button>
        <button className="tools-btn tools-btn-secondary" onClick={() => { navigator.clipboard.writeText(input); }}>Copy</button>
      </div>
    </div>
  );
}

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");

  const generate = () => {
    const chars = {
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lower: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };
    let pool = "";
    if (options.upper) pool += chars.upper;
    if (options.lower) pool += chars.lower;
    if (options.numbers) pool += chars.numbers;
    if (options.symbols) pool += chars.symbols;

    if (!pool) return;
    let res = "";
    for (let i = 0; i < length; i++) {
      res += pool[Math.floor(Math.random() * pool.length)];
    }
    setPassword(res);
  };

  return (
    <div>
      <div className="pass-result">{password || "Click Generate"}</div>
      <div className="tools-grid">
        <div className="input-group">
          <div className="input-label">Length: {length}</div>
          <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} />
        </div>
        <div>
          <label className="pass-option">
            <input type="checkbox" checked={options.upper} onChange={() => setOptions({ ...options, upper: !options.upper })} /> Include Uppercase
          </label>
          <label className="pass-option">
            <input type="checkbox" checked={options.lower} onChange={() => setOptions({ ...options, lower: !options.lower })} /> Include Lowercase
          </label>
          <label className="pass-option">
            <input type="checkbox" checked={options.numbers} onChange={() => setOptions({ ...options, numbers: !options.numbers })} /> Include Numbers
          </label>
          <label className="pass-option">
            <input type="checkbox" checked={options.symbols} onChange={() => setOptions({ ...options, symbols: !options.symbols })} /> Include Symbols
          </label>
        </div>
      </div>
      <div className="action-bar" style={{ justifyContent: "center", marginTop: "2rem" }}>
        <button className="tools-btn" style={{ padding: "1rem 3rem" }} onClick={generate}>Generate Password</button>
        {password && <button className="tools-btn tools-btn-secondary" onClick={() => navigator.clipboard.writeText(password)}>Copy</button>}
      </div>
    </div>
  );
}

function RegexTester() {
  const [regex, setRegex] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [results, setResults] = useState<React.ReactNode>("");

  const test = () => {
    if (!regex) {
      setResults(text);
      return;
    }
    try {
      const re = new RegExp(regex, flags);
      const matches = [...text.matchAll(re)];
      
      let lastIdx = 0;
      const elements: JSX.Element[] = [];
      
      matches.forEach((match, idx) => {
        const start = match.index!;
        const end = start + match[0].length;
        
        // Text before match
        elements.push(<span key={`text-${idx}`}>{text.slice(lastIdx, start)}</span>);
        // Matching text
        elements.push(<span key={`match-${idx}`} className="regex-match">{match[0]}</span>);
        
        lastIdx = end;
      });
      
      elements.push(<span key="text-end">{text.slice(lastIdx)}</span>);
      setResults(elements);
    } catch (e) {
      setResults(<span style={{ color: "var(--tools-error)" }}>Invalid Regex</span>);
    }
  };

  React.useEffect(test, [regex, flags, text]);

  return (
    <div className="input-group">
      <div className="tools-grid">
        <div className="input-group">
          <div className="input-label">Regular Expression</div>
          <input
            className="tools-textarea"
            style={{ minHeight: "auto", padding: "0.75rem" }}
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="e.g. ([a-z]+)"
          />
        </div>
        <div className="input-group">
          <div className="input-label">Flags</div>
          <input
            className="tools-textarea"
            style={{ minHeight: "auto", padding: "0.75rem" }}
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g, i, m..."
          />
        </div>
      </div>
      
      <div className="input-label" style={{ marginTop: "1rem" }}>Test String</div>
      <textarea
        className="tools-textarea"
        style={{ minHeight: "150px" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to test against..."
      />

      <div className="input-label" style={{ marginTop: "1rem" }}>Matches Output</div>
      <div className="tools-textarea" style={{ minHeight: "150px", whiteSpace: "pre-wrap", overflowY: "auto", background: "#000" }}>
        {results}
      </div>
    </div>
  );
}
