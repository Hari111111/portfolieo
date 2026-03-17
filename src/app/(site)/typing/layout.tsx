import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Typing Test HD | Professional WPM & Accuracy Engine",
  description: "Experience the ultimate online typing test. Measure your WPM with laser precision, track real-time accuracy, and improve your typing speed with our high-performance neural engine.",
  keywords: [
    "typing test full width",
    "professional wpm test",
    "typing accuracy checker",
    "advanced typing engine",
    "online typing speed test",
    "words per minute calculator",
    "best typing test 2026",
    "typing practice for developers",
    "secure typing test",
    "fast typing test"
  ],
  alternates: {
    canonical: "https://yourdomain.com/typing",
  },
  openGraph: {
    title: "Quantum Typing Engine | Professional WPM Performance",
    description: "The most advanced typing test experience on the web. Minimalist, high-speed, and secure.",
    url: "https://yourdomain.com/typing",
    siteName: "Hari Mishra Portfolio",
    images: [
      {
        url: "/images/typing/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quantum Typing Engine Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Test HD | Professional WPM Engine",
    description: "Measure your typing speed and accuracy with zero latency in an immersive full-screen experience.",
    images: ["/images/typing/og-image.jpg"],
  },
};

export default function TypingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quantum Typing Engine",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time WPM tracking",
      "Accuracy analytics",
      "Multiple time modes",
      "Immersive full-screen design",
      "Edge-processed performance"
    ]
  };

  return (
    <>
      <Script
        id="typing-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
