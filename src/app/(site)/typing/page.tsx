import { Metadata } from "next";
import TypingTest from "@/components/TypingTest";

export const metadata: Metadata = {
  title: "Typing Speed Test - Test Your WPM and Accuracy | Hari Mishra",
  description:
    "Test your typing speed (WPM) and accuracy with our free online typing speed test. Practice with timed modes, random words, or inspirational quotes. Improve your keyboard skills today!",
  keywords: ["typing speed test", "wpm test", "typing practice", "keyboard speed test", "check typing speed", "typing accuracy"],
  openGraph: {
    title: "Typing Speed Test - Measure Your WPM Online",
    description: "How fast can you type? Check your WPM and accuracy with this professional typing speed test.",
    type: "website",
  }
};

export default function TypingPage() {
  return <TypingTest />;
}
