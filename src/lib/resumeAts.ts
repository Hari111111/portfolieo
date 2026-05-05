import { ResumeData } from "@/types/resume";

export interface AtsBreakdownItem {
  label: string;
  score: number;
  maxScore: number;
}

export interface AtsAnalysisResult {
  score: number;
  breakdown: AtsBreakdownItem[];
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  gaps: string[];
  improvementTips: string[];
  executiveSummary: string;
  suggestedJobTitle: string;
}

const DEFAULT_KEYWORDS = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node.js",
  "api",
  "team",
  "project",
  "performance",
  "testing",
];

const ACTION_VERBS = [
  "built",
  "led",
  "developed",
  "created",
  "implemented",
  "designed",
  "optimized",
  "improved",
  "launched",
  "managed",
  "delivered",
  "automated",
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function normalizeWhitespace(value: string) {
  return value.replace(/\r/g, "").replace(/[ \t]+/g, " ").trim();
}

function tokenize(value: string) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .split(/[^a-z0-9.+#/-]+/g)
        .map((item) => item.trim())
        .filter((item) => item.length > 1)
    )
  );
}

function buildKeywordList(targetRole: string, resumeData?: ResumeData) {
  const roleKeywords = tokenize(targetRole);
  const skillKeywords = (resumeData?.skills || []).flatMap((skill) => tokenize(skill));
  const keywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...roleKeywords, ...skillKeywords])).slice(0, 24);
  return keywords;
}

function splitIntoBlocks(value: string) {
  return value
    .split(/\n\s*\n/g)
    .map((item) => normalizeWhitespace(item))
    .filter(Boolean);
}

function toExperienceList(sectionText: string): ResumeData["experience"] {
  const blocks = splitIntoBlocks(sectionText);

  return blocks.map((block) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    const headline = lines[0] || "";
    const remainder = lines.slice(1).join(" ");
    const [position = "", company = ""] = headline.split(/\s+\|\s+|\s+at\s+/i);

    return {
      company: company || "",
      position: position || "",
      startDate: "",
      endDate: "",
      description: remainder || block,
    };
  });
}

function toEducationList(sectionText: string): ResumeData["education"] {
  const blocks = splitIntoBlocks(sectionText);

  return blocks.map((block) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    return {
      school: lines[0] || "",
      degree: lines[1] || "",
      startDate: "",
      endDate: "",
      description: lines.slice(2).join(" ") || "",
    };
  });
}

function toProjectList(sectionText: string): ResumeData["projects"] {
  const blocks = splitIntoBlocks(sectionText);

  return blocks.map((block) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    return {
      name: lines[0] || "",
      link: "",
      description: lines.slice(1).join(" ") || block,
    };
  });
}

function getSectionMap(rawText: string) {
  const sectionAliases: Record<string, string> = {
    summary: "summary",
    "professional summary": "summary",
    profile: "summary",
    objective: "summary",
    skills: "skills",
    "technical skills": "skills",
    "core skills": "skills",
    experience: "experience",
    "work experience": "experience",
    employment: "experience",
    education: "education",
    qualifications: "education",
    projects: "projects",
    "personal projects": "projects",
    languages: "languages",
  };

  const sections: Record<string, string[]> = {
    summary: [],
    skills: [],
    experience: [],
    education: [],
    projects: [],
    languages: [],
  };

  const lines = rawText.replace(/\r/g, "").split("\n");
  let currentSection: keyof typeof sections | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentSection) {
        sections[currentSection].push("");
      }
      continue;
    }

    const normalized = trimmed.toLowerCase().replace(/[:\s]+$/g, "");
    const alias = sectionAliases[normalized];

    if (alias) {
      currentSection = alias as keyof typeof sections;
      continue;
    }

    if (currentSection) {
      sections[currentSection].push(trimmed);
    }
  }

  return Object.fromEntries(
    Object.entries(sections).map(([key, value]) => [key, value.join("\n").trim()])
  ) as Record<keyof typeof sections, string>;
}

