import { Metadata } from "next";
import CodeTools from "@/components/CodeTools";

export const metadata: Metadata = {
  title: "Online Developer Tools - JSON Formatter, Base64, AI BG Remover | Hari Mishra",
  description:
    "A comprehensive suite of free online developer tools: JSON formatter & minifier, Base64 encoder/decoder, secure password generator, real-time Regex tester, and AI-powered Image Background Remover.",
  keywords: ["json formatter", "base64 encoder", "password generator", "regex tester", "image background remover", "developer tools", "online tools"],
  openGraph: {
    title: "Free Online Developer & Image Tools",
    description: "Convert, format, and optimize your code and images with our free online utility tools.",
    type: "website",
  }
};

export default function CodeToolsPage() {
  return <CodeTools />;
}
