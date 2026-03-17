"use client";

import React, { useState, useEffect } from "react";
import { 
  FiFileText, 
  FiCheckCircle, 
  FiMinimize2, 
  FiDownload, 
  FiCopy, 
  FiTrash2, 
  FiMaximize, 
  FiSettings,
  FiCode, 
  FiActivity, 
  FiShield, 
  FiZap, 
  FiCpu 
} from "react-icons/fi";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);
  const [isCopied, setIsCopied] = useState(false);
  const [stats, setStats] = useState({ lines: 0, size: "0 B", depth: 0 });

  useEffect(() => {
    updateStats(input);
  }, [input]);

  const updateStats = (tex: string) => {
    const lines = tex.split('\n').filter(l => l.trim()).length;
    const size = new TextEncoder().encode(tex).length;
    let depth = 0;
    try {
      if (tex.trim()) {
        const parsed = JSON.parse(tex);
        const getDepth = (obj: any): number => {
          if (obj && typeof obj === 'object') {
            const keys = Object.keys(obj);
            if (keys.length === 0) return 1;
            return 1 + Math.max(...keys.map(k => getDepth(obj[k])));
          }
          return 0;
        };
        depth = getDepth(parsed);
      }
    } catch {}
    
    setStats({
      lines: tex.trim() ? lines : 0,
      size: size < 1024 ? `${size} B` : `${(size / 1024).toFixed(2)} KB`,
      depth
    });
  };

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      if (!input.trim()) {
        setError("Input is empty");
        return;
      }
      JSON.parse(input);
      setError(null);
      alert("✅ JSON Syntax Validated!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const downloadJson = () => {
    const content = output || input;
    if (!content) return;
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "processed_data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setInput(event.target?.result as string);
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 selection:bg-emerald-500/30 font-sans mt-10 md:mt-0">
      {/* Background Mesh Overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.05] dark:opacity-[0.15]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500 blur-[150px] rounded-full"></div>
      </div>

      <main className="relative z-10 w-full max-w-[1900px] mx-auto p-3 md:p-6 lg:p-10">
        
        {/* Header Section - Enhanced contrast */}
        <header className="flex flex-col lg:flex-row justify-between items-center mb-6 md:mb-12 gap-6 md:gap-8 bg-white dark:bg-[#111111] backdrop-blur-2xl border border-gray-200 dark:border-white/20 p-5 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 text-center sm:text-left">
             <div className="w-12 h-12 md:w-20 md:h-20 bg-emerald-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 shrink-0">
                <FiCpu className="text-2xl md:text-4xl text-white" />
             </div>
             <div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none mb-1 md:mb-2 text-gray-900 dark:text-white">JSON <span className="text-emerald-500">Neural</span> Engine</h1>
                <p className="text-gray-600 dark:text-gray-400 text-[8px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] uppercase">Edge Synthesis Protocol • High Definition</p>
             </div>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col md:flex-row flex-wrap justify-center bg-gray-100 dark:bg-white/5 p-2 md:p-3 rounded-2xl border border-gray-200 dark:border-white/10 items-center gap-3 md:gap-6 shadow-inner">
             <div className="flex items-center gap-4 px-4 md:px-6 border-b md:border-b-0 md:border-r border-gray-300 dark:border-white/20 w-full md:w-auto py-2 md:py-0 justify-center">
                <span className="text-[9px] md:text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest whitespace-nowrap">Tab Size</span>
                <select 
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-black text-xs md:text-sm outline-none cursor-pointer appearance-none px-2"
                  value={indent}
                  onChange={(e) => setIndent(parseInt(e.target.value))}
                >
                  <option value={2}>2px</option>
                  <option value={3}>3px</option>
                  <option value={4}>4px</option>
                </select>
             </div>
             <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                <button 
                  onClick={formatJson} 
                  className="flex-1 md:flex-none px-4 md:px-10 py-3 md:py-4 bg-[#10b981] text-white rounded-xl md:rounded-2xl text-[9px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl hover:scale-[1.03] active:scale-95 whitespace-nowrap"
                >
                  Beautify
                </button>
                <button 
                  onClick={minifyJson} 
                  className="flex-1 md:flex-none px-4 md:px-10 py-3 md:py-4 bg-gray-800 dark:bg-white text-white dark:text-black rounded-xl md:rounded-2xl text-[9px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em] hover:opacity-90 transition-all shadow-lg whitespace-nowrap"
                >
                  Minify
                </button>
                <button 
                  onClick={() => setInput("")} 
                  className="p-3 md:p-4 bg-red-500 text-white rounded-xl md:rounded-2xl hover:bg-red-600 transition-all shadow-lg shrink-0"
                  title="Wipe Engine Data"
                >
                   <FiTrash2 className="text-lg md:text-2xl" />
                </button>
             </div>
          </div>
        </header>

        {/* Dual Pane Interface - Max Clarity */}
        <div className="flex flex-col xl:flex-row gap-6 md:gap-10 min-h-0 xl:min-h-[800px]">
          
          {/* LEFT: Input (Absolute Contrast) */}
          <div className="flex-1 group relative bg-white border-2 border-gray-200 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col transition-all">
             <div className="px-5 md:px-10 py-4 md:py-6 border-b-2 border-gray-100 flex flex-wrap justify-between items-center bg-gray-50/50 gap-4">
                <span className="text-[9px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] text-gray-900 uppercase flex items-center gap-2 md:gap-4">
                   <div className="w-2 md:w-4 h-2 md:h-4 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] animate-pulse"></div> Input Stream
                </span>
                <div className="flex items-center gap-3 md:gap-4">
                   <button 
                    onClick={() => copyToClipboard(input)}
                    className="text-[8px] md:text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase flex items-center gap-1.5 transition-colors bg-emerald-50 px-2 md:px-3 py-1.5 rounded-lg border border-emerald-100"
                   >
                     <FiCopy className="text-xs md:text-sm" /> <span className="hidden sm:inline">Copy</span>
                   </button>
                   <label className="text-[8px] md:text-[10px] font-black text-gray-600 hover:text-emerald-500 transition-colors cursor-pointer uppercase flex items-center gap-1.5">
                      <FiMaximize className="text-xs md:text-sm" /> <span className="hidden sm:inline">Upload</span>
                      <input type="file" accept=".json" hidden onChange={handleFileUpload} />
                   </label>
                </div>
             </div>
             <div className="flex-1 flex w-full h-[350px] md:h-[500px] xl:h-full relative bg-white">
                <div className="w-10 md:w-20 bg-gray-100 border-r-2 border-gray-200 flex flex-col items-center py-4 md:py-10 gap-1 md:gap-1.5 select-none shadow-inner overflow-hidden">
                   {Array.from({ length: 45 }).map((_, i) => <span key={i} className="text-[10px] md:text-sm font-mono font-black text-emerald-700 opacity-30 md:opacity-100">{i + 1}</span>)}
                </div>
                <textarea
                  className="flex-1 p-5 md:p-10 bg-white text-black font-mono text-xs md:text-xl outline-none resize-none leading-relaxed placeholder:text-gray-200 placeholder:font-black tracking-tight"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="PASTE YOUR RAW JSON HERE..."
                  spellCheck={false}
                />
             </div>
             <div className="px-5 md:px-10 py-4 md:py-6 bg-gray-50 border-t-2 border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-6 md:gap-10">
                   <div className="flex flex-col gap-0.5 md:gap-1">
                      <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Weight</span>
                      <span className="text-[10px] md:text-sm font-black text-gray-900">{stats.size}</span>
                   </div>
                   <div className="flex flex-col gap-0.5 md:gap-1">
                      <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Lines</span>
                      <span className="text-[10px] md:text-sm font-black text-gray-900">{stats.lines}</span>
                   </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(input)}
                  className="w-full sm:w-auto px-5 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl bg-white border-2 border-gray-200 text-[9px] md:text-xs font-black text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all uppercase flex items-center justify-center gap-2 md:gap-3 shadow-md"
                >
                  <FiCopy className="text-sm" /> Copy Source
                </button>
             </div>
          </div>

          {/* RIGHT: Output (Absolute Contrast) */}
          <div className={`flex-1 group relative bg-white border-2 border-gray-200 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col transition-all ${error ? 'border-red-500' : ''}`}>
             <div className="px-5 md:px-10 py-4 md:py-6 border-b-2 border-gray-100 flex flex-wrap justify-between items-center bg-gray-50/50 gap-4">
                <span className="text-[9px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] text-gray-900 uppercase flex items-center gap-2 md:gap-4">
                   <div className={`w-2 md:w-4 h-2 md:h-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] ${error ? 'bg-red-600' : 'bg-emerald-500'}`}></div> Result Window
                </span>
                <div className="flex items-center gap-3 md:gap-4">
                   <button 
                    onClick={() => copyToClipboard(output)}
                    className={`text-[8px] md:text-[10px] font-black transition-all uppercase flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg border ${isCopied ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-emerald-50 text-emerald-600 border-emerald-100 font-black'}`}
                   >
                     {isCopied ? <FiCheckCircle className="text-xs md:text-sm" /> : <FiCopy className="text-xs md:text-sm" />} <span className="hidden sm:inline">{isCopied ? "Copied" : "Copy"}</span>
                   </button>
                   <button 
                    onClick={downloadJson}
                    className="text-[8px] md:text-[10px] font-black text-gray-600 hover:text-blue-600 transition-colors uppercase flex items-center gap-1.5"
                   >
                      <FiDownload className="text-xs md:text-sm" /> <span className="hidden sm:inline">Export</span>
                   </button>
                </div>
             </div>
             <div className="flex-1 relative overflow-auto h-[350px] md:h-[500px] xl:h-full scroll-emerald bg-white p-5 md:p-10">
                {error ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-5 md:p-10 bg-red-50 rounded-[1.5rem] md:rounded-[3rem] border-4 border-dashed border-red-200 shadow-inner">
                     <div className="w-12 h-12 md:w-20 md:h-20 bg-red-600 text-white rounded-full flex items-center justify-center mb-4 md:mb-8 shadow-2xl shadow-red-600/40">
                        <FiTrash2 className="text-2xl md:text-4xl" />
                     </div>
                     <h3 className="text-xl md:text-2xl font-black text-red-600 uppercase tracking-tighter mb-2 md:mb-4">Parsing Error</h3>
                     <p className="text-[10px] md:text-sm lg:text-base font-mono font-bold leading-relaxed max-w-lg bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-red-100">{error}</p>
                  </div>
                ) : (
                  <div className="font-mono text-xs md:text-xl font-bold leading-relaxed text-blue-900 h-full">
                     {output ? (
                        <pre className="whitespace-pre overflow-visible">{output}</pre>
                     ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-100 min-h-[250px] md:min-h-0">
                           <FiActivity className="text-[60px] md:text-[100px] mb-4 md:mb-8 opacity-20" />
                           <span className="text-sm md:text-lg uppercase font-black tracking-[0.2em] md:tracking-[0.4em] text-gray-200 text-center">System Standby...</span>
                        </div>
                     )}
                  </div>
                )}
             </div>
             <div className="px-5 md:px-10 py-4 md:py-6 bg-gray-50 border-t-2 border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-6 md:gap-10">
                   <div className="flex flex-col gap-0.5 md:gap-1">
                      <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Hierarchy</span>
                      <span className="text-[10px] md:text-sm font-black text-gray-900">{stats.depth} Nodes</span>
                   </div>
                   <div className="flex flex-col gap-0.5 md:gap-1">
                      <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Protocol</span>
                      <span className={`text-[10px] md:text-sm font-black ${error ? 'text-red-600' : 'text-emerald-600'}`}>{error ? "FAILURE" : "ACTIVE"}</span>
                   </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(output)}
                  className={`w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-[2rem] text-[9px] md:text-xs font-black transition-all uppercase flex items-center justify-center gap-2 md:gap-4 ${isCopied ? 'bg-emerald-600 text-white shadow-2xl scale-105' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl'}`}
                >
                  {isCopied ? <FiCheckCircle className="text-lg md:text-xl" /> : <FiCopy className="text-lg md:text-xl" />} {isCopied ? "Transferred" : "Copy Result"}
                </button>
             </div>
          </div>
        </div>

        {/* Triple Highlight Section - High Visibility */}
        <section className="mt-12 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 pb-12 md:pb-32">
           {[
             { title: "Privacy Protocol", icon: <FiShield />, desc: "Edge Computing. Zero server latency. 100% Client-side processing ensures your data stays in your browser cache and nowhere else.", color: "emerald" },
             { title: "Neural Synthesis", icon: <FiActivity />, desc: "Advanced algorithmic parsing for mega-objects. Our engine handles industrial-scale JSON data with ease and precision.", color: "blue" },
             { title: "Dev Toolchain", icon: <FiZap />, desc: "A flagship tool designed for elite developers. Beautify, minify, and analyze your JSON data in a high-fidelity environment.", color: "emerald" }
           ].map((item, idx) => (
             <div key={idx} className="bg-white dark:bg-[#0a0a0a] p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border-2 border-gray-100 dark:border-white/10 hover:border-emerald-500/40 transition-all group shadow-2xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
                <div className={`w-12 h-12 md:w-20 md:h-20 bg-emerald-500/10 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-10 group-hover:bg-emerald-500 group-hover:text-white transition-all transform group-hover:rotate-6`}>
                   <span className="text-2xl md:text-4xl text-emerald-500 group-hover:text-white">{item.icon}</span>
                </div>
                <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-6 uppercase tracking-tighter text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-bold text-sm md:text-lg">{item.desc}</p>
             </div>
           ))}
        </section>

      </main>

      <footer className="p-10 md:p-20 text-center border-t-2 border-gray-100 dark:border-white/10 bg-white dark:bg-[#050505]">
         <div className="flex justify-center gap-8 md:gap-20 mb-8 md:mb-12 opacity-30 hover:opacity-100 transition-opacity">
            <FiZap className="text-xl md:text-3xl text-emerald-500" />
            <FiCpu className="text-xl md:text-3xl text-blue-500" />
            <FiShield className="text-xl md:text-3xl text-emerald-500" />
         </div>
         <span className="text-[8px] md:text-[12px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.5em] md:tracking-[1.5em] block mb-2">Hari Mishra Developer Suite</span>
         <span className="text-[7px] md:text-[10px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-widest leading-relaxed">© 2026 QUANTUM ENGINE v2.6 • ALL SYSTEMS ACTIVE</span>
      </footer>

      <style jsx global>{`
        .scroll-emerald::-webkit-scrollbar {
          width: 8px;
        }
        .scroll-emerald::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 20px;
          border: 2px solid white;
        }
        .scroll-emerald::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        ::placeholder {
          color: #e5e7eb !important;
          font-weight: 900 !important;
          letter-spacing: 0.1em;
        }
        select option {
          background-color: white !important;
          color: black !important;
          font-weight: 900;
        }
        .dark select option {
          background-color: #111111 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
