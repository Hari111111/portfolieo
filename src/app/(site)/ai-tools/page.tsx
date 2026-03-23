import { Metadata } from "next";
import AITools from "@/components/AITools";

export const metadata: Metadata = {
  title: "AI Tools - Chatbot, Content Generator, Resume Analyzer | Hari Mishra",
  description:
    "Explore real AI features: an AI chatbot, AI content generator, and resume analyzer that extracts resume data into a builder-ready format.",
  keywords: ["ai chatbot", "ai content generator", "resume analyzer", "ai resume parser", "developer ai tools", "gemini ai tools"],
  openGraph: {
    title: "AI Tools for Developers - Chatbot, Content Generator, Resume Analyzer",
    description: "Use practical AI features for resumes, content, and developer workflows.",
    type: "website",
  }
};

export default function AIToolsPage() {
  return <AITools />;
}
