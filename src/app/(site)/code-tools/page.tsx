import { Metadata } from "next";
import CodeTools from "@/components/CodeTools";

export const metadata: Metadata = {
  title: "Free Online Developer Tools | JSON Formatter, Bcrypt, Base64, Regex & More",

  description:
    "All-in-one free online developer tools: JSON formatter & validator, Bcrypt hash generator, Base64 encoder/decoder, secure password generator, regex tester, and AI image background remover. Fast, secure, and browser-based utilities for developers.",

  keywords: [
    // 🔥 Core Tools
    "developer tools online",
    "free online developer tools",
    "web developer tools",
    "programming tools online",

    // 🧩 JSON Tools
    "json formatter",
    "json beautifier",
    "json validator",
    "json minifier",
    "format json online",

    // 🔐 Security / Encoding
    "bcrypt hash generator",
    "bcrypt password hash",
    "base64 encoder",
    "base64 decoder",
    "encode decode base64",
    "password generator secure",

    // 🔍 Regex / Debugging
    "regex tester online",
    "regular expression tester",
    "regex validator",
    "pattern matching tool",

    // 🖼️ Image Tools
    "image background remover",
    "remove background online free",
    "ai background remover",
    "image editing tools online",

    // 🎯 Long-Tail SEO
    "free json formatter and validator online",
    "generate bcrypt hash for password",
    "base64 encode decode tool online",
    "secure password generator for developers",
    "online regex tester with real time preview",
    "ai tool to remove image background free"
  ],

  alternates: {
    canonical: "https://portfolieo-five.vercel.app/code-tools",
  },

  openGraph: {
    title: "All-in-One Free Developer Tools Suite",
    description:
      "Access powerful developer tools like JSON formatter, Bcrypt generator, Base64 encoder, regex tester, and more — all in one place.",
    url: "https://portfolieo-five.vercel.app/code-tools",
    type: "website",
    images: [
      {
        url: "https://harimishra.com/images/tools/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Online Developer Tools Suite",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Developer Tools | JSON, Bcrypt, Base64 & More",
    description:
      "Use fast, secure, and free developer tools online. Format JSON, generate hashes, test regex, and more.",
  },
};

export default function CodeToolsPage() {
  return <CodeTools />;
}
