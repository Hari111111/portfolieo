import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Chat from "@/components/Chat";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import NextTopLoader from 'nextjs-toploader';
import { AuthDialogProvider } from "./context/AuthDialogContext";
import Script from "next/script";
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Hari Mishra | Full Stack Developer, AI Tools & Coding Interview Prep",
    template: "%s | Hari Mishra"
  },

  description:
    "Official portfolio of Hari Mishra – Full Stack Developer specializing in MERN Stack, Next.js, Node.js, AI tools, coding interview preparation, system design, and professional resume building for developers.",

  keywords: [
    "Hari Mishra",
    "Hari Mishra Developer",
    "Hari Mishra Portfolio",

    "Full Stack Developer",
    "MERN Stack Developer",
    "JavaScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "Web Developer Portfolio",
    "Software Engineer Portfolio",

    "Full Stack Developer Portfolio",
    "Next.js Portfolio Website",
    "React Portfolio Developer",
    "Modern Developer Portfolio",

    "AI coding tools",
    "AI tools for developers",
    "developer productivity tools",
    "coding tools for programmers",

    "technical interview questions",
    "coding interview preparation",
    "software engineer interview prep",
    "JavaScript interview questions",
    "Node.js interview questions",
    "React interview questions",
    "system design interview preparation",
    "DSA interview preparation",
    "developer interview preparation",

    "professional resume builder",
    "ATS friendly resume builder",
    "online resume maker",
    "developer resume builder",
    "software engineer resume templates",
    "free CV builder for developers",
    "resume builder with PDF download",

    "learn full stack development",
    "full stack development roadmap",
    "developer career preparation",
    "coding practice for developers",
    "programming tutorials",

    "best portfolio for developers",
    "developer personal website",
    "modern developer portfolio design"
  ],

  authors: [{ name: "Hari Mishra" }],
  creator: "Hari Mishra",
  publisher: "Hari Mishra",

  robots: {
    index: true,
    follow: true
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <NextTopLoader />
        <AuthDialogProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="system"
          >
            <Aoscompo>
              <Header />
              <div className="pt-20">
                {children}
              </div>
              <Footer />
            </Aoscompo>
            <ScrollToTop />
            <Chat />
            <Toaster position="top-right" reverseOrder={false} />
          </ThemeProvider>
        </AuthDialogProvider>
      </body>
    </html>
  );
}
