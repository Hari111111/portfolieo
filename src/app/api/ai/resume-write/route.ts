import { NextRequest, NextResponse } from "next/server";
import { extractJson, generateWithGemini } from "@/lib/ai";
import { ResumeData } from "@/types/resume";

type ResumeSection = "personal" | "experience" | "education" | "skills" | "languages" | "projects";

const schemas: Record<ResumeSection, string> = {
  personal: `{
  "summary": "",
  "jobTitle": ""
}`,
  experience: `{
  "experience": [
    {
      "company": "",
      "position": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ]
}`,
  education: `{
  "education": [
    {
      "school": "",
      "degree": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ]
}`,
  skills: `{
  "skills": [""]
}`,
  languages: `{
  "languages": [""]
}`,
  projects: `{
  "projects": [
    {
      "name": "",
      "link": "",
      "description": ""
    }
  ]
}`,
};

function uniqueList(values: string[]) {
  return [...new Set(values.map((item) => item.trim()).filter(Boolean))];
}

function sentenceList(value: string) {
  return value
    .split(/\n|\.|·|-/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toBulletLines(value: string) {
  const items = sentenceList(value);
  return items.length ? items.map((item) => `• ${item}`).join("\n") : value.trim();
}

function improveSummary(prompt: string, resumeData?: ResumeData) {
  const baseSummary = resumeData?.personalInfo?.summary?.trim();
  const jobTitle = resumeData?.personalInfo?.jobTitle?.trim();
  const skills = resumeData?.skills?.slice(0, 5).join(", ");
  const promptText = prompt.trim();

  if (baseSummary) {
    if (prompt.toLowerCase().includes("short")) {
      return baseSummary.split(/[.!?]/).map((item) => item.trim()).filter(Boolean).slice(0, 2).join(". ") + ".";
    }
    return baseSummary;
  }

  return [
    jobTitle ? `${jobTitle} with a strong focus on delivering measurable business impact.` : "Professional candidate with a strong focus on delivering measurable business impact.",
    skills ? `Skilled in ${skills} with hands-on experience in execution, collaboration, and continuous improvement.` : "Brings practical experience, ownership, and a results-oriented mindset.",
    promptText ? `Positioned for roles aligned with: ${promptText}.` : "Ready to contribute in fast-paced, growth-oriented environments.",
  ].join(" ");
}

function buildFallback(section: ResumeSection, prompt: string, resumeData?: ResumeData, currentSectionData?: unknown) {
  if (section === "personal") {
    return {
      summary: improveSummary(prompt, resumeData),
      jobTitle: resumeData?.personalInfo?.jobTitle || "Professional",
      fallback: true,
    };
  }

  if (section === "experience") {
    const current = Array.isArray(currentSectionData) ? currentSectionData : [];
    return {
      experience: current.map((item: any) => ({
        company: item?.company || "",
        position: item?.position || "",
        startDate: item?.startDate || "",
        endDate: item?.endDate || "",
        description: toBulletLines(item?.description || prompt),
      })),
      fallback: true,
    };
  }

  if (section === "education") {
    const current = Array.isArray(currentSectionData) ? currentSectionData : [];
    return {
      education: current.map((item: any) => ({
        school: item?.school || "",
        degree: item?.degree || "",
        startDate: item?.startDate || "",
        endDate: item?.endDate || "",
        description: toBulletLines(item?.description || prompt),
      })),
      fallback: true,
    };
  }

  if (section === "projects") {
    const current = Array.isArray(currentSectionData) ? currentSectionData : [];
    return {
      projects: current.map((item: any) => ({
        name: item?.name || "",
        link: item?.link || "",
        description: toBulletLines(item?.description || prompt),
      })),
      fallback: true,
    };
  }

  if (section === "skills") {
    const current = Array.isArray(currentSectionData) ? currentSectionData : [];
    const extracted = uniqueList(prompt.split(/,|\n/));
    return {
      skills: uniqueList([...(current as string[]), ...extracted]),
      fallback: true,
    };
  }

  if (section === "languages") {
    const current = Array.isArray(currentSectionData) ? currentSectionData : [];
    const extracted = uniqueList(prompt.split(/,|\n/));
    return {
      languages: uniqueList([...(current as string[]), ...extracted]),
      fallback: true,
    };
  }

  return { fallback: true };
}

export async function POST(request: NextRequest) {
  try {
    const {
      section,
      prompt,
      resumeData,
      currentSectionData,
    } = (await request.json()) as {
      section?: ResumeSection;
      prompt?: string;
      resumeData?: ResumeData;
      currentSectionData?: unknown;
    };

    if (!section || !schemas[section]) {
      return NextResponse.json({ error: "A valid resume section is required." }, { status: 400 });
    }

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const instruction = `You are writing content for a professional resume builder.

Target section: ${section}

Rules:
- Return JSON only.
- Do not include markdown code fences.
- Be concise, professional, and ATS-friendly.
- For experience, education, and project descriptions, write point-wise content separated by new lines using "- ".
- Do not invent unrealistic companies, schools, or links unless the prompt explicitly asks for placeholders.
- If a field is unknown, use an empty string.
- If a list has no good items, return an empty array.
- This is an edit request, so prioritize improving or changing the current section data instead of replacing it with unrelated content.

Return this exact JSON shape:
${schemas[section]}

Current resume context:
${JSON.stringify(resumeData || {}, null, 2)}

Current section data:
${JSON.stringify(currentSectionData || {}, null, 2)}

User prompt:
${prompt}`;

    try {
      const result = await generateWithGemini(instruction);
      const parsed = extractJson<Record<string, unknown>>(result.response.text());
      return NextResponse.json(parsed);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (message.toLowerCase().includes("rate limit")) {
        const fallback = buildFallback(section, prompt, resumeData, currentSectionData);
        return NextResponse.json(fallback);
      }

      throw error;
    }
  } catch (error) {
    console.error("Resume write error:", error);
    return NextResponse.json(
      { error: "Unable to generate resume content right now." },
      { status: 500 }
    );
  }
}

