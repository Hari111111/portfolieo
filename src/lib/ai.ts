import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeData } from "@/types/resume";

export interface ResumeAnalysis {
  executiveSummary: string;
  suggestedJobTitle: string;
  strengths: string[];
  gaps: string[];
  improvementTips: string[];
}

export interface ResumeAnalyzerResult {
  resumeData: ResumeData;
  analysis: ResumeAnalysis;
}

const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    jobTitle: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  languages: [],
  customization: {
    primaryColor: "#3b82f6",
    fontFamily: "Inter",
    fontSize: 14,
    sectionSpacing: 28,
    lineHeight: 1.5,
    letterSpacing: 0,
    visibleSections: ["summary", "experience", "projects", "education", "skills", "languages"],
    sectionOrder: ["summary", "experience", "projects", "education", "skills", "languages"],
  },
};

export const RESUME_IMPORT_STORAGE_KEY = "resume_builder_import";

const GEMINI_MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.0-flash",
].filter(Boolean) as string[];

export function getGeminiModel(modelName?: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable.");
  }

  const client = new GoogleGenerativeAI(apiKey);
  return client.getGenerativeModel({ model: modelName || GEMINI_MODEL_CANDIDATES[0] });
}

export async function generateWithGemini(
  prompt: string | Parameters<ReturnType<typeof getGeminiModel>["generateContent"]>[0]
) {
  let lastError: unknown;

  for (const modelName of GEMINI_MODEL_CANDIDATES) {
    try {
      const model = getGeminiModel(modelName);
      return await model.generateContent(prompt);
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);

      if (!message.toLowerCase().includes("not found")) {
        throw error;
      }
    }
  }

  throw lastError || new Error("No supported Gemini model is available.");
}

export function extractJson<T>(value: string): T {
  const normalized = value.trim();
  const fencedMatch = normalized.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const jsonText = fencedMatch?.[1]?.trim() || normalized;

  return JSON.parse(jsonText) as T;
}

export function normalizeResumeResult(input: Partial<ResumeAnalyzerResult> | null | undefined): ResumeAnalyzerResult {
  const resumeData = (input?.resumeData || {}) as Partial<ResumeData>;
  const personalInfo = (resumeData.personalInfo || {}) as Partial<ResumeData["personalInfo"]>;
  const customization = (resumeData.customization || {}) as Partial<ResumeData["customization"]>;

  return {
    resumeData: {
      personalInfo: {
        ...DEFAULT_RESUME_DATA.personalInfo,
        ...personalInfo,
      },
      education: Array.isArray(resumeData.education)
        ? resumeData.education.map((item: Partial<ResumeData["education"][number]>) => ({
            school: item?.school || "",
            degree: item?.degree || "",
            startDate: item?.startDate || "",
            endDate: item?.endDate || "",
            description: item?.description || "",
          }))
        : [],
      experience: Array.isArray(resumeData.experience)
        ? resumeData.experience.map((item: Partial<ResumeData["experience"][number]>) => ({
            company: item?.company || "",
            position: item?.position || "",
            startDate: item?.startDate || "",
            endDate: item?.endDate || "",
            description: item?.description || "",
          }))
        : [],
      skills: Array.isArray(resumeData.skills) ? resumeData.skills.filter(Boolean) : [],
      projects: Array.isArray(resumeData.projects)
        ? resumeData.projects.map((item: Partial<ResumeData["projects"][number]>) => ({
            name: item?.name || "",
            link: item?.link || "",
            description: item?.description || "",
          }))
        : [],
      languages: Array.isArray(resumeData.languages) ? resumeData.languages.filter(Boolean) : [],
      customization: {
        ...DEFAULT_RESUME_DATA.customization,
        ...customization,
      },
    },
    analysis: {
      executiveSummary: input?.analysis?.executiveSummary || "",
      suggestedJobTitle: input?.analysis?.suggestedJobTitle || "",
      strengths: Array.isArray(input?.analysis?.strengths) ? input.analysis.strengths.filter(Boolean) : [],
      gaps: Array.isArray(input?.analysis?.gaps) ? input.analysis.gaps.filter(Boolean) : [],
      improvementTips: Array.isArray(input?.analysis?.improvementTips) ? input.analysis.improvementTips.filter(Boolean) : [],
    },
  };
}

export function buildResumeImportPayload(result: ResumeAnalyzerResult) {
  return JSON.stringify({
    ...result,
    importedAt: new Date().toISOString(),
  });
}
