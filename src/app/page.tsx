import React from 'react'
import { Metadata } from "next";
import Hero from '@/components/Home/Hero';
import Counter from '@/components/Home/Counter'
import Progresswork from '@/components/Home/WorkProgress';
import Services from '@/components/Home/Services';
import Portfolio from '@/components/SharedComponent/portfollio'
import Resume from '@/components/Home/Resume'
export const metadata: Metadata = {
  title: "Hari Mishra | Professional MERN Stack Developer & UI Designer",
  description:
    "Explore the portfolio of Hari Mishra, a skilled MERN Stack Developer specializing in building high-performance web applications, interactive tools, and clean UI designs.",
  keywords: ["MERN stack developer", "Full stack developer", "React developer", "Web developer portfolio", "Hari Mishra", "software engineer explorer"],
  openGraph: {
    title: "Hari Mishra Portfolio - MERN Stack Expert",
    description: "Building modern web solutions with React, Node.js, and AI technologies.",
    type: "website",
  }
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Counter isColorMode={false} />
      <Progresswork isColorMode={false} />
      <Services />
      <Resume />
      {/* <Portfolio /> */}
    </main>
  )
}
