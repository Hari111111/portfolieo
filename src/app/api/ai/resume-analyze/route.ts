import { NextRequest, NextResponse } from "next/server";
import { extractJson, getGeminiModel, normalizeResumeResult, ResumeAnalyzerResult } from "@/lib/ai";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const targetRole = String(formData.get("targetRole") || "").trim();
    const resumeText = String(formData.get("resumeText") || "").trim();
    const resumeFile = formData.get("resumeFile");

    if (!resumeText && !(resumeFile instanceof File)) {
      return NextResponse.json(
        { error: "Provide pasted resume text or upload a resume file." },
        { status: 400 }
      );
    }

    if (resumeFile instanceof File && resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Resume file must be smaller than 5MB." },
        { status: 400 }
      );
    }

    const model = getGeminiModel();
    const prompt = `Analyze the provided resume and convert it into structured JSON for a resume builder.

Rules:
- Return JSON only.
- Do not include markdown code fences.
- Use empty strings for unknown text fields.
- Use empty arrays when data is not present.
- Do not invent employers, schools, projects, dates, or links.
- Improve wording slightly for clarity, but stay faithful to the source.
- If target role is provided, tailor the executive summary and suggested job title toward it.

Target role: ${targetRole || "Not specified"}

Return this exact shape:
{
  "resumeData": {
    "personalInfo": {
      "fullName": "",
      "email": "",
      "phone": "",
      "address": "",
      "website": "",
      "jobTitle": "",
      "summary": ""
    },
    "education": [
      {
        "school": "",
        "degree": "",
        "startDate": "",
        "endDate": "",
        "description": ""
      }
    ],
    "experience": [
      {
        "company": "",
        "position": "",
        "startDate": "",
        "endDate": "",
        "description": ""
      }
    ],
    "skills": [""],
    "projects": [
      {
        "name": "",
        "link": "",
        "description": ""
      }
    ],
    "languages": [""],
    "customization": {
      "primaryColor": "#3b82f6",
      "fontFamily": "Inter",
      "fontSize": 14,
      "sectionSpacing": 28,
      "lineHeight": 1.5,
      "letterSpacing": 0,
      "visibleSections": ["summary", "experience", "projects", "education", "skills", "languages"],
      "sectionOrder": ["summary", "experience", "projects", "education", "skills", "languages"]
    }
  },
  "analysis": {
    "executiveSummary": "",
    "suggestedJobTitle": "",
    "strengths": [""],
    "gaps": [""],
    "improvementTips": [""]
  }
}`;

    const parts: Array<
      { text: string } | { inlineData: { data: string; mimeType: string } }
    > = [{ text: prompt }];

    if (resumeText) {
      parts.push({
        text: `Resume content:\n${resumeText}`,
      });
    }

    if (resumeFile instanceof File) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      parts.push({
        inlineData: {
          data: buffer.toString("base64"),
          mimeType: resumeFile.type || "application/pdf",
        },
      });
    }

    const response = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig: {
        temperature: 0.2,
      },
    });

    const rawText = response.response.text();
    const parsed = extractJson<ResumeAnalyzerResult>(rawText);
    const normalized = normalizeResumeResult(parsed);

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Resume analyzer error:", error);
    return NextResponse.json(
      { error: "Unable to analyze the resume right now." },
      { status: 500 }
    );
  }
}
