"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
import {
  buildResumeImportPayload,
  RESUME_IMPORT_STORAGE_KEY,
  ResumeAnalysis,
  ResumeAnalyzerResult,
} from "@/lib/ai";
import { ResumeData } from "@/types/resume";

interface ResumeAnalyzerProps {
  title?: string;
  description?: string;
  onImport?: (resumeData: ResumeData, analysis: ResumeAnalysis) => void;
  showBuilderLink?: boolean;
  compact?: boolean;
}

const acceptedFileTypes = ".pdf,.txt,.md";

const ResumeAnalyzer = ({
  title = "AI Resume Analyzer",
  description = "Upload a PDF resume or paste resume text. AI will extract the data, suggest improvements, and prepare it for the resume builder.",
  onImport,
  showBuilderLink = true,
  compact = false,
}: ResumeAnalyzerProps) => {
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeAnalyzerResult | null>(null);

  const stats = useMemo(() => {
    if (!result) {
      return [];
    }

    return [
      { label: "Skills", value: result.resumeData.skills.length },
      { label: "Experience", value: result.resumeData.experience.length },
      { label: "Education", value: result.resumeData.education.length },
      { label: "Projects", value: result.resumeData.projects.length },
    ];
  }, [result]);

  const saveImport = (payload: ResumeAnalyzerResult) => {
    localStorage.setItem(RESUME_IMPORT_STORAGE_KEY, buildResumeImportPayload(payload));
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() && !resumeFile) {
      toast.error("Add resume text or upload a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("targetRole", targetRole);

    if (resumeText.trim()) {
      formData.append("resumeText", resumeText.trim());
    }

    if (resumeFile) {
      formData.append("resumeFile", resumeFile);
    }

    setLoading(true);

    try {
      const response = await fetch("/api/ai/resume-analyze", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Resume analysis failed.");
      }

      setResult(payload);
      saveImport(payload);
      onImport?.(payload.resumeData, payload.analysis);
      toast.success("Resume parsed and ready for the builder.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Resume analysis failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Please upload a file smaller than 5MB.");
      return;
    }

    setResumeFile(file);
  };

  const applyIntoBuilder = () => {
    if (!result) {
      return;
    }

    saveImport(result);
    toast.success("Imported resume saved for the builder.");
  };

  return (
    <div className={`rounded-[2rem] border border-border bg-section p-6 shadow-sm dark:border-dark_border dark:bg-darkmode ${compact ? "" : "md:p-8"}`}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary">Resume Intelligence</p>
          <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-midnight_text dark:text-white">
            {title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-grey dark:text-white/70">{description}</p>
        </div>
        {showBuilderLink && (
          <Link
            href="/resume-builder"
            onClick={applyIntoBuilder}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-blue-700"
          >
            <Icon icon="solar:document-bold" className="text-lg" />
            Open Builder
          </Link>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-midnight_text dark:text-white/70">
              Target Role
            </label>
            <input
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="Full Stack Developer, Product Designer, Data Analyst..."
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-midnight_text outline-none transition focus:border-primary dark:border-dark_border dark:bg-darklight dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-midnight_text dark:text-white/70">
              Upload Resume
            </label>
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-4 py-4 text-sm text-midnight_text transition hover:bg-primary/10 dark:text-white">
              <span>{resumeFile ? resumeFile.name : "Select PDF, TXT, or MD resume"}</span>
              <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                Browse
              </span>
              <input type="file" accept={acceptedFileTypes} onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-midnight_text dark:text-white/70">
              Or Paste Resume Text
            </label>
            <textarea
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              placeholder="Paste the full resume text here if you do not want to upload a file."
              className="min-h-44 w-full rounded-[1.5rem] border border-border bg-white px-4 py-4 text-sm text-midnight_text outline-none transition focus:border-primary dark:border-dark_border dark:bg-darklight dark:text-white"
            />
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-midnight_text px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-midnight_text"
          >
            <Icon icon={loading ? "solar:refresh-bold" : "solar:magic-stick-3-bold"} className={`text-lg ${loading ? "animate-spin" : ""}`} />
            {loading ? "Analyzing Resume" : "Analyze and Extract"}
          </button>
        </div>

        <div className="rounded-[1.75rem] border border-border bg-white p-5 dark:border-dark_border dark:bg-darklight">
          {!result ? (
            <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon icon="solar:file-text-bold" className="text-3xl" />
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight text-midnight_text dark:text-white">
                Builder-Ready Resume Data
              </h4>
              <p className="mt-3 max-w-sm text-sm text-grey dark:text-white/70">
                Extracted skills, experience, education, and suggestions will appear here after analysis.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Suggested Role</p>
                <h4 className="mt-2 text-xl font-black uppercase tracking-tight text-midnight_text dark:text-white">
                  {result.analysis.suggestedJobTitle || result.resumeData.personalInfo.jobTitle || "Resume Candidate"}
                </h4>
                <p className="mt-3 text-sm leading-6 text-grey dark:text-white/70">
                  {result.analysis.executiveSummary || result.resumeData.personalInfo.summary || "The analyzer extracted resume information successfully."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-section p-4 text-center dark:bg-darkmode">
                    <div className="text-2xl font-black text-midnight_text dark:text-white">{stat.value}</div>
                    <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-grey dark:text-white/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Top Strengths</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.analysis.strengths.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-bold text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {result.analysis.improvementTips.length > 0 && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Improvement Tips</p>
                  <ul className="mt-3 space-y-2 text-sm text-grey dark:text-white/70">
                    {result.analysis.improvementTips.slice(0, 3).map((tip) => (
                      <li key={tip} className="flex gap-2">
                        <Icon icon="solar:check-circle-bold" className="mt-0.5 flex-shrink-0 text-primary" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
