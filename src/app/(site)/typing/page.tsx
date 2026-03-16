import { Metadata } from "next";
import TypingTest from "@/components/TypingTest";

export const metadata: Metadata = {
  title: "Improve Typing Speed (WPM) | Fast & Accurate Typing Test Online",
  description: "Test and improve your typing speed and accuracy with our free online WPM test. Perfect for developers, students, and professionals to practice touch typing with real-time feedback and results.",
  keywords: [
    "typing speed test",
    "WPM test",
    "typing accuracy test",
    "coding typing practice",
    "developer typing speed",
    "keyboard speed test online",
    "improve typing WPM",
    "free typing tutor",
    "touch typing practice",
    "Words Per Minute test",
    "typing practice for programmers",
    "best typing test 2024",
    "online typing speed checker",
    "WPM counter",
    "typing skill test"
  ],
  openGraph: {
    title: "Master Your Typing Speed | Free Online WPM & Accuracy Test",
    description: "Challenge yourself with our professional typing test. Measure your WPM, track accuracy, and boost your productivity with regular practice.",
    type: "website",
    images: ['/images/typing/og-image.jpg'],
  }
};

export default function TypingPage() {
  return <TypingTest />;
}
