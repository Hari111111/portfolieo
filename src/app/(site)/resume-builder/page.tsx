import React from 'react'
import ResumeBuilder from '@/components/ResumeBuilder'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next'
import PageTracker from '@/components/Common/PageTracker'

export const metadata: Metadata = {
  title: "AI Resume Builder | Free ATS-Friendly CV Maker & Professional Templates",

  description:
    "Create a professional, ATS-friendly resume in minutes with our free AI resume builder. Choose modern templates, customize easily, and download your CV instantly in PDF format. Perfect for freshers, developers, and job seekers.",

  keywords: [
    // 🔥 Core Keywords
    "ai resume builder",
    "online resume builder",
    "free resume builder",
    "cv maker online",
    "resume generator",

    // 🎯 High Intent Keywords
    "ats friendly resume builder",
    "create resume online free",
    "resume builder with pdf download",
    "professional cv maker",
    "job winning resume builder",

    // 💻 Developer / Tech Focus
    "developer resume builder",
    "software engineer resume template",
    "frontend developer resume",
    "backend developer resume",
    "full stack developer resume",
    "it professional resume builder",

    // 🎨 Templates / Design
    "modern resume templates",
    "professional resume templates free",
    "clean resume design",
    "minimal cv template",
    "creative resume layouts",

    // 📄 Features / Utility
    "resume builder with pdf export",
    "download resume pdf free",
    "resume builder with word format",
    "editable resume templates",
    "printable cv template",

    // 👨‍🎓 Target Audience
    "resume builder for freshers",
    "cv maker for students",
    "resume maker for job application",
    "entry level resume builder",
    "resume for internship",

    // 🔍 Long-Tail SEO (High Ranking Power)
    "best free ai resume builder online",
    "create ats friendly resume for software developer",
    "free resume builder with modern templates and pdf download",
    "build professional resume online for jobs",
    "easy resume maker for freshers with no experience"
  ],

  alternates: {
    canonical: "https://harimishra.com/resume-builder",
  },

  openGraph: {
    title: "Free AI Resume Builder | Create ATS-Friendly CV in Minutes",
    description:
      "Build a job-ready resume with AI. Choose modern templates, customize easily, and download instantly. 100% free and ATS-optimized.",
    url: "https://harimishra.com/resume-builder",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Resume Builder | Free CV Maker Online",
    description:
      "Create a professional resume in minutes using AI. Free templates, ATS-friendly, and instant PDF download.",
  },
};

const ResumeBuilderPage = () => {
  const breadcrumbLinks = [
    { href: '/', text: 'Home' },
    { href: '/resume-builder', text: 'Resume Builder' },
  ]

  return (
    <>
      {/* <HeroSub
        title='Professional Resume Builder'
        description='Craft a winning resume with our premium templates. Fast, free, and no login required.'
        breadcrumbLinks={breadcrumbLinks}
      /> */}
      {/* <div className="bg-[#f4f7fe] pt-12 pb-6">
        <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
          <PageTracker />
          <div className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">Career Builder</div>
        </div>
      </div> */}
      <ResumeBuilder />
    </>
  )
}

export default ResumeBuilderPage
