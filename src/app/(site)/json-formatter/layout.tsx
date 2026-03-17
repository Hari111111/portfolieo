import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online JSON Formatter - Best Free JSON Beautifier & Validator",
  description: "Free online JSON Formatter and Validator. Beautify, minify, and convert JSON. Secure local processing, professional-grade developer tool for JSON debugging and data management.",
  keywords: [
    "JSON formatter", "JSON beautifier", "JSON validator", "minify JSON", 
    "format JSON online", "developer tools", "JSON tool", "beautify JSON",
    "JSON viewer", "JSON editor", "online JSON parser", "check JSON syntax"
  ],
  alternates: {
    canonical: "https://harimishra.com/json-formatter",
  },
  openGraph: {
    title: "Best Professional JSON Formatter & Validator Online",
    description: "Instantly beautify, minify, and validate your JSON data with our free, secure online tool. 100% private browser-side processing.",
    url: "https://harimishra.com/json-formatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Online JSON Formatter | Hari Mishra",
    description: "The most advanced tool for JSON developers. Format, minify and download JSON easily.",
  }
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
