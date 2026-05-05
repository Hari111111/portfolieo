import { NextRequest, NextResponse } from "next/server";
import { extractJson, getGeminiModel, normalizeResumeResult, ResumeAnalyzerResult } from "@/lib/ai";
import { analyzeResumeDataForATS, parseResumeTextToData } from "@/lib/resumeAts";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const targetRole = String(formData.get("targetRole") || "").trim();
    let resumeText = String(formData.get("resumeText") || "").trim();
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

    let extractionStatus: "success" | "failed" | "partial" = "success";
    let extractionMessage = "";
    let atsStatus: "success" | "failed" | "partial" = "success";
    let atsMessage = "";

    if (resumeFile instanceof File) {
      const fileType = (resumeFile.type || "").toLowerCase();
      const fileName = resumeFile.name.toLowerCase();
      const isTextFile =
        fileType.includes("text/") ||
        fileName.endsWith(".txt") ||
        fileName.endsWith(".md");

      if (isTextFile && !resumeText) {
        resumeText = await resumeFile.text();
      }
    }

    let normalized: ResumeAnalyzerResult = normalizeResumeResult(
      (resumeText
        ? { resumeData: parseResumeTextToData(resumeText, targetRole), analysis: {} }
        : { analysis: {} }) as Partial<ResumeAnalyzerResult>
    );

    if (resumeFile instanceof File) {
      try {
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

        const buffer = Buffer.from(await resumeFile.arrayBuffer());
        parts.push({
          inlineData: {
            data: buffer.toString("base64"),
            mimeType: resumeFile.type || "application/pdf",
          },
        });

        const response = await model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig: {
            temperature: 0.2,
          },
        });

        const rawText = response.response.text();
        const parsed = extractJson<ResumeAnalyzerResult>(rawText);
        normalized = normalizeResumeResult(parsed);
        extractionStatus = "success";
        extractionMessage = "Resume data extracted successfully.";
      } catch (error) {
        console.error("Resume extraction error:", error);
        extractionStatus = resumeText ? "partial" : "failed";
        extractionMessage = resumeText
          ? "AI extraction failed, but fallback text parsing still prepared resume data."
          : "AI extraction failed for the uploaded file.";
      }
    } else if (resumeText) {
      extractionStatus = "success";
      extractionMessage = "Resume data prepared from pasted text.";
    }

    try {
      const hasResumeContent =
        normalized.resumeData.personalInfo.summary ||
        normalized.resumeData.skills.length ||
        normalized.resumeData.experience.length ||
        normalized.resumeData.education.length ||
        normalized.resumeData.projects.length;

      if (!hasResumeContent) {
        throw new Error("Not enough resume content was available for ATS scoring.");
      }

      const ats = analyzeResumeDataForATS(normalized.resumeData, targetRole);
      normalized = normalizeResumeResult({
        ...normalized,
        analysis: {
          ...normalized.analysis,
          executiveSummary: ats.executiveSummary,
          suggestedJobTitle: normalized.analysis.suggestedJobTitle || ats.suggestedJobTitle,
          strengths: ats.strengths.length ? ats.strengths : normalized.analysis.strengths,
          gaps: ats.gaps,
          improvementTips: ats.improvementTips,
          atsScore: ats.score,
          matchedKeywords: ats.matchedKeywords,
          missingKeywords: ats.missingKeywords,
          breakdown: ats.breakdown,
        },
      });
      atsStatus = "success";
      atsMessage = "ATS score calculated successfully.";
    } catch (error) {
      console.error("ATS scoring error:", error);
      atsStatus = "failed";
      atsMessage = error instanceof Error ? error.message : "ATS scoring failed.";
    }

    normalized = normalizeResumeResult({
      ...normalized,
      analysis: {
        ...normalized.analysis,
        extractionStatus,
        extractionMessage,
        atsStatus,
        atsMessage,
      },
    });

    if (extractionStatus === "failed" && atsStatus === "failed") {
      return NextResponse.json(
        {
          error: "Resume data extraction and ATS scoring both failed. Please try pasted text or another file.",
          partial: normalized,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Resume analyzer error:", error);
    return NextResponse.json(
      { error: "Unable to analyze the resume right now." },
      { status: 500 }
    );
  }
}
