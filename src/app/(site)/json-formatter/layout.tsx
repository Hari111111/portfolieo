import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online JSON Formatter & Validator | Free JSON Beautifier Tool",
  description:
    "Free online JSON formatter, beautifier, and validator. Easily format, minify, and validate JSON data with secure browser-based processing. Perfect for developers and debugging.",

  keywords: [
    "json formatter",
    "json beautifier",
    "json validator",
    "format json online",
    "json minifier",
    "json parser online",
    "json viewer tool",
    "json editor online",
    "check json syntax",
    "fix invalid json",
    "pretty print json",
    "minify json online",
    "developer json tools",
    "online json utilities",
    "json debugging tool",
    "secure json formatter",
    "browser json formatter",
    "free json formatter tool"
  ],

  alternates: {
    canonical: "https://harimishra.com/json-formatter",
  },

  openGraph: {
    title: "Free Online JSON Formatter & Validator Tool",
    description:
      "Beautify, validate, and minify JSON instantly. Secure, fast, and 100% browser-based JSON tool for developers.",
    url: "https://harimishra.com/json-formatter",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator Tool | Hari Mishra",
    description:
      "Format, validate, and minify JSON easily with this fast and secure online developer tool.",
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Professional JSON Formatter & Validator",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "description": "A high-performance online tool to format, minify, and validate JSON data instantly.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Hari Mishra"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
