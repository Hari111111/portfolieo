"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ResumeAnalyzer from "@/components/ResumeAnalyzer";

type ToolTab = "chatbot" | "content" | "resume";
type ContentTool = "email" | "content" | "social";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const tabs: Array<{ id: ToolTab; label: string; icon: string }> = [
  { id: "chatbot", label: "AI Chatbot", icon: "solar:chat-round-dots-bold" },
  { id: "content", label: "Content Generator", icon: "solar:pen-new-square-bold" },
  { id: "resume", label: "Resume Analyzer", icon: "solar:file-text-bold" },
];

export default function AITools() {
  const [activeTab, setActiveTab] = useState<ToolTab>("chatbot");

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_35%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] py-16 dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Developer AI Suite</p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Real AI Features
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-600 dark:text-white/70 md:text-lg">
            Chat with an assistant, generate polished content, and analyze resumes into builder-ready data using a proper server-side AI flow.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.2em] transition ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-blue-500/25"
                  : "bg-white text-slate-700 shadow-sm hover:bg-slate-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              }`}
            >
              <Icon icon={tab.icon} className="text-lg" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-2xl shadow-blue-100/60 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-none md:p-6">
          {activeTab === "chatbot" && <ChatbotTool />}
          {activeTab === "content" && <ContentGeneratorTool />}
          {activeTab === "resume" && (
            <ResumeAnalyzer
              title="AI Resume Analyzer"
              description="Upload or paste a resume, extract structured data, and send it straight into the resume builder."
              showBuilderLink
            />
          )}
        </div>
      </div>
    </section>
  );
}

function ChatbotTool() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask me anything about resumes, interview prep, portfolio copy, or developer career positioning.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to get a reply.");
      }

      setMessages((current) => [...current, { role: "assistant", content: payload.reply }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to get a reply.";
      setMessages((current) => [
        ...current,
        { role: "assistant", content: `I could not respond right now: ${message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-300">Use Cases</p>
        <h2 className="mt-3 text-3xl font-black uppercase tracking-tight">AI Chatbot</h2>
        <p className="mt-4 text-sm leading-6 text-white/70">
          This is the assistant companies expect to see: fast help for resume positioning, project write-ups, interview questions, and personal-brand copy.
        </p>

        <div className="mt-6 space-y-3 text-sm text-white/80">
          {[
            "Rewrite my portfolio intro for recruiters",
            "Give me 5 resume bullets for a MERN project",
            "How do I answer tell me about yourself?",
          ].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setInput(sample)}
              className="block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-[38rem] flex-col rounded-[1.75rem] border border-border bg-white dark:border-dark_border dark:bg-darklight">
        <div className="border-b border-border px-5 py-4 dark:border-dark_border">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Conversation</p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-white/85"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-[1.5rem] bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-white/80">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4 dark:border-dark_border">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask the AI assistant something useful..."
              className="min-h-24 flex-1 rounded-[1.5rem] border border-border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-dark_border dark:bg-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="rounded-[1.5rem] bg-primary px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentGeneratorTool() {
  const [tool, setTool] = useState<ContentTool>("email");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [audience, setAudience] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    if (!topic.trim() || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/ai/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool,
          topic,
          tone,
          audience,
          extraContext,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to generate content.");
      }

      setResult(payload.text);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to generate content.";
      setResult(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-5 rounded-[1.75rem] bg-slate-950 p-6 text-white">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-300">Content Studio</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight">AI Content Generator</h2>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Generator</label>
          <select
            value={tool}
            onChange={(event) => setTool(event.target.value as ContentTool)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="email">Professional Email</option>
            <option value="content">Article or Portfolio Copy</option>
            <option value="social">LinkedIn or Social Post</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Topic</label>
          <textarea
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Describe what you want to generate..."
            className="min-h-28 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Tone</label>
            <input
              value={tone}
              onChange={(event) => setTone(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Audience</label>
            <input
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              placeholder="Recruiters, clients, developers..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Extra Context</label>
          <textarea
            value={extraContext}
            onChange={(event) => setExtraContext(event.target.value)}
            placeholder="Optional details, style notes, or constraints"
            className="min-h-24 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          />
        </div>

        <button
          type="button"
          onClick={generateContent}
          disabled={loading || !topic.trim()}
          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon icon={loading ? "solar:refresh-bold" : "solar:stars-bold"} className={`text-lg ${loading ? "animate-spin" : ""}`} />
          {loading ? "Generating" : "Generate Content"}
        </button>
      </div>

      <div className="rounded-[1.75rem] border border-border bg-white p-6 dark:border-dark_border dark:bg-darklight">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Generated Output</p>
            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-midnight_text dark:text-white">
              Production-Ready Draft
            </h3>
          </div>
          {result && (
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(result)}
              className="rounded-full border border-border px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-700 transition hover:border-primary hover:text-primary dark:border-dark_border dark:text-white/80"
            >
              Copy
            </button>
          )}
        </div>

        <div className="min-h-[32rem] rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-7 text-slate-700 dark:bg-slate-950/70 dark:text-white/80">
          {result || "Generated emails, polished profile copy, and social content will appear here."}
        </div>
      </div>
    </div>
  );
}
