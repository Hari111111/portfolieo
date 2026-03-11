import { Metadata } from "next";
import AITools from "@/components/AITools";

export const metadata: Metadata = {
  title: "AI Writing Tools - Email Writer, Blog Ideas, Resume Builder | Hari Mishra",
  description:
    "Generate high-quality content using Artificial Intelligence. Free AI Email Writer, Blog Title Generator, and Resume Builder powered by Google Gemini AI.",
  keywords: ["ai email writer", "ai blog title generator", "ai resume builder", "ai writing assistant", "ai content generator", "gemini ai tools"],
  openGraph: {
    title: "AI Writing Assistant - Free Content Generation Tools",
    description: "Create professional emails, viral headlines, and resume drafts instantly with AI.",
    type: "website",
  }
};

export default function AIToolsPage() {
  return <AITools />;
}
