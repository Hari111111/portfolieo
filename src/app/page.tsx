import React from 'react'
import { Metadata } from "next";
import Hero from '@/components/Home/Hero';
import Counter from '@/components/Home/Counter'
import Progresswork from '@/components/Home/WorkProgress';
import Portfolio from '@/components/SharedComponent/portfollio'
import Resume from '@/components/Home/Resume'
import RecentBlogs from '@/components/Home/RecentBlogs';
import PageTracker from '@/components/Common/PageTracker';
export const metadata: Metadata = {
  title: "Hari Mishra | Professional MERN Stack Developer & UI Designer",
  description: "Explore the portfolio of Hari Mishra, a skilled MERN Stack Developer. Featuring an AI Resume Builder, Technical Interview Q&A Bank, and high-performance web applications.",
  keywords: [
    "MERN stack developer",
    "Full stack developer",
    "React developer",
    "Web developer portfolio",
    "Hari Mishra",
    "Coding Interview Preparation",
    "Free Resume Builder",
    "Next.js Developer Portfolio",
    "AI Tools for Developers",
    "Custom Web Solutions"
  ],
  openGraph: {
    title: "Hari Mishra Portfolio - MERN Stack Expert",
    description: "Building modern web solutions with React, Node.js, and AI technologies.",
    type: "website",
  }
};

export default function Home() {
  return (
    <main className="relative">
      <div className="absolute top-32 left-10 z-50 hidden lg:block">
        <PageTracker />
      </div>
      <Hero />
      <Counter isColorMode={false} />
      <Progresswork isColorMode={false} />
      <Portfolio />
      <Resume />
      <RecentBlogs />
    </main>
  )
}