export function parseResumeTextToData(rawText: string, targetRole = ""): ResumeData {
  const text = rawText.replace(/\r/g, "").trim();
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const sectionMap = getSectionMap(text);

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phoneMatch = text.match(/(?:\+?\d[\d\s().-]{7,}\d)/);
  const websiteMatch = text.match(/(?:https?:\/\/|www\.)[^\s]+/i);

  const firstLine = lines[0] || "";
  const secondLine = lines[1] || "";
  const fullName = firstLine.length <= 60 && !firstLine.includes("@") ? firstLine : "";
  const jobTitle =
    secondLine &&
    secondLine.length <= 80 &&
    !secondLine.includes("@") &&
    !sectionMap.summary.toLowerCase().includes(secondLine.toLowerCase())
      ? secondLine
      : targetRole;

  const skills = Array.from(
    new Set(
      sectionMap.skills
        .split(/[\n,|•]+/g)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  const languages = Array.from(
    new Set(
      sectionMap.languages
        .split(/[\n,|•]+/g)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  return {
    personalInfo: {
      fullName,
      email: emailMatch?.[0] || "",
      phone: phoneMatch?.[0] || "",
      address: "",
      website: websiteMatch?.[0] || "",
      jobTitle: jobTitle || "",
      summary: sectionMap.summary || lines.slice(2, 6).join(" ").slice(0, 500),
    },
    education: sectionMap.education ? toEducationList(sectionMap.education) : [],
    experience: sectionMap.experience ? toExperienceList(sectionMap.experience) : [],
    skills,
    projects: sectionMap.projects ? toProjectList(sectionMap.projects) : [],
    languages,
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
}

export function analyzeResumeDataForATS(resumeData: ResumeData, targetRole = ""): AtsAnalysisResult {
  const textBlob = [
    resumeData.personalInfo.fullName,
    resumeData.personalInfo.jobTitle,
    resumeData.personalInfo.summary,
    resumeData.skills.join(" "),
    resumeData.experience.map((item) => `${item.position} ${item.company} ${item.description}`).join(" "),
    resumeData.education.map((item) => `${item.degree} ${item.school} ${item.description}`).join(" "),
    resumeData.projects.map((item) => `${item.name} ${item.description}`).join(" "),
    resumeData.languages.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const keywordList = buildKeywordList(targetRole, resumeData);
  const matchedKeywords = keywordList.filter((keyword) => textBlob.includes(keyword.toLowerCase()));
  const missingKeywords = keywordList.filter((keyword) => !matchedKeywords.includes(keyword));

  const contactScore = [
    resumeData.personalInfo.fullName,
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.address || resumeData.personalInfo.website,
  ].filter(Boolean).length;

  const summaryLength = resumeData.personalInfo.summary.trim().length;
  const experienceCount = resumeData.experience.filter(
    (item) => item.position || item.company || item.description
  ).length;
  const experienceVerbHits = ACTION_VERBS.filter((verb) => textBlob.includes(verb)).length;
  const quantifiedHits = (textBlob.match(/\b\d+%|\b\d+\+|\b\d+\s?(users|clients|projects|features|days|weeks|months|years)\b/g) || []).length;
  const hasEducation = resumeData.education.some((item) => item.school || item.degree);
  const hasProjects = resumeData.projects.some((item) => item.name || item.description);
  const skillsCount = resumeData.skills.filter(Boolean).length;
  const formattingPenalty =
    (textBlob.match(/[^\w\s@.+#:/,%()-]/g) || []).length > 30 ||
    /[🚀🔥✅⭐]/.test(textBlob)
      ? 3
      : 0;

  const breakdown: AtsBreakdownItem[] = [
    { label: "Contact", score: clamp(contactScore * 4, 0, 16), maxScore: 16 },
    { label: "Headline", score: resumeData.personalInfo.jobTitle ? 8 : 2, maxScore: 8 },
    { label: "Summary", score: summaryLength >= 80 ? 12 : summaryLength >= 40 ? 8 : summaryLength > 0 ? 4 : 0, maxScore: 12 },
    { label: "Skills", score: clamp(skillsCount >= 10 ? 16 : skillsCount * 1.5, 0, 16), maxScore: 16 },
    { label: "Experience", score: clamp(experienceCount * 5 + Math.min(experienceVerbHits, 4), 0, 20), maxScore: 20 },
    { label: "Education", score: hasEducation ? 10 : 0, maxScore: 10 },
    { label: "Projects", score: hasProjects ? 8 : 0, maxScore: 8 },
    { label: "Keywords", score: keywordList.length ? Math.round((matchedKeywords.length / keywordList.length) * 10) : 0, maxScore: 10 },
    { label: "Impact", score: clamp(quantifiedHits * 2, 0, 6), maxScore: 6 },
  ];

  const rawScore = breakdown.reduce((total, item) => total + item.score, 0) - formattingPenalty;
  const score = clamp(Math.round(rawScore), 0, 100);

  const strengths: string[] = [];
  const gaps: string[] = [];
  const improvementTips: string[] = [];

  if (contactScore >= 4) strengths.push("Contact details are recruiter-friendly and easy to scan.");
  else {
    gaps.push("Contact section is incomplete.");
    improvementTips.push("Add full name, professional email, phone number, and either location or website.");
  }

  if (skillsCount >= 8) strengths.push("Skill section has strong ATS keyword coverage.");
  else {
    gaps.push("Skills section is too light for ATS matching.");
    improvementTips.push("Add 8-12 job-relevant tools, languages, frameworks, and platforms in the skills section.");
  }

  if (experienceCount >= 2) strengths.push("Experience section has enough depth for screening systems.");
  else {
    gaps.push("Experience section needs more substance.");
    improvementTips.push("Add at least 2 role entries with action verbs, outcomes, and measurable impact.");
  }

  if (quantifiedHits > 0) strengths.push("Resume includes measurable achievements, which improves ATS and recruiter trust.");
  else {
    gaps.push("Achievements are not quantified.");
    improvementTips.push("Include numbers like percentages, time saved, revenue, traffic, users, or projects delivered.");
  }

  if (missingKeywords.length > 0) {
    improvementTips.push(`Consider naturally adding missing keywords such as ${missingKeywords.slice(0, 5).join(", ")}.`);
  }

  if (!hasProjects) {
    improvementTips.push("Add at least 1-2 relevant projects if you are applying to technical or early-career roles.");
  }

  if (summaryLength < 40) {
    improvementTips.push("Write a concise 2-4 line professional summary with role focus, strengths, and domain keywords.");
  }

  const suggestedJobTitle =
    targetRole ||
    resumeData.personalInfo.jobTitle ||
    resumeData.experience[0]?.position ||
    "Professional Candidate";

  const executiveSummary =
    score >= 85
      ? `Strong ATS alignment with a score of ${score}/100. Your resume covers the essential sections and is well-targeted for ${suggestedJobTitle}.`
      : score >= 70
        ? `Good ATS readiness with a score of ${score}/100. The resume is solid, but a few keyword and impact improvements can raise match quality for ${suggestedJobTitle}.`
        : `Current ATS score is ${score}/100. The resume needs stronger keywords, quantified results, and clearer section coverage to compete for ${suggestedJobTitle}.`;

  return {
    score,
    breakdown,
    matchedKeywords,
    missingKeywords,
    strengths: Array.from(new Set(strengths)),
    gaps: Array.from(new Set(gaps)),
    improvementTips: Array.from(new Set(improvementTips)).slice(0, 6),
    executiveSummary,
    suggestedJobTitle,
  };
}
